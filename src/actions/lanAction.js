// lan th
export function Changelanth(lan = null) {
    return dispatch => {
      return dispatch(funcChangelanth(lan));
    };
  }
  
  function funcChangelanth(lan) {
    return dispatch => {
        dispatch({ type: 'CHANGELANTH_SUCC', payload: lan});
    };
  }

  // lan en
  export function Changelanen(lan = null) {
    return dispatch => {
      return dispatch(funcChangelanen(lan));
    };
  }
  
  function funcChangelanen(lan) {
    return dispatch => {
        dispatch({ type: 'CHANGELANEN_SUCC', payload: lan});
    };
  }