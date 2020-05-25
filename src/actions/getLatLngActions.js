/** get LatLng */
export function getLatLngMapCurrent(latlng) {
  const checkEmpty = (e) => {
    switch (e) {
      case "":
      case 0:
      case "0":
      case null:
      case false:
      case typeof e == "undefined":
        return true;
      default:
        return false;
    }
  };

  return (dispatch) => {
    let setLatLng = {
      latitude: "",
      longitude: "",
    };
    if (!checkEmpty(latlng.latitude) && !checkEmpty(latlng.longitude)) {
      setLatLng = {
        latitude: latlng.latitude,
        longitude: latlng.longitude,
      };
      return dispatch({ type: "GET_LATLNG_DONE", data: setLatLng });
    } else {
      return dispatch({ type: "GET_LATLNG_EMPTY"});
    }
  };
}