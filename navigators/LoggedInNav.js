import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "./TabsNav";
import Upload from "../screens/Upload";

const Stack = createStackNavigator();

export default function LoggedInNav() {
    return (
        <Stack.Navigator headerMode="none" mode="modal">
            <Stack.Screen name="Tabs" component={TabsNav} />
            <Stack.Screen name="Upload" component={Upload}/>
        </Stack.Navigator>
    );
}

// Navigator
/*
 Stack --> Tab --> Stack 구조
 Tab위에 Stack을 만드는 이유는 사진을 업로드할때 현재 만들어논 Tab이 아닌 전혀 다른 페이지로 이동해야하기 때문
*/