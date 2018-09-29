import firebase from './firebase';

export const loadLocations = () => (dispatch) => {
  dispatch(startLoadLocations());
  firebase.database().ref('locations').once('value', (snapshot) => {
    const data = snapshot.val();
    const formattedData = Object.keys(data).map(key => ({ key, ...data[key] }));
    dispatch(finishLoadLocations(formattedData));
  });

  // firebase.database().ref('locations').on('child_added', (snapshot) => {
  //   const location = { key: snapshot.key, ...snapshot.val() };
  //   dispatch(receiveLocation(location));
  // });
};

export const startLoadLocations = () => ({
  type: 'START_LOAD_LOCATIONS'
});

export const finishLoadLocations = (locations) => ({
  type: 'FINISH_LOAD_LOCATIONS',
  locations
});

// export const receiveLocation = (location) => ({
//   type: 'RECEIVE_LOCATION',
//   location
// });

// export const sendLocation = (location) => (dispatch) => {
//   firebase.database().ref('locations').push(location);
// };