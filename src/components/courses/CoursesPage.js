import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false,
  };
  componentDidMount() {
    const { authors, courses, actions } = this.props;
    if (courses.length === 0) {
      actions.loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
  }

  handleDeleteCourse = (course) => {
    toast.success("Course deleted!!");
    this.props.actions.deleteCourse(course).catch((error) => {
      toast.error("Delete failed!! " + error.message, { autoClose: false });
    });
  };

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h1>Courses</h1>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>
            <CourseList
              onDeleteClick={this.handleDeleteCourse}
              courses={this.props.courses}
            />
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

// This function determines what state is passed to our component via props
function mapStateToProps(state) {
  // debugger;
  return {
    // Be specific. Request only the data your component needs. For example, if you expose entire redux store, the component will rerender when any data changes in the redux store.
    // ownProps -> This param lets us access props that are being attached to this component. It's reference to the component's own props.
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find(
                (author) => author.id === course.authorId
              ).name,
            };
          }),
    authors: state.authors,
    loading: state.apiCallStatus > 0,
  };
}

// mapDispatchToProps -> this function lets us declare what action to pass to our component on props. (optional to connect method). When we omit it, our component gets a dispatch prop injected automatically.

function mapDispatchToProps(dispatch) {
  // Options for when to load the courses: 1. When app loads (useless if the user does not visit that page.) 2. When course page is loaded.
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
