/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from "react";
import { Text, View, Modal, StyleSheet, Image } from "react-native";
import { Button, CardSection } from "../index";
import {styles} from './MovieInfoModalStyle';

const MovieInfoModal = ({
  children,
  visible,
  onUpdate,
  onClose,
  movieIn,
}) => {
  const {
    containerStyle,
    leftTextStyle,
    rightTextStyle,
    cardSectionStyle,
    avatarImage,
    avatar,
  } = styles;
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => {}}
    >
      <View style={containerStyle}>
        <CardSection style={cardSectionStyle}>
          <View style={avatar}>
              <Image source={{ uri: `https://image.tmdb.org/t/p/w500${children.poster_path}` }} style={avatarImage} />
          </View>
        </CardSection>
        <CardSection style={cardSectionStyle}>
          <Text style={leftTextStyle}>Movie: {children.title}</Text>
        </CardSection>
        <CardSection style={cardSectionStyle}>
          <Text style={leftTextStyle}>Popularity: {children.popularity}</Text>
          <Text style={rightTextStyle}>Vote Average: {children.vote_average}</Text>
        </CardSection>
        <CardSection style={cardSectionStyle}>
          <Text style={leftTextStyle}>{children.overview}</Text>
        </CardSection>
        <CardSection style={cardSectionStyle}>
          <Button onPress={onUpdate}>{movieIn ? "Add" : "Delete"}</Button>
          <Button onPress={onClose}>Close</Button>
        </CardSection>
      </View>
    </Modal>
  );
};

export { MovieInfoModal };