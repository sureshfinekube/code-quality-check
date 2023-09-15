import React from "react";

import { Card } from "react-bootstrap";

const StepSeven = (props) => {
  const { handleSubmit, previousPage } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className="col-md-12">
        <h5>
          <b>Packages</b>
        </h5>
        <br />
        <Card body>
          <input
            type="radio"
            value="Dedicated"
            name="Dedicated"
            defaultChecked
          />
          Free Package
        </Card>
        <Card body>
          <input type="radio" value="Dedicated" name="Dedicated" /> Paid
          Package1
        </Card>

        <Card body>
          <input type="radio" value="Dedicated" name="Dedicated" /> Paid
          Package2
        </Card>
        <br />
      </div>
      {/* <Grid container justify="center">
        <button
          style={{
            width: "100px",
            height: "50px",
            // display: "block",
            textAlign: "center",
          }}
          type="submit"
          className="next btn btn-primary ms-1"
        >
          Pay
        </button>
      </Grid> */}
      <br />
    </form>
  );
};

export default StepSeven;
