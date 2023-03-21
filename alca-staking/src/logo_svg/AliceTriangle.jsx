import React from "react";
import "./AliceTriangle.css";

export function AliceTriangle() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" version="1.1" viewBox="0 0 304.8 267.01">
            <path
                d="M226.4 108.95L173.16 108.95 199.78 62.78z"
                className="c"
                transform="translate(-47.6 -52.78)"
            ></path>
            <path
                d="M264.24 174.92L204.83 174.92 234.54 123.39z"
                className="c"
                transform="translate(-47.6 -52.78)"
            ></path>
            <path
                d="M222.5 205.15L117.86 205.15 170.18 114.39z"
                className="b"
                transform="translate(-47.6 -52.78)"
            ></path>
            <path d="M342.4 309.79L268.8 309.79 305.6 245.96z" className="c" transform="translate(-47.6 -52.78)"></path>
            <path
                d="M305.82 246.14L234.29 246.14 270.05 184.1z"
                className="c"
                transform="translate(-47.6 -52.78)"
            ></path>
            <path
                d="M282.81 309.73L162.24 309.73 222.53 205.15z"
                className="b"
                transform="translate(-47.6 -52.78)"
            ></path>
            <path d="M197.59 309.79L57.6 309.79 127.6 188.37z" className="d" transform="translate(-47.6 -52.78)"></path>
        </svg>
    );
}
