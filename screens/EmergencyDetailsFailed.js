import React from "react";
import { View, Text } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DefaultButton from "../components/button";

const EmergencyDetailsFailed = ({ navigation }) => {
  return (
    <Container>
      <Title>Your emergency details failed to upload</Title>
      <MaterialCommunityIcons
        name="exclamation-thick"
        size={96}
        color="red"
        style={{ marginVertical: 50 }}
      />
      <DefaultButton
        onPress={() => {
          navigation.navigate("Dashboard");
        }}
      >
        Try Again
      </DefaultButton>
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
  font-size: 32px;
  text-align: center;
`;

export default EmergencyDetailsFailed;
