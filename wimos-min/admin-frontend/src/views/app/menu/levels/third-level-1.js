import React from 'react';
import { Row } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';

const ThirdLevel1 = ({ match }) => (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.third-level-1" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <p>
            <IntlMessages id="menu.third-level-1" />
          </p>
        </Colxx>
      </Row>
    </>
  );
export default ThirdLevel1;
