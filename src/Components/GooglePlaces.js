import React, { Component } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import PropTypes from "prop-types";
import { getLatLngMapCurrent } from "../actions/getLatLngActions";
import { connect } from "react-redux";

export class GooglePlaces extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      browserNotSupport: "",
      latlng: {
        latitude: "",
        longitude: "",
      },
    };
    this.getLocation = this.getLocation.bind(this);
    this.showLocation = this.showLocation.bind(this);
    this.errorHandler = this.errorHandler.bind(this);
    this.placeRanDer = this.placeRanDer.bind(this);
    this.checkEmpty = this.checkEmpty.bind(this);
  }

  showLocation = (position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    const setLatLng = {
      latlng: {
        latitude: latitude,
        longitude: longitude,
      },
    };

    this.setState(setLatLng);
  };

  errorHandler = (err) => {
    if (err.code == 1) {
      const notSub = {
        browserNotSupport: "Error: Access is denied!",
        latlng: {
          latitude: "",
          longitude: "",
        },
      };
      this.setState(notSub);
    } else if (err.code == 2) {
      const notSub = {
        browserNotSupport: "Error: Position is unavailable!",
        latlng: {
          latitude: "",
          longitude: "",
        },
      };
      this.setState(notSub);
    }
  };

  getLocation = () => {
    if (navigator.geolocation) {
      // timeout at 60000 milliseconds (60 seconds)
      let options = { timeout: 60000 };
      navigator.geolocation.getCurrentPosition(
        this.showLocation,
        this.errorHandler,
        options
      );
    } else {
      const notSub = {
        browserNotSupport: "Sorry, browser does not support geolocation!",
        latlng: {
          latitude: "",
          longitude: "",
        },
      };
      this.setState(notSub);
    }
  };

  checkEmpty = (e) => {
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

  handleChange = (address) => {
    this.setState({ address });
  };
  handleSelect = (address) => {
    const self = this;
    const { getLatLngMapCurrent } = self.props;

    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        if (!self.checkEmpty(latLng)) {
          let setLatLng = {
            latitude: latLng.lat,
            longitude: latLng.lng,
          };

          getLatLngMapCurrent(setLatLng);
        }

      })
      .catch((error) => console.error("Error", error));
  };

  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.getLocation();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this._isMounted) {
      if (prevState.latlng !== this.state.latlng) {
        const { getLatLngMapCurrent } = this.props;
        const { latlng } = this.state;
        getLatLngMapCurrent(latlng);
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  placeRanDer = () => {
    const { latlng } = this.state;

    const center = new window.google.maps.LatLng(
      !this.checkEmpty(latlng.latitude) ? latlng.latitude : 18.8939788,
      !this.checkEmpty(latlng.longitude) ? latlng.longitude : 98.99791549999999
    );

    const setLatLng = {
      lat: !this.checkEmpty(latlng.latitude) ? latlng.latitude : 18.8939788,
      lng: !this.checkEmpty(latlng.longitude)
        ? latlng.longitude
        : 98.99791549999999,
    };

    return (
      <React.Fragment>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          highlightFirstSuggestion={true}
          shouldFetchSuggestions={this.state.address.length > 3}
          debounce={300}
          searchOptions={{
            location: center,
            radius: "500",
            componentRestrictions: {
              country: ["th"],
            },
            types: ["establishment"],
          }}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: "Search Seafood Shop ...",
                  className: "location-search-input",
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </React.Fragment>
    );
  };

  render() {
    const { latlng } = this.state;

    return (
      <React.Fragment>
        {!this.checkEmpty(latlng.latitude) &&
        !this.checkEmpty(latlng.longitude) ? (
          this.placeRanDer()
        ) : (
          <p className="place-text">Please allow location</p>
        )}
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  getLatLngMapCurrent,
};

export default connect(null, mapDispatchToProps)(GooglePlaces);
