const { View, Text, TextInput, ActivityIndicator, TouchableOpacity } = require("react-native")
import { useContext, useState } from "react";
import MyStyles from "../../styles/MyStyles"
import Style from "./Style"
import API, { authApi, endpoints } from "../../configs/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyContext from "../../configs/MyContext";




const Login = ({navigation}) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [user, dispatch] = useContext(MyContext);


    const login = async () => {
        setLoading(true);
        
        try {
            let reqData = {
                "username": username,
                "password": password,
                "client_id": "PerDTH8K3H0MO6643VSDB9C0X7lgYM7qgiAcQTzK",
                "client_secret": "cwYlWTAkmNu0fURKBmOskBucPHBBKtamtFhLwExXkuaxJ5jDoXhboxXjPpjYnh3EL7EiDl1UgZJOyY03ugIfIOoB6jHKJxoIjl5OlFRqwaOtejyScD6fYYdcTHL78cmF",
                "grant_type": "password",
                "withCredentials": "true"
            }
            data = Object.keys(reqData).map(function(key) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(reqData[key])
            }).join('&')

            let res = await API.post(endpoints["login"], data);
            await AsyncStorage.setItem("access-token", res.data.access_token)

            let user = await authApi(res.data.access_token).get(endpoints['current-user'])

            dispatch({
                "type": "login",
                "payload": user.data
            });


            console.log(user.data)
            navigation.navigate("Home")
        } catch (ex) {
            console.error(ex)
        }finally {
            setLoading(false);
        }

    } 

    const loginWithGoogle = () => {
        // Perform login with Google logic here
    }
    
    return (
        <View style={Style.container}>
            <Text style={MyStyles.subject}>Đăng nhập</Text>

            <TextInput
            value={username}
            onChangeText={(t) => setUsername(t)}
            style={Style.input}
            placeholder="Username..."
            />
            <TextInput
            secureTextEntry={true}
            value={password}
            onChangeText={(t) => setPassword(t)}
            style={Style.input}
            placeholder="Password..."
            />

            {loading===true ? <ActivityIndicator /> :
                <>
                    <TouchableOpacity onPress={login} style={Style.button}>
                        <Text style={Style.Text_button}>Đăng nhập</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={loginWithGoogle}>
                    <Text style={Style.button}>Dang nhap bang Google</Text>
                    </TouchableOpacity> */}
                </>
            }
        </View>
    );
}

export default Login