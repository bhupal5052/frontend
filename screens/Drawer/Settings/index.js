import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import colors from "../../../assets/colors/colors";
import Card from "../../../components/card";

const Drawer = ({ navigation }) => {
  return (
    <Container>
      <Appbar>
        <Title>Settings</Title>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Dashboard");
          }}
        >
          <MaterialCommunityIcons name="close" size={48} color={colors.black} />
        </TouchableOpacity>
      </Appbar>

      <CardContainer>
        <Card
          title="Change Username"
          onPress={() => {
            navigation.navigate("Change Username");
          }}
        />

        <Card
          title="Change Password"
          onPress={() => {
            navigation.navigate("Change Password");
          }}
        />

        <Card
          title="Update Contact Number"
          onPress={() => {
            navigation.navigate("Change Contact");
          }}
        />
      </CardContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 50px 15px;
`;

const Appbar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 56px;
  padding: 0 25px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

const CardContainer = styled.View`
  justify-content: space-evenly;
  height: 50%;
`;

export default Drawer;
