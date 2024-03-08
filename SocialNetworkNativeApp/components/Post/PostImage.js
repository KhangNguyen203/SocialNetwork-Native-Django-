import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native"
import API, { endpoints } from "../../configs/API";
import MyStyles from "../../styles/MyStyles";
import Style from "./Style";

const PostImage = ({postID}) => {
    const [imgPost, setImgPost] = useState(null);

    useEffect(() => {
        const loadImgPost = async () => {
            try {
                let res = await API.get(endpoints['imgPosts'](postID));
                setImgPost(res.data);
            } catch (ex) {
              console.error(ex);
            }
        };
        loadImgPost();
    }, [postID])

    useEffect(() => {
        if (imgPost !== null) {
            console.log(imgPost)
        }
    }, [postID]);

    const addCloudinaryDomain = (publicId) => {
        const cloudinaryDomain = `res.cloudinary.com/dvebfxho2/`;
        return `https://${cloudinaryDomain}${publicId}`;
    };

    return (
        <View style={[{ flexDirection: 'row'},  Style.container_2]}>
            {imgPost === null ? (
                <ActivityIndicator />
            ) : (
                imgPost.map((c, index) => (
                    <View key={c.id} style={[index === 0 && imgPost.length === 1 ? { flex: 2 } : { flex: 2 }]}>
                        <Image source={{ uri: addCloudinaryDomain(c.image) }} style={[Style.m_10, { width: index === 0 && imgPost.length === 1 ? 310 : 150, height: 200 }]}/>
                    </View>
                ))
            )}
        </View>
    );
}

export default PostImage;