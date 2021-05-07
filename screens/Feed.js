import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ScreenLayout from "../components/ScreenLayout";
import { logUserOut } from "../apollo";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import Photo from "../components/Photo";

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
export default function Feed() {
    const { data, loading, refetch } = useQuery(FEED_QUERY);//refetech는 query를 불러오는 function
    
    const renderPhoto = ({ item: photo }) => {
        return (
            <Photo {...photo}/>
        );
    };
    
    const refresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    const [refreshing, setRefreshing] = useState(false);

    return (
        <ScreenLayout loading={loading}>
            <FlatList
                refreshing={refreshing}
                onRefresh={refresh}
                style={{width:"100%"}}
                showsVerticalScrollIndicator={false}
                data={data?.seeFeed}
                keyExtractor={(photo) => "" + photo.id}
                renderItem={renderPhoto}
            />
        </ScreenLayout>
    );
}