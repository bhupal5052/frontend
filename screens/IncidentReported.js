import React from "react";
import { View, Text } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DefaultButton from "../components/button";

const IncidentReported = ({ navigation }) => {
  return (
    <Container>
      <Title>Incident has been reported!</Title>
      <MaterialCommunityIcons
        name="check-circle"
        size={96}
        color="green"
        style={{ marginVertical: 50 }}
      />
      <DefaultButton
        onPress={() => {
          navigation.navigate("Dashboard");
        }}
      >
        Back to Dashboard
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

export default IncidentReported;
