import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Button,
  TextInput,
} from "react-native";

import styled from "styled-components/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Formik } from "formik";
import * as yup from "yup";

import DefaultTextInput from "../components/textinput";
import DefaultButton from "../components/button";

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

const InputUserDetails = ({ route, navigation }) => {
  // const capturedImage = route.params.capturedImage.uri;
  // console.log(capturedImage);

  const getAuthToken = () => {
    navigation.navigate("Input User Detail Successful");
  };
  console.log(route);
  return (
    <Container>
      <Header>
        <Heading>User Details</Heading>
      </Header>
      <Form>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <TextInput
                placeholder="Enter Name"
                value={route.params.Name}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                style={styles.input}
              />
              <TextInput
                placeholder="Enter Email"
                value={route.params.Email}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                style={styles.input}
              />
              <TextInput
                placeholder="Enter contact"
                value={route.params.Contact}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                style={styles.input}
              />
              <TextInput
                placeholder="Enter Gender"
                value={route.params.Gender}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                style={styles.input}
              />
              <TextInput
                placeholder="Enter Age"
                value={JSON.stringify(route.params.Age)}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                style={styles.input}
              />
              <DefaultButton onPress={getAuthToken}>Submit</DefaultButton>
            </View>
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

const Header = styled.View`
  align-items: center;
  padding: 50px 0;
`;

const Heading = styled.Text`
  margin-bottom: 25px;
  font-size: 28px;
  text-align: center;
`;

const SelectedImage = styled.Text`
  margin: 25px;
  font-size: 14px;
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

export default InputUserDetails;
