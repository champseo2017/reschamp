const initialState = {
  lanth: { data: null },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case "CHANGELANTH_SUCC":
      return { ...state, lanth: { data: action.payload } };
    default:
      return { ...state, lanth: { data: false } };
  }
};
