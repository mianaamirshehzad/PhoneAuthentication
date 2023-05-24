import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from '../Firebase';
import { auth, firebase } from '@react-native-firebase/auth';
import showToast from '../components/Toast';


const VerifyCode = (props) => {
    const mobile = props.route.params.phoneNumber;
    const confirm = props.route.params.confirm;

    const [code, setCode] = useState(''); // verification code (OTP - One-Time-Passcode)

    //Otp will be in SMS 
    const verify = async () => {
        if (code) {
            console.log(code)
            try {
                await confirm.confirm(code)
                showToast("OTP Verification Successful");
                props.navigation.navigate('Login');
            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            }
        } else {
            alert("Please enter OTP");
        }
    };

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                props.navigation.navigate("Login");
            } else { 
                dispatch({ type: "reset_user" }); // reset state if you need to 
            }
        });
    }, []);

    return (
        <View style={styles.container} >
            <Image
                source={require('../assets/images/verify.jpg')}
                style={styles.image} />
            <Text style={styles.text} >
                Enter the OTP that you just received on {" "}
                {mobile}. The SMS delivery may take a while.
            </Text>
            <CustomTextInput
                placeholder="One-Time Passcode (OTP)"
                onChangeText={(t) => setCode(t)}
                keyboardType="numeric" />
            <CustomButton
                text='Verify OTP'
                onPress={() => verify()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 250,
        width: 250,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'black',
    },
    text: {
        justifyContent: 'center',
        margin: 25,
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
    bottomText: {
        padding: 17,
    }
});

export default VerifyCode;