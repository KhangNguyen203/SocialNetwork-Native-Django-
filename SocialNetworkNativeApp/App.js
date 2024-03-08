import { StatusBar } from 'expo-status-bar';
import React, { createContext, useEffect, useReducer, useState } from "react";
import { Image, StyleSheet, Text, View } from 'react-native';
import MyContext from './configs/MyContext';
import MyUserReducer from "./reducers/MyUserReducer";
import Logout from "./components/User/Logout";
import Profile from './components/User/Profile';
import MyStyles from './styles/MyStyles';
import PostForm from './components/Post/PostForm';
import ListFriendShip from './components/FriendShip/ListFriendShip';
import ProfileFriend from './components/User/ProfileFriend';
import Register from './components/User/Register';
import PostDetail from './components/Post/PostDetail';
import Post from './components/Post/Post';
const { default: Home } = require("./components/Home/Home");
const { default: Login } = require("./components/User/Login");
const { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } = require("@react-navigation/drawer")
const { NavigationContainer } = require("@react-navigation/native");

const Drawer = createDrawerNavigator(); 
const LOCALHOST = "http://192.168.1.10:8000/";
export const LocalHostContext = createContext();

export default function App() {
  // const LocalHost = useContext(LocalHostContext)
  const [user, dispatch] = useReducer(MyUserReducer, null);

  const addCloudinaryDomain = (publicId) => {
    const cloudinaryDomain = `res.cloudinary.com/dvebfxho2/`;
    return `https://${cloudinaryDomain}${publicId}`;
  };


  return (
    <LocalHostContext.Provider value={LOCALHOST}>
      <MyContext.Provider value={[user, dispatch]}>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Login" screenOptions={{headerRight: Logout}}>
            <Drawer.Screen name="Home" component={Home} options={{title : 'Social App'}}/>
            <Drawer.Screen name="PostForm" component={PostForm} options={{title: "Đăng Bài", drawerItemStyle: {display: "none"}}} />
            <Drawer.Screen name="ListFriendShip" component={ListFriendShip} options={{title: "Danh Sách Bạn Bè", drawerItemStyle: {display: "none"}}} />
            <Drawer.Screen name="ProfileFriend" component={ProfileFriend} options={{title: "Trang Cá Nhân", drawerItemStyle: {display: "none"}}} />
            <Drawer.Screen name="Post" component={Post} options={{title: "Post", drawerItemStyle: {display: "none"}}} />
            <Drawer.Screen name="PostDetail" component={PostDetail} options={{title: "PostDetail", drawerItemStyle: {display: "none"}}} />


            {user===null?<>
                <Drawer.Screen name="Login" component={Login} options={{title : 'Đăng nhập'}}/>
                <Drawer.Screen name="Register" component={Register} options={{title : 'Đăng Ký'}}/>
              </>:<>
                
                  <Drawer.Screen name={user.username} component={Profile} options={({ navigation }) => ({title: user.username, drawerIcon: () => <Image source={{uri:  addCloudinaryDomain(user.avatar)}} style={MyStyles.avatar} />, 
                  onPress: () => navigation.navigate('Profile'), })} />
                  <Drawer.Screen name="FriendShip" component={ListFriendShip} options={{title : 'Gợi ý kết bạn'}}/>

                {/* <Drawer.Screen name="Logout" component={Logout} options={{drawerItemStyle: {display: 'none'}}} /> */}
            </>}      

          </Drawer.Navigator>
        </NavigationContainer>
      </MyContext.Provider>
    </LocalHostContext.Provider>
  );
}
