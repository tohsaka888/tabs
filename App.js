/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Tabs from './tabs';

const App = () => {
  const data = [1,2,3,4,5,6,7,8,9,0]
  return (
    <SafeAreaView>
      <Tabs data={data}/>
      <Tabs />
      <Tabs />
    </SafeAreaView>
  );
};

export default App;
