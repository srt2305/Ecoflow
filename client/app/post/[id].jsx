import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { searchPost } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import CustomButton from "../../components/CustomButton";

const Post = () => {
  const { id } = useLocalSearchParams();
  const { data: post } = useAppwrite(() => searchPost(id));

  const { user } = useGlobalContext();

  const update = () => {};

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">{post.title}</Text>

        <View className="flex-row justify-start items-center mt-10 gap-x-5">
          <Text className="text-lg text-gray-200 font-pmedium">Category:</Text>

          <Text className="text-base text-white font-pmedium uppercase">
            {post.category}
          </Text>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">Image</Text>
          <Image
            source={{ uri: post.image }}
            resizeMode="contain"
            className="w-full h-64 rounded-2xl"
          />
        </View>

        <View className="flex-row justify-start items-center mt-10 gap-x-5">
          <Text className="text-lg text-gray-200 font-pmedium">
            Description:
          </Text>

          <Text className="text-base text-white font-pmedium">
            {post.description}
          </Text>
        </View>

        <View className="flex-row justify-start items-center mt-10 gap-x-5">
          <Text className="text-lg text-gray-200 font-pmedium">Location:</Text>

          <Text className="text-base text-white font-pmedium uppercase">
            {post.location}
          </Text>
        </View>

        <View className="flex-row justify-start items-center mt-10 gap-x-5">
          <Text className="text-lg text-gray-200 font-pmedium">
            Segregated Category
          </Text>

          <Text className="text-base text-white font-pmedium uppercase">
            {post.final_category}
          </Text>
        </View>

        <View className="flex-row justify-start items-center mt-10 gap-x-5">
          <Text className="text-lg text-gray-200 font-pmedium">
            Ways to solve
          </Text>

          <Text className="text-base text-white font-pmedium">
            {post.remark}
          </Text>
        </View>

        {user.admin ? (
          <>
            <View className="flex-row justify-start items-center mt-10 gap-x-5">
              <Text className="text-lg text-gray-200 font-pmedium">
                Current Status
              </Text>
              <Text className="text-base text-white font-pmedium uppercase">
                {post.status ? "Completed" : "Pending"}
              </Text>
            </View>
            <CustomButton
              title="Update status"
              handlePress={update}
              containerStyles="mt-5"
            />
          </>
        ) : (
          <View className="flex-row justify-start items-center mt-10 gap-x-5">
            <Text className="text-lg text-gray-200 font-pmedium">Status</Text>
            <Text className="text-base text-white font-pmedium uppercase">
              {post.status ? "Completed" : "Pending"}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Post;
