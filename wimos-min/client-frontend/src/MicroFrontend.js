import React, { useEffect } from "react";
import './App.css';

function MicroFrontend({ name, host, history }) {
  //console.log("history", host);
  useEffect(() => {
    const scriptId = `micro-frontend-script-${name}`;

    const renderMicroFrontend = () => {
      try {
        window[`render${name}`](`${name}-container`, history);
      } catch (err) {
        console.log("window render issue: ", err);
      }
    };

    if (document.getElementById(scriptId)) {
      renderMicroFrontend();
      return;
    }

    fetch(`${host}/asset-manifest.json`)
      .then((res) => res.json())
      .then((manifest) => {
        const script = document.createElement("script");
        script.id = scriptId;
        script.crossOrigin = "";
        script.src = `${host}${manifest.files["main.js"]}`;
        script.onload = () => {
          renderMicroFrontend();
        };
        document.head.appendChild(script);
      })
      .catch((err) => {
        console.log("fetch err: ", err);
      });

    return () => {
      window[`unmount${name}`] && window[`unmount${name}`](`${name}-container`);
    };
  });

  return <main id={`${name}-container`} />;
}

MicroFrontend.defaultProps = {
  document,
  window,
};

export default MicroFrontend;
