import React from "react";
import { Box, SvgIcon, useTheme } from "@mui/material";
import { LetterO, LetterX } from "components";

const Square = ({ position, mark, onClick }) => {

    const theme = useTheme();
    const rightDivider = position % 3 !== 2;
    const bottomDivider = position % 3 === 2 && position < 8;

    const markToComponent = mark => {
        switch (mark) {
            case "X":
                return <LetterX color="secondary" fontSize={"large"} />;
            case "O":
                return <LetterO fontSize="large" />;
            default:
                return <Box width="30px" height="30px" />;
        }
    }

    return (
        <>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                onClick={onClick}
                width="32%"
                height="32%"
                sx={{
                    cursor: "pointer",
                    float: "left",
                    "&:hover": {
                        backgroundColor: theme.palette.secondary.light,
                        opacity: 0.8
                    }
                }}
            >
                <Box>
                    {markToComponent(mark)}
                </Box>
            </Box>
            {
                rightDivider &&
                <Box
                    border={`3px solid ${theme.palette.secondary.dark}`}
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
                    border={`3px solid ${theme.palette.secondary.dark}`}
                    borderRadius="5px"
                    width="100%"
                    sx={{ float: "left" }}
                />
            }
        </>
    );
};

export function Board({ board, makeMove }) {

    return (
        <Box width="max-content" height="300px" paddingX={2}>

            <Box width="100%" height="100%">
                {
                    board.map((mark, index) =>
                        <Square
                            key={index}
                            position={index}
                            mark={mark}
                            onClick={() => makeMove(index)}
                        />
                    )
                }
            </Box>

        </Box>
    );

}