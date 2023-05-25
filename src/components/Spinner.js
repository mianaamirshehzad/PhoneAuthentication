import {ActivityIndicator} from 'react-native';

const Spinner = (props) => {
    return (
        <ActivityIndicator size={'large'} color={'purple'} animating={props.animating} />
    )
}

export default Spinner;