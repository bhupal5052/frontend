import React, { useState, useEffect, useRef } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";

import MapView from "react-native-maps";
import * as Location from "expo-location";

import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import colors from "../assets/colors/colors";

const UserLocation = ({ navigation }) => {
  const [region, setRegion] = useState(null);
  const [search, setSearch] = useState();
  const [error, setErrorMsg] = useState();
  const _map = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      } else {
        return true;
      }

      let location = await Location.getLastKnownPositionAsync({
        accuracy: 6,
      });

      let region = {
        latitude: parseInt(location.coords.latitude),
        longitude: parseInt(location.coords.longitude),
        latitudeDelta: 0.045,
        longitudeDelta: 0.045,
      };

      return () => {
        setRegion({ region: region });
      };
    })();
  });

  return (
    <Container>
      <Input
        onChangeText={(text) => setSearch(text)}
        value={search}
        placeholder="Search..."
      />
      <MapView
        // initialRegion={region}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}
        userLocationAnnotationTitle="Your Location"
        showCompass={true}
        rotateEnabled={false}
        loadingEnabled={true}
        ref={_map}
        style={{ width: "100%", height: "100%" }}
        onUserLocationChange={(event) => {
          setRegion({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
          });
        }}
      />
      <SelectLocation
        onPress={() => {
          console.log(region);
          navigation.navigate("User Location Successful");
        }}
      >
        <MaterialIcons name="send" size={24} color="black" />
      </SelectLocation>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const Input = styled.TextInput`
  padding: 15px 25px;
  background-color: white;
  color: black;
  position: absolute;
  top: 100px;
  left: 15px;
  right: 15px;
  border-radius: 5px;
  z-index: 999;
`;

const SelectLocation = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding: 15px;
  position: absolute;
  bottom: 48px;
  right: 48px;
  background-color: white;
  border-radius: 50px;
  z-index: 999;
  transform: rotate(-45deg);
`;

export default UserLocation;
