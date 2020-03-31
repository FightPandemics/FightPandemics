// import React from "react";
// import { Link } from "react-router-dom";
// import { Nav } from "react-bootstrap";

// const CONTAINER_STYLES = {
//   marginTop: "30px",
//   width: "600px",
//   flexDirection: "column",
//   alignItems: "stretch",
//   justifyContent: "space-between"
// };

// const Page2 = () => {
//   return (
//     <div className="text-center mx-auto" style={CONTAINER_STYLES}>
//       <div
//         style={{
//           display: "flex",
//           margin: "30px 10px 10px 50px",
//           padding: "100px"
//         }}
//       >
//         <Nav variant="med-info">
//           <Link
//             to="/page2"
//             className="btn btn-outline-warning mt-150 mr-4 float-left disabled"
//           >
//             What's Your age ?
//           </Link>

//           <br />
//         </Nav>
//         <Link

//           className="btn btn-outline-warning mt-30 float-left"
//         >
//           This is intended only for people who are ≥18yo <br /> (link out to CDC).
//         </Link>
//       </div>
//       <div>
//         <Link
//           to="/page3"
//           className="btn btn-outline-success mt-30 mr-4 text-center"
//         >
//           Next Page
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Page2;

import React from "react";
import { Link } from "react-router-dom";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";

const Page2 = ({ imageUrl }) => {
  return (
    <div className="page-wrapper">
      <div className="content-wrapper">
        <input type="radio" name="toggle" id="toggle2" />

        <section id="section-1">
          <div className="image-container">
            <img src="https://unsplash.it/500/600?image=939" alt="" />
          </div>

          <div>
            <h1>
              {" "}
              Do you have any of these symptoms? <br />
              Please, select all that apply.{" "}
            </h1>
            <ButtonGroup>
              <DropdownButton as={ButtonGroup} title="Seect Options">
                <Dropdown.Item eventKey="">Sore throat</Dropdown.Item>
                <Dropdown.Item eventKey="1">
                  Aching throughout the body
                </Dropdown.Item>
                <Dropdown.Item eventKey="2">Vomiting or diarrhea</Dropdown.Item>
                <Dropdown.Item eventKey="1">
                  {" "}
                  Fever, chills or sweating
                </Dropdown.Item>
                <Dropdown.Item eventKey="2">Difficulty breathing</Dropdown.Item>
                <Dropdown.Item eventKey="1">
                  New or worsening cough
                </Dropdown.Item>
                <Dropdown.Item eventKey="2">None of the above</Dropdown.Item>
              </DropdownButton>
            </ButtonGroup>
            <br />
            <div>
              <br />{" "}
              <span>
                {" "}
                <Link
                  to="/page1"
                  className="btn btn-outline-success mr-4 text-center"
                >
                  Go Back
                </Link>
              </span>
              <span>
                {" "}
                <Link
                  to="/page3"
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

export default Page2;
