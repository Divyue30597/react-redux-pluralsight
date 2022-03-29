import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";
import { apiCallError, beginApiCall } from "./apiStatusActions";

function loadAuthorSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, payload: authors };
}

export function loadAuthors() {
  return function (dispatch) {
    // could we handle this in the author and course fetch calls instead over in the api folder? Then we wouldn't have to remember to add this dispatch call to every Thunk. That's true, but there are some benefits to our current approach. We don't have to pass dispatch into our API calls. Now I could also choose to make the actual fetch calls within my Thunks instead of over in the api folder, but I prefer to keep my fetch calls in a separate file so that I can deal with that concern and isolation. Another advantage to my current approach is I can decide to not show a preloader for some Thunks.
    // As you'll see, this is useful when I want to do an optimistic create, update, or delete. In other words, sometimes I want to immediately update the user interface when someone clicks a button without them having to wait for the response to return. This technique is called optimistic updates and it makes UIs feel extremely responsive because they always respond instantly no matter the speed of the API call.
    dispatch(beginApiCall());
    return authorApi
      .getAuthors()
      .then((authors) => {
        dispatch(loadAuthorSuccess(authors));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
