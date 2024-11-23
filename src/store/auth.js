import { createContext, useContext, useReducer } from "react";
import { jwtDecode } from 'jwt-decode'


// Action types
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const SET_USER = 'SET_USER';


const initialState = {
  token: localStorage.getItem('token') || null, // Get token from localStorage
  user: null,
  isAuthenticated: false,
};

const authReducer = (state, action) => {

  switch (action.type) {

    case LOGIN:
      return {
        state,
        token: action.payload.token,
        isLoggedIn: true
      }

    case LOGOUT:
      return {
        state,
        token: null,
        isLoggedIn: false
      }

    case SET_USER:
      return {
        ...state,
        user: action.payload.user
      }

    default:
      return state;
  }

}

const AuthContext = createContext();

// helper function to extract user from jwt token
const createUserFromToken = (token) => {

  const decodedObj = jwtDecode(token);
  const user = {};
  user.name = decodedObj.name;
  user.role = decodedObj.role;
  user.id = decodedObj.id;

  return user;
}


export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (token) => {
    localStorage.setItem('token', token);
    try {
      const user = createUserFromToken(token);
      dispatch({ type: LOGIN, payload: { token } });
      dispatch({ type: SET_USER, payload: { user } });
    } catch (error) {
      console.log(error);
    }
  }

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT })
  }

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
}