import firebase from './firebase';

export const loadMarkers = () => (dispatch) => {
  dispatch(startLoadMarkers());
  // Use a single value listener. It fires with the full list on attach and on
  // every change. This avoids loading each marker twice and lets us detach with
  // off() on unmount.
  firebase.database().ref('markers').on('value', (snapshot) => {
    const data = snapshot.val() || {};
    const formattedData = Object.keys(data).map(key => ({ key, ...data[key] }));
    dispatch(finishLoadMarkers(formattedData));
  });
};

export const unloadMarkers = () => () => {
  firebase.database().ref('markers').off('value');
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