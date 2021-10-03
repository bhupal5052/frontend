import React, { useState, useRef } from "react";
import {
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";

import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Formik } from "formik";
import * as yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import DefaultTextInput from "../components/textinput";
import DefaultButton from "../components/button";
import LoginIllustration from "../assets/images/LoginIllustration.png";
import baseUrl from "../assets/base_url";

const ValidationSchema = yup.object({
  username: yup
    .string()
    .required("Please enter a username")
    .min(3, "Username should be atleast 3 characters long"),
  password: yup
    .string()
    .required("Please enter a password")
    .min(8, "Password should be atleast 8 characters long"),
});

const Login = ({ navigation }) => {
  const getAuthToken = async (values) => {
    console.log("API is runing");
    const expoPushToken = await Notifications.getExpoPushTokenAsync();
    let params = JSON.stringify({
      email: values.username,
      password: values.password,
      expoPushToken,
    });
    const onValueChange = async (item, selectedValue) => {
      try {
        await AsyncStorage.setItem(item, selectedValue);
      } catch (error) {
        console.log("AsyncStorage error: " + error.message);
      }
    };
    const url = `${baseUrl}/api/user/login`;
    console.log("url", url);
    fetch(`${baseUrl}/api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: params,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == true) {
          console.log("userId", data);
          onValueChange("id_token", data.token);
          AsyncStorage.getItem("id_token").then((res) => {
            if (res) {
              Alert.alert(data.message);
              navigation.push("Dashboard", data.userId);
            } else {
              navigation.navigate("Login");
            }
          });
        } else {
          Alert.alert(data.data);
        }
      })
      .catch((err) => {
        Alert.alert(err);
      })
      .done();
  };
  return (
    <Container>
      <Header>
        <Heading>Login to the Emergency App</Heading>
        <LoginIllustrationContainer source={LoginIllustration} />
      </Header>

      <LoginForm>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Formik
              validationSchema={ValidationSchema}
              initialValues={{
                username: "",
                password: "",
              }}
              onSubmit={(values) => {
                getAuthToken(values);
                // console.log(values);
                // navigation.navigate("Dashboard");
              }}
            >
              {({ handleChange, handleSubmit, values, touched, errors }) => (
                <View>
                  <ErrorMessage>
                    {touched.username && errors.username}
                  </ErrorMessage>

                  <DefaultTextInput
                    autoCapitalize="none"
                    saveState={handleChange("username")}
                    value={values.username}
                    placeholder="Username"
                    keyboardType="default"
                    maxLength={32}
                  />

                  <ErrorMessage>
                    {touched.password && errors.password}
                  </ErrorMessage>

                  <DefaultTextInput
                    autoCapitalize="none"
                    saveState={handleChange("password")}
                    value={values.password}
                    placeholder="Password"
                    maxLength={32}
                    secureTextEntry={true}
                  />

                  <DefaultButton onPress={handleSubmit}>Login</DefaultButton>
                </View>
              )}
            </Formik>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </LoginForm>
    </Container>
  );
};

const Container = styled.ScrollView`
  flex: 1;
  padding: 50px 15px;
`;

const Header = styled.View`
  align-items: center;
  padding: 50px 0;
`;

const Heading = styled.Text`
  font-size: 24px;
`;

const LoginIllustrationContainer = styled.Image`
  margin: 25px 0;
`;

const LoginForm = styled.View`
  padding: 50px 0;
  width: 100%;
`;

const ErrorMessage = styled.Text`
  margin-bottom: 5px;
  margin-left: 25px;
  color: red;
  font-size: 14px;
`;

export default Login;
