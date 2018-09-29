import { createBottomTabNavigator } from 'react-navigation';
import MapContainer from './containers/MapContainer';
import ListContainer from './containers/ListContainer';

const Tabs = createBottomTabNavigator({
  Map: MapContainer,
  List: ListContainer
});

export default Tabs;