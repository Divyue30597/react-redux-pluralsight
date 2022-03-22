import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.CREATE_COURSE_SUCCESS: {
      // debugger;
      return [...state, { ...action.payload }];
    }
    case types.UPDATE_COURSE_SUCCESS: {
      return state.map((course) =>
        course.id === action.payload.id ? action.payload : course
      );
    }
    case types.LOAD_COURSES_SUCCESS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
