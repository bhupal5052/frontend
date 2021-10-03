import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Formik } from "formik";
import * as yup from "yup";

import DefaultTextInput from "../components/textinput";
import DefaultButton from "../components/button";

const ValidationSchema = yup.object({
  username: yup
    .string()
    .required("Please enter a username")
    .min(3, "Username should be atleast 3 characters long"),
  email: yup
    .string()
    .required("Please enter your email")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Please enter a password")
    .min(8, "Password should be atleast 8 characters long"),
  contact: yup
    .string()
    .required("Please enter your contact")
    .test("isValidContact", "Please enter a valid contact", (value) => {
      return parseInt(value) !== 10;
    }),
});

const SignUp = ({ navigation }) => {
  return (
    <Container>
      <Header>
        <Heading>Sign Up to the Emergency App</Heading>
        <MaterialCommunityIcons name="ambulance" size={72} />
      </Header>
      <SignUpForm>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Formik
              validationSchema={ValidationSchema}
              initialValues={{
                username: "",
                email: "",
                password: "",
                contact: "",
              }}
              onSubmit={(values) => {
                navigation.push("Image Picker Screen", values);
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
                    maxLength={32}
                  />

                  <ErrorMessage>{touched.email && errors.email}</ErrorMessage>
                  <DefaultTextInput
                    autoCapitalize="none"
                    saveState={handleChange("email")}
                    value={values.email}
                    placeholder="email"
                    keyboardType="email-address"
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

                  <ErrorMessage>
                    {touched.contact && errors.contact}
                  </ErrorMessage>
                  <DefaultTextInput
                    autoCapitalize="none"
                    saveState={handleChange("contact")}
                    value={values.contact}
                    placeholder="contact"
                    keyboardType="numeric"
                    maxLength={10}
                  />
                  <DefaultButton onPress={handleSubmit}>Sign Up</DefaultButton>
                </View>
              )}
            </Formik>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SignUpForm>
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
  margin-bottom: 25px;
  font-size: 28px;
  text-align: center;
`;

const SignUpForm = styled.View`
  padding: 50px 0;
  width: 100%;
`;

const ErrorMessage = styled.Text`
  margin-bottom: 5px;
  margin-left: 25px;
  color: red;
  font-size: 14px;
`;

export default SignUp;
