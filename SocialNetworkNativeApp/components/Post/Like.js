import { useEffect, useState } from "react";
import { Button, View } from "react-native";
import API, { endpoints } from "../../configs/API";

const Like = ({ post, user }) => {
  const [like, setLike] = useState(null);
  const [liked, setLiked] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getLike = async () => {
      try {
        let res = await API.get(endpoints["get-like"](post.id, user.id));
        setLiked(res.data);
        console.log(res.data);
      } catch (ex) {
        console.log(user.username + " chưa like bài viết " + post.id);
      }
    };

    getLike();
  }, [refresh]);

  const handleLike = async () => {
    try {
      let reqData = {
        post: post.id,
        user: user.id,
      };

      let res = await API.post(endpoints["add-like"], reqData);
      console.log("Like success!");
      setRefresh(!refresh);
    } catch (ex) {
      console.error(ex);
    }
  };

  const handleUnLike = async () => {
    try {
      let res = await API.delete(endpoints["delete-like"](liked.id));
      console.log("UnLike success!");
      setLiked(null);
      setRefresh(!refresh);
    } catch (ex) {
      console.error(ex);
    }
  };

  return (
    <View>
      {liked === null ? (
        <Button title="Thích" onPress={handleLike} />
      ) : (
        <Button title="Đã thích" onPress={handleUnLike} />
      )}
    </View>
  );
};

export default Like;