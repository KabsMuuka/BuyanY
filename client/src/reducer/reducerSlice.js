// reducer.js
import { fetchMessages } from "../action/actionCreators";
import {
  LOGIN,
  REGISTER,
  SAVE_POST,
  PROFILE,
  LOGOUT,
  FETCH_POST,
  FETCH_MESSAGES,
  FETCH_USERS,
} from "../action/types/types";

const initialState = {
  auth: {
    isAuthenticated: false,
    accessToken: null,
  },
  profile: [],
  users: [],
  uploadPost: null,
  fetchPost: [],
  fetchMessages: [],
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    //this is been updated from authProvider, as a refresh token
    case "auth/updateAccessToken":
      return {
        ...state,
        auth: { isAuthenticated: true, accessToken: action.payload },
      };

    // LOGIN
    case `${LOGIN}/pending`:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case `${LOGIN}/fulfilled`:
      return {
        ...state,
        loading: false,
        auth: { isAuthenticated: true, accessToken: action.payload },
      };
    case `${LOGIN}/rejected`:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // REGISTER
    case `${REGISTER}/pending`:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case `${REGISTER}/fulfilled`:
      return {
        ...state,
        loading: false,
        auth: { isAuthenticated: true, accessToken: action.payload },
      };
    case `${REGISTER}/rejected`:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // PROFILE
    case `${PROFILE}/pending`:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case `${PROFILE}/fulfilled`:
      return {
        ...state,
        loading: false,
        profile: action.payload,
      };
    case `${PROFILE}/rejected`:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // USERS
    case `${FETCH_USERS}/pending`:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case `${FETCH_USERS}/fulfilled`:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case `${FETCH_USERS}/rejected`:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    // saving post
    case `${SAVE_POST}/pending`:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case `${SAVE_POST}/fulfilled`:
      return {
        ...state,
        loading: false,
        uploadPost: action.payload,
      };
    case `${SAVE_POST}/rejected`:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // fetch post
    case `${FETCH_POST}/pending`:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case `${FETCH_POST}/fulfilled`:
      return {
        ...state,
        loading: false,
        fetchPost: action.payload,
      };
    case `${FETCH_POST}/rejected`:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // fetch messages
    case `${FETCH_MESSAGES}/pending`:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case `${FETCH_MESSAGES}/fulfilled`:
      return {
        ...state,
        loading: false,
        fetchMessages: action.payload,
      };
    case `${FETCH_MESSAGES}/rejected`:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // LOGOUT
    case LOGOUT:
      return {
        ...state,
        auth: { isAuthenticated: false, accessToken: null },
        profile: {}, // Reset profile on logout
      };

    default:
      return state;
  }
};

export default authReducer;
