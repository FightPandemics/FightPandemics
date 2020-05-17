import React, { Component } from "react";
import axios from "axios";
import { Badge } from "antd";
import { Card } from "antd-mobile";

import SubmitButton from "../components/Button/SubmitButton";

// LatamBadgers!

class AirTableCOVID extends Component {
  state = {
    covid: "",
  };

  getCovidData = () => {
    axios
      .get(
        `https://api.airtable.com/v0/appx4wP2PAcscbpFz/Projects%20and%20Initiatives?api_key=keyq3sfh3IOH4qf2g`,
      )
      .then((res) => {
        this.setState({ covid: res.data.records });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getCovidData();
  }

  render() {
    const { covid } = this.state;
    if (typeof covid === "object") {
      const listCovid = covid.map((e, index) => (
        <Card key={"card-" + index} style={{ marginTop: "16px" }}>
          <h5>{e.fields["Post Title"]}</h5>
          <div>
            <footer className="blockquote-footer">
              {e.fields["Region"] || "N/A"}
            </footer>
            <h3>
              {e.fields["Tags Original"]
                ? e.fields["Tags Original"].map((sub, i) => (
                    <React.Fragment key={"badge-" + index + "-" + i}>
                      <Badge>{sub}</Badge>{" "}
                    </React.Fragment>
                  ))
                : ""}
            </h3>
            <p>{e.fields["Description"]}</p>
            {e.fields["Link to Product"] ? (
              <SubmitButton
                href={e.fields["Link to Product"]}
                title="Link to Product"
                style={{ marginRight: "16px" }}
              />
            ) : (
              ""
            )}
            {e.fields["Link to Project Page"] ? (
              <SubmitButton
                title="Link to Project Page"
                href={e.fields["Link to Project Page"]}
              />
            ) : (
              ""
            )}
          </div>
        </Card>
      ));
      return <>{listCovid}</>;
    } else {
      return <></>;
    }
  }
}

export default AirTableCOVID;
