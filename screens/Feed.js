import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ScreenLayout from "../components/ScreenLayout";
import { logUserOut } from "../apollo";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import Photo from "../components/Photo";

const FEED_QUERY = gql`
    query seeFeed($offset: Int!){
        seeFeed(offset: $offset) {
            ...PhotoFragment
            user {
                id
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
    const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERY,{
        variables:{
            offset:0,
        }
    });//fetchMore 추가 fetch 설정
    
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
                onEndReachedThreshold={0.02}//List 끝을 설정
                onEndReached={() =>
                    fetchMore({
                        variables: {
                        offset: data?.seeFeed?.length,
                        },
                    })
                }//끝에 도달하면 함수 작동
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