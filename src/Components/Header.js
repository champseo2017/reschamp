import React, { Component } from "react";
import { locale } from "../locales/index";
import { connect } from "react-redux";
import { Changelanth, Changelanen } from "../actions/lanAction";

class Header extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      lanchange: null,
      description: "จงหิวและจงโง่อยู่เสมอ -Steve Jobs-"
    };
    //this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.initfuncinClicklan();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.datalanth === "th") {
      this.setState({
        description: locale.t("descriptionth")
      });
    } else if (nextProps.datalanen === "en") {
      this.setState({
        description: locale.t("descriptionen")
      });
    }
  }

  initfuncinClicklan = () => {
    let self = this;
    var thench = document.getElementById("th_click"),
      english = document.getElementById("en_click");

    thench.addEventListener(
      "click",
      function(e) {
        if (e) {
          new Promise(function(resolve, reject) {
            self.setState({
              lanchange: e.target.dataset.lan
            });
            resolve(true);
          }).then(function(value) {
            if (value) {
              self.props.Changelanth(self.state.lanchange);
            }
          });
        }
        langue(thench, english);
      },
      false
    );

    english.addEventListener(
      "click",
      function(e) {
        if (e) {
          new Promise(function(resolve, reject) {
            self.setState({
              lanchange: e.target.dataset.lan
            });
            resolve(true);
          }).then(function(value) {
            if (value) {
              self.props.Changelanen(self.state.lanchange);
            }
          });
        }
        langue(english, thench);
      },
      false
    );

    function langue(langueOn, langueOff) {
      if (!langueOn.classList.contains("current_lang")) {
        langueOn.classList.toggle("current_lang");
        langueOff.classList.toggle("current_lang");
      }
    }

    function init() {
      langue(thench, english);
    }
    init();
  };
  render() {
    var { description } = this.state;

    if (this.props.data) {
      var name = this.props.data.name;
      var occupation = this.props.data.occupation;
      var city = this.props.data.address.city;
      var networks = this.props.data.social.map(function(network) {
        return (
          <li key={network.name}>
            <a href={network.url}>
              <i className={network.className}></i>
            </a>
          </li>
        );
      });
    }

    return (
      <header id="home">
        <nav id="nav-wrap">
          <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
            Show navigation
          </a>
          <a className="mobile-btn" href="#home" title="Hide navigation">
            Hide navigation
          </a>

          <ul id="nav" className="nav">
            <li className="current">
              <a className="smoothscroll" href="#home">
                Home
              </a>
            </li>
            <li>
              <a className="smoothscroll" href="#about">
                About
              </a>
            </li>
            <li>
              <a className="smoothscroll" href="#resume">
                Resume
              </a>
            </li>
            <li>
              <a className="smoothscroll" href="#portfolio">
                Works
              </a>
            </li>
            <li>
              <a className="smoothscroll" href="#testimonials">
                Testimonials
              </a>
            </li>
            <li>
              <a className="smoothscroll" href="#contact">
                Contact
              </a>
            </li>
            <li
              style={{
                padding: "1rem",
                margin: "0.5%",
                height: "unset",
                cursor: "pointer"
              }}
              data-lan="th"
              id="th_click"
              className="button_lang current_lang"
            >
              Th
            </li>
            <li
              style={{ padding: "1rem", height: "unset", cursor: "pointer",margin: "0.5%" }}
              id="en_click"
              data-lan="en"
              className="button_lang"
            >
              En
            </li>
          </ul>
        </nav>
        <div className="row banner">
          <div className="banner-text">
            <h1 className="responsive-headline">I'm {name}</h1>
            <h3>{description}</h3>
            <hr />
            <ul className="social">{networks}</ul>
          </div>
        </div>

        <p className="scrolldown">
          <a className="smoothscroll" href="#about">
            <i className="icon-down-circle"></i>
          </a>
        </p>
      </header>
    );
  }
}

const mapDispatchToProps = {
  Changelanth,
  Changelanen
};

function mapStateToProps(state) {
  return {
    datalanth: state.lanthReducers.lanth.data,
    datalanen: state.lanenReducers.lanen.data
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
