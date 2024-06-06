import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SeachUsersScreen from './screens/search-users';
import {Provider} from 'react-redux';
import store from './store';

const App = (): React.ReactElement => {
  return (
    <View style={styles.root}>
      <SafeAreaProvider>
        <Provider store={store}>
          <SeachUsersScreen />
        </Provider>
      </SafeAreaProvider>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
