import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, Keyboard, FlatList, KeyboardAvoidingView, Modal } from 'react-native';
import { getAuth } from "firebase/auth";
import app from '../Firebase';
import { doc, serverTimestamp, getFirestore, addDoc, collection, getDocs, deleteDoc, updateDoc } from '@firebase/firestore'
import showToast from '../components/Toast';
import ItemView from '../components/ItemView';
import Spinner from '../components/Spinner';
import CustomModal from '../components/CustomModal';

const Grocery = (props) => {

    const auth = getAuth(app);
    const db = getFirestore(app);
    const [groceryItem, setGroceryItem] = useState([]);
    const [cloudItem, setCloudItem] = useState([]);
    const [manipData, setManipData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false)
    const [updateItem, setUpdateItem] = useState("");
    const [updateId, setUpdateId] = useState("");

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
    }
    //Getting Data from Cloud when user adds a new item
    const retrieveData = async () => {
        const querySnapshot = await getDocs(collection(db, "grocery"));
        const temp = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data()); // doc.data() is never undefined for query doc snapshots
            console.log('its doc: ' + JSON.stringify(doc))
            temp.push(doc);
            console.log('Data retrieved: ' + cloudItem);
        });
        setCloudItem(temp);
        console.log("Saved locally => ");
        setManipData(...manipData, cloudItem);
    };
    // Multiple Options for user on onLongPress() on which a specific function will call
    const selectOption = (id) => {
        Alert.alert("Action required!", "What do you want to do?", [
            {
                text: "Update",
                onPress: () => {
                    setUpdateId(id);
                    setModalVisible(true)
                }
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
                    console.log('Item deleted with' + id);
                }
            }
        ])

    }
    //Updating the existing document 
    const letMeUpdate = async () => {
        console.log(updateItem)
        const myDocRef = doc(db, "grocery", updateId);
        await updateDoc(myDocRef, {
            groceryItem: updateItem
        });
        showToast("Item updated");
        setModalVisible(false);
    };

    useEffect(() => {
        setLoading(true);
        retrieveData();
    }, []);

    return (
        <View style={styles.container} >
            <Text style={styles.title} >
                Grocery List
            </Text>
            <CustomModal
                visible={modalVisible}
                onChangeText={(t) => setUpdateItem(t)}
                onCancel={() => setModalVisible(false)}
                onPress={() => letMeUpdate()} />
            {/* Here will be our Items when fetched from firebase */}
            {
                manipData.length > 0 ?
                    <FlatList
                        data={manipData}
                        renderItem={({ item }) =>
                            <ItemView text={item.data().groceryItem}
                                onLongPress={() => selectOption(item.id)} />
                        }
                        keyExtractor={item => item.id} /> :
                    <Spinner animating={loading} />
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