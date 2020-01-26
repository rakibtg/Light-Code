import React, { useEffect, useRef } from "react";
import "./Monaco.css";

function Monaco(props) {
  const editorRef = useRef(null);
  useEffect(() => {
    const { language = false, theme = "vs-light" } = props;
    let editor = null;
    let editorModel = null;
    // console.log({ language, theme });
    var init = function() {
      editor = window.monaco.editor.create(editorRef.current, {
        theme: "vs-dark"
      });
      editorModel = editor.getModel();
      // Remove window load event listener
      window.removeEventListener("load", init);
      window.monaco.editor.setTheme(theme);
      if (language) {
        window.monaco.editor.setModelLanguage(editorModel, language);
      }
    };
    window.addEventListener("load", init);
  }, [props]);

  return (
    <div className="editor_wrapper">
      <div className="editor_container" ref={editorRef}></div>
    </div>
  );
}

export default Monaco;
