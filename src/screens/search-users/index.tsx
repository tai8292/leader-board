import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Input from '../../base/components/input';
import Button from '../../base/components/button';
import {SafeAreaView} from 'react-native-safe-area-context';
import Images from '../../resources/icons';
import {useDispatch, useSelector} from 'react-redux';
import {getDataFromJson} from '../../store/actions/dataActions';
import {RootState} from '../../store';
import Table from './table';

const SeachUsersScreen: React.FC = () => {
  const dispatch = useDispatch();
  const dataState = useSelector((state: RootState) => state.data);

  const [search, setSearch] = useState<string>('');

  const onChangeSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const onSearchUser = useCallback(() => {
    dispatch(getDataFromJson(search) as any);
  }, [dispatch, search]);

  return (
    <View style={styles.root}>
      <SafeAreaView>
        <View style={styles.content}>
          <View style={styles.searchContainer}>
            <Input
              style={styles.input}
              leftIcon={Images.Search}
              placeholder="User name ..."
              onChangeText={onChangeSearch}
              value={search}
            />
            <Button onPress={onSearchUser} title="Search" />
          </View>
          <Table data={dataState.data} />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SeachUsersScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginBottom: 0,
    flex: 0.8,
  },
});
