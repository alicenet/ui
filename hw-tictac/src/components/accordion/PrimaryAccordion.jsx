import React from "react";
import { Accordion } from "./Accordion";
import { Box, useTheme } from "@mui/material";

export function PrimaryAccordion(props) {

    const { padded, children, ...rest } = props;
    const theme = useTheme();

    return (

        <Accordion sx={{ borderTop: `2px solid ${theme.palette.primary.dark}` }} {...rest}>

            {padded ?
                <Box
                    padding={2}
                    gap={2}
                    display="flex"
                    flexDirection="column"
                    borderTop={0}
                    borderRadius={1}
                    sx={{
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                    }}
                >
                    {children}
                </Box>
                : children
            }

        </Accordion>

    );

}