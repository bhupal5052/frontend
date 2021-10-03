import React from "react";
import { View, Text, Image } from "react-native";
import styled from "styled-components/native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DefaultButton from "../components/button";
import SignUpSuccessfulIllustration from "../assets/images/SignUpSuccessfulIllustration.png";

const SignUpSuccessful = ({ navigation }) => {
  return (
    <SignUpSuccessfulContainer>
      <Heading>User Sign Up Successful</Heading>
      <IllustrationContainer source={SignUpSuccessfulIllustration} />
      <ButtonContainer>
        <DefaultButton
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          Login
        </DefaultButton>
      </ButtonContainer>
    </SignUpSuccessfulContainer>
  );
};

const SignUpSuccessfulContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
`;

const Heading = styled.Text`
  font-size: 24px;
`;

const ButtonContainer = styled.View`
  width: 100%;
`;

const IllustrationContainer = styled.Image`
  margin: 100px 0;
`;

export default SignUpSuccessful;
