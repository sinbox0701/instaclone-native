import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import {Ionicons} from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Asset } from "expo-asset";
import { NavigationContainer } from '@react-navigation/native';
import LoggedOutNav from './navigators/LoggedOutNav';
import LoggedInNav from './navigators/LoggedInNav';
import { ApolloProvider, useReactiveVar } from '@apollo/client';
import client, { isLoggedInVar, tokenVar, cache } from './apollo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageWrapper, persistCache } from "apollo3-cache-persist";


export default function App() {
  const [loading,setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const preloadAssets = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromise = fontsToLoad.map(font => Font.loadAsync(font));
    const imagesToLoad = [require("./assets/logo.png")];
    const imagePromise = imagesToLoad.map(image => Asset.loadAsync(image));
    return Promise.all([...fontPromise,...imagePromise]);
  };
  const preload = async () => {
    const token = await AsyncStorage.getItem("token");
    if(token){
      isLoggedInVar(true);
      tokenVar(token);
    }
    await persistCache({
        cache,
        storage:new AsyncStorageWrapper(AsyncStorage),
        serialize:false//schema 변경 가능하게 해줌 이걸 안하면 이전에 저장된 schema가 변경X
    });//배포할때 주석처리
    return preloadAssets();
  }
  if(loading){
    return <AppLoading 
              startAsync={preload}
              onError={console.warn} 
              onFinish={onFinish}
            />;
  }
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        { isLoggedIn ? <LoggedInNav/> : <LoggedOutNav/>}
      </NavigationContainer>
    </ApolloProvider>
  );
}