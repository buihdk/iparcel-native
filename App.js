import React, { Component } from 'react';
import { Platform, Text } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import Map from './Map';

export default class App extends Component {
  state = {
    location: null,
    latitude: null,
    longitude: null,
    errorMessage: null,
  };

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    } else {
      let location = await Location.getCurrentPositionAsync({});
      this.setState({ 
        location: location,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
    }
  };

  render() {
    if (this.state.errorMessage) {
      return <Text style={{margin: 60, textAlign: 'center'}}>{this.state.errorMessage}</Text>;
    }
    return (
      <Map 
        latitude = { this.state.latitude }
        longitude = { this.state.longitude }
      />
    );
  }
}