import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { icons } from "../../constants";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import { createImage } from "../../lib/appwrite";
// import Geolocation from "@react-native-community/geolocation";

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
  const [data, setData] = useState({});
  const [value, setValue] = useState("");
  // const [userLocation, setUserLocation] = useState(null);
  // const [sharedLocations, setSharedLocations] = useState([]);

  // useEffect(() => {
  //   (async () => {
  //     // Request permission to access the device's location
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       console.error("Permission to access location was denied");
  //       return;
  //     }

  //     // Get the current location
  //     let location = await Location.getCurrentPositionAsync({});
  //     setUserLocation({
  //       latitude: location.coords.latitude,
  //       longitude: location.coords.longitude,
  //     });

  //     // Subscribe to location updates
  //     Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
  //       setUserLocation({
  //         latitude: location.coords.latitude,
  //         longitude: location.coords.longitude,
  //       });
  //     });
  //   })();
  //   return () => {
  //     Location.stopLocationUpdatesAsync();
  //   };
  // }, []);

  // const fetchAddress = async (latitude, longitude) => {
  //   try {
  //     const addressData = await geolib.getReverse({ latitude, longitude });
  //     console.warn("hello", addressData.formattedAddress);
  //     return addressData.formattedAddress;
  //   } catch (error) {
  //     console.error("Error fetching address:", error);
  //     return null;
  //   }
  // };

  // const handleShareLocation = () => {
  //   if (userLocation) {
  //     setSharedLocations(userLocation);
  //     console.warn(userLocation);
  //     fetchAddress(userLocation["latitude"], userLocation["longitude"]);
  //   }
  // };

  const checkValidity = async () => {
    const imageData = form.image;
    try {
      const formData = new FormData();
      formData.append("image", {
        uri: imageData.uri,
        type: "image/jpeg",
        name: "image.jpg",
      });

      const response = await fetch(`http://192.168.1.7:8000/api/handle-image`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("Failed to upload image");
      } else {
        const data = await response.json();
        setData(data.message);
        console.log(data.message.Scale);
        if (data.message.Scale === "small") {
          return false;
        } else {
          return true;
        }
      }
      ``;
    } catch (error) {
      console.error(error);
    }
  };

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/png", "image/jpg", "image/jpeg"],
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setform({
          ...form,
          image: result.assets[0],
        });
      }
    }
  };

  const submit = async () => {
    if (!form.title || !form.image || !form.description || !form.location) {
      return Alert.alert("Please fill in all fields");
    }

    form.category = value === 1 ? "waste" : "road";

    setUploading(true);

    try {
      const isValid = await checkValidity();
      console.log(isValid);
      if (!isValid) {
        return Alert.alert("Error", "we cannot consider this as a waste");
      }
      await createImage({
        ...form,
        status: false,
        final_category: data["Waste Type"],
        remark: data["Eco-Friendly Disposal"],
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

        <View className="border-sky-500">
          <Picker
            className="border-white"
            selectedValue={value}
            onValueChange={(itemValue) => setValue(itemValue)}
            style={{
              color: "white",
            }}
          >
            <Picker.Item
              label="Select a category"
              value="Select a category"
              className="text-white"
            />
            <Picker.Item label="Waste" value="1" className="text-white" />
            <Picker.Item label="Road" value="2" className="text-white" />
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
        {/* <View>
          <Button title="Share Location" onPress={handleShareLocation} />
        </View> */}

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
