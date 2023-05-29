import React from "react";
import { View, StyleSheet } from 'react-native';
import Navigation from "./src/navigation";
import VerifyCode from "./src/screens/VerifyCode";
import Grocery from "./src/screens/Grocery";
import GroveryCollection from "./src/screens/GroceryCollection";
import { Provider } from 'react';

const App = () => {
  return (
    <View style={styles.container} >
      {/* <Navigation /> */}
      <GroveryCollection />
    </View>
  )
};     

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;
