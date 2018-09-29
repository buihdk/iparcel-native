import React, { Component } from 'react';
import { Platform, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { loadMarkers, sendMarker, setCurrentLocation } from '../../utils/actions';
import { Constants, Location, Permissions } from 'expo';
import { MapView } from 'expo';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { errorMessage: null };
    this.handleLongPress = this.handleLongPress.bind(this);
  }

  handleLongPress(e) {
    this.props.sendMarker({
      marker: {
        coordinate: e.nativeEvent.coordinate,
        title: 'New Marker',
        type: 'Point'
      }
    });
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    } else {
      // currentLocation is set to {latitude: 10.77, longitude: 106.696} by using Debug > Location > Custom Location...
      let myLocation = await Location.getCurrentPositionAsync({}); 
      this.props.setCurrentLocation(myLocation.coords);
    }
  };
  
  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({ errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!' });
    } else { this._getLocationAsync(); }
    this.props.loadMarkers();
  }

  render() {
    if (this.state.errorMessage)
      return <Text style={{margin: 60, textAlign: 'center'}}>{this.state.errorMessage}</Text>;
    else if (this.props.markers.length < 1 || this.props.markers == undefined || this.props.currentLatitude == undefined || this.props.currentLongitude == undefined)
      return <ActivityIndicator size='large' style={{marginTop: '50%'}}/>;
    else 
      return (
        <MapView
          // provider={ MapView.PROVIDER_GOOGLE } // uncomment this to use Google Map
          style={{ flex: 1 }}
          initialRegion={{
            latitude: this.props.currentLatitude,
            longitude: this.props.currentLongitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          onLongPress={this.handleLongPress}
          showsUserLocation = {true}
        >
          { 
            this.props.markers.map((marker,index) => { 
              console.log(marker.marker);
              return <MapView.Marker {...marker.marker} key={index}/> 
              })
          }  
        </MapView>
      );
  }
}

const mapStateToProps = (state) => ({
  markers: state.markers.markers,
  currentUser: state.loginInfo.currentUser,
  currentLatitude: state.loginInfo.currentLocation.latitude,
  currentLongitude: state.loginInfo.currentLocation.longitude
});

const mapDispatchToProps = (dispatch) => ({
  loadMarkers: () => dispatch(loadMarkers()),
  sendMarker: (marker) => dispatch(sendMarker(marker)),
  setCurrentLocation: (location) => dispatch(setCurrentLocation(location))
});

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);