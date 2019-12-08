import React, { Component } from "react";
import { connect } from "react-redux";
import { locale } from "../locales/index";

class About extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      bioth:
        "ชื่อแชมป์เป็นเด็กที่เติมโต ในสถานรับเลี้ยงเด็กกำพร้าที่เชียงใหม่ สนใจในการเขียนโปรแกรม และ ได้เริ่มศึกษาด้วยตนเองเรื่อยมา การศึกษานั้นจบจากมหาวิทยาลัยแม่โจ้ในสาขาระบบสารสนเทศทางธุรกิจของคณะบริหาร",
      AboutMeth: "เกียวกับฉัน",
      Contactth: "รายละเอียดการติดต่อ"
    };
    //this.handleClick = this.handleClick.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.datalanth === "th") {
      this.setState({
        bioth: locale.t("bioth"),
        AboutMeth: locale.t("AboutMeth"),
        Contactth: locale.t("Contactth")
      });
    } else if (nextProps.datalanen === "en") {
      this.setState({
        bioth: locale.t("bioen"),
        AboutMeth: locale.t("AboutMeen"),
        Contactth: locale.t("Contacten")
      });
    }
  }
  render() {
    var { bioth, AboutMeth,Contactth } = this.state;
    if (this.props.data) {
      var name = this.props.data.name;
      var profilepic = "images/" + this.props.data.image;
      var bio = this.props.data.bio;
      var street = this.props.data.address.street;
      var city = this.props.data.address.city;
      var state = this.props.data.address.state;
      var zip = this.props.data.address.zip;
      var phone = this.props.data.phone;
      var email = this.props.data.email;
      var resumeDownload = this.props.data.resumedownload;
    }

    return (
      <section id="about">
        <div className="row">
          <div className="three columns">
            <img
              className="profile-pic"
              src={profilepic}
              alt="Tim Baker Profile Pic"
            />
          </div>
          <div className="nine columns main-col">
            <h2>{AboutMeth}</h2>
            <p>{bioth}</p>
            <div className="row">
              <div className="columns contact-details">
                <h2>{Contactth}</h2>
                <p className="address">
                  <span>{name}</span>
                  <br />
                  <span>
                    {street}
                    <br />
                    {city} {state}, {zip}
                  </span>
                  <br />
                  <span>{phone}</span>
                  <br />
                  <span>{email}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    datalanth: state.lanthReducers.lanth.data,
    datalanen: state.lanenReducers.lanen.data
  };
}

export default connect(mapStateToProps)(About);
