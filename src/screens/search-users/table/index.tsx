import React, {useCallback, useState} from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import {LeaderBoard} from '../../../base/types/leader-board';
import Touchable from '../../../base/components/touchable';
import Images from '../../../resources/icons';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {fetchDataSuccess} from '../../../store/actions/dataActions';

type TableProps = {
  data?: LeaderBoard[];
};

const Table = ({data}: TableProps) => {
  const [isASC, setIsASC] = useState(true);
  const [sortKey, setSortKey] = useState<'name' | 'rank'>('rank');

  const dispatch = useDispatch();
  const dataState = useSelector((state: RootState) => state.data);

  const sortByName = useCallback(
    (a: LeaderBoard, b: LeaderBoard, asc: boolean) => {
      if ((a?.name || '') > (b?.name || '')) {
        return asc ? -1 : 1;
      }
      if ((a?.name || '') < (b?.name || '')) {
        return asc ? 1 : -1;
      }
      return 0;
    },
    [],
  );

  const sortByRank = useCallback(
    (a: LeaderBoard, b: LeaderBoard, asc: boolean) => {
      const sortResult = (b?.bananas || 0) - (a?.bananas || 0);
      if (sortResult === 0) {
        return sortByName(a, b, true);
      }
      return asc ? -1 * sortResult : sortResult;
    },
    [sortByName],
  );

  const onSort = useCallback(
    (field: 'name' | 'rank', asc: boolean) => {
      setIsASC(asc);
      setSortKey(field);
      if (!dataState?.data || dataState.data.length === 0) {
        return;
      }
      if (field === 'name') {
        const result = [...dataState.data].sort((a, b) =>
          sortByName(a, b, isASC),
        );
        dispatch(fetchDataSuccess(result) as any);
        return;
      }
      const result = [...dataState.data].sort((a, b) =>
        sortByRank(a, b, isASC),
      );

      dispatch(fetchDataSuccess(result) as any);
      return;
    },
    [dataState.data, dispatch, isASC, sortByName, sortByRank],
  );

  const renderRow = ({item}: {item: LeaderBoard}) => {
    return (
      <View style={styles.row}>
        <Text style={styles.cell}>{item?.name}</Text>
        <View style={styles.line} />
        <Text style={styles.cell}>{item?.rank}</Text>
        <View style={styles.line} />
        <Text style={styles.cell}>{item?.bananas}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.header]}>
        <View style={[styles.cell, styles.sort]}>
          <Text style={styles.headerText}>Name</Text>
          <View style={styles.sort}>
            <Touchable onPress={() => onSort('name', true)} style={styles.btn}>
              <Image
                style={[
                  styles.icon,
                  isASC && sortKey === 'name' && styles.active,
                ]}
                source={Images.Down}
              />
            </Touchable>
            <Touchable onPress={() => onSort('name', false)} style={styles.btn}>
              <Image
                style={[
                  styles.icon,
                  !isASC && sortKey === 'name' && styles.active,
                ]}
                source={Images.Up}
              />
            </Touchable>
          </View>
        </View>
        <View style={styles.line} />
        <View style={[styles.cell, styles.sort]}>
          <Text style={styles.headerText}>Rank</Text>
          <View style={styles.sort}>
            <Touchable onPress={() => onSort('rank', true)} style={styles.btn}>
              <Image
                style={[
                  styles.icon,
                  isASC && sortKey === 'rank' && styles.active,
                ]}
                source={Images.Down}
              />
            </Touchable>
            <Touchable onPress={() => onSort('rank', false)} style={styles.btn}>
              <Image
                style={[
                  styles.icon,
                  !isASC && sortKey === 'rank' && styles.active,
                ]}
                source={Images.Up}
              />
            </Touchable>
          </View>
        </View>
        <View style={styles.line} />
        <Text style={[styles.cell, styles.headerText]}>Number of bananas</Text>
      </View>

      <FlatList
        data={data}
        renderItem={renderRow}
        keyExtractor={item => item.uid.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    marginVertical: 10,
  },
  header: {
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 2,
    borderColor: '#ccc',
  },
  headerText: {
    fontWeight: 'bold',
  },
  line: {
    width: 1,
    height: '100%',
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
  },
  sort: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  icon: {
    width: 12,
    height: 12,
    opacity: 0.4,
  },
  btn: {
    width: 16,
    height: 16,
    marginLeft: 5,
  },
  active: {
    opacity: 1,
  },
});

export default Table;
