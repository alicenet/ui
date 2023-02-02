import React from "react";
import { Accordion } from "./Accordion";

export function TertiaryAccordion(props) {

    const { children, ...rest } = props;

    return (

        <Accordion {...rest}>
            {children}
        </Accordion>

    );

}