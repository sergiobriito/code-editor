import React, { useEffect } from 'react';
import "./App.css";
import CodeEditorWindow from './components/CodeEditorWindow.js';

function App() {

  useEffect(() => {
    document.title = 'Editor de código (IDE)';
  }, []);

  return (
    <>
      <div className="App">
        <CodeEditorWindow></CodeEditorWindow>
      </div>
    </>
  );
}

export default App;
