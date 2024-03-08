import axios from "axios";


const LOCALHOST = "http://192.168.1.10:8000"

export const endpoints = {
    'posts': '/posts/',
    'listUsers': '/users/',
    'postsUser': (userID) => `/users/${userID}/posts/`,
    'users': (userID) => `/users/${userID}/`, 
    'login': '/o/token/',
    'current-user': '/users/current-user/',
    'imgPosts': (postID) => `/posts/${postID}/imagePosts/`,
    'FriendShip': (user_one, user_two) => `/friendship/get_friendship/?user1_id=${user_one}&user2_id=${user_two}`,
    'addFriendShip': '/FriendShips/',
    'updateFriendShipPath': (friendShipID) => `/FriendShips/${friendShipID}/`,
    'register': '/users/',
    'comments': (postID) => `/posts/${postID}/comments/`,
    'likes': (postID) => `/posts/${postID}/likes/`,
    'add-comments':'/comments/',
    'add-like': '/likes/',
    'get-like': (postID, userID) => `/likes/get_like/?post=${postID}&user=${userID}`,
    'delete-like': (likeID) =>`/likes/${likeID}/`,
    'getPostByID': (postID) => `/posts/${postID}/`
}

export const authApi = (accessToken) => axios.create({
    baseURL: LOCALHOST,
    headers: {
        "Authorization": `bearer ${accessToken}`
    }
})
  
export default axios.create({
    baseURL: LOCALHOST
})
