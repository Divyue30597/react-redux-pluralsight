import React from "react";

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
    alert(this.state.course.title);
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
      </form>
    );
  }
}

export default CoursesPage;
