import React, { useMemo, useEffect } from "react";
import PageTitle from "../../../layouts/PageTitle";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import { Link } from "react-router-dom";
import { Button, Card, CardGroup } from "react-bootstrap";
import Checkout from "./ChangeAdrees";
import MOCK_DATA from "./MockData.json";
import { COLUMNS } from "./Columns";
import { GlobalFilter } from "./filiter";
import { connect, useDispatch } from "react-redux";
import { GetCardAction } from "../../../../store/actions/BillingAction";
import { ATMCard } from "atm-card-react";

// //import './table.css';
// import "./filtering.css";

export const BillingSettings = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!props.packagestatus) {
      dispatch(GetCardAction());
    }
  }, [props.packagestatus]);
  // const flipCard = () => {
  //   const flipped = !this.state.flipped;
  //   this.setState({ flipped });
  // };
  // const [number, setNumber] = useState<string>('');
  // const [month, setMonth] = useState<number>(2);
  // const [year, setYear] = useState<number>(22);
  // const [holder, setHolder] = useState<string>('');
  // const [cvv, setCvv] = useState<string>('');

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );
  const ChangeAddress = () => {
    <form>Enter address</form>;
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    page,
    gotoPage,
    pageCount,
    pageOptions,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter, pageIndex } = state;

  // const { cardDetails } = this.props;
  // const Data = cardDetails.cardGet;
  // console.log("packagestatus", props.packagestatus);
  return (
    <>
      {/* <PageTitle activeMenu="History" motherMenu="Bill" /> */}
      <Card>
        <div className="card-header">
          <h4 className="card-title">Billing Settings</h4>
        </div>
        {/* <div className="card-body">
          <h5>Address</h5>
          The address appears on your monthly invoice and should be the legal of
          your home or business.
          <br />
          <div className="card-body">
            <div>
              2nd Flooor,
              <br /> Thuruthel Building,
              <br /> Lavanya Nagar-Kusumagiri
              <br />
              Kakkanad,Ernakulam <br />
              Pin: 682030
            </div>{" "}
          </div>{" "}
          <Link
            className="btn my-2 btn-primary btn-lg px-4"
            to="/change-address"
          >
            <i className="fa fa-usd"></i> Edit Address
          </Link>
        </div> */}

        {!props.packagestatus ? (
          <>
            <div className="mb-0 card-body">
              <h5>Card Info</h5>
              <br />
              <div className="row">
                <div className="col-md-12 col-lg-12">
                  <ATMCard
                    year={props.cardDetails.exp_year}
                    holderName="XXX XXXX"
                    month={props.cardDetails.exp_month}
                    system={props.cardDetails.brand}
                    number={"XXXXXXXXXXXX" + props.cardDetails.last4}
                    cvv="XXX"
                    bgColor="#bd3bb1"
                    // holderName="Tijo"
                    // lifted="false"
                    // hideDigits="false"
                    // flipped="false"
                    // system="1"
                    scale="0.82"
                    // onChange={(data) => {
                    //   setNumber(data.number);
                    //   setCvv(data.cvv);
                    //   setMonth(data.month);
                    //   setYear(data.year);
                    //   setHolder(data.holder);
                    // }}
                  />
                  <br />
                  <center>
                    {/* <Button variant="primary" size="lg">
              Change
            </Button> */}
                  </center>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="card-header">
            Currently don't have any subscriptions plans
          </div>
        )}
      </Card>

      {/* <Card>
        <div className="card-body">
          <h5>Card Info</h5>
          <br />
          <div className="row">
            <div className="col-md-3 mb-3">
              <label htmlFor="cc-name">Card type</label>
              <input
                type="text"
                className="form-control"
                id="cc-name" 
                // value={props.cardDetails.brand}
                disabled
              />

              <div className="invalid-feedback">Name on card is required</div>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="cc-number">Last Four digit</label>
              <input
                type="text"
                className="form-control"
                id="cc-number"
                // value={"XXXX XXXX XXXX " + props.cardDetails.last4}
                disabled
              />
              <div className="invalid-feedback">
                Credit card number is required
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 mb-3">
              <label htmlFor="cc-expiration">Expiry Month</label>
              <input
                type="text"
                className="form-control"
                id="cc-expiration"
                // value={props.cardDetails.exp_month}
                disabled
              />
              <div className="invalid-feedback">Expiration date required</div>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="cc-expiration">Expiry Year</label>
              <input
                type="text"
                className="form-control"
                id="cc-cvv"
                // value={props.cardDetails.exp_year}
                disabled
              />

              <div className="invalid-feedback">Security code required</div>
            </div>
          </div>{" "}
        </div>
      </Card> */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cardDetails: state.billings.cardGet,
    packagestatus: state.auth.auth.isFreePackageClient,
  };
};
export default connect(mapStateToProps, { GetCardAction })(BillingSettings);
