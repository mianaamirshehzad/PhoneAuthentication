import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from '../Firebase';


const VerifyCode = (props) => {
    const mobile  = props.route.params.phoneNumber;

    const auth = getAuth(app);
    const [otp, setOtp] = useState("");

    const verify = async () => {
        if (otp) {
            try {
                await confirm.confirm(code);
                alert("OTP verification successfull");
                props.navigation.navigate('Login');  
            } catch (error) {
                alert('Invalid OTP code!');
            }
        } else {
            alert("Please enter OTP");
        }
    };

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
                onChangeText={(t) => setOtp(t)}
                keyboardType="numeric" />
            <CustomButton
                text='Verify'
                onPress={verify}
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