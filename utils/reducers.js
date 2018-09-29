const initialState = {
  markers: {
    markers: [],
  },
  loginInfo: {
    currentUser: 'Khoa',
    'currentLocation': {
      'latitude': null, 
      'longitude': null
    }
  }
};

export const markers = (state = initialState.markers, action) => {
  switch(action.type) {
  case 'START_LOADING_MARKERS': {
    return {
      ...state,
    };
  }
  case 'FINISH_LOADING_MARKERS': {
    return {
      ...state,
      markers: action.markers
    };
  }
  case 'RECEIVE_MARKER': {
    return {
      ...state,
      markers: state.markers.concat(action.marker)
    };
  }
  default:
    return state;
  }
};

export const loginInfo = (state = initialState.loginInfo, action) => {
  switch(action.type) {
    case 'SET_CURRENT_LOCATION': {
      return {
        ...state,
        currentLocation: action.location
      };
    }
    default:
      return state;
    }
}