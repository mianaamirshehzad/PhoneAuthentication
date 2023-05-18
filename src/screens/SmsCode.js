import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import app from '../Firebase';
import auth from '@react-native-firebase/auth';

const SmsCode = (props) => {
    const [confirm, setConfirm] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(false);

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
        if (phoneNumber) {
            setLoading(true)
            try {
                const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
                setConfirm(confirmation);
            } catch (error) {
                alert(error);
            }
        } else {
            alert("Please enter Phone with Country Code")
        }
        setLoading(false);
    props.navigation.navigate("VerifyCode", {phoneNumber});
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    return (
        <View style={styles.container} >
            <Image
                source={require('../assets/images/code.jpg')}
                style={styles.image} />
            <View style={styles.view} >
                <TouchableOpacity
                    onPress={() => props.navigation.navigate("Signup")} >
                    <Text style={styles.barText}  >
                        Email
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.barText}>
                        Phone
                    </Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.text} >
                What is your phone number?
            </Text>
            <View style={{ flexDirection: 'row', width: '90%' }} >
                <Text style={{ flex: 1, backgroundColor: '#d3d3d2', borderRadius: 10, padding: 10, margin: 8, }} >
                    +92
                </Text>
                {/* <TextInput
                    placeholder='+92'
                    style={{ flex: 1, backgroundColor: '#d3d3d2', borderRadius: 10, padding: 10, margin: 8, }} /> */}
                <TextInput
                    onChangeText={(t) => setPhoneNumber(t)}
                    placeholder='Phone'
                    keyboardType='numbers-and-punctuation'
                    style={{ flex: 3, backgroundColor: '#d3d3d2', borderRadius: 10, padding: 10, margin: 8, }} />
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
        height: 200,
        width: 400,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 2,
        position: 'absolute',
        top: 0,
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
    }
});

export default SmsCode;