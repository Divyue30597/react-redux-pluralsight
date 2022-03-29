import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { courses, newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

// class ManageCoursePage extends React.Component {
//   componentDidMount() {
//     const { authors, courses, loadAuthors, loadCourses } = this.props;
//     if (courses.length === 0) {
//       loadCourses().catch((error) => {
//         alert("Loading courses failed" + error);
//       });
//     }

//     if (authors.length === 0) {
//       loadAuthors().catch((error) => {
//         alert("Loading authors failed" + error);
//       });
//     }
//   }

//   render() {
//     return (
//       <>
//         <h1>Manage Course</h1>
//         <br />
//       </>
//     );
//   }
// }
function ManageCoursePage({
  authors,
  courses,
  history,
  loadAuthors,
  loadCourses,
  // now calling saveCourse in our component will call the saveCourse function we just bound to dispatch in mapDispatchToProps. instead of the simple saveCourse function which is imported up above.
  saveCourses,
  // we use rest operator to assign a new property which we have not destructured to an object called props.
  ...props
}) {
  // Why not use redux here?? the reason is that's typically unnecessary, and it leads to extra complexity. Avoid using Redux for all your state. Plain React state remains useful for local state. Use Redux for more global values. So if you're wondering when to use local form state versus Redux, ask yourself, who cares about this data? If only one component or a small related group of components cares about the data, then just use plain React state. Keep it local. Typically with a form, only a single component cares about the unsaved data, so local React state makes sense for most forms, as well as for any state that a single component or a small subset of components needs.
  const [course, setCourse] = useState({ ...props.course });
  // 2. See state is being initialized right here in this useState call, and this happens on initial load before the list of courses is available. So this logic on line 46 is performed once based on the course data that's available when the component is mounted. The problem is when the component is mounted, no course data is available quite yet. It's an asynchronous call. look for 3. below (useEffect)
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    } else {
      setCourse({ ...props.course });
    }

    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
  }, [props.course]);
  // }, []); -> Initially making useEffect run only once.
  // 3. We have the course form populating in some cases, but it still doesn't populate when we load the page directly. Why? Well, because when the props change, we need to update our component state. This can be easily solved by tweaking our useEffect hook. Right now, the useEffect hook only runs once when the component mounts. Instead, we want it to run any time that a new course is passed in on props. This way, up here, we can say that if we do have courses available, we would like to set our course in state to the course passed in on props. So this will copy the course passed in on props over into state any time that a new course is passed in on props.

  function handleChange(event) {
    // 3. This destructure avoids the event getting garbage collected so that it's available within the nested setCourse callback. And it is necessary as well so that we can access the event inside the setState function
    const { name, value } = event.target;
    // 1. Here we are using the functional form of setState here so that I can safely reference the previous state as I set new state. Remember, you can pass either an object or a function to setState.
    setCourse((prevCourse) => ({
      // 2. Here we are using JavaScript's computed property syntax so that I can reference a property using a variable. So, for example, if the input that just changed was the title field, this code is equivalent to saying course.title.
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  }

  function formIsValid() {
    const { title, authorId, category } = courses;
    const errors = {};
    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveCourses(course)
      .then(() => {
        toast.success("Course Saved.");
        history.push("/courses");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course} // 1. The course we are passing here is declared at the top which makes it the copy of props.course. And we needed to make that copy so that we could hold data in state as we edited the course. for 2. (look in component)
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourses: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

// This is a selector function. Because it collects data from the redux store.
export function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug) || null;
}

// This function determines what state is passed to our component via props
// ownProps -> This lets us access the component's props. We can use this to read the URL data injected on props by react router.
// Remember, mapStateToProps runs everytime the redux store changes. So when courses are available, we'll call getCourseBySlug
function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  // debugger;
  // If we look over in app.js, we can see that the route for this component says that the second segment of the URL has a placeholder that represents the slug. This means that it will be available on ownProps.match.params.slug.

  // Now we want to set the course to the requested course if there's a slug in the URL or to an empty course otherwise. How?? -> So if the user is requesting an existing course, we need to get the course that they requested. How do we do that? Well, it should be available in state, so we just need to pluck the right course out of state on this line.
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;

  return {
    // Here we are passing an empty course
    course: course,
    courses: state.courses,
    authors: state.authors,
  };
}

// If we declare mapDispatchToProps as an object instead, each property will automaticallly be bound to dispatch. (For initial mapDispatchToProps function look at CoursePage.js file.)
const mapDispatchToProps = {
  saveCourses: courseActions.saveCourses,
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
