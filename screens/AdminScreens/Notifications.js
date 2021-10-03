import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseUrl from "../../assets/base_url";

const UserNotification = ({ userProfilePicture, User, NotificationMsg }) => {
  return (
    <Card>
      <UserProfilePicture>
        {!userProfilePicture && (
          <MaterialCommunityIcons
            name="account-circle"
            size={48}
            color="white"
          />
        )}
      </UserProfilePicture>
      <NotificationInfo>
        <UserName>{User}</UserName>
        <NotificationMessage>{NotificationMsg}</NotificationMessage>
      </NotificationInfo>
    </Card>
  );
};

const Notifications = ({ navigation }) => {
  const [newLogData, setNewLogData] = useState("");
  useEffect(() => {
    (async () => {
      console.log("hi");
      const bearer = await AsyncStorage.getItem("id_token").then((res) => {
        return res;
      });
      fetch(`${baseUrl}/api/admin/show-notifications`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + bearer,
          "Content-Type": "application/json",
        },
      }).then((res) => {
        res.json().then((data) => {
          setNewLogData(data.data);
        });
      });
    })();
  }, []);
  return (
    <Container>
      {Object.values(newLogData).map((res) => {
        {
          return (
            <UserNotification
              key="{res.name}"
              User={res.name}
              NotificationMsg="Incident Reported!"
            />
          );
        }
      })}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 25px 15px;
`;

const Card = styled.View`
  flex-direction: row;
  margin-bottom: 25px;
  padding: 25px 15px;
  background-color: gray;
  border-radius: 5px;
`;
const UserProfilePicture = styled.View`
  justify-content: center;
  align-items: center;
`;

const NotificationInfo = styled.View`
  justify-content: center;
  padding: 0 15px;
`;

const UserName = styled.Text`
  font-size: 24px;
  color: white;
`;

const NotificationMessage = styled.Text`
  font-size: 16px;
  color: white;
`;

export default Notifications;
