import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import { SearchBar, List, ListItem } from 'react-native-elements';
import { loadMarkers } from '../../utils/actions';
import PropTypes from 'prop-types';

class ListContainer extends Component {
  renderSeparator = () => {
    return (
      <View style={{ height: 1, width: '86%', backgroundColor: '#CED0CE', marginLeft: '14%' }} />
    );
  };
  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };
  componentDidMount() {
    if (this.props.markers.length < 1 || this.props.markers == undefined)
      this.props.loadMarkers();
  }
  render() {
    return (
      <View>
        <List containerStyle={{ marginTop: 40, borderTopWidth: 0, borderBottomWidth: 0 }}>
          <FlatList
            data={this.props.markers}
            renderItem={({ item }) => (
              <ListItem
                roundAvatar
                title={`${item.marker.title}`}
                subtitle={`${item.marker.coordinate.latitude} ${item.marker.coordinate.longitude}`}
                avatar={{ uri: 'https://placeimg.com/100/100/any' }}
                containerStyle={{ borderBottomWidth: 0 }}
              />
            )}
            keyExtractor={item => item.key} // temporary key for now
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
          />
        </List>
      </View> 
    );
  }
}

ListContainer.propTypes = {
  markers: PropTypes.array.isRequired, 
  loadMarkers: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  markers: state.markers.markers,
});

const mapDispatchToProps = (dispatch) => ({
  loadMarkers: () => dispatch(loadMarkers())
});

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);