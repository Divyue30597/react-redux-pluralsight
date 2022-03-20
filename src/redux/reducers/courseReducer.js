import * as types from "../actions/actionTypes";

export default function courseReducer(state = [], action) {
  switch (action.type) {
    case types.CREATE_COURSE: {
      // debugger;
      return [...state, { ...action.payload }];
    }
    default: {
      return state;
    }
  }
}
