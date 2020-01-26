import React from "react";
import "./App.css";

import Monaco from "./components/Editor/Monaco";
import DirectoryListing from "./components/FolderStructure/DirectoryListing";

function App() {
  return (
    <div className="full_height app_editor_wrapper">
      <div className="sidebar_wrapper">
        <DirectoryListing />
      </div>
      <div className="monaco_editors_wrapper">
        <Monaco language="php" theme="vs-dark" />
      </div>
    </div>
  );
}

export default App;
