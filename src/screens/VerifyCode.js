import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from '../Firebase';
import {auth, firebase} from '@react-native-firebase/auth';


const VerifyCode = (props) => {
    const mobile = props.route.params.phoneNumber;
    const confirm = props.route.params.confirm;

    // const [confirm, setConfirm] = useState(null); // If null, no SMS has been sent
    const [code, setCode] = useState(''); // verification code (OTP - One-Time-Passcode)

    // Handle login
    function onAuthStateChanged(user) {
        console.log('User:', user);
        // if (user) {
        //     // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
        //     // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
        //     // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
        //     // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
        // }
    }

    //Otp will be in SMS 
    const verify = async () => {
        if (code) {
            console.log(code)
            try {
                await confirm.confirm(code)
                alert("OTP verification successfull");
                props.navigation.navigate('Login');
            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
                // alert('Invalid OTP, try again!');
            }
        } else {
            alert("Please enter OTP");
        }
    };

    // Screen rendering 
    // useEffect(() => {
    //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    //     return subscriber; // unsubscribe on unmount
    // }, []);

    useEffect( () => {
        firebase.auth().onAuthStateChanged( (user) => {
            if (user) {
                // Obviously, you can add more statements here, 
                //       e.g. call an action creator if you use Redux. 
    
                // navigate the user away from the login screens: 
                props.navigation.navigate("PermissionsScreen");
            } 
            else 
            {
                // reset state if you need to  
                dispatch({ type: "reset_user" });
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
                {mobile}
            </Text>
            <CustomTextInput
                placeholder="One-Time Passcode (OTP)"
                onChangeText={(t) => setCode(t)}
                keyboardType="numeric" />
            <CustomButton
                text='Verify OTP'
                onPress={()=>verify()}
                // onPress = {() => alert(code)}
            />
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