import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";

export function createCourse(course) {
  // debugger;
  return { type: types.CREATE_COURSE, payload: course };
}

function loadCourseSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, payload: courses };
}

export function loadCourses() {
  return function (dispatch) {
    return courseApi
      .getCourses()
      .then((courses) => {
        dispatch(loadCourseSuccess(courses));
      })
      .catch((error) => {
        throw error;
      });
  };
}
