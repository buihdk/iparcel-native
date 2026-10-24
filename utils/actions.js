import { ref, onValue, push } from 'firebase/database';
import { db } from './firebase';

let detachMarkers = null;

export const loadMarkers = () => (dispatch) => {
  dispatch(startLoadMarkers());
  if (detachMarkers) detachMarkers();
  // A single value listener fires with the full list on attach and on every change.
  detachMarkers = onValue(ref(db, 'markers'), (snapshot) => {
    const data = snapshot.val() || {};
    const formattedData = Object.keys(data).map(key => ({ key, ...data[key] }));
    dispatch(finishLoadMarkers(formattedData));
  });
};

export const unloadMarkers = () => () => {
  if (detachMarkers) {
    detachMarkers();
    detachMarkers = null;
  }
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
  push(ref(db, 'markers'), marker);
};

export const setCurrentLocation = (location) => ({
  type: 'SET_CURRENT_LOCATION',
  location
});