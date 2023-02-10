import React from "react";
import { Box } from "@mui/material";

const classNameByPosition = ["top left", "top", "top right", "left", "", "right", "bottom left", "bottom", "bottom right"];

/**
 * A single square in the board
 * @component
 */
const Square = ({ position, value, onClick }) => (
    <Box className={`square ${classNameByPosition[position]}`} onClick={onClick}>
        <Box className={value} />
    </Box>
);

/**
 * Game board
 * @component
 */
export function Board({ squares }) {

    return (
        <Box paddingY={0} className="game">
            <Box className="board">
                {
                    squares.map((c, i) =>
                        <Square key={i} position={i} value={squares[i]} onClick={() => console.log({ i })} />
                    )
                }
            </Box>
        </Box>
    );

}