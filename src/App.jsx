


import React from "react";
import Chatbox from "./components/Chatbox";
import AnimatedSections from "./scenes/AnimatedSections.jsx";
import Scene from "./scenes/Scene.jsx";

const App = () => {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden" }}>
      {/* Background Animation */}
      <AnimatedSections />

      {/* Foreground Content */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex" }}>
        {/* Left side: 3D Scene (40% of screen) */}
        <div style={{ width: "40%", height: "100vh", position: "relative", zIndex: 2 }}>
          <Scene />
        </div>

        {/* Right side: Chatbox (60% of screen) */}
        <div
          style={{
            width: "60%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          <Chatbox />
        </div>
      </div>
    </div>
  );
};

export default App;
