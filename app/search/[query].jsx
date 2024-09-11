import { View, Text, FlatList, Image, RefreshControl } from 'react-native';
import React, {useEffect, useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from '../../constants';
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending';
import EmptyState from '../../components/EmptyState';
import { getAllPosts, getLatestPosts, searchPosts} from '../../lib/appwrite';
import useAppWrite from '../../lib/useAppWrite';
import VideoCard from '../../components/VideoCard';
import { useLocalSearchParams } from 'expo-router';

const Search = () => {
  const {query} = useLocalSearchParams();
  const { data: posts, refetch } = useAppWrite(() => searchPosts(query));

  useEffect(() => {
    refetch
  },[query])


  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id} // Ensure the key is a string
        renderItem={({ item }) => (
          <VideoCard video={item}/>
        )}

        ListHeaderComponent={() => (
          <View className = "my-6 px-4 space-y-6">
            <View className="flex-row justify-between items-center mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                 Search Results
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {query}
                </Text>
            <SearchInput initialQuery = {query}/>
              </View>
            </View>

          </View>
        )}

        ListEmptyComponent={() => (
          <EmptyState 
          title="No Videos Found"
          subtitle="Be the first one to upload a video"
          />
        )}
        />

    </SafeAreaView>
  );
};

export default Search;
