import React from "react";
import { Link } from "react-router-dom";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";

const Page6 = ({ imageUrl }) => {
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
              Accordingly to what you know, have you been exposed<br /> to others who
              are known to have COVID-19 during the last 2 weeks? <br />
              Please, select all that apply.
            </h3>
            <ButtonGroup>
              <DropdownButton className="select-option" as={ButtonGroup} title="Select From Options">
                <Dropdown.Item eventKey="">
                  I live with someone who has tested positive for COVID-19
                </Dropdown.Item>
                <Dropdown.Item eventKey="1">
                  I had close contact with someone who has tested positive for
                  <br />
                  COVID-19 (close contact means 10 minutes or more spent
                  <br />
                  together within 6 feet from each other or were exposed to
                  their sneeze or cough)
                </Dropdown.Item>
                <Dropdown.Item>
                  I was near someone who has tested positive for COVID-19 (this
                  <br />
                  means at least 6-feet away and not exposed to their cough or
                  sneeze)
                </Dropdown.Item>
                <Dropdown.Item>
                  I haven't been exposed to anyone with COVID-19
                </Dropdown.Item>
              </DropdownButton>
            </ButtonGroup>
            <br />
            <div>
              <br />{" "}
              <span>
                {" "}
                <Link
                  to="/page5"
                  className="btn btn-outline-success mr-4 text-center"
                >
                  Go Back
                </Link>
              </span>
              <span>
                {" "}
                <Link
                  to="/page7"
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

export default Page6;
