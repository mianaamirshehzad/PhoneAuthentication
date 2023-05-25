import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, ActivityIndicator, Keyboard, FlatList, KeyboardAvoidingView, Modal } from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import app from '../Firebase';
import { doc, serverTimestamp, getFirestore, orderBy, addDoc, collection, getDocs, deleteDoc, updateDoc, terminate } from '@firebase/firestore'
import showToast from '../components/Toast';
import CustomView from '../components/CustomView';
import ItemView from '../components/ItemView';
import Spinner from '../components/Spinner';
import CustomModal from '../components/CustomModal';


const Grocery = (props) => {

    const auth = getAuth(app);
    const db = getFirestore(app);
    const [groceryItem, setGroceryItem] = useState("");
    const [cloudItem, setCloudItem] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false)

    const cloudUploading = async () => {
        Keyboard.dismiss();
        if (groceryItem) {
            try {
                showToast("Grocery item is being saved");
                const docRef = await addDoc(collection(db, "grocery"), {
                    groceryItem: groceryItem,
                    timestamp: serverTimestamp(),
                });
                console.log("Document written with ID: ", docRef.id);
            } catch (error) {
                const errorMessage = error.Message;
                const errorCode = error.code;
                alert(errorMessage);
            }
        } else {
            alert("You've not input anything");
        }
        setGroceryItem(null);
        retrieveData();
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
    const deleteItem =  (id) => {
        Alert.alert("Action required!", "What do you want to do?", [
            {
                text: "Edit",
                onPress: () => setModalVisible(true)
            },
            {
                text: "Cancel",
                onPress: () => console.log("Cancel pressed")
            },
            {
                text: "Delete",
                onPress: async () => {
                    const ref = await deleteDoc(doc(db, "grocery", id));
                    showToast("Item deleted");
                    retrieveData();
                    console.log('Item deleted with' + id);
                }
            }
        ])

    }

    function show () {
        alert("show press")
    }
    //Updating the document 
    const letMeUpdate = async (id) => {
        const myDocRef = doc(db, "grocery", id);
        await updateDoc(myDocRef, {
            groceryItem: "breakfast"
        });
        console.log('Update successful')
    };

    useEffect(() => {
        setLoading(true)
        retrieveData();
        setTimeout ( () => {
            setModalVisible(false);
        }, 3000)
    }, []);

    return (
        <View style={styles.container} >
            <Text style={styles.title} >
                Grocery List
            </Text>
            <Spinner animating = {loading} />
            <CustomModal 
                visible = {modalVisible}
                onCancel = {() => setModalVisible(false)}
                onPress = {() => alert("Hi")} />
            {/* Here will be our Items when fetched from firebase */}
            {
                cloudItem.length > 0 ?
                    <FlatList
                        data={cloudItem}
                        renderItem={({ item }) =>
                            <ItemView text={item.data().groceryItem}
                                onLongPress={() => deleteItem(item.id)} />
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