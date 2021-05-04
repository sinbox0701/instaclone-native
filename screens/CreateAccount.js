import React, { useRef } from "react";
import { KeyboardAvoidingView, Platform, TextInput } from "react-native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";

export default function CreateAccount(){
    const lastNameRef = useRef();//각 component 지정할때 도와줌
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const onNext = (nextOne) => {
        nextOne?.current?.focus();//지정한 Component로 이동
    }
    const onDone = () => {
        alert("done!");
    };
    return (
        <AuthLayout>
            <KeyboardAvoidingView 
                behavior="padding"
                style={{
                    width:"100%"
                }}
                keyboardVerticalOffset={Platform.OS === "ios" ? 30 : 0}
            >
                <TextInput
                    autoFocus
                    placeholder="First Name"
                    placeholderTextColor="gray"
                    returnKeyType="next"
                    style={{backgroundColor:"white",width:"100%"}}
                    onSubmitEditing={()=>onNext(lastNameRef)}//다음(Next) 누르면 발생하는 함수
                />
                <TextInput
                    ref={lastNameRef}
                    placeholder="Last Name"
                    placeholderTextColor="gray"
                    returnKeyType="next"
                    style={{backgroundColor:"white",width:"100%"}}
                    onSubmitEditing={()=>onNext(usernameRef)}
                />
                <TextInput
                    ref={usernameRef}
                    placeholder="Username"
                    placeholderTextColor="gray"
                    returnKeyType="next"
                    style={{backgroundColor:"white",width:"100%"}}
                    onSubmitEditing={()=>onNext(emailRef)}
                />
                <TextInput
                    ref={emailRef}
                    placeholder="Email"
                    placeholderTextColor="gray"
                    keyboardType="email-address"
                    returnKeyType="next"
                    style={{backgroundColor:"white",width:"100%"}}
                    onSubmitEditing={()=>onNext(passwordRef)}
                />
                <TextInput
                    ref={passwordRef}
                    placeholder="Password"
                    placeholderTextColor="gray"
                    secureTextEntry
                    returnKeyType="done"
                    style={{backgroundColor:"white",width:"100%"}}
                    onSubmitEditing={()=>onDone}
                />
                <AuthButton text="Create Account" disabled={true} onPress={()=>null} />
            </KeyboardAvoidingView>
        </AuthLayout>
    );
}