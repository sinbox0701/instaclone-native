import { gql, useQuery } from "@apollo/client";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ScreenLayout from "../components/ScreenLayout";
import { logUserOut } from "../apollo";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";

const FEED_QUERY = gql`
    query seeFeed{
        seeFeed {
            ...PhotoFragment
            user {
                username
                avatar
            }
            comments {
                ...CommentFragment
            }
            caption
            createdAt
            isMine
        }
    }
    ${PHOTO_FRAGMENT}
    ${COMMENT_FRAGMENT}
`
export default function Feed({navigation}) {
    const { data, loading } = useQuery(FEED_QUERY);
    const renderPhoto = ({ item: photo }) => {
        return (
            <View style={{ flex: 1 }}>
                <Text style={{ color: "white" }}>{photo.caption}</Text>
            </View>
        );
    };
    console.log(data);
    return (
        <ScreenLayout loading={loading}>
            <FlatList
                data={data?.seeFeed}
                keyExtractor={(photo) => "" + photo.id}
                renderItem={renderPhoto}
            />
        </ScreenLayout>
    );
}