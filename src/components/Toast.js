
import React from 'react';
import { View, Text, ToastAndroid } from 'react-native';

export default function showToast(text) {
    ToastAndroid.showWithGravity(
        text,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
    );
}
