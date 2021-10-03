import React, { useState, useEffect } from "react";
import {
  TextInput,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
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
  contactNumber: yup
    .string()
    .required("Please enter a contact")
    .test("isValidContact", "Please enter a valid contact", (value) => {
      return parseInt(value) !== 10;
    }),
  insuranceNumber: yup.string().required("Please enter the insurance number"),
  bloodGroup: yup
    .string()
    .matches(/^(A|B|AB|O)[+-]$/i, "Please enter a valid blood group")
    .required("Please enter the blood group"),
});

const HealthDetails = ({ navigation }) => {
  const [DataLength, setDataLength] = useState("");
  const [getRefereshData, setRefereshData] = useState("");
  const getAuthToken = async (values) => {
    console.log("values", values);
    let params = JSON.stringify({
      blood_group: values.bloodGroup,
      insurance_number: values.insuranceNumber,
      contact_name: values.contactName,
      contact_number: values.contactNumber,
    });

    const bearer = await AsyncStorage.getItem("id_token").then((res) => {
      return res;
    });

    fetch(`${baseUrl}/api/user/emergency-details`, {
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
              navigation.navigate("Health Details Added Successful");
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
  useEffect(() => {
    (async () => {
      const bearer = await AsyncStorage.getItem("id_token").then((res) => {
        return res;
      });

      fetch("http://192.168.1.124:3000/api/user/emergency-details", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + bearer,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
        .then((res) => {
          res.json().then((data) => {
            console.log(data);
            if (data.success == 0) {
              setDataLength(data.success);
            } else {
              setRefereshData(data.data);
              setDataLength(data.success);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, []);

  const getUpdateData = async (values) => {
    const bearer = await AsyncStorage.getItem("id_token").then((res) => {
      return res;
    });
    console.log("values", values);
    fetch("http://192.168.1.124:3000/api/user/update_health_details", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        res.json().then((data) => {
          if (data.success == 1) {
            navigation.navigate("Health Details Added Successful");
          } else {
            navigation.navigate("Login");
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("DataLength", DataLength);
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
        <Title>Health Details</Title>
        <MaterialCommunityIcons
          name="ambulance"
          size={96}
          color={colors.black}
        />
      </Header>
      {DataLength == 1 ? (
        <Form>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <>
                <Formik
                  initialValues={{
                    name: getRefereshData.contact_name,
                    contact: getRefereshData.contact_number,
                    blood_group: getRefereshData.blood_group,
                    insurance_number: getRefereshData.insurance_number,
                  }}
                  enableReinitialize={true}
                  onSubmit={(values) => getUpdateData(values)}
                >
                  {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View>
                      <TextInput
                        placeholder="Enter Name"
                        onChangeText={handleChange("name")}
                        onBlur={handleBlur("name")}
                        value={values.name}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        style={styles.input}
                      />
                      <TextInput
                        placeholder="Enter Contact"
                        onChangeText={handleChange("contact_number")}
                        onBlur={handleBlur("contact_number")}
                        value={values.contact}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        style={styles.input}
                      />
                      <TextInput
                        placeholder="Enter Insurance Number"
                        onChangeText={handleChange("insurance_number")}
                        onBlur={handleBlur("insurance_number")}
                        value={values.insurance_number}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        style={styles.input}
                      />
                      <TextInput
                        placeholder="Enter Insurance Number"
                        onChangeText={handleChange("blood_group")}
                        onBlur={handleBlur("blood_group")}
                        value={values.blood_group}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        style={styles.input}
                      />

                      <DefaultButton onPress={handleSubmit}>
                        Update
                      </DefaultButton>
                    </View>
                  )}
                </Formik>
              </>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </Form>
      ) : (
        // Render Form If User has not Health Details
        <Form>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <>
                <Formik
                  validationSchema={ValidationSchema}
                  initialValues={{
                    contactName: "",
                    contactNumber: "",
                    insuranceNumber: "",
                    bloodGroup: "",
                  }}
                  onSubmit={(values) => {
                    getAuthToken(values);
                  }}
                >
                  {({
                    handleChange,
                    handleSubmit,
                    values,
                    touched,
                    errors,
                  }) => (
                    <View>
                      <ErrorMessage>
                        {touched.contactName && errors.contactName}
                      </ErrorMessage>

                      <DefaultTextInput
                        autoCapitalize="words"
                        saveState={handleChange("contactName")}
                        value={values.contactName}
                        placeholder="Contact Name"
                        keyboardType="default"
                        maxLength={32}
                      />

                      <ErrorMessage>
                        {touched.contactNumber && errors.contactNumber}
                      </ErrorMessage>
                      <DefaultTextInput
                        autoCapitalize="none"
                        saveState={handleChange("contactNumber")}
                        value={values.contactNumber}
                        placeholder="Contact Number"
                        keyboardType="numeric"
                        maxLength={10}
                      />

                      <ErrorMessage>
                        {touched.insuranceNumber && errors.insuranceNumber}
                      </ErrorMessage>
                      <DefaultTextInput
                        autoCapitalize="characters"
                        saveState={handleChange("insuranceNumber")}
                        value={values.insuranceNumber}
                        placeholder="Insurance Number"
                        maxLength={16}
                      />

                      <ErrorMessage>
                        {touched.bloodGroup && errors.bloodGroup}
                      </ErrorMessage>
                      <DefaultTextInput
                        autoCapitalize="characters"
                        saveState={handleChange("bloodGroup")}
                        value={values.bloodGroup}
                        placeholder="Blood Group"
                        maxLength={3}
                      />

                      <DefaultButton onPress={handleSubmit}>
                        Submit
                      </DefaultButton>
                    </View>
                  )}
                </Formik>
              </>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </Form>
      )}
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
  padding: 0 15px;
`;

const Appbar = styled.View`
  position: absolute;
  top: 50px;
  left: 25px;
  padding: 25px 0;
  height: 56px;
`;

const Header = styled.View`
  margin-top: 100px;
  padding: 50px 0;
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
