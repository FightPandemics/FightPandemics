import React from "react";
import { Card, Col, Row } from "antd";
import HelpBoard from "assets/how-does-work-images/Help-Board.gif";
import LocalGlobal from "assets/how-does-work-images/Local&Global.gif";
import RelevantContent from "assets/how-does-work-images/Relevant-content.gif";

const GridCard = () => {
     const { Meta } = Card;

    return (
        <div className="site-card-wrapper" style={{"marginTop": "-90px"}}>
        <Row>
          <Col span={8}>
            <Card
              cover={
                <img
                  alt="example"
                  src={HelpBoard}
                  style={{"marginLeft": "72px","marginRight": "883px", width: "326px", height:"290px","object-fit": "contain"}}
                />
              }
              bordered={false}
              title={"Help Board"}
              headStyle={{width: "291px",
                height: "28px",
                "font-family": "Poppins",
                "marginLeft": "107px",
                "marginTop": "90px",
                "font-size": "24px",
                "font-weight": "600",
                "font-stretch": "normal",
                "font-style": "normal",
                "line-height": "1.17",
                "letter-spacing": "normal",
                "color": "var(--color-primary-text)"}}
            >
              <Meta
               style={
                { "font-family": "WorkSans",
                  "font-size":"20px",
                  "width":"286px",
                  "height":"90px",
                  "text-align": "center",
                  "marginLeft": "75px",
                  "marginTop": "-39px",
                  "marginRight": "886px",
                  "font-weight":"normal",
                  "font-stretch":"normal",
                  "font-style": "normal",
                  "line-height": "1.5",
                  "letter-spacing": "normal",
                  "color": "var(--color-primary-text)"
                }
            }
                description="A community platform for individuals and organizations 
          to offer and request aid."
              />
            </Card>
          </Col>
          <Col span={8}>
          <Card
              cover={
                <img
                  alt="local and global"
                  src={LocalGlobal}
                  style={{"marginLeft": "117.6px", "marginRight": "486.2px", width:"279.2px",height:"294.5px","object-fit": "contain"}}
                />
              }
              bordered={false}
              title={"Local & Global"}
              headStyle={{width: "291px",
                height: "28px",
                "font-family": "Poppins",
                "marginLeft": "107px",
                "marginTop": "90px",
                "font-size": "24px",
                "font-weight": "600",
                "font-stretch": "normal",
                "font-style": "normal",
                "line-height": "1.17",
                "letter-spacing": "normal",
                "color": "var(--color-primary-text)"}}
            >
              <Meta
                style={
                    { "font-family": "WorkSans",
                      "font-size":"20px",
                      "width":"286px",
                      "height":"90px",
                      "text-align": "center",
                      "marginTop": "-43px",
                      "marginLeft": "102px",
                      "font-weight":"normal",
                      "font-stretch":"normal",
                      "font-style": "normal",
                      "line-height": "1.5",
                      "letter-spacing": "normal",
                      "color": "var(--color-primary-text)"
                    }
                }
                description="Offer and request help within my community and around the world."
              />
            </Card>
          </Col>
          <Col span={8}>
          <Card
              cover={
                <img
                  alt="relevant-content"
                  src={RelevantContent}
                  style={{"marginLeft": "133.2px","marginRight": "60.2px", width:"292.8px",height:"260px","object-fit": "contain"}}
                />
              }
              bordered={false}
              title={"Relevant Content"}
              headStyle={{width: "291px",
                height: "28px",
                "font-family": "Poppins",
                "marginLeft": "107px",
                "marginTop": "90px",
                "font-size": "24px",
                "font-weight": "600",
                "font-stretch": "normal",
                "font-style": "normal",
                "line-height": "1.17",
                "letter-spacing": "normal",
                "color": "var(--color-primary-text)"}}
            >
              <Meta
                style={
                    { "font-family": "WorkSans",
                      "font-size":"20px",
                      "width":"286px",
                      "height":"90px",
                      "position": "relative",
                      "text-align": "center",
                      "marginTop": "-9px",
                      "marginLeft": "90px",
                      "marginRight": "94px",
                      "font-weight":"normal",
                      "font-stretch":"normal",
                      "font-style": "normal",
                      "line-height": "1.5",
                      "letter-spacing": "normal",
                      "color": "var(--color-primary-text)"
                    }
                }
                description="Expiration periods ensure the board is always up to date."
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
};

export default GridCard;