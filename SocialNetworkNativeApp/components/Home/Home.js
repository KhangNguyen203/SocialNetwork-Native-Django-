import { ActivityIndicator, Button, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Style from "./Style";
import React, { useEffect, useState, useContext } from "react";
import API, { endpoints } from "../../configs/API";
import MyStyles from "../../styles/MyStyles";
import MyContext from "../../configs/MyContext";
import Post from "../Post/Post";
import PostForm from "../Post/PostForm";
import { LocalHostContext } from "../../App";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
    const [posts, setPosts] = React.useState(null);
    const [user,] = useContext(MyContext);
    const LocalHost = useContext(LocalHostContext);
    const navigation = useNavigation();

    React.useEffect(() => {
        const loadPosts = async () => {
            try {
                let res = await API.get(endpoints['posts'])
                setPosts(res.data.results)
            } catch (ex) {
                console.error(ex)
            }
        }

        loadPosts();
    },[])

    const goToFormPost = async () => {
        navigation.navigate("PostForm");
    }

    const handleAddPost = (newPost) => {
        setPosts((prevPosts) => [newPost, ...prevPosts]);
    };

    const addCloudinaryDomain = (publicId) => {
        const cloudinaryDomain = `res.cloudinary.com/dvebfxho2/`;
        return `https://${cloudinaryDomain}${publicId}`;
      };

    return (
        user === null ? <ActivityIndicator/>: 
            <View style={MyStyles.container}>
                <ScrollView>
                    <View style={Style.row}>
                        <Image source={{uri: addCloudinaryDomain(user.avatar)}} style={MyStyles.avatar}/>
                        <View style={Style.left_4}>
                            <Button style={Style.buttonContainer} onPress={goToFormPost} title="Bạn đang nghĩ gì???" />
                        </View>
                    </View>
                    {posts === null? <ActivityIndicator/>: <>
                        {posts.map(c => (
                            <View key={c.id}> 
                                <Post post={c}/>
                            </View>
                        ))}
                    </>}
                </ScrollView>
            </View>
    );
}

export default Home;