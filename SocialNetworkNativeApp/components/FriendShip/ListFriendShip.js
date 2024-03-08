import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import MyStyles from "../../styles/MyStyles";
import API, { endpoints } from "../../configs/API";
import Style from "./Style";
import MyContext from "../../configs/MyContext";

const ListFriendShip = ({ navigation }) => {
  const [listUser, setListUser] = useState(null);
  const [user] = useContext(MyContext);

  useEffect(() => {
    const loadListUser = async () => {
      try {
        let res = await API.get(endpoints["listUsers"]);
        setListUser(res.data.results);
      } catch (ex) {
        console.error(ex);
      }
    };

    loadListUser();
  }, []);

  const goToProfile = (userID) => {
    navigation.navigate("ProfileFriend", { userID });
  };

  const addCloudinaryDomain = (publicId) => {
    const cloudinaryDomain = `res.cloudinary.com/dvebfxho2/`;
    return `https://${cloudinaryDomain}${publicId}`;
  };

  return (
    <View>
      <Text style={Style.subject}>Những người bạn có thể biết</Text>

      {listUser === null ? (
        <ActivityIndicator />
      ) : (
        <>
          <ScrollView style={{marginBottom: 40}}>
            {listUser.map((c) => (
              c.id !== user.id && (
                <TouchableOpacity key={c.id} onPress={() => goToProfile(c.id)}>
                  <View style={Style.row}>
                    <Image source={{ uri: addCloudinaryDomain(c.avatar) }} style={Style.avatar} />
                    <View style={Style.location}>
                      <Text style={[MyStyles.m_10, MyStyles.title]}>{c.username}</Text>

                      <View style={MyStyles.row}>
                        <TouchableOpacity style={Style.button}>
                          <Text style={Style.buttonText}>Thêm bạn bè</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={Style.buttonGo}>
                          <Text style={Style.buttonTextGo}>Gỡ</Text>
                        </TouchableOpacity>
                      </View>
                      
                    </View>
                  </View>
                </TouchableOpacity>
              )
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default ListFriendShip;