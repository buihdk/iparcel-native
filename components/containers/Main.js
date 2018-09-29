import React, { Component } from 'react'

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: []
    };
    this.handleLongPress = this.handleLongPress.bind(this);
  }

  handleLongPress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
        }
      ]
    });
    console.log(e.nativeEvent.coordinate);
    console.log(this.state.markers);
  }
  
  render() {
    if (this.props.latitude == null && this.props.longitude == null)
      return <ActivityIndicator size='large' style={{marginTop: '50%'}}/>;
    else 
      return (
        <MapView
          style={{ flex: 1 }}
          onRegionChangeComplete={region => this.setState({ currentView: region })}
          initialRegion={{
            latitude: this.props.latitude ? this.props.latitude : 10,
            longitude: this.props.longitude ? this.props.longitude : 10,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onLongPress={this.handleLongPress}
        >
          { this.state.markers.map((marker,index) => { return <MapView.Marker {...marker} key={index}/> })}
        </MapView>
      );
  }
}