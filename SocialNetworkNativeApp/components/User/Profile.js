import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import MyContext from "../../configs/MyContext";
import { LocalHostContext } from "../../App";
import PostProfile from "../Post/PostProfile";
import Style from "./Style";
import MyStyles from "../../styles/MyStyles";

const Profile = () => {
  const [user,] = useContext(MyContext);
  const LocalHost = useContext(LocalHostContext)

  const addCloudinaryDomain = (publicId) => {
    const cloudinaryDomain = `res.cloudinary.com/dvebfxho2/`;
    return `https://${cloudinaryDomain}${publicId}`;
  };


  return (
    <View>
      <ScrollView>
          <View style={Style.containerProfile}>
            <Image source={{ uri: LocalHost + user.avatarCover }} style={Style.avatarCover} />
            <Image source={{ uri: addCloudinaryDomain(user.avatar) }} style={Style.avatar} />
            <Text style={Style.username}>{user.username}</Text>
            <Text style={Style.status}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
            
            <PostProfile userID={user.id}/>
          </View>
      </ScrollView>
    </View>
  );
};

export default Profile;