import { View, Text, FlatList, Image, RefreshControl } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending';
import EmptyState from '../../components/EmptyState';
import { getAllPosts, getLatestPosts, searchPosts } from '../../lib/appwrite';
import useAppWrite from '../../lib/useAppWrite';
import VideoCard from '../../components/VideoCard';
import { useLocalSearchParams } from 'expo-router';
import { useGlobalContext } from '../../lib/context/GlobalProvider';
import { getUserPosts } from '../../lib/appwrite';
import { TouchableOpacity } from 'react-native';
import { icons } from '../../constants'
import InfoBox from '../../components/InfoBox';
import { router } from 'expo-router';
import { signOut } from '../../lib/appwrite';

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts } = useAppWrite(() => getUserPosts(user.$id));

  console.log(posts)

  const logout = async () => {
    await signOut();
    setUser(null)
    setIsLoggedIn(false)

    router.replace('/sign-in')

  }


  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id} // Ensure the key is a string
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}

        ListHeaderComponent={() => (
          <View
            className="w-full justify-center items-center mt-6 mb-12 px-4"
          >
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logout}
            >
              <Image source={icons.logout} resizeMode="contain" className="w-6 h-6" />
            </TouchableOpacity>

            <View
              className="w-16 h-16 border border-secondary rounded-lg justify-center items-center"
            >
              <Image source={{ uri: user?.avatar }} className="w-[90%] h-[90%] rounded-lg" resizeMode='cover' />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles='mt-5'
              titleStyles='text-lg'
            />

            <View className="mt-5 flex-row">

              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                containerStyles='mr-5'
                titleStyles='text-xl'
              />

              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles='text-xl'
              />
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

export default Profile;
