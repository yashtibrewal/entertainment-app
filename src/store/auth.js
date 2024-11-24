import { createContext, useContext, useReducer } from "react";
import { jwtDecode } from 'jwt-decode'


// Action types
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';


const getUserFromToken = (token) => {
  const decodedObj = jwtDecode(token);
  const user = {};
  user.name = decodedObj.name;
  user.role = decodedObj.role;
  user.id = decodedObj.id;
  user.email = decodedObj.email;
  return user;
}

const token = localStorage.getItem('token');

const initialState = {
  token: token || null, // Get token from localStorage
  user: token ? getUserFromToken(token) : null,
  isLoggedIn: !!token,
};

const authReducer = (state, action) => {

  switch (action.type) {

    case LOGIN:
      console.log('Login')
      const user = getUserFromToken(action.payload.token);
      return {
        state,
        token: action.payload.token,
        isLoggedIn: true,
        user
      }

    case LOGOUT:
      return {
        state,
        token: null,
        isLoggedIn: false,
        user: null
      }

    default:
      return state;
  }

}

const AuthContext = createContext();

// helper function to extract user from jwt token

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (token) => {
    localStorage.setItem('token', token);
    try {
      dispatch({ type: LOGIN, payload: { token } });
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