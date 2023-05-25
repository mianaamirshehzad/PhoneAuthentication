import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Modal, TouchableOpacity, Image } from 'react-native';
import CustomButton from './CustomButton';
import CustomTextInput from './CustomTextInput';

const CustomModalView = (props) => {
    const [update, setUpdate] = useState("")
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}>
            <View style={styles.modalView} >
                <TouchableOpacity onPress = {props.onCancel} style = {{right:0}} >
                    <Image
                        source={require("../assets/images/cancel.png")}
                        style={styles.img}
                    />
                </TouchableOpacity>
                <Text style={styles.title} >
                    Update Grocery Item
                </Text>
                <CustomTextInput
                    placeholder='Type here...'
                    onChangeText={props.onChangeText} />
                <CustomButton text="Update Item"
                    onPress={props.onPress} />
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modalView: {
        backgroundColor: 'lightblue',
        margin: 50,
        width: '70%',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: '50%',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        alignItems: 'center',
        marginTop: 20,
        color: 'black'
    },
    img: {
        width: 40,
        height: 40,
    }
});

export default CustomModalView;