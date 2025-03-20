import React from 'react';
import Chatbox from './components/Chatbox';
import Scene from './scenes/Scene';

const App = () => {
  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      {/* Left side: 3D Scene (40% of screen) */}
      <div style={{ width: '40%', height: '100vh' }}>
        <Scene />
      </div>

      {/* Right side: Chatbox (60% of screen) */}
      <div style={{ width: '60%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Chatbox />
      </div>
    </div>
  );
};

export default App;