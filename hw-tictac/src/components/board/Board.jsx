import React from "react";
import { Box, useTheme } from "@mui/material";

const Square = ({ position, value, onClick }) => {

    const theme = useTheme();
    const rightDivider = position % 3 !== 2;
    const bottomDivider = position % 3 === 2 && position < 8;

    return (
        <>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                onClick={onClick}
                width="32%"
                height="32%"
                padding={2}
                sx={{
                    cursor: "pointer",
                    float: "left",
                    "&:hover": {
                        backgroundColor: theme.palette.secondary.dark,
                        opacity: 0.8
                    }
                }}
            >
                <Box display="flex" alignItems="center">{value}</Box>
            </Box>
            {
                rightDivider &&
                <Box
                    border={`3px solid ${theme.palette.secondary.light}`}
                    width="1%"
                    height="32%"
                    sx={{
                        float: "left",
                        borderTopLeftRadius: position < 3 ? "5px" : 0,
                        borderTopRightRadius: position < 3 ? "5px" : 0,
                        borderBottomLeftRadius: position > 5 ? "5px" : 0,
                        borderBottomRightRadius: position > 5 ? "5px" : 0,
                    }}
                />
            }
            {
                bottomDivider &&
                <Box
                    border={`3px solid ${theme.palette.secondary.light}`}
                    borderRadius="5px"
                    width="100%"
                    sx={{ float: "left" }}
                />
            }
        </>
    );
};

export function Board({ squares }) {

    return (
        <Box width="max-content" height="300px" paddingX={2}>

            <Box width="100%" height="100%">
                {
                    squares.map((position, index) =>
                        <Square
                            key={index}
                            position={index}
                            value={position}
                            onClick={() => console.log({ position })}
                        />
                    )
                }
            </Box>

        </Box>
    );

}