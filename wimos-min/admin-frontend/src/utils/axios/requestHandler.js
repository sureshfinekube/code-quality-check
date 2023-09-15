import axios from "axios";

let localBaseUrl = "http://localhost:8080";
let clientBaseUrl = "https://lb.wimos.io/api";
let userBaseUrl = "https://endapi.wimos.io";

// let spApiBaseUrl = "http://localhost:3000";
let spApiBaseUrl = ''
if (process.env.REACT_APP_ENV === 'DEV') {
  spApiBaseUrl = "https://devspapi.wimos.io";
} else {
  spApiBaseUrl = "https://spapi.wimos.io";
}

const instance = axios.create({
  // .. where we make our configurations
  baseURL: spApiBaseUrl,
  withCredentials: true,
});
const clientinstance = axios.create({
  // .. where we make our configurations
  baseURL: clientBaseUrl,
  withCredentials: true,
});
const userinstance = axios.create({
  // .. where we make our configurations
  baseURL: userBaseUrl,
  withCredentials: true,
});

export const LoginAdminHandler = async (data) => {
  try {
    const res = await instance
      .post("/auth/api/login", data)
      .then((payload) => payload.data)
      .catch((err) => {
        const errMsg = err.response.data;
        return { status: false, errMsg };
      });
    return res;
  } catch (err) {
    return { status: false };
  }
};

export const getDashboardData = async () => {
  try {
    const res = await userinstance
      .get("/v1/dashboard/get-data?domain= admin")
      .then((payload) => {
        // console.log("tijoo");
        payload.data;
      })
      .catch((err) => {
        // console.log("eror", err.response);
        const errMsg = err.response.data;
        return { status: false, errMsg };
      });

    return res;
  } catch (err) {
    return { status: false };
  }
};

export const LogoutAdminHandler = async () => {
  try {
    const res = await instance
      .post("auth/api/logout")
      .then((payload) => {
        return payload.data;
      })
      .catch((err) => {
        // console.log(err)
        const errMsg = err.response.data;
        return { status: false, errMsg };
      });
    return res;
  } catch (err) {
    return { status: false };
  }
};

export const GetClients = async () => {
  try {
    const res = await clientinstance
      .get("/c2b-b2c/get-clients")
      .then((payload) => payload.data)
      .catch((err) => {
        const errMsg = err.response.data;
        return { status: false, errMsg };
      });

    return res;
  } catch (err) {
    return { status: false };
  }
};

export const VerifyAdminLogin = async () => {
  try {
    const res = await instance
      .get("/auth/api/verify-login")
      .then((payload) => payload.data)
      .catch((err) => {
        // console.log(err.response);
        const errMsg = err.response.data;
        return { status: false, errMsg };
      });

    return res;
  } catch (err) {
    return { status: false };
  }
};

export const ChangeClientStatus = async (data) => {
  try {
    const res = await clientinstance
      .put("/c2b-b2c/update-client-status", data)
      .then((payload) => payload.data)
      .catch((err) => {
        //  console.log(err.response.data);
        return { status: false, errMsg: err.response.data };
      });

    return res;
  } catch (err) {
    return { status: false };
  }
};

export const CreatePackageHandler = async (data) => {
  try {
    const res = await instance
      .post("/package/api/create-package", data)
      .then((payload) => payload.data)
      .catch((err) => {
        return { status: false, errMsg: err.response.data };
      });

    return res;
  } catch (err) {
    return { status: false };
  }
};

export const getPackagesHandler = async () => {
  try {
    const res = await instance
      .get("/package/api/get-packages")
      .then((payload) => payload.data)
      .catch((err) => {
        // console.log(err.response);
        const errMsg = err.response.data;
        return { status: false, errMsg };
      });

    return res;
  } catch (err) {
    return { status: false };
  }
};

export const GetInsight = async () => {
  try {
    const res = await instance
      .get("/admin/api/show-statistics")
      .then((payload) => payload.data)
      .catch((err) => {
        const errMsg = err.response.data;
        return { status: false, errMsg };
      });

    return res;
  } catch (err) {
    return { status: false };
  }
};

export const ChangePasswordNewOne = async (data) => {
  try {
    const res = await instance
      .post("/auth/api/change-password", data)
      .then((payload) => payload.data)
      .catch((err) => {
        const errMsg = err.response.data;
        return { status: false, errMsg };
      });

    return res;
  } catch (err) {
    return { status: false };
  }
};

export const updatePackageStatusHandler = async (data) => {
  try {
    const res = await instance
      .put("/package/api/package-status-change", data)
      .then((payload) => payload.data)
      .catch((err) => {
        const errMsg = err.response.data;
        return { status: false, errMsg };
      });

    return res;
  } catch (err) {
    return { status: false };
  }
};

export const updatePackageHandler = async (data) => {
  try {
    const res = await instance
      .put("/package/api/update-package", data)
      .then((payload) => payload.data)
      .catch((err) => {
        const errMsg = err.response.data;
        return { status: false, errMsg };
      });

    return res;
  } catch (err) {
    return { status: false };
  }
};

export const AddDomain = async (data) => {
  try {
    const res = await instance
      .post("/client/api/add-domain", data)
      .then((payload) => payload.data)
      .catch((err) => {
        const errMsg = err.response.data;
        return { status: false, errMsg };
      });

    return res;
  } catch (err) {
    return { status: false };
  }
};

export const UpdateDomain = async (data) => {
  try {
    const res = await instance
      .put("/client/api/domain", data)
      .then((payload) => payload.data)
      .catch((err) => {
        const errMsg = err.response.data;
        return { status: false, errMsg };
      });

    return res;
  } catch (err) {
    return { status: false };
  }
};

export const GetDomain = async () => {
  try {
    const res = await instance
      .get("/client/api/get-base-domain")
      .then((payload) => payload.data)
      .catch((err) => {
        const errMsg = err.response.data;
        return { status: false, errMsg };
      });

    return res;
  } catch (err) {
    return { status: false };
  }
};

export const GetSores = async () => {
  try {
    const res = await clientinstance
      .get("/c2b-b2c/get-stores")
      .then((payload) => payload.data)
      .catch((err) => {
        const errMsg = err.response.data;
        return { status: false, errMsg };
      });

    return res;
  } catch (err) {
    return { status: false };
  }
};
export const ChangeStoreStatus = async (data) => {
  //console.log("diufhfudata", data);
  try {
    const res = await clientinstance
      .put("/c2b-b2c/store/update-status", data)
      .then((payload) => payload.data)
      .catch((err) => {
        // console.log("err", err.response.data);
        const errMsg = err.response.data;
        return { status: false, errMsg };
      });

    return res;
  } catch (err) {
    return { status: false };
  }
};

export const AddContractFeature = async (data) => {
  try {
    const res = await instance
      .post("/api/contract-features", data)
      .then((payload) => payload.data)
      .catch((err) => {
        const errMsg = err.response.data;
        return { status: false, errMsg };
      });

    return res;
  } catch (err) {
    return { status: false };
  }
};

export const getContractFeatures = async () => {
  try {
    const res = await instance
      .get("/api/contract-features")
      .then((payload) => payload.data)
      .catch((err) => {
        const errMsg = err.response.data;
        //console.log("err", errMsg);
        return { status: false, errMsg };
      });

    return res;
  } catch (err) {
    return { status: false };
  }
};

export const updateContractFeatures = async (data) => {
  try {
    const res = await instance
      .put("/api/contract-features", data)
      .then((payload) => payload.data)
      .catch((err) => {
        const errMsg = err.response.data;
        return { status: false, errMsg };
      });

    return res;
  } catch (err) {
    return { status: false };
  }
};

export const deleteContractFeature = async (data) => {
  try {
    const res = await instance
      .delete("/api/contract-features/" + data)
      .then((payload) => payload.data)
      .catch((err) => {
        const errMsg = err.response.data;
        return { status: false, errMsg };
      });

    return res;
  } catch (err) {
    return { status: false };
  }
};

export const getContractFee = async () => {
  try {
    const res = await instance
      .get("/admin/api/basic-contract-fee")
      .then((payload) => payload.data)
      .catch((err) => {
        const errMsg = err.response.data;
        //console.log("err", errMsg);
        return { status: false, errMsg };
      });

    return res;
  } catch (err) {
    return { status: false };
  }
};

export const updateContractFee = async (data) => {
  try {
    const res = await instance
      .put("/admin/api/basic-contract-fee", data)
      .then((payload) => payload.data)
      .catch((err) => {
        const errMsg = err.response.data;
        return { status: false, errMsg };
      });

    return res;
  } catch (err) {
    return { status: false };
  }
};
