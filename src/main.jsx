import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { FlowProvider } from "./context/FlowContext.jsx";
import { AppProvider } from "./context/Context.jsx";
// import '@xyflow/react/dist/style.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <FlowProvider>
        <App />
      </FlowProvider>
    </AppProvider>
  </React.StrictMode>
);
