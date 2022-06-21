import React from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import step1 from "../media/step1.png";
import step11 from "../media/step1-1.png";
import step2 from "../media/step2.png";
import step3 from "../media/step3.png";
import step4 from "../media/step4.png";
import step5 from "../media/step5.png";


import { Button, Container, Image, Row, Col } from 'react-bootstrap';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div style={{background: "rgba(255,153,0,0.2)"}}>
        <Container>
          <br></br>
          <Row>
            <Col>
              <h3 className="display-3" style={{color: "#050038"}}><b>Transforming the</b></h3>
              <h3 className="display-3" style={{color: "#050038"}}><b>Financial System</b></h3>
              <p className="lead" style={{color: "#050038", fontSize: "28px"}}><i>and bringing Bitcoin to the masses</i></p>
              <br></br>
              <br></br>
              <Link to='/dashboard'><Button variant="dark" size="lg" className="mt-4" style={{background: "#050038", width: "75%"}}>Members</Button></Link>
            </Col>
            <br></br>
            <Col>
              <Container>
                <Image fluid src={"https://s32659.pcdn.co/wp-content/uploads/2021/05/bic_artwork_Cryptocurrency_Mining_Hardware.jpg.optimal.jpg"} />
              </Container>
            </Col>
          </Row>
          <br></br>
          <br></br>
          <Row>
            <Col>
              <Container>
                <Image fluid src={"https://techcrunch.com/wp-content/uploads/2022/05/bitcoin-crown.jpg?w=940&h=465&crop=1"} />
              </Container>
            </Col>
            <br></br>
            <Col>
              <h2 className="display-2" style={{color: "#050038"}}><b>Bitcoin, not Crypto</b></h2>
              <h4 className="h4" style={{color: "#050038"}}>Explore our carefully curated list of Bitcoin resources and</h4>
              <h4 className="h4" style={{color: "#050038"}}>avoid getting sucked into the blackhole of crypto scams</h4>
              <br></br>
              <Link to='/resources'><Button variant="dark" size="lg" style={{background: "#050038", width: "75%"}}>Resources</Button></Link>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Home;