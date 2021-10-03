import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Formik } from "formik";
import * as yup from "yup";

import colors from "../assets/colors/colors";
import DefaultTextInput from "../components/textinput";
import DefaultButton from "../components/button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseUrl from "../assets/base_url";
const ValidationSchema = yup.object({
  contactName: yup.string().required("Please enter contact's name"),
  //   phoneNumber: yup
  //     .string()
  //     .required("Please enter your contact")
  //     .test("isValidContact", "Please enter a valid contact", (value) => {
  //       return parseInt(value) !== 10;
  //     }),
  primaryContact: yup
    .string()
    .required("Please enter your contact")
    .test("isValidContact", "Please enter a valid contact", (value) => {
      return parseInt(value) !== 10;
    }),
  secondaryContact: yup
    .string()
    .required("Please enter your contact")
    .test("isValidContact", "Please enter a valid contact", (value) => {
      return parseInt(value) !== 10;
    }),
  nearestHospital: yup.string().required("Please enter nearest hospital name"),
});

const HealthDetails = ({ navigation }) => {
  const getAuthToken = async (values) => {
    console.log("values", values);
    let params = JSON.stringify({
      hlocation: values.nearestHospital,
      contact_name: values.contactName,
      primary_contact: values.primaryContact,
      secondary_contact: values.secondaryContact,
    });

    const bearer = await AsyncStorage.getItem("id_token").then((res) => {
      return res;
    });

    fetch(`${baseUrl}/api/user/medicalRecord`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + bearer,
        "Content-Type": "application/json",
      },
      body: params,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == true) {
          console.log(data);
          AsyncStorage.getItem("id_token").then((res) => {
            if (res) {
              console.log("res", res);
              console.log("data", data.userId);
              navigation.navigate("Emergency Details Added Successful");
            } else {
              navigation.navigate("Login");
            }
          });
        } else {
          console.log("errr", data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .done();
  };
  return (
    <Container>
      <Appbar>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="arrow-left"
            size={48}
            color={colors.black}
            onPress={() => {
              navigation.navigate("Dashboard");
            }}
          />
        </TouchableOpacity>
      </Appbar>

      <Header>
        <Title>Emergency Details</Title>
        <MaterialCommunityIcons name="plus" size={96} color={colors.black} />
      </Header>

      <Form>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Formik
              validationSchema={ValidationSchema}
              initialValues={{
                contactName: "",
                // phoneNumber: "",
                primaryContact: "",
                secondaryContact: "",
                nearestHospital: "",
              }}
              onSubmit={(values) => {
                console.log("values", values);
                getAuthToken(values);
              }}
            >
              {({ handleChange, handleSubmit, values, touched, errors }) => (
                <View>
                  <ErrorMessage>
                    {touched.contactName && errors.contactName}
                  </ErrorMessage>
                  <DefaultTextInput
                    autoCapitalize="words"
                    saveState={handleChange("contactName")}
                    value={values.contactName}
                    placeholder="Contact Name"
                    maxLength={32}
                  />

                  {/* <ErrorMessage>
                    {touched.phoneNumber && errors.phoneNumber}
                  </ErrorMessage>
                  <DefaultTextInput
                    autoCapitalize="none"
                    saveState={handleChange("phoneNumber")}
                    value={values.phoneNumber}
                    placeholder="Phone Number"
                    keyboardType="numeric"
                    maxLength={10}
                  /> */}

                  <ErrorMessage>
                    {touched.primaryContact && errors.primaryContact}
                  </ErrorMessage>
                  <DefaultTextInput
                    autoCapitalize="none"
                    saveState={handleChange("primaryContact")}
                    value={values.primaryContact}
                    placeholder="Primary Contact"
                    keyboardType="numeric"
                    maxLength={10}
                  />

                  <ErrorMessage>
                    {touched.secondaryContact && errors.secondaryContact}
                  </ErrorMessage>
                  <DefaultTextInput
                    autoCapitalize="none"
                    saveState={handleChange("secondaryContact")}
                    value={values.secondaryContact}
                    placeholder="Secondary Contact"
                    keyboardType="numeric"
                    maxLength={10}
                  />

                  <ErrorMessage>
                    {touched.nearestHospital && errors.nearestHospital}
                  </ErrorMessage>
                  <DefaultTextInput
                    autoCapitalize="sentences"
                    saveState={handleChange("nearestHospital")}
                    value={values.nearestHospital}
                    placeholder="Nearest Hospital"
                    maxLength={96}
                  />

                  <DefaultButton onPress={handleSubmit}>Submit</DefaultButton>
                </View>
              )}
            </Formik>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Form>
    </Container>
  );
};

const Container = styled.ScrollView`
  flex: 1;
  padding: 0 15px;
`;

const Appbar = styled.View`
  position: absolute;
  top: 50px;
  left: 15px;
  padding: 25px 0;
`;

const Header = styled.View`
  margin-top: 100px;
  padding: 50px 0;
  height: 25%;
  align-items: center;
  justify-content: space-evenly;
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: 700;
  text-align: center;
`;

const Form = styled.View`
  height: 100%;
`;

const ErrorMessage = styled.Text`
  margin-bottom: 5px;
  margin-left: 25px;
  color: red;
  font-size: 14px;
`;

export default HealthDetails;
