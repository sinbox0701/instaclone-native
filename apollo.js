import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setContext} from "@apollo/client/link/context";
import { offsetLimitPagination } from "@apollo/client/utilities";
import {onError} from "@apollo/client/link/error";
import {createUploadLink} from "apollo-upload-client";

const TOKEN = "token";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

export const logUserIn = async (token) => {
    await AsyncStorage.setItem(TOKEN,token);
    isLoggedInVar(true);
    tokenVar(token);
}; 
export const logUserOut = async () => {
    await AsyncStorage.removeItem(TOKEN);
    isLoggedInVar(false);
    tokenVar(null);
}

const uploadHttpLink = createUploadLink({
    uri:"http://fdd5eae4658e.ngrok.io/graphql",//변경될 수 있음
});

const authLink = setContext((_,{headers} )=> {
    
    return {
        headers:{
            ...headers,
            token:tokenVar()//tokenVAr의 현재값
        }
    };
});

const onErrorLink = onError(({graphQLErrors, networkError})=>{
    if(graphQLErrors){
        console.log(`GraphQL Error`,graphQLErrors);
    }
    if(networkError){
        console.log(`Network Error`,networkError);
    }
});

export const cache = new InMemoryCache({
    typePolicies:{
        Query:{
            fields:{
                seeFeed: offsetLimitPagination(),
            }
        }
    }
}); 

const client = new ApolloClient({
    link: authLink.concat(onErrorLink).concat(uploadHttpLink),
    cache
});

export default client;