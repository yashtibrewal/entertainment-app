import { createContext, useContext, useReducer } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
// Action types
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const token = localStorage.getItem("token");

// Helper function to extract user from jwt token
function getUserFromToken(token) {
  if (!token) return null;
  const decodedObj = jwtDecode(token);
  const user = {
    name: decodedObj.name,
    role: decodedObj.role,
    email: decodedObj.email,
    id: decodedObj.id,
  };
  return user;
};
// Initial state
const initialState = {
  token, // Get token from localStorage
  user: getUserFromToken(token),
  isLoggedIn: !!token,
};


// Auth reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      const user = getUserFromToken(action.payload.token);
      console.log('user', user);
      return {
        token: action.payload.token,
        isLoggedIn: true,
        user: user,
      };

    case LOGOUT:
      return {
        token: null,
        isLoggedIn: false,
        user: null,
      };

    default:
      return state;
  }
};


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