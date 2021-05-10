import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setContext} from "@apollo/client/link/context";
import { offsetLimitPagination } from "@apollo/client/utilities";

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

const httpLink = createHttpLink({
    uri:"http://b23e127efee5.ngrok.io/graphql",//변경될 수 있음
});

const authLink = setContext((_,{headers} )=> {
    
    return {
        headers:{
            ...headers,
            token:tokenVar()//tokenVAr의 현재값
        }
    };
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
    link: authLink.concat(httpLink),
    cache
});

export default client;