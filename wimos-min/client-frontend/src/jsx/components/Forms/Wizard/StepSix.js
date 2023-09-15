import React from "react";
import { Button } from "react-bootstrap";

const StepSix = (props) => {
  const { handleSubmit, previousPage } = props;
  const [checked, setChecked] = React.useState();

  const handleChange = () => {
    setChecked(checked);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="col-md-12">
        <h5>
          Deployment Gas Fee: <b>ETH 100</b>
        </h5>
        <br />
        <div className="d-grid gap-2 ">
          <Button className="me-2" variant="outline-danger" size="lg">
            {" "}
            Payment with Metamask
          </Button>
        </div>
      </div>
      <br />
    </form>
  );
};

export default StepSix;
