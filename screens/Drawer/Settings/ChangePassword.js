import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../../../assets/colors/colors";
import DefaultTextInput from "../../../components/textinput";
import DefaultButton from "../../../components/button";
import baseUrl from "../../../assets/base_url";

const ChangePassword = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const [error, setError] = useState({
    oldPasswordError: "",
    newPasswordError: "",
    confirmPasswordError: "",
  });

  const handleSubmit = () => {
    if (!oldPassword) {
      setError((prev) => {
        return {
          ...prev,
          oldPasswordError: "Please enter a valid password",
        };
      });
    }

    if (!newPassword) {
      setError((prev) => {
        return {
          ...prev,
          newPasswordError: "Please enter a valid password",
        };
      });
    }

    if (!confirmPassword) {
      setError((prev) => {
        return {
          ...prev,
          confirmPasswordError: "Please enter a valid password",
        };
      });
    }

    if (
      error.oldPasswordError == null &&
      error.newPasswordError == null &&
      error.confirmPasswordError == null
    ) {
      console.log(error);

      (async () => {
        var data = {
          oldPassword: oldPassword,
          NewPassword: newPassword,
          ConfirmPassword: confirmPassword,
        };

        const bearer = await AsyncStorage.getItem("id_token").then((res) => {
          return res;
        });
        console.log(data);
        fetch(`${baseUrl}/api/user/Change-password`, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + bearer,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success == true) {
              console.log(data);
              AsyncStorage.getItem("id_token").then((res) => {
                if (res) {
                  navigation.navigate("Change Password Successful");
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
          });

        console.log("data", data);
      })();
    }
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
              navigation.navigate("Drawer");
            }}
          />
        </TouchableOpacity>
        <Title>Change Password</Title>
      </Appbar>

      <Form>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <ErrorMessage>{error.oldPasswordError}</ErrorMessage>
              <DefaultTextInput
                saveState={(text) => {
                  setOldPassword(text);

                  if (text !== "") {
                    setError((prev) => {
                      return { ...prev, oldPasswordError: null };
                    });
                  } else {
                    setError((prev) => {
                      return {
                        ...prev,
                        oldPasswordError: "This field is required.",
                      };
                    });
                  }
                }}
                value={oldPassword}
                placeholder="Old Password"
                maxLength={32}
                keyboardType="default"
                secureTextEntry={true}
              />

              <ErrorMessage>{error.newPasswordError}</ErrorMessage>
              <DefaultTextInput
                saveState={(text) => {
                  setNewPassword(text);

                  if (text !== "") {
                    setError((prev) => {
                      return { ...prev, newPasswordError: null };
                    });
                  } else {
                    setError((prev) => {
                      return {
                        ...prev,
                        newPasswordError: "This field is required.",
                      };
                    });
                  }
                }}
                value={newPassword}
                placeholder="New Password"
                maxLength={32}
                keyboardType="default"
                secureTextEntry={true}
              />

              <ErrorMessage>{error.confirmPasswordError}</ErrorMessage>
              <DefaultTextInput
                saveState={(text) => {
                  setConfirmPassword(text);

                  if (text !== "") {
                    setError((prev) => {
                      return { ...prev, confirmPasswordError: null };
                    });
                  } else {
                    setError((prev) => {
                      return {
                        ...prev,
                        confirmPasswordError: "This field is required.",
                      };
                    });
                  }
                }}
                value={confirmPassword}
                placeholder="Confirm Password"
                maxLength={32}
                keyboardType="default"
                secureTextEntry={true}
              />

              <DefaultButton onPress={handleSubmit}>Submit</DefaultButton>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Form>
    </Container>
  );
};

const Container = styled.ScrollView`
  flex: 1;
  padding: 50px 15px 0 15px;
`;

const Appbar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 56px;
  padding: 0 25px;
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: 700;
  text-align: right;
`;

const Form = styled.View`
  flex: 1;
  justify-content: center;
  margin-top: 150px;
  height: 100%;
`;

const ErrorMessage = styled.Text`
  margin-bottom: 5px;
  margin-left: 25px;
  color: red;
  font-size: 14px;
`;

export default ChangePassword;
