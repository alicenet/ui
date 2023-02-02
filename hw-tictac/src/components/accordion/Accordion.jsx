import React, { useState } from "react";
import { ExpandLess } from "@mui/icons-material";
import { Accordion as MUIAccordion, AccordionDetails, AccordionSummary, Box, Paper, Typography } from "@mui/material";

export function Accordion({
      children,
      title,
      itemsCount,
      icon = false,
      sx,
      summaryElevation = 24,
      detailsElevation = 1
    }) {

    const [isBlockOpen, toggleAccordion] = useState(true);

    return (

        <MUIAccordion
            disableGutters
            defaultExpanded
            sx={{ ...sx, borderRadius: 1 }}
        >

            <Paper
                elevation={summaryElevation}
                sx={{
                    boxShadow: "unset",
                    borderBottomRightRadius: isBlockOpen ? 0 : 3,
                    borderBottomLeftRadius: isBlockOpen ? 0 : 3
                }}
            >
                <AccordionSummary
                    onClick={() => toggleAccordion(prevState => !prevState)}
                    expandIcon={<ExpandLess />}
                >

                    <Box display="flex"
                         sx={{
                             cursor: "pointer",
                             wordBreak: "break-all",
                             padding: 1
                         }}
                         gap={1}
                    >
                        <Box display="flex" alignItems="center" gap={1}>
                            {icon}
                            <h3>{title}</h3>
                            {
                                itemsCount &&
                                <Typography variant="span" sx={{ background: "black", paddingX: 1, borderRadius: 1 }}>
                                    {itemsCount}
                                </Typography>
                            }
                        </Box>
                    </Box>

                </AccordionSummary>
            </Paper>

            <Paper
                elevation={detailsElevation}
                sx={{
                    boxShadow: "unset",
                    borderBottomRightRadius: isBlockOpen ? 0 : 3,
                    borderBottomLeftRadius: isBlockOpen ? 0 : 3
                }}
            >
                <AccordionDetails sx={{ padding: 0 }}>
                    {children}
                </AccordionDetails>
            </Paper>

        </MUIAccordion>

    );

}