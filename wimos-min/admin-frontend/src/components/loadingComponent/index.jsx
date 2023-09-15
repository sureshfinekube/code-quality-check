import React from 'react';
import { Spinner } from 'reactstrap';

function LoadingComponent() {
  const style = {
    position: "absolute",
    height: "80px",
    width: "80px",
    top: "50%",
    left: "50%",
    "marginLeft": "-50px",
    "marginTop": "-50px",
  }

  return (
    <div className="loading"></div>
  )
}

export default LoadingComponent
