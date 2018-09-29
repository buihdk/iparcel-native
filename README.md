# iParcel Native

## Roadmap:
* [ ] Location mocking to simulate driver moving along the path 
(inspiration: https://medium.com/quick-code/react-native-location-tracking-14ab2c9e2db8).
* [ ] Server side push notification for new added deliveries
  - [ ] driver is notified
  - [x] Map is updated with new marker/delivery added
* [ ] Create a random delivery (pickup to dropoff) in a 4km radius
(Distance can be calculated using [Great Circle formula](https://en.wikipedia.org/wiki/Great-circle_distance))
* [ ] Separate *presentational* and *container* components
* [x] Mocked up marker data with format that can be used with MapView.Marker API
* [x] Generated Map screen and List screen using Tab Navigator
* [x] Long press to add a new Marker
* [x] Accessed current location using Permission API
* [x] Implemented MapView using Expo's react-native-maps
* [x] Redux and Redux-Thunk for state management, Redux-Logger for debugging
* [x] Firebase for real-time location tracking database

### Wishlist:
* [ ] Direction for driver to a random delivery
(inspiration: https://medium.com/@ali_oguzhan/react-native-maps-with-google-directions-api-bc716ed7a366)

## Demo
<img src="iparcel.gif" alt="demo gif"/>