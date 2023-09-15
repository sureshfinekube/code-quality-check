import { body } from "express-validator";

export const createStoreBodyValidator = [
  body("store_name")
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage("Store name must have at least 3 characters"),
  body("network")
    .isString()
    .contains("etherium")
    .isLength({ min: 8, max: 8 })
    .withMessage("Network must be valid"),
  body("domain")
    .isString()
    .isLength({ min: 3, max: 30 })
    .withMessage("Invalid domain name")
    // .custom((value) => (/^[A-Za-z0-9-]+$/.test(value)))
    .custom((value) =>
      /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(
        value
      )
    )

    // new regexes for domain :-
    // /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/
    // [a-z0-9!#$%&'*+/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b
    // ^((?!-)[A-Za-z0-9-]{1, 63}(?<!-)\\.)+[A-Za-z]{2, 6}$

    .withMessage("Domain not valid"),
//   body("type").isString(),
];
