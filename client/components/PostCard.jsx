import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const PostCard = ({
  id,
  title,
  description,
  image,
  location,
  status,
  avatar,
}) => {
  return (
    <TouchableOpacity
      className="flex-col items-center px-4 mb-14"
      onPress={() => {
        router.push(`/post/${id}`);
      }}
    >
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[52px] h-[52px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="justify-center flex-1 ml-3 gap-y-1 mt-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular truncate"
              numberOfLines={1}
            >
              {description}
            </Text>
            <Text className="text-xs text-white font-pregular">{location}</Text>
          </View>
        </View>

        <View className="pt-2">
          <Text className="text-white">{status ? "Completed" : "Pending"}</Text>
        </View>
      </View>

      <View className="w-full h-60 rounded-xl mt-3 relative justify-center items-center">
        <Image
          source={{ uri: image }}
          className="w-full h-full rounded-xl mt-3"
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );
};

export default PostCard;
