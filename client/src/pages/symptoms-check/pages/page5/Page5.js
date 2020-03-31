import React from "react";
import { Link } from "react-router-dom";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";

const Page4 = ({ imageUrl }) => {
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
              If so, have you traveled to an area severely affected by the
              COVID-19 outbreak?
            </h3>
            <ButtonGroup>
              <DropdownButton as={ButtonGroup} title="Select From Options">
                <Dropdown.Item eventKey="">
                  I live in an area severely affected by the COVID-19 outbreak
                </Dropdown.Item>
                <Dropdown.Item eventKey="1">
                  I have visited an area severely affected by the COVID-19
                  outbreak
                </Dropdown.Item>
                <Dropdown.Item>I'm not sure</Dropdown.Item>
                <Dropdown.Item>None of these apply</Dropdown.Item>
              </DropdownButton>
            </ButtonGroup>
            <br />
            <div>
              <br />{" "}
              <span>
                {" "}
                <Link
                  to="/page4"
                  className="btn btn-outline-success mr-4 text-center"
                >
                  Go Back
                </Link>
              </span>
              <span>
                {" "}
                <Link
                  to="/page6"
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

export default Page4;
