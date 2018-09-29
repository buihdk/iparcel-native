import firebase from './firebase';

export const loadMarkers = () => (dispatch) => {
  dispatch(startLoadMarkers());
  firebase.database().ref('markers').once('value', (snapshot) => {
    const data = snapshot.val();
    const formattedData = Object.keys(data).map(key => ({ key, ...data[key] }));
    dispatch(finishLoadMarkers(formattedData));
  });

  firebase.database().ref('markers').on('child_added', (snapshot) => {
    const marker = { key: snapshot.key, ...snapshot.val() };
    dispatch(receiveMarker(marker));
  });
};

export const startLoadMarkers = () => ({
  type: 'START_LOADING_MARKERS'
});

export const finishLoadMarkers = (markers) => ({
  type: 'FINISH_LOADING_MARKERS',
  markers
});

export const receiveMarker = (marker) => ({
  type: 'RECEIVE_MARKER',
  marker
});

export const sendMarker = (marker) => () => {
  firebase.database().ref('markers').push(marker);
};

export const setCurrentLocation = (location) => ({
  type: 'SET_CURRENT_LOCATION',
  location
});