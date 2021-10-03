import React from "react";
import { View, Text } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import colors from "../../assets/colors/colors";
import DefaultButton from "../../components/button";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Admin = ({ navigation }) => {
  return (
    <Container>
      <Title>Admin Panel</Title>
      <MaterialCommunityIcons name="ambulance" size={128} />
      <ButtonContainer>
        <DefaultButton onPress={() => navigation.navigate("Admin Login")}>
          Sign In
        </DefaultButton>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  width: 100%;
`;

const Title = styled.Text`
  margin-bottom: 25px;
  font-size: 36px;
  font-weight: bold;
  text-align: center;
`;

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 50px;
  width: 100%;
`;

export default Admin;
