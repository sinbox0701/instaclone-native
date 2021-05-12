import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components/native";
import { colors } from "../colors";
import { FlatList, Image, StatusBar, TouchableOpacity, useWindowDimensions } from "react-native";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Top = styled.View`
  flex: 1;
  background-color: black;
`;

const Bottom = styled.View`
  flex: 1;
  background-color: black;
`;

const ImageContainer = styled.TouchableOpacity``;
const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 0px;
`;

const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

export default function SelectPhoto({navigation}) {
    const [ok, setOk] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [chosenPhoto, setChosenPhoto] = useState("");
    const getPhotos = async () => {
        const { assets: photos } = await MediaLibrary.getAssetsAsync();//모든 파일 가져옴
        setPhotos(photos);
    };
    const getPermissions = async () => {
        const {
            accessPrivileges,
            canAskAgain,
        } = await MediaLibrary.getPermissionsAsync();//권한 요청
        if (accessPrivileges === "none" && canAskAgain) {//요청 실패시
            const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();//재요청
            if (accessPrivileges !== "none") {//성공
                setOk(true);
                getPhotos();
            }
        } else if (accessPrivileges !== "none") {//성공
            setOk(true);
            getPhotos();
        }      
    };//사진 요청 권한
    const HeaderRight = () => (
        <TouchableOpacity>
          <HeaderRightText>Next</HeaderRightText>
        </TouchableOpacity>
    );
    useEffect(() => {
        getPermissions();
    }, []);
    useEffect(() => {
        navigation.setOptions({
          headerRight: HeaderRight,
        });
    }, []);
    const numColumns = 4;
    const { width } = useWindowDimensions();
    const choosePhoto = (uri) => {
        setChosenPhoto(uri);
    };
    const renderItem = ({item:photo}) => (
        <ImageContainer onPress={()=>choosePhoto(photo.uri)}>
            <Image 
                source={{uri:photo.uri}}
                style={{width:width/numColumns,height:100}} 
            />
            <IconContainer>
                <Ionicons name="checkmark-circle" size={18} color={photo.uri === chosenPhoto ? colors.blue : "white"} />
            </IconContainer>
        </ImageContainer>
    );
    return (
        <Container>
            <StatusBar />
            <Top>
            {chosenPhoto !== "" ? (
                <Image
                    source={{ uri: chosenPhoto }}
                    style={{ width, height: "100%" }}
                />
            ) : null}
            </Top>
            <Bottom>
                <FlatList
                    data={photos}
                    numColumns={numColumns}
                    keyExtractor={photo => photo.id}
                    renderItem={renderItem}
                />
            </Bottom>
        </Container>
    );
  }