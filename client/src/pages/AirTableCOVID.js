import React, { Component } from 'react'
import axios from 'axios';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from "react-router-dom"

// LatamBadgers!

export class AirTableCOVID extends Component {
  state = {
    covid: ''
  }

  getCovidData = () => {
    axios.get(`https://api.airtable.com/v0/appx4wP2PAcscbpFz/Projects%20and%20Initiatives?api_key=keyq3sfh3IOH4qf2g`)
    .then(res => {
        this.setState({covid: res.data.records});
    })
    .catch((error) => {
        console.log(error);
    })
  }

  componentDidMount(){
    this.getCovidData()
  }

  render() {
    const {covid} = this.state
    if (typeof(covid) === 'object') {
      const listCovid = covid.map((e, index) => 
      <Card style={{marginTop: "16px"}}>
        <Card.Header as="h5">{e.fields["Post Title"]}</Card.Header>
        <Card.Body>
            <footer className="blockquote-footer">
                {e.fields["Region"] || "N/A"}
            </footer>
            <Card.Title>
            {e.fields["Tags Original"] ? e.fields["Tags Original"].map((sub, index) =>
                <>
                <Badge pill variant="primary">
                    {sub}
                </Badge>{' '}
                </>
            )
            :
            ""
            }
            </Card.Title>
            <Card.Text>
                {e.fields["Description"]}
            </Card.Text>
            {e.fields["Link to Product"] ? <Button variant="primary" href={e.fields["Link to Product"]} style={{marginRight: "16px"}}>Link to Product</Button> : ""}
            {e.fields["Link to Project Page"] ? <Button variant="primary" href={e.fields["Link to Project Page"]}>Link to Project Page</Button> : ""}
        </Card.Body>
      </Card>
      ) 
      return (
        <>
        {listCovid}
        </>
      )
    } else {
      return (
        <>
        </>
      )
    }
  }
}

export default AirTableCOVID
