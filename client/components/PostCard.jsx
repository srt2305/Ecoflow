import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "../constants";
// import { images } from "../constants/images.js";

const PostCard = ({ title, avatar, image, location, status }) => {
  return (
    <>
      <TouchableOpacity className="flex-1 bg-f0f0f0 w-100 border border-2 border-white border-r-9 rounded-lg ">
        <View className="flex flex-row">
          <View className="">
            <Image
              // source={images.empty}
              resizeMode="contain"
              className="w-[150px] h-[100px]"
            />
          </View>
          <View className="flex-1 flex-col justify-center w-30 items-start bg-e0e0e0 py-3 px-3 text-white">
            <Text className={"mb-2 text-white"}>
              Title: Hlelo this is testing
            </Text>
            <Text className="text-14 mb-2  text-white">
              Location: Hlelo this is testing{" "}
            </Text>
            <Text className="text-16 mb-2 text-white">
              Description: Hlelo this is testing{" "}
            </Text>
          </View>
        </View>
        <View className="flex-1 flex-row justify-between items-center pb-2 px-5 text-white">
          <Text className="text-14  text-white"></Text>
          <Text className="text-14  text-white">Status: {"pending"}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default PostCard;
