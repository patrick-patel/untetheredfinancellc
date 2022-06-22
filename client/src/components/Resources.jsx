import React from 'react';
import { Redirect } from 'react-router';
import $ from 'jquery';
import step1 from "../media/step1.png";
import step11 from "../media/step1-1.png";
import step2 from "../media/step2.png";
import step3 from "../media/step3.png";
import step4 from "../media/step4.png";
import step5 from "../media/step5.png";


import { Col, Container, Image, Row } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

class Resources extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const redirect = this.state.redirect;
    if (redirect) {
      return <Redirect to='/settings' />
    }
    return (
      <div style={{background: "rgba(255,153,0,0.2)"}}>
        <Container>
          <Row>
            <Col md={12}>
              <div>
                <h3 className="display-3" style={{color: "#050038", textDecoration: "none"}}><b>Bitcoin Resources</b></h3>
                <p className="lead" style={{color: "#050038", textDecoration: "none", fontSize: "28px"}}><i>From the basics to technical knowledge</i></p>
                <p className="lead" style={{color: "#050038", textDecoration: "none", fontSize: "28px"}}><i>to the macro implications</i></p>

                <br></br>

                <p style={{marginTop: 20}}><b>Books:</b></p>
                <p>○   The Sovereign Individual - James Dale Davidson</p>
                <p>○   Layered Money - Nik Bahtia</p>
                <p>○   The Bitcoin Standard - Saifedean Ammous</p>
                <p>○   The Fiat Standard - Saifedean Ammous</p>
                <p>○   Mastering Bitcoin - Andreas Antonopaulos</p>

                <br></br>

                <p style={{marginTop: 20}}><b>What is Bitcoin?</b></p>
                <p>○   Upfolio's Beginner's Guide to Bitcoin</p>
                <p style={{marginTop: -20}}><a style={{display: "table-cell"}} target={"_blank"} rel={"noopener noreferrer"} href={"https://www.upfolio.com/ultimate-bitcoin-guide"}>https://www.upfolio.com/ultimate-bitcoin-guide</a></p>

                <p>○   The What Bitcoin Did Podcast</p>
                <p style={{marginTop: -20}}>(The Ultimate Bitcoin 101 with Vijay Boyapati)</p>
                <p style={{marginTop: -20}}><a style={{display: "table-cell"}} target={"_blank"} rel={"noopener noreferrer"} href={"https://www.youtube.com/watch?v=SMtdXB6g6HI"}>https://www.youtube.com/watch?v=SMtdXB6g6HI</a></p>

                <p>○ Jameson Lopp's Resource List</p>
                <p style={{marginTop: -20}}><a style={{display: "table-cell"}} target={"_blank"} rel={"noopener noreferrer"} href={"https://www.lopp.net/bitcoin-information/getting-started.html"}>https://www.lopp.net/bitcoin-information/getting-started.html</a></p>

                <br></br>

              </div>
            </Col>
            <Col md={12}>
              <Image fluid src={"https://techcrunch.com/wp-content/uploads/2022/05/bitcoin-crown.jpg?w=940&h=465&crop=1"} />

              <br></br>

              <p style={{marginTop: 20}}><b>How Does Mining Work?</b></p>
              <p>○   99Bitcoins Channel</p>
              <p style={{marginTop: -20}}>(What is Bitcoin Mining?)</p>
              <p style={{marginTop: -20}}><a style={{display: "table-cell"}} target={"_blank"} rel={"noopener noreferrer"} href={"https://www.youtube.com/watch?v=BODyqM-V71E"}>https://www.youtube.com/watch?v=BODyqM-V71E</a></p>

              <br></br>

              <p style={{marginTop: 20}}><b>Macro Perspective:</b></p>
              <p>○   Tucker Carlson Tonight</p>
              <p style={{marginTop: -20}}>(Michael Saylor Explains Bitcoin)</p>
              <p style={{marginTop: -20}}><a style={{display: "table-cell"}} target={"_blank"} rel={"noopener noreferrer"} href={"https://www.youtube.com/watch?v=wdJFeSY8UVk"}>https://www.youtube.com/watch?v=wdJFeSY8UVk</a></p>

              <p>○   The What is Money? Podcast</p>
              <p style={{marginTop: -20}}>(The Saylor Series)</p>
              <p style={{marginTop: -20}}><a style={{display: "table-cell"}} target={"_blank"} rel={"noopener noreferrer"} href={"https://www.youtube.com/watch?v=4rvTppy1qLI"}>https://www.youtube.com/watch?v=4rvTppy1qLI</a></p>

              <p>○   The What is Money? Podcast</p>
              <p style={{marginTop: -20}}>(The Booth Series)</p>
              <p style={{marginTop: -20}}><a style={{display: "table-cell"}} target={"_blank"} rel={"noopener noreferrer"} href={"https://www.youtube.com/watch?v=_ZyFv_BUTPg"}>https://www.youtube.com/watch?v=_ZyFv_BUTPg</a></p>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Resources;