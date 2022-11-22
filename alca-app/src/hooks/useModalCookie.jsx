import React from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setLanderModalOpenState } from "redux/actions/application";

const cookieName = "hide-help-modal";

export function useModalCookie() {
    // Force the help modal open if the hide-modal cookie has not been set
    const [cookies, setCookie] = useCookies([cookieName]);
    const dispatch = useDispatch();

    const setHideModalCookie = () => {
        setCookie(cookieName, true);
    };

    React.useEffect(() => {
        // If !cookie, open modal
        if (!cookies[cookieName]) {
            dispatch(setLanderModalOpenState(true));
        }
    }, []);

    return [cookies[cookieName], setHideModalCookie];
}
