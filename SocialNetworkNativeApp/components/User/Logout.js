import { useContext } from "react"
import { Button, Text } from "react-native"
import MyContext from "../../configs/MyContext"

const Logout = ({navigation}) => {
    const [user, dispatch] = useContext(MyContext);

    const logout = () => {
        dispatch({
            type: "logout"
        })

        console.log("You clicked logout!")
    }

    if (user===null)
        return <Text>Xin chào</Text>
        // return <Button title="Đăng nhập" onPress = {() => navigation.navigate('Login')} />

    return <Button title="Đăng xuất" onPress={logout} />
}

export default Logout;