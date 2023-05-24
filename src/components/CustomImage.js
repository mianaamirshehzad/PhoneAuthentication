import React from 'react';
import { View, StyleSheet, Image} from 'react-native';

const CustomImage = (props) => {
    return (
        <Image
            style = {{...styles.image, ...props.style}}
            source={props.source} />
    );
};

const styles = StyleSheet.create({
    image: {
        height: 200,
        width: 400,
        borderRadius: 10,
    }

});

export default CustomImage;