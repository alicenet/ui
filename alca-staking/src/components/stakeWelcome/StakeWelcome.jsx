import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import { useCookies } from "react-cookie";
import { APPLICATION_ACTIONS } from "redux/actions";
import { Connect } from "components/connect/Connect";

export function StakeWelcome({ stepForward }) {
    const [agreeCookie] = useCookies(["agreed"]);
    const dispatch = useDispatch();

    const { web3Connected, hasReadTerms } = useSelector((s) => ({
        web3Connected: s.application.web3Connected,
        hasReadTerms: s.application.hasReadTerms,
    }));

    // Push forward if user cookie has been set or is set
    React.useEffect(() => {
        if (web3Connected) {
            stepForward();
        }
    }, [hasReadTerms, web3Connected]);

    // Check for cookie if exists, dispatch update,
    React.useEffect(() => {
        dispatch(APPLICATION_ACTIONS.checkAgreeCookieState(agreeCookie));
    }, []);

    return (
        <Grid padded>
            <Connect />
        </Grid>
    );
}
