import React from "react";
import { View, Text } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import Card from "../../../components/card";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AdminSettings = ({ navigation }) => {
  return (
    <Container>
      <Card
        title="Change Password"
        onPress={() => {
          navigation.navigate("Change Admin Password");
        }}
        icon="account-key"
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 50px 15px;
`;

export default AdminSettings;
