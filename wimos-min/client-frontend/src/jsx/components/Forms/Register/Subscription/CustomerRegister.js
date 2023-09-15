const emailInput = document.querySelector("#email");

function CreateCustomer(Data) {
  fetch("/create-customer", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: Data,
    }),
  }).then((r) => r.json());
}
