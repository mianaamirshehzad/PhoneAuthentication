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

const GroveryCollection = (props) => {

    const auth = getAuth(app);
    const db = getFirestore(app);
    const [item, setItem] = useState("");
    const [itemsList, setItemsList] = useState([]);

    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false)
    const [updateItem, setUpdateItem] = useState("");
    const [updateId, setUpdateId] = useState("");

    const cloudUploading = async () => {
        Keyboard.dismiss();
        console.log(item)
        if (itemsList !== null) {
            itemsList.push(item);
        } else {
            setItemsList(item)
        }
        setItem(null);
        //This will empty the textbox
        console.log('Items: ' + itemsList);
    };

    useEffect(() => {
        console.log('Grocery Collection')
    }, [])

    return (
        <View style={styles.container} >
            <Text style={styles.title} >
                Grocery List
            </Text>
            <Text>
                {itemsList}
            </Text>
            {
                itemsList.map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            // onPress={() => markTaskAsComplete(index)}
                             >
                            <Task
                                text={item}
                            />
                        </TouchableOpacity>
                    )
                })
            }
            <CustomModal
                visible={modalVisible}
                onChangeText={(t) => setUpdateItem(t)}
                onCancel={() => setModalVisible(false)}
                onPress={() => letMeUpdate()} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.writeTastWrapper} >
                <TextInput
                    placeholder="Write your grocery item"
                    onChangeText={(text) => setItem(text)}
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

export default GroveryCollection;