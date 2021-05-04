import React from "react";
import { View,Text,TouchableOpacity } from "react-native";

export default function Welcome({navigation}){
    return (
        <View>
            <Text>Welcome</Text>
            <TouchableOpacity onPress={()=>navigation.navigate("CreateAccount")}>
                <View>
                    <Text>Go to CreateAccount</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
                <View>
                    <Text>Go to Login</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}