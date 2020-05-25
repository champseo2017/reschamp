import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import PropTypes from "prop-types";
import config from '../configure'

const containerStyle = {
  position: "relative",
  width: "100%",
  height: "100%",
};

const API_MAP = config.API_KEY_MAP

let latlng = ''

const clickMap = (e) => {
  e.preventDefault();
  const url = `https://www.google.com.sa/maps/search/${latlng}`;
  window.open(url, '_blank');
}

const AnyReactComponent = ({lat, lng}) => {
  latlng = `${lat},${lng}`
  return <div onClick={clickMap}>
    <img src="https://img.icons8.com/offices/30/000000/marker.png" />
  </div>
};

class ApiIsLoaded extends Component {
  constructor(props) {
    super(props);
    this.createMapOptions = this.createMapOptions.bind(this);
  }

  static defaultProps = {
    centerInit: {
      lat: 18.810444,
      lng: 98.961273,
    },
    zoom: 16,
  };

  createMapOptions = (map) => {
    return {
      streetViewControl: true,
      zoomControl: true,
      scrollwheel: false,
      streetViewControlOptions: {
        position: map.ControlPosition.TOP_LEFT,
      },
      zoomControlOptions: {
        position: map.ControlPosition.LEFT_TOP, // as long as this is not set it works
        style: map.ZoomControlStyle.SMALL,
      },

      mapTypeControlOptions: {
        position: map.ControlPosition.BOTTOM_RIGHT, // this makes the map type control disappear
      },
      rotateControl: false,
      scaleControl: false,
    };
  };

  render() {
    const { center, centerInit, zoom } = this.props;

    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          options={this.createMapOptions}
          bootstrapURLKeys={{
            key:`${API_MAP}`,
            region: "th",
          }}
          yesIWantToUseGoogleMapApiInternals
          style={containerStyle}
          defaultCenter={centerInit}
          center={center}
          defaultZoom={zoom}
        >
          <AnyReactComponent lat={center.lat} lng={center.lng} />
        </GoogleMapReact>
      </div>
    );
  }
}

ApiIsLoaded.propTypes = {
  center: PropTypes.object.isRequired,
};

export default ApiIsLoaded;
