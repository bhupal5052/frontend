import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import colors from "../assets/colors/colors";

import styled from "styled-components/native";

const DefaultButton = ({ children, onPress }) => {
  return (
    <DefaultButtonContainer onPress={onPress}>
      <DefaultButtonText>{children}</DefaultButtonText>
    </DefaultButtonContainer>
  );
};

const DefaultButtonContainer = styled.TouchableOpacity`
  padding: 15px 15px;
  background-color: ${colors.primary};
  border-radius: 50px;
`;

const DefaultButtonText = styled.Text`
  font-size: 16px;
  color: ${colors.white};
  text-align: center;
  text-transform: uppercase;
`;

export default DefaultButton;
