import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Image, Text, TextInput, useWindowDimensions, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";

const SEARCH_PHOTOS = gql`
  query searchPhotos($keyword: String!) {
    searchPhotos(keyword: $keyword) {
      id
      file
    }
  }
`;

const MessageContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const MessageText = styled.Text`
  margin-top: 15px;
  color: white;
  font-weight: 600;
`;

const Input = styled.TextInput`
  background-color: rgba(255, 255, 255, 1);
  color: black;
  width: ${(props) => props.width / 1.5}px;
  padding: 5px 10px;
  border-radius: 7px;
`;

export default function Search({navigation}) {
    const numColumns = 4;
    const {width} = useWindowDimensions();
    const {setValue,register,watch,handleSubmit} = useForm();
    const [startQueryFn,{loading,data,called}] = useLazyQuery(SEARCH_PHOTOS);//바로 실행X, 특정 조건에 맞춰 실행
    //trigger Query, startQueryFn 같은것을 가지고 이씀
    const onValid = ({keyword}) => {
        startQueryFn({
            variables:{
                keyword
            }
        });
    };
    const SearchBox = () => (
        <Input
            style={{backgroundColor:"rgba(0,0,0,0.8)"}}
            placeholderTextColor="black"
            placeholder="Search Photos"
            autoCapitalize="none"
            returnKeyLabel="Search"
            returnKeyType="search"
            autoCorrect={false}
            onChangeText={(text)=>setValue("keyword",text)}
            onSubmitEditing={handleSubmit(onValid)}
        />
    );
    const renderItem = ({item:photo}) => (
        <TouchableOpacity  
            onPress={() =>
                navigation.navigate("Photo", {
                    photoId: photo.id,
                })
            }
        >
            <Image
                source={{uri:photo.file}}
                style={{width:width/numColumns, height:100}}
            />
        </TouchableOpacity>
    )
    useEffect(()=>{
        navigation.setOptions({
            headerTitle:SearchBox
        });
        register("keyword",{
            required:true,
            minLength:3
        });
    },[])
    return (
        <DismissKeyboard>
            <View style={{ backgroundColor: "black", flex: 1}}>
                {loading ? (
                    <MessageContainer>
                        <ActivityIndicator size="large"/>
                        <MessageText>Searching...</MessageText>
                    </MessageContainer>
                ) : null}
                {!called ? (
                    <MessageContainer>
                        <MessageText>Search by keyword</MessageText>
                    </MessageContainer>
                ) : null}
                {data?.searchPhotos !== undefined ? (
                    data?.searchPhotos?.length === 0 ? (
                        <MessageContainer>
                            <MessageText>Could not find anything.</MessageText>
                        </MessageContainer>
                    ) : (
                        <FlatList
                            numColumns={numColumns}
                            data={data?.searchPhotos}
                            keyExtractor={(photo) => "" + photo.id}
                            renderItem={renderItem}
                        />
                    )
                ) : null}
            </View>
        </DismissKeyboard>
    );
}