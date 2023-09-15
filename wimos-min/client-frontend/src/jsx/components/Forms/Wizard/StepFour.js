import React from "react";
import { Card } from "react-bootstrap";

const StepFour = (props) => {
  const { handleSubmit, previousPage } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className="col-md-12">
        <h5>
          <b>Now we have only one Contract</b>
        </h5>
        <br />

        <Card body>
          <input
            type="radio"
            value="Dedicated"
            name="Dedicated"
            defaultChecked
          />
          Dedicated
        </Card>
        <Card body>
          <input type="radio" value="free" name="freee" disabled /> Free
        </Card>

        <br />
      </div>
    </form>
  );
};

export default StepFour;
