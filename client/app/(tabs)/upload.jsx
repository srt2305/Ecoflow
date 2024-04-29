import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";
import { icons } from "../../constants";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { createImage } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Picker } from "@react-native-picker/picker";

const Upload = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setform] = useState({
    title: "",
    image: null,
    description: "",
    location: "",
    category: "",
  });

  const [value, setValue] = useState("");

  const openPicker = async (selectType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setform({ ...form, image: result.assets[0] });
      }
    }
  };

  const submit = async () => {
    if (
      !form.title ||
      !form.image ||
      !form.description ||
      !form.location ||
      !form.category
    ) {
      return Alert.alert("Please fill in all fields");
    }

    form.category = value;

    setUploading(true);

    try {
      await createImage({
        ...form,
        userId: user.$id,
      });

      Alert.alert("Success", "Post uploaded successfully");

      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setform({
        title: "",
        image: null,
        description: "",
        location: "",
        category: "",
      });
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">
          Upload Problem
        </Text>

        <View className="flex-1 justify-center bg-white items-center">
          <Picker
            selectedValue={value}
            onValueChange={(itemValue) => setValue(itemValue)}
          >
            <Picker.Item
              label="Select a category"
              value=""
              className="text-black-100"
            />
            <Picker.Item label="Waste" value="1" className="text-black-100" />
            <Picker.Item label="Road" value="2" className="text-black-100" />
          </Picker>
          {value !== "" && (
            <Text className="mt-5 text-xl text-white">
              Selected Category: {value}
            </Text>
          )}
        </View>

        <FormField
          title="Image Title"
          value={form.title}
          placeholder="Give your video a title..."
          handleChangeText={(e) => setform({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Image Upload
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.image ? (
              <Image
                source={{ uri: form.image.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="Description"
          value={form.description}
          placeholder="Describe the problem in brief"
          handleChangeText={(e) => setform({ ...form, description: e })}
          otherStyles="mt-10"
        />

        <FormField
          title="location"
          value={form.location}
          placeholder="Location..."
          handleChangeText={(e) => setform({ ...form, location: e })}
          otherStyles="mt-7"
        />

        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Upload;
