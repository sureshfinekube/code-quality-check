import React from "react";
import { VerifyAdminLogin } from "utils/axios/requestHandler";
import { useHistory } from "react-router-dom";
import LoadingComponent from "../../components/loadingComponent/index";

function NonAuthLayout({ children }) {
  const history = useHistory();

  const [checkAuth, setCheckAuth] = React.useState();

  React.useEffect(() => {
    VerifyAdminLogin()
      .then(({ status }) => {
        !status && setCheckAuth(false);
        status && setCheckAuth(true);
      })
      .catch((err) => setCheckAuth(false));
  }, []);

  const goToDashboardPage = () => {
    history.push("/admin/dashboards/home");
  };

  return (
    <React.Fragment>
      {checkAuth === undefined ? (
        <LoadingComponent />
      ) : checkAuth === true ? (
        goToDashboardPage()
      ) : (
        children
      )}
    </React.Fragment>
  );
}

export default NonAuthLayout;
