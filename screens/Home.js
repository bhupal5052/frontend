import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../assets/colors/colors";
import styled from "styled-components/native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DefaultButton from "../components/button";

const Home = ({ navigation }) => {
  return (
    <ScreenContainer>
      <TouchableOpacity
        style={{ position: "absolute", top: 75, right: 50, padding: 5 }}
        onPress={() => navigation.navigate("Admin")}
      >
        <MaterialCommunityIcons name="account-key" size={36} />
      </TouchableOpacity>

      <Header>
        <Title>Emergency App</Title>
        <MaterialCommunityIcons name="ambulance" size={128} />
      </Header>

      <ButtonGroup>
        <DefaultButton onPress={() => navigation.navigate("Sign Up")}>
          Sign Up
        </DefaultButton>

        <DefaultButton onPress={() => navigation.navigate("Login")}>
          Sign In
        </DefaultButton>

        <DefaultButton
          onPress={() => navigation.navigate("Emergency Contacts")}
        >
          Emergency Contacts
        </DefaultButton>
      </ButtonGroup>
    </ScreenContainer>
  );
};

const ScreenContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 15px;
  background-color: #fff;
`;

const Header = styled.View`
  align-items: center;
`;

const Title = styled.Text`
  margin-bottom: 25px;
  color: #000;
  text-align: center;
  font-size: 36px;
  font-weight: 700;
`;

const ButtonGroup = styled.View`
  flex: 0.25;
  justify-content: space-between;
  position: absolute;
  bottom: 50px;
  left: 15px;
  right: 15px;
  height: 175px;
`;

export default Home;
