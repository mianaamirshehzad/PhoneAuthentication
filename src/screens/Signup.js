import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from '../Firebase';
import CustomImage from '../components/CustomImage';


const Signup = (props) => {

    const auth = getAuth(app);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signup = () => {
        try {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // SMS validation after account creation;
                  props.navigation.navigate("PhoneSignIn");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <View style={styles.container} >
            <CustomImage
                source = {require('../assets/images/signup.jpg')} />
            <View style={styles.view} >
                <TouchableOpacity>
                    <Text style={styles.barText}  >
                        Email
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate("SmsCode")} >
                    <Text style={styles.barText}>
                        Phone
                    </Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.text} >
                Register your username and password
            </Text>
            <CustomTextInput
                placeholder="Email"
                onChangeText={(t) => setEmail(t)} />
            <CustomTextInput
                placeholder="Password"
                onChangeText={(t) => setPassword(t)}
                secureTextEntry={true} />
            <CustomButton
                text='Create'
                onPress={signup}
                 />

            <Text style={styles.bottomText} >
                By signing up, you agree to
                <Text style={{ fontWeight: 'bold' }}> Terms of Services</Text>  & <Text style={{ fontWeight: 'bold' }}>Privacy Policy</Text>.
            </Text>
        </View>
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
    }
});

export default Signup;