import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import {Ionicons} from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Asset } from "expo-asset";
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LoggedOutNav from './navigators/LoggedOutNav';

export default function App() {
  const [loading,setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const preload = () => {//preload는 Promise를 반환
    const fontsToLoad = [Ionicons.font];
    const fontPromise = fontsToLoad.map(font => Font.loadAsync(font));
    const imagesToLoad = [require("./assets/logo.png"),"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/840px-Instagram_logo.svg.png"];
    const imagePromise = imagesToLoad.map(image => Asset.loadAsync(image));
    return Promise.all([...fontPromise,...imagePromise]);//Promise Array
  }
  if(loading){
    return <AppLoading 
              startAsync={preload}
              onError={console.warn} 
              onFinish={onFinish}
            />;
            /*
              startAsync --> AppLoading 이전에 필요한 것들 (font, token 등등)
              onError --> AppLoading중 Error 생성 시
              onFinish --> AppLoading 동작 이후 
             */
  }
  return (
    <NavigationContainer>
      <LoggedOutNav/>
    </NavigationContainer>
  );
  //Navigator는 NavigationContainer로 감싸야함
}

