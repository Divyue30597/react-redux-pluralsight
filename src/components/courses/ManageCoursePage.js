import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

class ManageCoursePage extends React.Component {
  componentDidMount() {
    const {}
    this.props.actions.loadCourses().catch((error) => {
      alert("Loading courses failed" + error);
    });

    this.props.actions.loadAuthors().catch((error) => {
      alert("Loading authors failed" + error);
    });
  }

  render() {
    return (
      <>
        <h1>Manage Course</h1>
        <br />
      </>
    );
  }
}

ManageCoursePage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

// This function determines what state is passed to our component via props
function mapStateToProps(state) {
  // debugger;
  return {
    courses: state.courses,
    authors: state.authors,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
