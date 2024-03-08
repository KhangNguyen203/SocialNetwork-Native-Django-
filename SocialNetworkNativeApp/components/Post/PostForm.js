import React, { useContext, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import MyContext from "../../configs/MyContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API, { endpoints } from "../../configs/API";
import Style from './Style';
import MyStyles from '../../styles/MyStyles';


const PostForm = () => {
  const [content, setContent] = useState('');
  const [user,] = useContext(MyContext);
  // const [id, setId] = useState("1");
  const [post, setPost] = useState(null);
  // const [imgPost, setImgPost] = useState({
  //   "image": "",
  //   "post": post.id,
  // });

  const addPost = async () => { 
    try {
      let reqData = {
        "title": "",
        "content": content,
        "user": user.id, 
        "active": 1,
      };
      data = Object.keys(reqData)
        .map(function (key) {
          return encodeURIComponent(key) + '=' + encodeURIComponent(reqData[key]);
        })
        .join('&');
  
      let res = await API.post(endpoints['posts'], data);
      // setId(res.data.id);
      setContent("");
      
    } catch (ex) {
      console.error(ex);
    }
  };

  // const getPost = async()=>{
  //   try {
  //     let res = await API.get(endpoints['getPostByID'](id));
  //     setPost(res.data);
  //   } catch (ex) {
  //     console.error(ex);
  //   }
  // }

  // const register = async () => {
  //   const form = new FormData();
  //   for (let key in imgPost)
  //           if (key === 'image') {
  //               form.append(key, {
  //                   uri: imgPost[key].uri,
  //                   name: imgPost[key].fileName,
  //                   type: "image/jpeg"
  //               })
  //           } else
  //               form.append(key, imgPost[key]);

  //   try {
  //       let res = await API.post(endpoints['add_image'], form, {
  //           headers: {
  //               'Content-Type': 'multipart/form-data'
  //           }
  //       });
  //       console.info(res.data);
  //       // navigation.navigate("Login");
  //   } catch (ex) {
  //       console.error(ex);
  //   }
  // };

  // const upImage = async () => {
  //   getPost(); 
  //   post === null ? console.error("No found post") : 
  //     register();
  // }

  // const picker = async () => {
  //   let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
  //   if (status !== 'granted') {
  //       alert("Permission Denied!");
  //   } else {
  //       let res = await ImagePicker.launchImageLibraryAsync();
  //       if (!res.canceled) {
  //           change("image", res.assets[0]);
  //           console.log(imgPost);
  //       }
  //   }
  // };

  // const change = (field, value) => {
  //   setImgPost(current => {
  //       return {...current, [field]: value};
  //   });
  // };


  return (
    <View style={Style.form_container}>
      <TextInput
        style={Style.input}
        placeholder="Nội dung"
        value={content}
        onChangeText={text => setContent(text)}
      />

      <TouchableOpacity style={MyStyles.row}>
        <Image style={Style.image} source={{uri: "https://icons.veryicon.com/png/o/miscellaneous/flat-color-icons/add_image-3.png"}} />
        <Text style={Style.position_text_5}>Thêm hình...</Text>
      </TouchableOpacity>
      
      <Button title="Đăng bài" onPress={addPost} />

    </View>
  );
};

export default PostForm;