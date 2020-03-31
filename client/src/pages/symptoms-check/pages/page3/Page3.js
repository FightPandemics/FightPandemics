import React from "react";
import { Link } from "react-router-dom";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";

const Page3 = ({ imageUrl }) => {
  return (
    <div className="page-wrapper">
      <div className="content-wrapper">
        <input type="radio" name="toggle" id="toggle2" />

        <section id="section-1">
          <div className="image-container">
            <img src="https://unsplash.it/500/600?image=939" alt="" />
          </div>

          <div>
            <h3>
              {" "}
              Do you have any of these pre-existing medical conditions? <br />{" "}
              Please, select all that apply.{" "}
            </h3>
            <ButtonGroup>
              <DropdownButton as={ButtonGroup} title="Select From Options">
                <Dropdown.Item eventKey="">
                  Diseases or conditions that make it hard to cough
                </Dropdown.Item>
                <Dropdown.Item eventKey="1">
                  Kidney failure that needs dialysis
                </Dropdown.Item>
                <Dropdown.Item eventKey="2">
                  Cirrhosis of the liver
                </Dropdown.Item>
                <Dropdown.Item eventKey="1">
                  {" "}
                  Asthma or chronic lung disease
                </Dropdown.Item>
                <Dropdown.Item eventKey="2">Pregnancy</Dropdown.Item>
                <Dropdown.Item eventKey="1">
                  Diabetes with complications
                </Dropdown.Item>
                <Dropdown.Item eventKey="2">
                  Weakend immune system
                </Dropdown.Item>
                <Dropdown.Item eventKey="2">
                  Congestive heart failure
                </Dropdown.Item>
                <Dropdown.Item eventKey="2">Extreme obesity</Dropdown.Item>
                <Dropdown.Item eventKey="2">None of these</Dropdown.Item>
              </DropdownButton>
            </ButtonGroup>
            <br />
            <div>
              <br />{" "}
              <span>
                {" "}
                <Link
                  to="/page2"
                  className="btn btn-outline-success mr-4 text-center"
                >
                  Go Back
                </Link>
              </span>
              <span>
                {" "}
                <Link
                  to="/page4"
                  className="btn btn-outline-success mr-4 text-center"
                >
                  Next Page
                </Link>
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page3;
