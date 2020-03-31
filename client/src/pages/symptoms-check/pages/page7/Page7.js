import React from "react";
import { Link } from "react-router-dom";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";

const Page7 = ({ imageUrl }) => {
  return (
    <div className="page-wrapper">
      <div className="content-wrapper">
        <input type="radio" name="toggle" id="toggle2" />

        <section id="section-1">
          <div className="image-container">
            <img src="https://unsplash.it/500/600?image=939" alt="" />
          </div>

          <div>
            <h4>
              In your day-to-day life, do you work or live in a care facility?<br />
              This may include hospitals, care homes, emergency rooms, <br />and other
              medical settings.
            </h4>
            <ButtonGroup>
              <DropdownButton
                className="select-option"
                as={ButtonGroup}
                title="Select From Options"
              >
                <Dropdown.Item eventKey="">
                I live in a care facility (e.g. care home or assisted living)
                </Dropdown.Item>
                <Dropdown.Item eventKey="1">
                I have worked in a care facility during the last 2 weeks
                (e.g. Hospitals, assisted living facilities, etc. <br />
                This includes part-time jobs and volunteering)
                </Dropdown.Item>
                <Dropdown.Item>
                I plan to work in a care facility during the next 2 weeks<br /> (e.g. Hospitals, assisted living facilities, etc. This includes part-time jobs and volunteering)
                </Dropdown.Item>
                <Dropdown.Item>
                No, I don't live or work in a hospital or any other care facility
                </Dropdown.Item>
              </DropdownButton>
            </ButtonGroup>
            <br />
            <div>
              <br />{" "}
              <span>
                {" "}
                <Link
                  to="/page6"
                  className="btn btn-outline-success mr-4 text-center"
                >
                  Go Back
                </Link>
              </span>
              <span>
                {" "}
                <Link
                  to="/medical"
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

export default Page7;
