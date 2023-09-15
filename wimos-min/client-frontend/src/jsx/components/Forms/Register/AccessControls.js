import owner from "../../../../../src/images/owner.svg";
import role from "../../../../../src/images/role-8.svg";

const AccessControls = [
  {
    name: "ownable",
    description:
      "Simple mechanism with a single account authorized for all privileged actions.",
    icon: owner,
  },
  {
    name: "roles",
    description:
      "Flexible mechanism with a separate role for each privileged action. A role can have many authorized accounts.",
    icon: role,
  },
];
export default AccessControls;
