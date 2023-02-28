import React from "react";
import { Grid, Typography } from "@mui/material";

export const instructions = [
    {
        label: "Generate wallet 1",
        left: true,
        displayCallback: ({ id, label }) => (
            <React.Fragment key={`grid-item-instruction-${id}`}>
                <InstructionItem id={id} label={label} />
            </React.Fragment>
        ),
    },
    {
        label: "Generate wallet 2",
        left: true,
        displayCallback: ({ id, label }) => (
            <React.Fragment key={`grid-item-instruction-${id}`}>
                <InstructionItem id={id} label={label} />
            </React.Fragment>
        ),
    },
    {
        label: "Generate multisig wallet",
        left: true,
        displayCallback: ({ id, label }) => (
            <React.Fragment key={`grid-item-instruction-${id}`}>
                <InstructionItem id={id} label={label} />
            </React.Fragment>
        ),
    },
    {
        label: "Fund wallet",
        left: false,
        displayCallback: ({ id, label }) => (
            <React.Fragment key={`grid-item-instruction-${id}`}>
                <InstructionItem id={id} label={label} />
            </React.Fragment>
        ),
    },
    {
        label: "Play",
        left: false,
        displayCallback: ({ id, label }) => (
            <React.Fragment key={`grid-item-instruction-${id}`}>
                <InstructionItem id={id} label={label} />
            </React.Fragment>
        ),
    },
];

const InstructionItem = ({ id, label }) =>
    <Grid item paddingY={0.25}>
        <Typography variant="span" fontFamily="Roboto">
            <strong>{id}.</strong> {label}
        </Typography>
    </Grid>

