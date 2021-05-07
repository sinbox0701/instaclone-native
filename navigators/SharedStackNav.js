import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Profile from "../screens/Profile";
import Photo from "../screens/Photo";
import Feed from "../screens/Feed";
import Search from "../screens/Search";
import Me from "../screens/Me";
import Notifications from "../screens/Notifications";
import { Image } from "react-native";
import Likes from "../screens/Likes";
import Comments from "../screens/Comments";

const Stack = createStackNavigator();

export default function SharedStackNav({screenName}){//Profile과 Photo는 모든 화면에서 볼수있지만 나머지는 각 화면에서밖에 못봄
    return (
        <Stack.Navigator
            headerMode="screen"
            screenOptions={{
                headerBackTitleVisible:false,
                headerTintColor:"white",
                headerStyle:{
                    borderBottomColor: "rgba(255, 255, 255, 0.3)",
                    shadowColor:"rgba(255,255,255,0.3)",
                    backgroundColor:"black"
                }
            }}
        >
            {screenName === "Feed" ? (
                <Stack.Screen name={"Feed"} component={Feed} options={{
                    headerTitle:()=><Image style={{width:120, height:40}} resizeMode="contain" source={require("../assets/logo.png")}/>
                }} />
            ) : null}
            {screenName === "Search" ? (
                <Stack.Screen name={"Search"} component={Search} />
            ):null}
            {screenName === "Notifications" ? (
                <Stack.Screen name={"Notifications"} component={Notifications} />
            ) : null}
            {screenName === "Me" ? <Stack.Screen name={"Me"} component={Me} /> : null}
            <Stack.Screen name="Profile" component={Profile}/>
            <Stack.Screen name="Photo" component={Photo}/>
            <Stack.Screen name="Likes" component={Likes} />
            <Stack.Screen name="Comments" component={Comments} />
        </Stack.Navigator>
    )
}