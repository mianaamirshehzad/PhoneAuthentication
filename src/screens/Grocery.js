import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Keyboard, FlatList, KeyboardAvoidingView } from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import app from '../Firebase';
import { doc, setDoc, getFirestore, addDoc, collection, getDocs, deleteDoc } from '@firebase/firestore'
import showToast from '../components/Toast';
import CustomView from '../components/CustomView';
import KoiBhi from '../components/KoiBhi';


const Grocery = (props) => {

    const auth = getAuth(app);
    const db = getFirestore(app);
    const [groceryItem, setGroceryItem] = useState("");
    const [cloudItem, setCloudItem] = useState([]);

    const cloudUploading = async () => {
        Keyboard.dismiss();
        if (groceryItem) {
            try {
                showToast("Saving Grocery Item")
                const docRef = await addDoc(collection(db, "grocery"), {
                    groceryItem: groceryItem,
                });
                console.log("Document written with ID: ", docRef.id);
            } catch (error) {
                // alert("Data uploading error")
                const errorMessage = error.Message;
                const errorCode = error.code;
                alert(errorMessage);
            }
        } else {
            alert("You've not input anything")
        }
        setGroceryItem(null);
    }
    //Getting Data from Cloud when user adds a new item
    const retrieveData = async () => {
        const querySnapshot = await getDocs(collection(db, "grocery"));
        const temp = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            console.log('its doc: ' + JSON.stringify(doc))
            temp.push(doc);
            console.log('Data retrieved: ' + cloudItem);
        });
        setCloudItem(temp);
    };
    // Deleting a document
    const deleteData = async (id) => {
        console.log("fn called" + id)
        const ref = await deleteDoc(doc(db, "grocery", id));
        console.log('item deleted')
        // console.log(ref);
    }

    useEffect(() => {
        retrieveData();
    }, [groceryItem])
    // return null;
    console.log(cloudItem);
    return (
        <View style={styles.container} >

            <Text style={styles.title} >
                Grocery List
            </Text>
            {/* Here will be our Items when fetched from firebase */}
            {
                cloudItem.length > 0 ?
                    <FlatList
                        data={cloudItem}
                        renderItem={({ item }) =>
                            <KoiBhi text={item.data().groceryItem} onLongPress={() => deleteData(item.id)} />
                            // <CustomView title={item.groceryItem} />
                        }
                        keyExtractor={item => item.id} /> :
                    <ActivityIndicator />
            }
            {/* Write a New Grocery Item Section */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.writeTastWrapper} >
                <TextInput
                    placeholder="Write your grocery item"
                    onChangeText={(text) => setGroceryItem(text)}
                    value={groceryItem}
                    style={styles.input} />
                <TouchableOpacity
                    onPress={() => cloudUploading()} >
                    <View style={styles.addWrapper} >
                        <Text style={styles.addText} >
                            +
                        </Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
        padding: 17,
        marginTop: 10
    },
    writeTastWrapper: {
        position: 'absolute',
        bottom: 30,
        justifyContent: 'space-around',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row'
    },
    input: {
        paddingVertical: 15,
        width: 250,
        paddingHorizontal: 15,
        backgroundColor: '#c154c1',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    addWrapper: {
        height: 60,
        width: 60,
        backgroundColor: 'purple',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    addText: {
        color: 'white',
        fontSize: 30,
    }
});

export default Grocery;