import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { searchPost } from "../../lib/appwrite";

const Post = () => {
  const { id } = useLocalSearchParams();
  const { data: post } = useAppwrite(() => searchPost(id));

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Title</Text>

        <Text className="text-base text-gray-200 font-pmedium">Category</Text>

        <Text className="text-lg text-gray-100 font-pmedium">Category</Text>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">Image</Text>
          <Image
            source={{ uri: post.image.uri }}
            resizeMode="contain"
            className="w-5 h-5"
          />
        </View>

        <Text className="text-base text-gray-200 font-pmedium">
          Description
        </Text>

        <Text className="flex-1 text-white font-psemibold text-base">
          Description
        </Text>

        <Text className="text-base text-gray-200 font-pmedium">Location</Text>

        <Text className="text-lg text-gray-100 font-pmedium">Location</Text>

        <Text className="text-base text-gray-200 font-pmedium">Status</Text>

        <Text className="text-lg text-gray-100 font-pmedium">Status</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Post;
