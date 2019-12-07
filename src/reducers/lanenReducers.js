const initialState = {
  lanen: { data: null },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case "CHANGELANEN_SUCC":
      return { ...state, lanen: { data: action.payload } };
    default:
      return { ...state, lanen: { data: false } };
  }
};