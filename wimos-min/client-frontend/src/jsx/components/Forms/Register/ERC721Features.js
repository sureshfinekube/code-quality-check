// import mintable from "../../../../../src/images/cato.svg";
import delet from "../../../../../src/images/Burnable.svg";
import storage from "../../../../../src/images/Uristorage-01.svg";
import increment from "../../../../../src/images/Auto-increment-01.svg";
import pause from "../../../../../src/images/Pausable-01-01.svg";
import vote from "../../../../../src/images/Vote-01.svg";
import transfer from "../../../../../src/images/enumerable-01.svg";
import mintables from "../../../../../src/images/mintable-01.svg";

const ERC721Features = [
  {
    name: "mintable",
    value: "mintable",
    description: "Privileged accounts will be able to emit new tokens.",
    icon: mintables,
  },
  {
    name: "Auto Increment",
    value: "incremental",
    description: "New tokens will be automatically assigned an incremental id.",
    icon: increment,
  },
  {
    name: "burnable",
    value: "burnable",
    description: "Token holders will be able to destroy their tokens.",
    icon: delet,
  },
  {
    name: "uriStorage",
    value: "uriStorage",
    description: "Allows updating token URIs for individual token IDs.",
    icon: storage,
  },
  {
    name: "pausable",
    value: "pausable",
    description:
      "Privileged accounts will be able to pause the functionality marked as whenNotPaused.",
    icon: pause,
  },
  {
    name: "votes",
    value: "votes",
    description:
      "Keeps track of individual units for voting in on-chain governance.",
    icon: vote,
  },
  {
    name: "enumerable",
    value: "enumerable",
    description:
      "Allows on-chain enumeration of all tokens or those owned by an account.",
    icon: transfer,
  },
];
export default ERC721Features;
