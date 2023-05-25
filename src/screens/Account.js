import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import { getAuth, signOut } from "firebase/auth";
import app from '../Firebase';
import CustomImage from '../components/CustomImage';
import { doc, setDoc, getFirestore, addDoc, collection } from '@firebase/firestore'
import showToast from '../components/Toast';

const Account = (props) => {

    const auth = getAuth(app);
    const db = getFirestore(app);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");

    const signoutAccount = () => {
        signOut(auth).then(() => {
            alert("You've been signed out");
            props.navigation.navigate("Login");
        }).catch((error) => {
            console.log(error);
        });
    }
    const cloudUploading = async () => {
        if (title) {
            if (amount) {
                try {
                    showToast("Cloud uploading")
                    const docRef = await addDoc(collection(db, "fruits"), {
                        title: title,
                        amount: amount
                    });
                    console.log("Document written with ID: ", docRef.id);
                } catch (error) {
                    // alert("Data uploading error")
                    const errorMessage = error.Message;
                    const errorCode = error.code;
                    alert(errorMessage);
                }
            } else {
                alert("Please put the amount of your favourite fruit")
            }
        } else {
            alert("Which fruit you'd like to buy")
        }
    }

    useEffect(() => {
        console.log("Account => ");
    }, [])
    return (
        <View style={styles.container} >
            <Text style={styles.title} >
                Profile Details
            </Text>
            <CustomTextInput
                placeholder="Fruits"
                onChangeText={(t) => setTitle(t)} />
            <CustomTextInput
                placeholder="Amount in kg"
                onChangeText={(t) => setAmount(t)}
                keyboardType="numeric" />
            <CustomButton
                text="Signout"
                onPress={() => signoutAccount()} />
            <CustomButton
                text="Grocery List"
                onPress={() => props.navigation.navigate("Grocery") } />
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
    title: {
        fontSize: 23,
        fontWeight: 'bold',
        color: 'black',

    }
});

export default Account;