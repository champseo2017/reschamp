const initialState = {
  latlng: {
    lat: '',
    lng: '',
  },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_LATLNG_DONE":
      return {
        ...state,
        latlng: { lat: action.data.latitude, lng: action.data.longitude },
      };
    case "GET_LATLNG_EMPTY":
      return {
        ...state,
        latlng: { lat: 18.810444, lng: 98.961273 },
      };
    default:
      return { ...state, latlng: { lat: 18.810444, lng: 98.961273 } };
  }
};
