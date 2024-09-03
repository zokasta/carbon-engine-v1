import { plugin } from "postcss";
import React, { createContext, useContext, useReducer, useEffect } from "react";

// Initial state
const initialState = {
  home: false,
  plugin: false,
  models: false,
  api: false,
  account: false,
  setting: false,
//   isLoading: false, // Added to the initial state
};

// Create context
const AppContext = createContext();

// Reducer function
const reducer = (state, action) => {
  console.log(action)
  switch (action.type) {
    case "plugin":
      return {
        ...state,
        plugin: action.payload.plugin,
      };
    case "UPDATE_STATE":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    // Load from localStorage
    const savedState = localStorage.getItem("appState");
    return savedState ? JSON.parse(savedState) : initial;
  });

  useEffect(() => {
    // Save to localStorage on state change
    localStorage.setItem("appState", JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
