import React from "react";
import { Menu, Header as SHeader } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "components";
import { DarkThemeContext } from "contexts";
import { LINKS } from "utils/constants";

export function Header() {

    const { isDark, toggle } = React.useContext(DarkThemeContext);

    const location = useLocation();

    const goExtLink = (target) => {
        let finalTarget = target;
        if (document.location.href.indexOf('staging') !== -1 || document.location.href.indexOf("localhost") !== -1) {
            let tarSplit = target.split('://');
            let alcSplit = tarSplit[1].split(".alice.net");
            let alcTarget = alcSplit[0];
            finalTarget = "https://" + alcTarget + ".staging.alice.net";
        }
        window.open(finalTarget, '_blank').focus()
    }

    return (
        <Menu borderless className="top-0 left-0 bg-white w-full h-24 rounded-none sticky">
            <Menu.Item className="items-center">
                <Link to="/" className="m-6 w-20 flex justify-start items-start">
                    <Logo />
                </Link>
            </Menu.Item>

            <Menu.Item position="right" className="items-center space-x-6" >

                <Menu.Item as={Link} to="/" active={location.pathname == "/"}>
                    Migrate
                </Menu.Item>

                <Menu.Item
                    className="cursor-pointer"
                    onClick={() => {goExtLink("https://stake.alice.net")}}
                    content="Stake"
                />

                {/* <Menu.Item
                    className="cursor-pointer"
                    onClick={() => goExtLink("https://lock.alice.net")}
                    content="Lock"
                /> */}

            </Menu.Item>

            <Menu.Menu position="right" className="hidden md:flex">
                <Menu.Item
                    className="cursor-pointer"
                    onClick={() => window.open(LINKS.GITHUB, '_blank').focus()}
                    content="Github"
                />
                <Menu.Item
                    className="cursor-pointer"
                    onClick={() => window.open(LINKS.WHITEPAPER, '_blank').focus()}
                    content="Whitepaper"
                />
                {/* <Menu.Item
                    className="cursor-pointer"
                    onClick={() => window.open(LINKS.COMMUNITY, '_blank').focus()}
                    content="Community"
                /> */}
            </Menu.Menu>

            {/* <div className="absolute right-4 top-24 field py-3">
                <div className="ui toggle checkbox">
                    <input
                        type="checkbox"
                        value="any"
                        onChange={toggle}
                        checked={isDark}
                    />
                    <label
                        className="coloring cursor-pointer"
                        onClick={toggle}
                    >{isDark ? '🌜' : '🌞'}</label>
                </div>
            </div> */}

        </Menu>
    )
}