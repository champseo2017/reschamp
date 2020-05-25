import React, { Component } from "react";
import { connect } from "react-redux";
import GooglePlaces from "./GooglePlaces";
import ApiIsLoaded from "./ApiIsLoaded";

class About extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: {
        lat: 18.810444,
        lng: 98.961273,
      },
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.centerlatlng !== state.center) {
      return {
        center: props.centerlatlng,
      };
    }
    return null;
  }

  render() {
    const { center } = this.state;

    return (
      <section id="about">
        <div className="row">
          <GooglePlaces />
          <ApiIsLoaded center={center && center} />
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    centerlatlng: state.latlnggetReducers.latlng,
  };
}

export default connect(mapStateToProps)(About);
