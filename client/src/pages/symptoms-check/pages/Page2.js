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
import { Nav } from "react-bootstrap";

const CONTAINER_STYLES = {
  marginTop: "30px",
  width: "600px",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "space-between"
};

const Page2 = () => {
  return (
    <div className="text-center mx-auto" style={CONTAINER_STYLES}>
      <div
        style={{
          display: "flex",
          margin: "10px 10px 10px 50px",
          padding: "100px"
        }}
      >
        <span>
          {" "}
          <Link className="btn btn-outline-info ist-group-item-action active mt-3 mr-3 float-left">
            What's Your age ?
          </Link>
        </span>

        <span>
          <Link className="btn btn-outline-warning ist-group-item-action active mt-3 float-left">
            This is intended only for people who are ≥18yo <br /> (link out to
            CDC).
          </Link>
        </span>
      </div>
      <span>
        {" "}
        <Link to="/page1" className="btn btn-outline-success mr-4 text-center">
          Go Back
        </Link>
      </span>
      <span>
        {" "}
        <Link to="/page3" className="btn btn-outline-success mr-4 text-center">
          Next Page
        </Link>
      </span>
    </div>
  );
};

export default Page2;
