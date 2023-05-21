import React from 'react';
import { View, StyleSheet, Image} from 'react-native';

const CustomImage = (props) => {
    return (
        <Image
            style = {styles.image}
            source={props.source} />
    );
};

const styles = StyleSheet.create({
    image: {
        height: 200,
        width: 400,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 2,
        // marginBottom: 10,
        position: 'absolute',
        top: 0,
    }

});

export default CustomImage;