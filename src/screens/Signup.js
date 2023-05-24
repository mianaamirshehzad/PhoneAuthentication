import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from '../Firebase';
import CustomImage from '../components/CustomImage';


const Signup = (props) => {

    const auth = getAuth(app);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
   

    const signup = () => {
        if (password === confirmPass) {
            try {
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        console.log("Signup successful!")
                        props.navigation.navigate("Account");
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        // ..
                    });
            } catch (error) {
                console.log(error);
            }
        } else {
            alert("Password does not match");
        }
    }
    return (
        <ScrollView>
            <View style={styles.container} >
                <CustomImage
                    source={require('../assets/images/signup.jpg')} />
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
                    Register your accout
                </Text>
                <CustomTextInput
                    placeholder="Email"
                    onChangeText={(t) => setEmail(t)} />
                <CustomTextInput
                    placeholder="Password"
                    onChangeText={(t) => setPassword(t)}
                    secureTextEntry={true} />
                <CustomTextInput
                    placeholder="Confirm Password"
                    onChangeText={(t) => setConfirmPass(t)}
                    secureTextEntry={true} />
                <Text style={styles.bottomText} >
                    By signing up, you agree to
                    <Text style={{ fontWeight: 'bold' }}> Terms of Services</Text>  & <Text style={{ fontWeight: 'bold' }}>Privacy Policy</Text>.
                </Text>
                <CustomButton
                    text='Create'
                    onPress={signup}
                />
                <View style={styles.bottomText} >
                    <Text >
                        Already have an account? {""}
                    </Text>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate("Login")} >
                        <Text style={{ fontWeight: 'bold' }}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>


            </View>
        </ScrollView>
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
        // marginTop: 10,
    },
    barText: {
        padding: 17,
        fontWeight: 'bold'
    },
});

export default Signup;