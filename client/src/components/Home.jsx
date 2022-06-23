import React from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import $ from 'jquery';

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
            <Col className="mb-4" md={12} lg={6}>
              <h2 className="display-2" style={{color: "#050038", textAlign: "center"}}><b>Transforming the</b></h2>
              <h2 className="display-2" style={{color: "#050038", textAlign: "center"}}><b>Financial System</b></h2>
              <p className="lead" style={{color: "#050038", fontSize: "28px", textAlign: "center"}}><i>and bringing Bitcoin to the masses</i></p>
              <br></br>
              <Link to='/dashboard'><Button variant="dark" size="lg" style={{background: "#050038", width: "100%"}}>Members</Button></Link>
            </Col>
            <br></br>
            <Col lg={6}>
              <Image fluid src={"https://s32659.pcdn.co/wp-content/uploads/2021/05/bic_artwork_Cryptocurrency_Mining_Hardware.jpg.optimal.jpg"} />
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col xs={{span: 12, order: 'last'}} sm={{span: 12, order: 'last'}} md={{span: 12, order: 'last'}} lg={{span: 6, order: 'first'}}>
              <Image fluid src={"https://techcrunch.com/wp-content/uploads/2022/05/bitcoin-crown.jpg?w=940&h=465&crop=1"} />
            </Col>
            <br></br>
            <Col className="mb-4" xs={{span: 12, order: 'first'}} sm={{span: 12, order: 'lafirstst'}} md={{span: 12, order: 'first'}} lg={{span: 6, order: 'last'}}>
              <h2 className="display-2" style={{color: "#050038", textAlign: "center"}}><b>Bitcoin, not Crypto</b></h2>
              <h4 className="h4" style={{color: "#050038", textAlign: "center"}}>Explore our carefully curated list of Bitcoin resources</h4>
              <br></br>
              <Link to='/resources'><Button variant="dark" size="lg" style={{background: "#050038", width: "100%"}}>Resources</Button></Link>
            </Col>
          </Row>
        </Container>
        <br></br>
      </div>
    )
  }
}

export default Home;