import React, { Component } from 'react';
import { connect } from "react-redux";
import { locale } from "../locales/index";

class Portfolio extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      Educationth:"การศึกษา"
    };
    //this.handleClick = this.handleClick.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.datalanth === "th") {
      this.setState({
        Educationth: locale.t("Educationth"),
      });
    } else if (nextProps.datalanen === "en") {
      this.setState({
        Educationth: locale.t("Educationen"),
      });
    }
  }
  render() {

    if(this.props.data){
      var projects = this.props.data.projects.map(function(projects){
        var projectImage = 'images/portfolio/'+projects.image;
        return <div key={projects.title} className="columns portfolio-item">
           <div className="item-wrap">
            <a href={projects.url} title={projects.title}>
               <img alt={projects.title} src={projectImage} />
               <div className="overlay">
                  <div className="portfolio-item-meta">
                 <h5>{projects.title}</h5>
                     <p>{projects.category}</p>
                  </div>
                </div>
              <div className="link-icon"><i className="fa fa-link"></i></div>
            </a>
          </div>
        </div>
      })
    }

    return (
      <section id="portfolio">

      <div className="row">

         <div className="twelve columns collapsed">

            <h1>Check Out Some of My Works.</h1>

            <div id="portfolio-wrapper" className="bgrid-quarters s-bgrid-thirds cf">
                {projects}
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

export default connect(mapStateToProps)(Portfolio);
