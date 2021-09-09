import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Logos from "./misc/Logos";
import "../css/Logo.css";

class HomePage extends React.Component {
  componentDidMount() {
    //console.log("homepage", this.props.auth);
  }

  render() {
    return (
      <div>
        <div className="ui three column middle aligned grid centered">
          <Link to={`/Finance`} className="column">
            <Logos img_purpose="Finance" icon_details="small" />
          </Link>
          <Link to={`/Social`} className="column">
            <Logos img_purpose="Social" icon_details="small" />
          </Link>
          <Link to={`/Climate`} className="column">
            <Logos img_purpose="Climate" icon_details="small" />
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authenticate,
  };
};

export default connect(mapStateToProps)(HomePage);
