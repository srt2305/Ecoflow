import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import { images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts } from "../../lib/appwrite";
import EmptyState from "../../components/EmptyState";

import { useGlobalContext } from "../../context/GlobalProvider";
import PostCard from "../../components/PostCard";

const Home = () => {
  const { user } = useGlobalContext();

  const { data: posts, refetch } = useAppwrite(getAllPosts);

  const [selectedCategory, setSelectedCategory] = useState("all");

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <PostCard
            title={item.title}
            description={item.description}
            image={item.image}
            location={item.location}
            status={item.status}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back,
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.username}
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <View className="flex-row justify-around items-center">
              <TouchableOpacity
                onPress={() => setSelectedCategory("all")}
                className={`${
                  selectedCategory === "all"
                    ? "bg-white py-1 w-20 items-center rounded-xl"
                    : ""
                }`}
              >
                <Text
                  className={`${
                    selectedCategory === "all" ? "text-blue-400" : "text-white"
                  }`}
                >
                  All
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedCategory("waste")}
                className={`${
                  selectedCategory === "waste"
                    ? "bg-white py-1 w-20 items-center rounded-xl"
                    : ""
                }`}
              >
                <Text
                  className={`${
                    selectedCategory === "waste"
                      ? "text-blue-400"
                      : "text-white"
                  }`}
                >
                  Waste
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedCategory("road")}
                className={`${
                  selectedCategory === "road"
                    ? "bg-white py-1 w-20 items-center rounded-xl"
                    : ""
                }`}
              >
                <Text
                  className={`${
                    selectedCategory === "road" ? "text-blue-400" : "text-white"
                  }`}
                >
                  Road
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Posts Found"
            subtitle="No posts created yet, be the first to post"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
