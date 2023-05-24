import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid, KeyboardAvoidingView, Image, ActivityIndicator } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import app from '../Firebase';
import auth from '@react-native-firebase/auth';
import { CountryPicker } from "react-native-country-codes-picker";
import CustomImage from '../components/CustomImage';
import Banner from '../components/Banner';
import showToast from '../components/Toast';


const SmsCode = (props) => {
    const [confirm, setConfirm] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState('+92');

    function onAuthStateChanged(user) {
        if (user) {
            // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
            // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
            // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
            // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
        }
    }

    // Handle the button press
    async function signIn(phoneNumber) {
       showToast("Opening browser for verification")
        if (phoneNumber) {
            setLoading(true)
            try {
                const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
                setConfirm(confirmation);
                setLoading(false);
                // On next screen the code will be verified
                props.navigation.navigate("VerifyCode", { confirm: confirmation, phoneNumber });
            } catch (error) {
                setLoading(false);
                alert(error);
            }
        } else {
            alert("Please enter Phone with Country Code")
        }
        // props.navigation.navigate("VerifyCode", { phoneNumber });
    };

    //Showing Toast Message to alert the user about Human Verification via Broswer 
    const showvToast = () => {
        ToastAndroid.showWithGravity(
            'Opening browser for Verification via Broswer',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
    };

    return (
        <KeyboardAvoidingView style={styles.container} >
            <CustomImage
                source={require('../assets/images/code.jpg')} />
            <View style={styles.view} >
                <TouchableOpacity
                    onPress={() => props.navigation.navigate("Signup")} >
                    <Text style={styles.barText}  >
                        Email
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                >
                    <Text style={styles.barText}>
                        Phone
                    </Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.text} >
                What is your phone number?
            </Text>
            <View style={{ flexDirection: 'row', width: '90%' }} >
                <TouchableOpacity
                    onPress={() => setShow(true)}
                    style={{ flex: 1, backgroundColor: '#d3d3d2', borderRadius: 10, padding: 10, margin: 8, }}>
                    <Text style = {{ padding: 5}} >{countryCode}</Text>
                    <CountryPicker
                        show={show}
                        // when picker button press you will get the country object with dial code
                        pickerButtonOnPress={(item) => {
                            setCountryCode(item.dial_code);
                            setShow(false);
                        }}
                    />
                </TouchableOpacity>
                <TextInput
                    onChangeText={(n) => setPhoneNumber(countryCode + n)}
                    placeholder='e.g 3001234567'
                    keyboardType='numbers-and-punctuation'
                    style={{ flex: 4, backgroundColor: '#d3d3d2', borderRadius: 10, padding: 10, margin: 8, }} />
            </View>
            <CustomButton
                text='Send Confirmation Code'
                onPress={() => signIn(phoneNumber)}
            />
            <ActivityIndicator size={'large'} color={'purple'} animating={loading} />
            <Text style={styles.textUnderButton} >
                By signing up, you agree to
                <Text style={{ fontWeight: 'bold' }}> Terms of Services</Text>  & <Text style={{ fontWeight: 'bold' }}>Privacy Policy</Text>.
            </Text>

            {/* Bottom navigation to login */}
            <View style={styles.bottomText} >
                <Text >
                    Already have an account?

                </Text>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate("Login")} >
                    <Text style={{ fontWeight: 'bold' }}> Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
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
    view: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#d3d3d3',
        width: '90%',
    },
    barText: {
        padding: 17,
        fontWeight: 'bold'
    },
    textUnderButton: {
        padding: 17,
    },
    bottomText: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        marginBottom: 35,
    },
});

export default SmsCode;