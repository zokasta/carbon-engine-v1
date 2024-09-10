import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // Import your CSS file for global styles
import { FlowProvider } from "./context/FlowContext.jsx";
import { AppProvider } from "./context/Context.jsx";
// import { DnDProvider } from './context/DnDContext.jsx'; // Import DndContext
// import { DndProvider } from 'react-dnd';
import { DnDProvider } from "./context/DnDContext.jsx";


// Create the root element and render your app
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <FlowProvider>
        <DnDProvider>
          <App />
        </DnDProvider>
      </FlowProvider>
    </AppProvider>
  </React.StrictMode>
);
