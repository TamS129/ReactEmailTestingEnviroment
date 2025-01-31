// components/App.jsx
import React from 'react';
import EmailBugTest from './EmailBugTest';
import RenderEmailBugTest from './RenderBugTest';

function App() {
  return (
    <div>
      <h2>Simply exporting into a string</h2>
      <EmailBugTest /> 

      <RenderEmailBugTest/>
    </div>
  );
}

export default App;