import React, { useMemo } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { PersistGate } from 'redux-persist/src/integration/react';
import { Provider, useSelector } from 'react-redux';

import { store, persistor } from './store';

const LogItem = React.memo(({ log }) => {
  const time = useMemo(() => new Date(log.time).toLocaleString(), [log.time]);

  return (
    <View style={styles.logItem}>
      <Text style={styles.logText}>{time}</Text>
    </View>
  );
});

const App = () => {
  const logs = useSelector(state => state.log.data);

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={logs}
      keyExtractor={item => String(item.id)}
      renderItem={({ item }) => <LogItem log={item} />}
    />
  );
};

const AppDelegate = () => (
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>
);

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#212121',
  },
  log: {
    height: 50,
  },
  logText: {
    fontSize: 16,
    color: '#FFF',
  },
});

export default AppDelegate;
