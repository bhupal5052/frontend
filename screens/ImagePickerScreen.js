import React, { useState, useEffect } from "react";
import { View, Text, Image, Button } from "react-native";

import styled from "styled-components/native";
import * as ImagePicker from "expo-image-picker";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DefaultButton from "../components/button";
import baseUrl from "../assets/base_url";
const ImagePickerScreen = ({ route, navigation }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    console.log("result", result);
    console.log("params", route.params);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const getAuthToken = () => {
    const form = new FormData();
    console.log("route", route.params);
    var type = image.substr(image.lastIndexOf(".") + 1);
    var string = "";
    if (type == "jpg") {
      string = `image/${type}`;
    } else {
      string = `image/png`;
    }
    form.append("photo", {
      name: image.substr(image.lastIndexOf("/") + 1),
      type: string,
      uri: Platform.OS === "ios" ? image.replace("file://", "") : image,
    });
    form.append("username", route.params.username);
    form.append("email", route.params.email);
    form.append("password", route.params.password);
    form.append("contact", route.params.contact);
    fetch(`${baseUrl}/api/user/`, {
      method: "POST",
      body: form,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == "1") {
          navigation.navigate("Sign Up Successful");
        } else {
          navigation.navigate("Sign Up");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container>
      <Title>Almost there...</Title>
      {!image && (
        <View>
          <DefaultButton onPress={pickImage}>
            Pick an image from camera roll
          </DefaultButton>
        </View>
      )}

      {image && (
        <ImagePreviewContainer>
          <ImagePreview source={{ uri: image }} />
          <View style={{ marginTop: 50 }}>
            <DefaultButton
              onPress={() => {
                getAuthToken();
                // navigation.navigate("Sign Up Successful");
              }}
            >
              Next
            </DefaultButton>
          </View>
        </ImagePreviewContainer>
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
`;

const Title = styled.Text`
  margin-bottom: 50px;
  font-size: 32px;
  text-align: center;
`;

const ImagePreviewContainer = styled.View`
  width: 75%;
  height: 50%;
`;

const ImagePreview = styled.Image`
  width: 100%;
  height: 75%;
`;

export default ImagePickerScreen;
