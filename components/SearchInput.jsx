import { View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants';
import { usePathname, useRouter } from 'expo-router';  // useRouter for navigation

const SearchInput = ({initialQuery}) => {
  const [isFocused, setIsFocused] = useState(false);
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || '');
  const router = useRouter();  // Using useRouter hook for navigation

  return (
    <View style={{
      width: '100%',
      height: 40,  // Increase the height for more space
      paddingHorizontal: 20, // Adjust the padding as needed
      backgroundColor: '#1c1c1e',
      borderRadius: 12,
      borderColor: isFocused ? '#FF9001' : '#3b3b3b',
      borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <TextInput
        style={{
          flex: 1, // Ensures TextInput takes available space
          fontSize: 18,
          lineHeight: 24,
          color: '#ffffff',
        }}
        value={query}
        placeholder={query}
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert("Missing query", "Please input something to search results across the database");
          }
          // If already on /search page, update query params, otherwise push new route
          if (pathname.startsWith('/search')) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);  // Navigate to /search/query
          }
        }}
      >
        <Image
          source={icons.search}
          style={{ width: 15, height: 15 }} // Adjust margin as needed
          resizeMode='contain'
        />
      </TouchableOpacity>
    </View>
  );
}

export default SearchInput;
