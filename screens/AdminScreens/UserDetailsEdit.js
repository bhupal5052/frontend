import React, { useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  TextInput,
} from "react-native";
// import { TextInput } from "react-native-paper";
import styled from "styled-components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Formik } from "formik";
import * as yup from "yup";

import colors from "../../assets/colors/colors";
import DefaultTextInput from "../../components/textinput";
import DefaultButton from "../../components/button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseUrl from "../../assets/base_url";

const ValidationSchema = yup.object({
  name: yup.string().required("Please enter your name"),
  email: yup
    .string()
    .required("Please enter your email")
    .email("Please enter a valid email address"),
  contact: yup
    .string()
    .required("Please enter your contact")
    .test("isValidContact", "Please enter a valid contact", (value) => {
      return parseInt(value) !== 10;
    }),
});

const UserDetailsEdit = ({ route, navigation }) => {
  console.log(route);
  const [newData, setNewData] = React.useState("");
  useEffect(() => {
    (async () => {
      console.log("helllo");
      const bearer = await AsyncStorage.getItem("id_token").then((res) => {
        return res;
      });
      console.log("Hiiii", route.params.userId);

      fetch(`${baseUrl}/api/admin/getUser/${route.params.userId}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + bearer,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setNewData(data.data[0]);
        })
        .catch((err) => console.log(err));
    })();
  }, []);

  const getUpdateData = async (values) => {
    const bearer = await AsyncStorage.getItem("id_token").then((res) => {
      return res;
    });
    console.log("Hiiii", route.params.userId);
    const params = JSON.stringify(values);
    console.log("params", params);
    fetch(`${baseUrl}/api/admin/updateUser/${route.params.userId}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        contact: values.contact,
        email: values.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == 1) {
          navigation.navigate("User Detail Successful");
        }
      })
      .catch((err) => console.log(err));
  };

  //   console.log("newData", newData);
  return (
    <Container>
      <Appbar>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Admin Drawer");
          }}
        >
          <MaterialCommunityIcons name="menu" size={48} color={colors.black} />
        </TouchableOpacity>
      </Appbar>

      <Header>
        <Heading>Edit User Details</Heading>
        <MaterialCommunityIcons name="ambulance" size={64} />
      </Header>
      <Form>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
              <Formik
                initialValues={{
                  name: newData.name,
                  contact: newData.contact,
                  email: newData.email,
                }}
                enableReinitialize={true}
                onSubmit={(values) => getUpdateData(values)}
              >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                  <View>
                    {/* <DefaultTextInput
                      saveSate={handleChange("email")}
                      value={values.email}
                      placeholder="Enter Name"
                    /> */}
                    <TextInput
                      placeholder="Enter Name"
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      value={values.name}
                      inputContainerStyle={{ borderBottomWidth: 0 }}
                      style={styles.input}
                    />
                    <TextInput
                      placeholder="Enter Email"
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      inputContainerStyle={{ borderBottomWidth: 0 }}
                      style={styles.input}
                    />
                    <TextInput
                      placeholder="Enter contact"
                      onChangeText={handleChange("contact")}
                      onBlur={handleBlur("contact")}
                      value={values.contact}
                      inputContainerStyle={{ borderBottomWidth: 0 }}
                      style={styles.input}
                    />

                    <DefaultButton onPress={handleSubmit}>Update</DefaultButton>
                  </View>
                )}
              </Formik>
            </>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Form>
    </Container>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 3,
    borderColor: "#5B3030",
    height: 60,
    margin: 10,
    padding: 10,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
});

const Container = styled.ScrollView`
  flex: 1;
  padding: 50px 15px;
`;

const Appbar = styled.View`
  padding: 25px 0;
  width: 100%;
`;

const Header = styled.View`
  align-items: center;
  padding: 50px 0;
`;

const Heading = styled.Text`
  margin-bottom: 25px;
  font-size: 36px;
  font-weight: bold;
  text-align: center;
`;

const Form = styled.View`
  padding: 50px 0;
  width: 100%;
`;

const ErrorMessage = styled.Text`
  margin-bottom: 5px;
  margin-left: 25px;
  color: red;
  font-size: 14px;
`;

export default UserDetailsEdit;
