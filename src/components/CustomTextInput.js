import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ProgressViewIOSComponent, TextInput } from 'react-native';

const CustomTextInput = (props) => {
    return (
        <TextInput
            placeholder={props.placeholder}
            style = {styles.textInput}
            onChangeText={props.onChangeText}
            secureTextEntry = {props.secureTextEntry}
            keyboardType= {props.keyboardType}
        />
    );
};

const styles = StyleSheet.create({
    textInput: {
        width: '90%',
        backgroundColor: '#d3d3d2',
        borderRadius: 10,
        padding: 10,
        margin: 8,
    }

});

export default CustomTextInput;