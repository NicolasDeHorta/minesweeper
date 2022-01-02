import React from 'react';
import { Home } from './components/home/Home';

import './App.css';

function App() {
  return (
  
    <div className="App" onContextMenu={(e)=> e.preventDefault()}>
      <header className="App-header">
        <Home />
      </header>
    </div>
  );

}

export default App;
