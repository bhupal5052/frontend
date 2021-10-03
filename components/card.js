import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../assets/colors/colors";

const Card = ({ title, subtitle, icon, onPress }) => {
  return (
    <CardContainer onPress={onPress}>
      <Left>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </Left>

      <Right>
        <IconContainer>
          <MaterialCommunityIcons name={icon} size={48} color={colors.white} />
        </IconContainer>
      </Right>
    </CardContainer>
  );
};

const CardContainer = styled.TouchableOpacity`
  flex-direction: row;
  padding: 25px 15px;
  width: 100%;
  background-color: ${colors.primary};
  border-radius: 10px;
`;

const Left = styled.View`
  width: 75%;
`;

const Title = styled.Text`
  font-size: 24px;
  color: ${colors.white};
`;

const Subtitle = styled.Text`
  font-size: 16px;
  color: ${colors.white};
`;

const Right = styled.View`
  width: 25%;
`;

const IconContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default Card;
