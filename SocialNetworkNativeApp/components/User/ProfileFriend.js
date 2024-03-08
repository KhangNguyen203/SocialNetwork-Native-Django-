import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import MyContext from "../../configs/MyContext";
import PostProfile from "../Post/PostProfile";
import API, { endpoints } from "../../configs/API";
import Style from "./Style";
import MyStyles from "../../styles/MyStyles";

const ProfileFriend = ({ route }) => {
  const [userr, setUserr] = useState(null);
  const [user,] = useContext(MyContext);
  const [friendShip, setFriendShip] = useState(null);
  const { userID } = route.params;
  const [loadPage, setLoadPage] = useState(null);

  const loadFriendShip = async () => {
    try {
      let res = await API.get(endpoints["FriendShip"](user?.id, userID));
      setFriendShip(res.data);
    } catch (ex) {
      try {
        let res = await API.get(endpoints["FriendShip"](userID, user?.id));
        setFriendShip(res.data);
      } catch (ex) {
        console.log("No found!!");
        setFriendShip(null);
      }
    }
  };

  useEffect(() => {
    console.log("ProfileFriend ID user: " + userID);

    const loadUserOne = async () => {
      try {
        let res = await API.get(endpoints["users"](userID));
        setUserr(res.data);
      } catch (ex) {
        console.error(ex);
        setUserr(null);
      }
    };

    loadUserOne();
    loadFriendShip();
  }, [userID, user.id]);

  const addFriend = async () => {
    try {
      let reqData = {
        status: "0",
        user_one: user?.id,
        user_two: userID
      };

      let res = await API.post(endpoints.addFriendShip, reqData);
      console.log("Sented success!");

      // Load lại thông tin friendShip
      loadFriendShip();
    } catch (ex) {
      console.error(ex);
    }
  };

  const handleFriendShip = async () => {
    try {
      let reqData = {
        status: "1",
      };

      let res = await API.patch(endpoints["updateFriendShipPath"](friendShip?.id), reqData);
      console.log("Add success!");
      console.log(res.data);

      loadFriendShip();
    } catch (ex) {
      console.error(ex);
    }
  }

  const addCloudinaryDomain = (publicId) => {
    const cloudinaryDomain = `res.cloudinary.com/dvebfxho2/`;
    return `https://${cloudinaryDomain}${publicId}`;
  };

  return (
    <ScrollView>
      {userr === null ? <ActivityIndicator /> :
        <View style={Style.containerProfile}>
          <Image source={{ uri: userr.avatarCover }} style={Style.avatarCover} />
          <Image source={{ uri: addCloudinaryDomain(userr.avatar) }} style={Style.avatar} />
          <Text style={Style.username}>{userr.username}</Text>
          <Text style={Style.status}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>

          <View style={MyStyles.row}>
            {friendShip === null ?
              <TouchableOpacity style={Style.buttonGo} onPress={addFriend}>
                <Text style={Style.buttonTextGo}>Thêm bạn bè</Text>
              </TouchableOpacity>
              : (
                friendShip.status === "1" ?
                  <TouchableOpacity style={Style.buttonGo}>
                    <Text style={Style.buttonTextGo}>Bạn bè</Text>
                  </TouchableOpacity>
                  : friendShip.status === "0" ?
                    friendShip.user_one === user?.id? 
                    <TouchableOpacity style={Style.buttonGo}>
                      <Text style={Style.buttonTextGo}>Đã gửi lời mời kết bạn</Text>
                    </TouchableOpacity>: 

                      <TouchableOpacity style={Style.buttonGo} onPress={handleFriendShip}>
                        <Text style={Style.buttonTextGo}>Xác nhận</Text>
                      </TouchableOpacity>
    
                  : null
              )
            }

            <TouchableOpacity style={Style.buttonMess}>
              <Text style={Style.buttonTextMess}>Nhắn tin</Text>
            </TouchableOpacity>
          </View>

          <PostProfile userID={userID} />
        </View>
      }
    </ScrollView>
  );
};

export default ProfileFriend;