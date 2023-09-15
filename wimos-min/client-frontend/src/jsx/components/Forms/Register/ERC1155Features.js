const ERC1155Features = [
  {
    name: "mintable",
    value: "mintable",
    description: "Privileged accounts will be able to emit new tokens.",
  },
  {
    name: "burnable",
    value: "burnable",
    description: "Token holders will be able to destroy their tokens.",
  },
  {
    name: "Supply Tracking",
    value: "supply",
    description: "Keeps track of total supply of tokens.",
  },
  {
    name: "pausable",
    value: "mintable",
    description:
      "Privileged accounts will be able to pause the functionality marked as whenNotPaused. Useful for emergency response.",
  },
];
export default ERC1155Features;
