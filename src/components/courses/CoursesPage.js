import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

class CoursesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {
        title: "",
      },
    };
  }

  handleChange = (event) => {
    // Here we cloned our state and then updated our value using the setState. Now we get an error saying this is undefined, which means that this keyword value is set to undefined and the state is getting updated. So in order to solve this issue we can either bind this to the onChange event handling, like onChange={this.handleChange.bind(this)} -> Not a correct approach though because it causes a new function create unnecessarily. And second approach is to create this.handleChange = this.handleChange.bind(this) -> binding in contructor. This is better approach the function is bound once and it wont be reallocated on every render. The other approach is to conver this function to arrow function. This is called class field. this works because arrow functions inherit the binding context of their enclosing scope. Basically, arrow functions don't have a this binding, so the this keyword inside references our class instance. In summary, I suggest using this approach to avoid binding issues and event handlers on class components.
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // Remember, you have to dispatch an action. If we merely called courseActions.createCourse without wrapping it in dispatch, then it won't do anything. It would just be a function that would return an object.
    // this is one way of dispatching and action, other way is to use mapDispatchToProps and using bindActionCreators
    // debugger;
    this.props.actions.createCourse(this.state.course);
    // alert(this.state.course.title);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Courses</h1>
        <br />
        <h3>Add Course</h3>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.course.title}
        />
        <input type="submit" value="Save" />
        {this.props.courses.map((course) => (
          <div key={course.title}>{course.title}</div>
        ))}
      </form>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

// This function determines what state is passed to our component via props
function mapStateToProps(state) {
  // debugger;
  return {
    // Be specific. Request only the data your component needs. For example, if you expose entire redux store, the component will rerender when any data changes in the redux store.
    // ownProps -> This param lets us access props that are being attached to this component. It's reference to the component's own props.
    courses: state.courses,
  };
}

// mapDispatchToProps -> this function lets us declare what action to pass to our component on props. (optional to connect method). When we omit it, our component gets a dispatch prop injected automatically.

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
