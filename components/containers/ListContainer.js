import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadMarkers, unloadMarkers } from '../../utils/actions';

export default function ListContainer() {
  const dispatch = useDispatch();
  const markers = useSelector(state => state.markers.markers);
  const [query, setQuery] = useState('');

  useEffect(() => {
    dispatch(loadMarkers());
    return () => {
      dispatch(unloadMarkers());
    };
  }, [dispatch]);

  const visible = markers.filter(item =>
    item.marker.title.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search deliveries"
        value={query}
        onChangeText={setQuery}
        autoCorrect={false}
      />
      <FlatList
        data={visible}
        keyExtractor={item => item.key}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.title}>{item.marker.title}</Text>
            <Text style={styles.subtitle}>
              {item.marker.coordinate.latitude} {item.marker.coordinate.longitude}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60 },
  search: {
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#eef0ee'
  },
  separator: { height: 1, backgroundColor: '#CED0CE', marginLeft: 16 },
  row: { paddingHorizontal: 16, paddingVertical: 12 },
  title: { fontSize: 16, fontWeight: '600' },
  subtitle: { fontSize: 13, color: '#6b6b6b', marginTop: 2 }
});
