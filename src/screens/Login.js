import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Keyboard, KeyboardAvoidingView } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import app from '../Firebase';
import CustomImage from '../components/CustomImage';


const Login = (props) => {

    const auth = getAuth(app);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");

    const login = () => {
        Keyboard.dismiss();
        try {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log("User logged-in")
                    props.navigation.navigate("Account");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorMessage);
                });
        } catch (error) {
                console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <CustomImage
                source={require('../assets/images/login.jpg')}
                style={{ borderRadius: 60, width: 200 }} />
            <Text style={styles.text} >
                Welcome Back!
            </Text>
            <CustomTextInput
                placeholder="Email"
                onChangeText={(t) => setEmail(t)} />
            <CustomTextInput
                placeholder="Password"
                onChangeText={(t) => setPassword(t)}
                secureTextEntry={true} />
            <CustomButton
                text="Login"
                onPress={() => login()} />
            <View style={styles.bottomText} >
                <Text >
                    New user? {""}
                </Text>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate("Signup")} >
                    <Text style={{ fontWeight: 'bold' }}>
                        Register
                    </Text>
                </TouchableOpacity>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        justifyContent: 'center',
        margin: 25,
    },
    bottomText: {
        padding: 17,
        flexDirection: 'row'
    },
    view: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#d3d3d3',
        width: '90%',
        height: '7%',
        marginTop: 10,
    },
    barText: {
        padding: 17,
        fontWeight: 'bold'
    },
});

export default Login;