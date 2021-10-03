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
  Alert,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import colors from "../../../assets/colors/colors";
import DefaultTextInput from "../../../components/textinput";
import DefaultButton from "../../../components/button";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChangeUsername = ({ navigation }) => {
  const [oldUsername, setOldUsername] = useState();
  const [newUsername, setNewUsername] = useState();
  const [confirmUsername, setConfirmUsername] = useState();

  const [error, setError] = useState({
    oldUsernameError: "",
    newUsernameError: "",
    confirmUsernameError: "",
  });

  const handleSubmit = () => {
    if (!oldUsername || oldUsername.length < 3) {
      setError((prev) => {
        return {
          ...prev,
          oldUsernameError: "Please enter a valid username",
        };
      });
    }

    if (!newUsername || newUsername.length < 3) {
      setError((prev) => {
        return {
          ...prev,
          newUsernameError: "Please enter a valid username",
        };
      });
    }

    if (!confirmUsername || confirmUsername.length < 3) {
      setError((prev) => {
        return {
          ...prev,
          confirmUsernameError: "Please enter a valid username",
        };
      });
    }

    if (confirmUsername !== newUsername) {
      setError((prev) => {
        return {
          ...prev,
          confirmUsernameError:
            "New Username and Confirm Username does not match",
        };
      });
    }

    console.log(error);

    if (
      error.oldUsernameError == null &&
      error.newUsernameError == null &&
      error.confirmUsernameError == null
    ) {
      console.log(error);
      (async () => {
        // console.log(hi);
        const bearer = await AsyncStorage.getItem("id_token").then((res) => {
          return res;
        });
        console.log("Hiiii");
        const params = JSON.stringify({
          username: newUsername,
        });

        fetch("http://192.168.1.124:3000/api/user/ChangeUserName", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + bearer,
            "Content-Type": "application/json",
          },
          body: params,
          //
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data.data);
            if (data.success == 1) {
              Alert.alert(data.message);
              navigation.navigate("Change Username Successful");
            } else {
              Alert.alert(data.message);
              navigation.navigate("Dashboard");
            }
            // useNewData(data.data);
          })
          .catch((err) => console.log(err));
      })();

      // navigation.navigate("Change Username Successful");
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
        <Title>Change Username</Title>
      </Appbar>

      <Form>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <ErrorMessage>{error.oldUsernameError}</ErrorMessage>
              <DefaultTextInput
                saveState={(text) => {
                  setOldUsername(text);

                  if (text !== "") {
                    setError((prev) => {
                      return { ...prev, oldUsernameError: null };
                    });
                  } else {
                    setError((prev) => {
                      return {
                        ...prev,
                        oldUsernameError: "This field is required.",
                      };
                    });
                  }
                }}
                value={oldUsername}
                placeholder="Old Username"
                maxLength={32}
                keyboardType="default"
              />

              <ErrorMessage>{error.newUsernameError}</ErrorMessage>
              <DefaultTextInput
                saveState={(text) => {
                  setNewUsername(text);

                  if (text !== "") {
                    setError((prev) => {
                      return { ...prev, newUsernameError: null };
                    });
                  } else {
                    setError((prev) => {
                      return {
                        ...prev,
                        newUsernameError: "This field is required.",
                      };
                    });
                  }
                }}
                value={newUsername}
                placeholder="New Username"
                maxLength={32}
                keyboardType="default"
              />

              <ErrorMessage>{error.confirmUsernameError}</ErrorMessage>
              <DefaultTextInput
                saveState={(text) => {
                  setConfirmUsername(text);

                  if (text !== "") {
                    setError((prev) => {
                      return { ...prev, confirmUsernameError: null };
                    });
                  } else {
                    setError((prev) => {
                      return {
                        ...prev,
                        confirmUsernameError: "This field is required.",
                      };
                    });
                  }
                }}
                value={confirmUsername}
                placeholder="Confirm Username"
                maxLength={32}
                keyboardType="default"
              />

              <DefaultButton onPress={handleSubmit}>Submit</DefaultButton>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Form>
    </Container>
  );
};

const Container = styled.View`
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
  justify-content: center;
  height: 100%;
`;

const ErrorMessage = styled.Text`
  margin-bottom: 5px;
  margin-left: 25px;
  color: red;
  font-size: 14px;
`;

export default ChangeUsername;
