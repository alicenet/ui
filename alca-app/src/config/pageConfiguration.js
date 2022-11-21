// Page imports
import { ContractTest, Positions, Transactions } from "pages";

export const pages = [
    {
        name: "POSITIONS",
        display: "Positions",
        render: Positions,
    },
    {
        name: "TRANSACTIONS",
        display: "Transactions",
        render: Transactions,
    },
    {
        name: "CONTRACT_TEST",
        display: "Contract Test",
        render: ContractTest,
    },
];
