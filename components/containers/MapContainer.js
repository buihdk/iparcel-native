import React, { useEffect, useState } from 'react';
import { Platform, Text, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import { loadMarkers, unloadMarkers, sendMarker, setCurrentLocation } from '../../utils/actions';

export default function MapContainer() {
  const dispatch = useDispatch();
  const markers = useSelector(state => state.markers.markers);
  const { latitude, longitude } = useSelector(state => state.loginInfo.currentLocation);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        if (!cancelled) setErrorMessage('Permission to access location was denied');
        return;
      }
      // In a simulator, set the location with Features > Location > Custom Location.
      const myLocation = await Location.getCurrentPositionAsync({});
      if (!cancelled) dispatch(setCurrentLocation(myLocation.coords));
    };

    if (Platform.OS === 'android' && !Constants.isDevice) {
      setErrorMessage('This will not work in an Android emulator. Try it on a device.');
    } else {
      getLocation();
    }
    dispatch(loadMarkers());

    return () => {
      cancelled = true;
      dispatch(unloadMarkers());
    };
  }, [dispatch]);

  const handleLongPress = (e) => {
    dispatch(sendMarker({
      marker: {
        coordinate: e.nativeEvent.coordinate,
        title: 'New Marker',
        type: 'Point'
      }
    }));
  };

  if (errorMessage) {
    return <Text style={{ margin: 60, textAlign: 'center' }}>{errorMessage}</Text>;
  }
  if (latitude == null || longitude == null) {
    return <ActivityIndicator size="large" style={{ marginTop: '50%' }} />;
  }
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}
      onLongPress={handleLongPress}
      showsUserLocation
    >
      {markers.map(item => (
        <Marker
          key={item.key}
          title={item.marker.title}
          coordinate={item.marker.coordinate}
        />
      ))}
    </MapView>
  );
}
