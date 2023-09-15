import React from 'react'
import { Row, Card, CardBody, CardTitle } from "reactstrap";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Breadcrumb from "containers/navs/Breadcrumb";
import AddFeatureForm from '../../../../containers/pages/AddFeatureForm';


const AddFeature = ({match}) => {
  return (
      <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.addfeature" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <CardTitle>
                Add New Feature
              </CardTitle>
              <AddFeatureForm />
            </CardBody>
          </Card>
        </Colxx>
      </Row>
      </>
    
  )
}

export default AddFeature
