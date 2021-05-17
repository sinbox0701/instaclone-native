import { ApolloClient, createHttpLink, InMemoryCache, makeVar, split } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setContext} from "@apollo/client/link/context";
import { getMainDefinition, offsetLimitPagination } from "@apollo/client/utilities";
import {onError} from "@apollo/client/link/error";
import {createUploadLink} from "apollo-upload-client";
import {WebSocketLink} from "@apollo/client/link/ws";


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
    uri:"http://d559b3814fab.ngrok.io/graphql",//변경될 수 있음
});

const wsLink = new WebSocketLink({
    uri:"ws://d559b3814fab.ngrok.io/graphql",//변경될 수 있음,
    options:{
        connectionParams: () => ({
            token:tokenVar()
        })
    }
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

const httpLinks = authLink.concat(onErrorLink).concat(uploadHttpLink);

const splitLink = split(
    ({query}) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === "OperationDefinition" && definition.operation === "subscription"
        );
    },// 이 조건이 만족하면 (return 값이 true면) 두번째인자, false면 세번째 인자를 갖는다
    wsLink,//true
    httpLinks//false
);

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
    link: splitLink,
    cache
});

export default client;