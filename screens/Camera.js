import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../assets/colors/colors";

import { Camera } from "expo-camera";
import CameraPreview from "../components/CameraPreview";
import * as ImageManipulator from "expo-image-manipulator";
import baseUrl from "../assets/base_url";

const CameraApplication = ({ navigation, navigation: { goBack } }) => {
  const _camera = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraType, setCameraType] = React.useState(
    Camera.Constants.Type.back
  );

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const __takePicture = async () => {
    if (!_camera) return null;
    const photo = await _camera.current.takePictureAsync();
    setPreviewVisible(true);
    setCapturedImage(photo);
    console.log(capturedImage);
  };

  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
  };

  const __switchCamera = () => {
    if (cameraType === "front") {
      setCameraType("back");
    } else {
      setCameraType("front");
    }
  };
  const getmatchImage = async () => {
    const saveOptions = {
      base64: true,
    };
    const actions = [{ resize: { width: 250, height: 250 } }];
    const img = await ImageManipulator.manipulateAsync(
      capturedImage.uri,
      actions,
      saveOptions
    );
    var file = "data:image/png;base64," + img.base64 !== "" ? img.base64 : "";
    await fetch(`${baseUrl}/api/user/detect-face`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ file }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        console.log("check", data.message);
        if (data.success == 1) {
          navigation.navigate("Camera Successful", data.message);
        } else {
          Alert.alert(data.message);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <Container>
      {previewVisible && capturedImage ? (
        <ImageBackground
          source={{ uri: capturedImage && capturedImage.uri }}
          style={{
            flex: 1,
          }}
        >
          <BottomContainer>
            <BottomButton onPress={__retakePicture}>
              <MaterialCommunityIcons
                name="keyboard-backspace"
                size={36}
                color={colors.white}
              />
            </BottomButton>

            <BottomButton
              onPress={() => {
                console.log(capturedImage);
                getmatchImage();
                // navigation.navigate("Camera Successful", { capturedImage });
              }}
            >
              <MaterialIcons name="save-alt" size={36} color="white" />
            </BottomButton>
          </BottomContainer>
        </ImageBackground>
      ) : (
        <Camera
          style={{ flex: 1, width: "100%" }}
          ref={_camera}
          type={cameraType}
          ratio="16:9"
        >
          <BottomContainer>
            <BottomButton onPress={() => goBack()}>
              <MaterialCommunityIcons
                name="keyboard-backspace"
                size={36}
                color={colors.white}
              />
            </BottomButton>

            <BottomButton onPress={__takePicture}>
              <MaterialCommunityIcons
                name="checkbox-blank-circle"
                size={72}
                color={colors.white}
              />
            </BottomButton>

            <BottomButton onPress={__switchCamera}>
              <MaterialCommunityIcons
                name="camera-switch"
                size={36}
                color={colors.white}
              />
            </BottomButton>
          </BottomContainer>
        </Camera>
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const SideContainer = styled.TouchableOpacity`
  position: absolute;
  top: 150px;
  right: 50px;
`;

const BottomContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  z-index: 999;
`;

const BottomButton = styled.TouchableOpacity`
  padding: 10px 15px;
  background-color: transparent;
  border-radius: 5px;
`;

export default CameraApplication;
