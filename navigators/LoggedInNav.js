import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "./TabsNav";
import UploadNav from "./UploadNav";
import UploadForm from "../screens/UploadForm";
import MessagesNav from "./MessageNav";

const Stack = createStackNavigator();

export default function LoggedInNav() {
    return (
        <Stack.Navigator headerMode="none" mode="modal">
            <Stack.Screen name="Tabs" component={TabsNav} />
            <Stack.Screen name="Upload" component={UploadNav}/>
            <Stack.Screen 
                name="UploadForm"
                options={{
                    headerBackTitleVisible:false,
                    headerBackImage:({tintColor})=>(
                        <Ionicons color={tintColor} name="close" />
                    ),
                    title:"Upload",
                    headerTintColor:"white",
                    headerStyle:{
                        backgroundColor:"black",
                    },
                }}
                component={UploadForm} 
            />
            <Stack.Screen
                name="Messages"
                options={{headerShown:false}}
                component={MessagesNav}
            />
        </Stack.Navigator>
    );
}
