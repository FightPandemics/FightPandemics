import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom"

const CONTAINER_STYLES = {
    marginTop: "160px",
    width: "600px",
};

export const Home = () => {
    return (
        <div className="text-center mx-auto" style={CONTAINER_STYLES}>
            <h5 className="text-primary">WELCOME TO FIGHT PANDEMICS</h5>
            <h1 className="display-4 font-weight-bolder">Help us prevent the spread of COVID-19</h1>
            <p>Pandemics are bound to continue to happen.</p>
            <p>We help you be prepared to stop them.</p>
            <div style={{ display: "flex", margin: "10px 100px" }}>
                <div style={{ flexGrow: 1, marginRight: "16px" }}>
                    <Link to="/need-help">
                        <Button block variant="primary">I need help</Button>
                    </Link>
                </div>
                <div style={{ flexGrow: 1 }}>
                    <Button block variant="light">I want to help</Button>
                </div>
            </div>
        </div>
    );
}
