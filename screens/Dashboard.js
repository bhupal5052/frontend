import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../assets/colors/colors";
import DefaultButton from "../components/button";
import * as Notifications from "expo-notifications";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Card from "../components/card";
import Constants from "expo-constants";
import registerDevicePushTokenAsync from "./notification";
import baseUrl from "../assets/base_url";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
const Dashboard = ({ navigation }) => {
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    (async () => {
      const bearer = await AsyncStorage.getItem("id_token").then((res) => {
        return res;
      });
      console.log("bearer", bearer);
      fetch(`${baseUrl}/api/user/send-notifications`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + bearer,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
        //
      });
    })();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    // setReportIncident();
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  // Notifications.getExpoPushTokenAsync();
  const setReportIncident = async () => {
    const bearer = await AsyncStorage.getItem("id_token").then((res) => {
      return res;
    });
    const parmas = JSON.stringify({
      status: 1,
    });
    console.log("hi");
    fetch(`${baseUrl}/api/user/setStatusReport`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + bearer,
        "Content-Type": "application/json",
      },
      body: parmas,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success == 1) {
          navigation.navigate("Incident Reported");
        } else {
          navigation.navigate("Dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <DashboardContainer>
      <Appbar>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Drawer");
          }}
        >
          <MaterialCommunityIcons name="menu" size={48} color={colors.black} />
        </TouchableOpacity>
      </Appbar>
      <Header>
        <Title>Welcome</Title>
        <MaterialCommunityIcons
          name="ambulance"
          size={96}
          color={colors.black}
        />
      </Header>
      <CardContainer>
        <Card
          title="Report Incident"
          subtitle="Use camera to report incident."
          icon="camera"
          onPress={() => {
            navigation.navigate("Camera Application");
          }}
        />

        <Card
          title="Upload Location"
          subtitle="Upload location to report incident."
          icon="near-me"
          onPress={() => {
            navigation.navigate("User Location");
          }}
        />

        <Card
          title="Health Details"
          subtitle="Upload Health Details."
          icon="heart"
          onPress={() => {
            navigation.navigate("Health Details");
          }}
        />

        <Card
          title="Emergency Details"
          subtitle="Provide Details of Emergency."
          icon="ambulance"
          onPress={() => {
            navigation.navigate("Emergency Details");
          }}
        />

        <DefaultButton
          onPress={() => {
            setReportIncident();
            // navigation.navigate("Incident Reported");
          }}
        >
          Submit
        </DefaultButton>
      </CardContainer>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.View`
  flex: 1;
  padding: 25px 15px;
`;

const Appbar = styled.View`
  position: absolute;
  top: 75px;
  left: 25px;
  /* padding: 25px 0; */
  height: 56px;
  z-index: 9999;
`;

const Header = styled.View`
  margin-top: 50px;
  height: 25%;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: 700;
  text-align: center;
`;

const CardContainer = styled.View`
  height: 65%;
  justify-content: space-evenly;
`;

export default Dashboard;
