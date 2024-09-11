import React from "react";
import { FlatList, ImageBackground, TouchableOpacity, View } from "react-native";

const TrendingItem = ({ item }) => {
  return (
    <View className="mb-5">
      <TouchableOpacity activeOpacity={0.7}>
        <ImageBackground
          source={{ uri: item.thumbnail }}
          className="w-full h-72 rounded-[33px] overflow-hidden shadow-lg shadow-black/40"
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
};

const Trending = ({ posts }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => <TrendingItem item={item} />}
      showsVerticalScrollIndicator={false}  // Vertical list
    />
  );
};

export default Trending;
