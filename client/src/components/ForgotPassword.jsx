import React from 'react';
import { Redirect } from 'react-router';
import $ from 'jquery';

import { Alert, ButtonGroup, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "email": "",
      message: "",
      messageType: "",
      redirectResetPassword: false,
    };
    this.submitEmail = this.submitEmail.bind(this);
  }

  onChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  submitEmail(e) {
    e.preventDefault();
    var json = {"email": this.state.email};
    $.ajax({
      'url': '/forgotPassword',
      'type': 'POST',
      'context': this,
      'data': json,
      'success': function(data) {
        console.log('response success');
        this.setState({ message: data.message, messageType: data.messageType });
        if (data.messageType === "success") {setTimeout(() => this.setState({ redirectResetPassword: true, message: "", messageType: "" }), 1000);}
        else {setTimeout(() => this.setState({ message: "", messageType: "" }), 1000);}

        console.log(data);
      },
      'error': function(error) {
        console.log('response error');
        console.log(error);
      }
    })
  }

  render() {
    if (this.state.redirectResetPassword === true) {
      setTimeout(() => this.setState({ redirectResetPassword: false }), 250);
      return <Redirect to="/passwordReset" />
    }
    return (
      <div style={{background: "rgba(255,153,0,0.2)"}}>
        <Container>
          <br></br>
          <Row>
            <Col className="mb-2" md={12} lg={6}>
              <h3 className="display-3" style={{color: "#050038", textDecoration: "none"}}><b>Forgot Password</b></h3>
              <p className="lead" style={{color: "#050038", textDecoration: "none", fontSize: "28px"}}><i>You will receive an email with a password reset link</i></p>
              <p className="lead" style={{color: "#050038", textDecoration: "none", fontSize: "28px"}}><i>and will have 1 hr before the link expires</i></p>
            </Col>
            <Col className="mb-2" md={12} lg={6}>
              {this.state.message.length > 0 ? <Alert key={this.state.messageType} variant={this.state.messageType}>{this.state.message}</Alert> : null}
              <Card style={{background: "rgba(255,153,0,0.2)"}}>
                <Container style={{padding: 20}}>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter Email" name="email" value={this.state.email} onChange={this.onChange.bind(this)}  style={{backgroundColor: "rgba(255,153,0,0.2)"}} required />
                    </Form.Group>
                    <Button className="mb-2" variant="dark" type="submit" style={{cursor: "pointer", background: "#050038", width: "50%"}} onClick={(e) => this.submitEmail(e)}>Submit</Button>
                  </Form>
                </Container>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default ForgotPassword;