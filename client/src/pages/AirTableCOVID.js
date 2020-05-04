import React, { useEffect, useState } from "react";
import axios from "axios";
import { Badge } from "antd";
import { Card } from "antd-mobile";

import SubmitButton from "../components/Button/SubmitButton";

// LatamBadgers!

export const AirTableCOVID = (props) => {
  const [covid, setCovid] = useState("");

  const getCovidData = () => {
    axios
      .get(
        `https://api.airtable.com/v0/appx4wP2PAcscbpFz/Projects%20and%20Initiatives?api_key=${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      )
      .then((res) => {
        const { records } = res.data;
        setCovid(records);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCovidData();
  }, []);

  return typeof covid === "object"
    ? covid.map((e) => (
        <Card key={"card-" + e.id} style={{ marginTop: "16px" }}>
          <h5>{e.fields["Post Title"]}</h5>
          <div>
            <footer className="blockquote-footer">
              {e.fields["Region"] || "N/A"}
            </footer>
            <h3>
              {e.fields["Tags Original"]
                ? e.fields["Tags Original"].map((sub, i) => (
                    <Badge key={"badge-" + e.id + "-" + i}>{sub}</Badge>
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
      ))
    : "";
};
