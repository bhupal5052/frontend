import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DataTable } from "react-native-paper";
import styled from "styled-components/native";
import colors from "../../assets/colors/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { json } from "stream/consumers";
import baseUrl from "../../assets/base_url";
const UserDetails = ({ navigation }) => {
  const [setData, useNewData] = useState("");

  const tempUserData = [
    {
      key: 0,
      username: "someone",
      email: "someone@somehwere.com",
      contact: 1234567890,
      password: "password",
    },
    {
      key: 1,
      username: "another one",
      email: "another.one@somehwere.com",
      contact: 1234567890,
      password: "password",
    },
  ];
  useEffect(() => {
    (async () => {
      // console.log(hi);
      const bearer = await AsyncStorage.getItem("id_token").then((res) => {
        return res;
      });
      console.log("Hiiii");

      fetch(`${baseUrl}/api/admin/getUsers`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + bearer,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectUser: 1 }),
        //
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);
          useNewData(data.data);
        })
        .catch((err) => console.log(err));
    })();
  }, []);

  const UserDetailsRow = ({ username, email, contact, password, id }) => {
    return (
      <DataTable.Row>
        <DataTable.Cell>{username}</DataTable.Cell>
        <DataTable.Cell>{email}</DataTable.Cell>
        <DataTable.Cell numeric>{contact}</DataTable.Cell>
        <DataTable.Cell>{password}</DataTable.Cell>
        <DataTable.Cell>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("User Edit", { userId: id });
            }}
          >
            <MaterialCommunityIcons
              name="square-edit-outline"
              size={24}
              color={colors.black}
            />
          </TouchableOpacity>
        </DataTable.Cell>
      </DataTable.Row>
    );
  };

  return (
    <Container>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Username</DataTable.Title>
          <DataTable.Title>Email</DataTable.Title>
          <DataTable.Title>Contact</DataTable.Title>
          <DataTable.Title>Edit</DataTable.Title>
        </DataTable.Header>

        {setData
          ? setData.map((user) => (
              <UserDetailsRow
                key={user.id}
                username={user.name}
                email={user.email}
                contact={user.contact}
                id={user.id}
              />
            ))
          : null}
      </DataTable>
    </Container>
  );
};

const Container = styled.View``;

export default UserDetails;
