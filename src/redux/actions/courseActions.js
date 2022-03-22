import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";

function loadCourseSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, payload: courses };
}

function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, payload: course };
}

function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, payload: course };
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

export function saveCourses(course) {
  return function (dispatch, getState) {
    return courseApi
      .saveCourse(course)
      .then((savedCourses) => {
        course.id
          ? dispatch(updateCourseSuccess(course))
          : dispatch(createCourseSuccess(course));
      })
      .catch((error) => {
        throw error;
      });
  };
}
