import React, { useState } from "react";
import { Row, Card, CardBody, CardTitle } from "reactstrap";
import Breadcrumb from "containers/navs/Breadcrumb";
import { Separator, Colxx } from "components/common/CustomBootstrap";
import { colors } from "constants/defaultValues";

const ClientView = (props) => {
  const [client] = useState(props.location.state);
  //console.log(client)
  return (
    <div>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.client" match={props.match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row className="equal-height-container mb-5">
        <Colxx md="12" lg="12" className="col-item mb-4">
          <Card>
            <CardBody className="pt-5 pb-5 d-flex flex-lg-column flex-md-row flex-sm-row flex-column">
              <div className="price-top-part">
                <i
                  className="large-icon iconsminds-male"
                  style={
                    client.status
                      ? {
                          background: "#ffffff",
                          color: "#4d4e4e",
                          borderRadius: "45px",
                          fontSize: "45px",
                          border: "3px solid #26cc29",
                        }
                      : {
                          background: "#ffffff",
                          color: "#4d4e4e",
                          borderRadius: "45px",
                          fontSize: "45px",
                          border: "3px solid #4d4e4e",
                        }
                  }
                />
                <br></br>
                <p className="text-large mb-2 text-default">{client.name}</p>
                <h5 className="mb-0 font-weight-semibold color-theme-1">
                  {client.username}
                </h5>
                <p className="text-muted text-small">{client.email}</p>
              </div>

              {/* <div className="pl-3 pr-3 pt-3 pb-0 d-flex price-feature-list flex-column flex-grow-1">
                    <ul className="list-unstyled">
                        
                            <li >
                            <p className="mb-0">Phone Number : {client.phone_number}</p>
                            </li>
                            <li >
                            <p className="mb-0">Store Name : {client.store_name}</p>
                            </li>
                            <li >
                            <p className="mb-0">Domain Name : {client.domain_name}</p>
                            </li>
                            <li >
                            <p className="mb-0">Nationality : {client.nationality}</p>
                            </li>
                            <li >
                            <p className="mb-0">Network : {client.network}</p>
                            </li>
                            <li >
                            <p className="mb-0">Wallet ID : {client.wallet_id}</p>
                            </li>
                            <li >
                            <p className="mb-0">Current Package : Basic</p>
                            </li>
                            <li >
                            <p className="mb-0">Renual Date : 07/12/2022</p>
                            </li>
                            

                        
                    </ul>
                    <div className="text-center">
                    </div>
                    </div> */}
            </CardBody>
            {/* <Row>
                    <Colxx xxs="6">
                
                        <CardBody>
                        <h6>Phone Number : {client.phone_number}</h6>
                        <h6>Nationality : {client.nationality}</h6>
                        <h6>Store Name : {client.store_name}</h6>   
                        <h6>Domain Name : {client.domain_name}</h6>   
                        </CardBody>
                
                    </Colxx>

                    <Colxx xxs="6">
                
                        <CardBody>
                        <h6>Phone Number : {client.phone_number}</h6>
                        <h6>Nationality : {client.nationality}</h6>
                        <h6>Store Name : {client.store_name}</h6>   
                        <h6>Domain Name : {client.domain_name}</h6>   
                        </CardBody>
                
                    </Colxx>
                    </Row> */}
          </Card>
        </Colxx>
        <Colxx xxs="6">
          <Card className="mb-4">
            <CardBody>
              <h6>Phone Number : {client.phone_number}</h6>
              <h6>Nationality : {client.nationality}</h6>
              <h6>Store Name : {client.store_name}</h6>
              <h6>Domain Name : {client.domain_name}</h6>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx xxs="6">
          <Card className="mb-4">
            <CardBody>
              <h6>Network : {client.network}</h6>
              <h6>Wallet ID : {client.wallet_id}</h6>
              <h6>Current Package : Basic</h6>
              <h6>Renewal Date : 07/12/2022</h6>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </div>
  );
};

export default ClientView;
