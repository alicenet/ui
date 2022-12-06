import React from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setLanderModalOpenState } from "redux/actions/application";

const cookieName = "tos-prev-accepted";

export function useTosCookie() {
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
    }, [dispatch, cookies]);

    return [cookies[cookieName], setHideModalCookie];
}
