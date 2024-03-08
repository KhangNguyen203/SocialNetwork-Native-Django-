import { View, Text, Button, StyleSheet, ActivityIndicator, Image } from 'react-native';
import API, { endpoints } from '../../configs/API';
import MyStyles from '../../styles/MyStyles';
import moment from "moment";
import { useContext, useEffect, useState } from 'react';
import PostImage from './PostImage';
import Style from './Style';
import Like from './Like';
import MyContext from '../../configs/MyContext';

const PostProfile = ({ userID }) => {
  const [posts, setPosts] = useState(null);
  const [userr, setUserr] = useState(null);
  const [user,] = useContext(MyContext);

  useEffect(() => {
    console.log('PostProfile chọn: '+ userID);
    const loadUser = async () => {
      try {
        let res = await API.get(endpoints['users'](userID));
        setUserr(res.data);
      } catch (ex) {
        console.error(ex);
      }
    };

    const loadPost = async () => {
      try {
        let res = await API.get(endpoints['postsUser'](userID));
        setPosts(res.data);
      } catch (ex) {
        console.error(ex);
      }
    };
    loadUser();
    loadPost();
  }, [userID]);

  
  const handleComment = () => {
    // Xử lý khi người dùng nhấn vào nút bình luận
  };

  const handleShare = () => {
    // Xử lý khi người dùng nhấn vào nút chia sẻ
  };

  const addCloudinaryDomain = (publicId) => {
    const cloudinaryDomain = `res.cloudinary.com/dvebfxho2/`;
    return `https://${cloudinaryDomain}${publicId}`;
  };


  return (
    <View>
      {posts === null ? <ActivityIndicator />: (
        <>
          {posts.map( p => (
            <View key={p.id} style={Style.containerPost}>
              {userr === null ? <ActivityIndicator /> : (
                <View style={MyStyles.row}>
                  <Image source={{uri: addCloudinaryDomain(userr.avatar)}} style={MyStyles.avatar}/>
                  <View>
                    <Text style={Style.title}>{userr.username}</Text>
                    <Text style={Style.time}>{moment(userr.created_date).fromNow()}</Text>
                  </View>
                </View>
              )}
              <Text style={Style.contentPost}>{p.content}</Text>

              <PostImage postID ={p.id}/>

              <View style={Style.buttonContainer}>
                <Button title="Bình luận" onPress={handleComment} />
                <Like post={p} user={user} />                
                <Button title="Chia sẻ" onPress={handleShare} />
              </View>
            </View>
          ))}
        </>
      )}
    </View>
  );
};

export default PostProfile;