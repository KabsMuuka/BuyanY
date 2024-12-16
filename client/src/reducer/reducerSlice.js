// reducer.js
import { LOGIN, REGISTER, PROFILE, LOGOUT } from "../action/types/types";

const initialState = {
  auth: {
    isAuthenticated: false,
    accessToken: null,
  },
  profile: {},
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  console.log(action);
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
