import React from "react";
import { Text, View } from "react-native";
import colors from "../assets/colors/colors";
import styled from "styled-components/native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import call from "react-native-phone-call";

import DefaultButton from "../components/button";

const EmergencyContact = ({ navigation }) => {
  return (
    <MainContainer>
      <ButtonGroup>
        <DefaultButton
          onPress={() => {
            call({ number: "1234567890", prompt: true }).catch(console.error);
          }}
        >
          123 456 7890
        </DefaultButton>

        <DefaultButton
          onPress={() => {
            call({ number: "1234567890", prompt: true }).catch(console.error);
          }}
        >
          123 456 7890
        </DefaultButton>

        <DefaultButton
          onPress={() => {
            call({ number: "1234567890", prompt: true }).catch(console.error);
          }}
        >
          123 456 7890
        </DefaultButton>
      </ButtonGroup>
    </MainContainer>
  );
};

const MainContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 15px;
`;
const ButtonGroup = styled.View`
  flex: 0.25;
  justify-content: space-between;
`;

export default EmergencyContact;
