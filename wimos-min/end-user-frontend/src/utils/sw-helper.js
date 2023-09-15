import axios from "axios";

async function regServiceWorker() {
  if ("serviceWorker" in navigator) {
    let url = "/sw.js";
    const reg = await navigator.serviceWorker.register(url, { scope: "/" });
    console.log("service config is", { reg });
    return reg;
  } else {
    console.log("Push notification not supported");
  }
}

async function subscribe(serviceWorkerReg, userId) {
  let subscription = await serviceWorkerReg.pushManager.getSubscription();
  if (subscription === null) {
    subscription = await serviceWorkerReg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    });
    subscription["userId"] = userId;

    // let BaseUrl = "http://localhost:8080/v1";
    let BaseUrl = "https://endapi.wimos.io/v1";


    let instance = axios.create({
      // .. where we make our configurations
      baseURL: BaseUrl,
      // withCredentials: true,
      // credentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Origin: window.location.hostname,
        Authorization: `Bearer ${localStorage.getItem("e_wimos")}`,
      },
    });

    instance.post(
      `/notification/subscribe`,
      subscription
    );
  }
}

async function registerAndSubscribe(userId) {
  try {
    // console.count("in regandsub");
    const serviceWorkerReg = await regServiceWorker();
    await subscribe(serviceWorkerReg, userId);
    return {activated: 'true'}
  } catch (error) {
    console.log(error);
  }
}

// const publicVapidKey =
//   "BOGUywfYF7I07XRtPBmym15rIsgqh7L-pQjmcFkWMD9JVSeSTK1gOuNHzxuIowy5LuX2xBElGCEXXFSa5S_1K8s";

// function urlBase64ToUint8Array(base64String) {
//   const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
//   const base64 = (base64String + padding)
//     .replace(/\-/g, "+")
//     .replace(/_/g, "/");

//   const rawData = window.atob(base64);
//   const outputArray = new Uint8Array(rawData.length);

//   for (let i = 0; i < rawData.length; ++i) {
//     outputArray[i] = rawData.charCodeAt(i);
//   }
//   return outputArray;
// }

// export async function send(title = "Push Sent", message = "Hello push") {
//   console.log("inside sendddy");
//   const register = await navigator.serviceWorker.register("/sw.js", {
//     scope: "/",
//   });

//   if ("serviceWorker" in navigator) {
//     navigator.serviceWorker.ready
//       .then(function (registration) {
//         if (!registration.pushManager) {
//           return;
//         }

//         registration.pushManager
//           .getSubscription()
//           .then(function (existedSubscription) {
//             if (existedSubscription === null) {
//               console.log("not subscribed");
//               registration.pushManager
//                 .subscribe({
//                   applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
//                   userVisibleOnly: true,
//                 })
//                 .then(function (newSubscription) {
//                     console.log('new-subs',newSubscription)
//                   sendSubscription(newSubscription, title, message);
//                 })
//                 .catch(function (e) {
//                   if (Notification.permission !== "granted") {
//                   } else {
//                     console.error(e);
//                   }
//                 });
//             } else {
//               console.log("already subscribed",existedSubscription);

//               sendSubscription(existedSubscription, title, message);
//             }
//           });
//       })
//       .catch(function (e) {
//         console.error(e);
//       });
//   }
// }

// function sendSubscription(subscription, title, message) {
//   return fetch("http://localhost:8080/subscribe", {
//     method: "POST",
//     body: JSON.stringify({ subscription, title, message }),
//     headers: {
//       "content-type": "application/json",
//     },
//   });
// }

export { regServiceWorker, subscribe, registerAndSubscribe };
