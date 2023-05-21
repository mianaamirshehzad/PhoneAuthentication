import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

const Banner = (props) => {
    return (
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
    );
};

const styles = StyleSheet.create({
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
})

export default Banner;