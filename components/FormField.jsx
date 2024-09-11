import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);


  return (
    <View style={{ marginBottom: 16, ...otherStyles }}>
      <Text style={{ color: '#fff', fontSize: 16, marginBottom: 8 }}>{title}</Text>

      <View style={{
        width: '100%',
        height: 56,
        paddingHorizontal: 16,
        backgroundColor: '#1c1c1e',
        borderRadius: 12,
        borderColor: isFocused ? '#FF9001' : '#3b3b3b',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <TextInput
          style={{
            flex: 1,
            color: '#fff',
            fontSize: 16,
            fontWeight: '600',
          }}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={title === 'Password' && !showPassword}
          {...props}
        />
        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={!showPassword ? icons.eye: icons.eyeHide} className="w-6 h-6" resizeMode='contain'/>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField
