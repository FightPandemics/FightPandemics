import React from "react";
import { Link } from "react-router-dom";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";

const Page1 = ({ imageUrl }) => {
  return (
    <div className="page-wrapper">
      <div className="content-wrapper">
        <input type="radio" name="toggle" id="toggle2" />

        <section id="section-1">
          <div className="image-container">
            <img src="https://unsplash.it/500/600?image=939" alt="" />
          </div>

          <div className="info-container">
            <h1> What is your age? </h1>
            <ButtonGroup>
              <DropdownButton as={ButtonGroup} title="Please Select">
                <Dropdown.Item eventKey="1">{`< 18`}</Dropdown.Item>
                <Dropdown.Item eventKey="1">18 - 64</Dropdown.Item>
                <Dropdown.Item eventKey="2">65+</Dropdown.Item>
              </DropdownButton>
            </ButtonGroup>

            <br />

            <Link
              to="/page2"
              className="btn btn-outline-success mr-4 text-center"
            >
              Next Page
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page1;
