import React, { Component } from "react";
import { connect } from "react-redux";
import { locale } from "../locales/index";

class Resume extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      Educationth: "การศึกษา",
      schoolth: "มหาวิทยาลัย?",
      degreeth: "มหาวิทยาลัยแม่โจ้ ปริญญาตรี",
      graduatedth: "กุมภาพันธ์ 2016",
      UniversityDetailsen: null,
      Work: null
    };
    //this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.datalanth !== this.props.datalanth &&
      nextProps.datalanth === "th"
    ) {
      if (this._isMounted) {
        let copystate = { ...this.state };
        copystate.UniversityDetailsen = null;
        copystate.Work = null;
        this.setState({
          Educationth: locale.t("Educationth"),
          schoolth: locale.t("schoolth"),
          degreeth: locale.t("degreeth"),
          graduatedth: locale.t("graduatedth"),
          UniversityDetailsen: copystate.UniversityDetailsen,
          Work: copystate.Work
        });
      }
    } else if (
      nextProps.datalanen !== this.props.datalanen &&
      nextProps.datalanen === "en"
    ) {
      if (this._isMounted) {
        let copystate = { ...this.state };
        copystate.UniversityDetailsen = locale.t("UniversityDetailsen");
        copystate.Work = locale.t("Worken");
        this.setState({
          Educationth: locale.t("Educationen"),
          schoolth: locale.t("schoolen"),
          degreeth: locale.t("degreeen"),
          graduatedth: locale.t("graduateden"),
          UniversityDetailsen: copystate.UniversityDetailsen,
          Work: copystate.Work
        });
      }
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    var {
      Educationth,
      schoolth,
      degreeth,
      graduatedth,
      UniversityDetailsen,
      Work
    } = this.state;

    if (this.props.data) {
      var skillmessage = this.props.data.skillmessage;
      var education = this.props.data.education.map(function(education) {
        return (
          <div key={education.school}>
            <h3>{schoolth}</h3>
            <p className="info">
              {degreeth} <span>&bull;</span>
              <em className="date">{graduatedth}</em>
            </p>
            <p>
              {!UniversityDetailsen
                ? education.description
                : UniversityDetailsen}
            </p>
          </div>
        );
      });
      var work = this.props.data.work.map(function(work) {
        return (
          <div key={work.company}>
            <h3>{work.company}</h3>
            <p className="info">
              {work.title}
              <span>&bull;</span> <em className="date">{work.years}</em>
            </p>
            <p>{work.description}</p>
          </div>
        );
      });
      var skills = this.props.data.skills.map(function(skills) {
        var className = "bar-expand " + skills.name.toLowerCase();
        return (
          <li key={skills.name}>
            <span style={{ width: skills.level }} className={className}></span>
            <em>{skills.name}</em>
          </li>
        );
      });
    }

    return (
      <section id="resume">
        <div className="row education">
          <div className="three columns header-col">
            <h1>
              <span>{Educationth}</span>
            </h1>
          </div>

          <div className="nine columns main-col">
            <div className="row item">
              <div className="twelve columns">{education}</div>
            </div>
          </div>
        </div>

        <div className="row work">
          <div className="three columns header-col">
            <h1>
              <span>{!Work ? "งาน" : Work}</span>
            </h1>
          </div>

          <div className="nine columns main-col">{work}</div>
        </div>

        <div className="row skill">
          <div className="three columns header-col">
            <h1>
              <span>Skills</span>
            </h1>
          </div>

          <div className="nine columns main-col">
            <p>{skillmessage}</p>

            <div className="bars">
              <ul className="skills">{skills}</ul>
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

export default connect(mapStateToProps)(Resume);
