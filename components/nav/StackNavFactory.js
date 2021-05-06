import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Profile from "../../screens/Profile";
import Photo from "../../screens/Photo";
import Feed from "../../screens/Feed";
import Search from "../../screens/Search";
import Me from "../../screens/Me";
import Notifications from "../../screens/Notifications";

const Stack = createStackNavigator();

export default function StackNavFactory({screenName}){//Profile과 Photo는 모든 화면에서 볼수있지만 나머지는 각 화면에서밖에 못봄
    return (
        <Stack.Navigator
            screenOptions={{
                headerBackTitleVisible:false,
                headerTintColor:"white",
                headerStyle:{
                    shadowColor:"rgba(255,255,255,0.3)",
                    backgroundColor:"black"
                }
            }}
        >
            {screenName === "Feed" ? (
                <Stack.Screen name={"Feed"} component={Feed} />
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
        </Stack.Navigator>
    )
}