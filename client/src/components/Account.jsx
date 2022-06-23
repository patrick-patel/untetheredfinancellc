import React from 'react';
import { Redirect } from 'react-router';
import $ from 'jquery';

import { Alert, ButtonGroup, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentEmail: "",
      currentPubKey: "None - Held w/Untethered Finance",
      message: "",
      messageType: "",
      redirectForgotPassword: false,
      "email": "",
      "key": "",
    };
    this.updateEmail = this.updateEmail.bind(this);
    this.updateKey = this.updateKey.bind(this);
  }

  componentDidMount() {
    $.ajax({
      'url': '/fetchUser',
      'type': 'GET',
      'context': this,
      'headers': {
        'x-access-token': localStorage.getItem('token')
      },
      'success': function(user) {
        this.setState({ currentEmail: user.email, currentPubKey: user.key });
      },
      'error': function(error) {
        console.log(error);
      }
    })
  }

  onChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  updateEmail(e) {
    e.preventDefault();
    let json = {
      "email": this.state.email,
    };
    console.log(json);
    $.ajax({
      'url': '/updateEmail',
      'type': 'POST',
      'context': this,
      'headers': {
        'x-access-token': localStorage.getItem('token')
      },
      'data': json,
      'success': function(data) {
        console.log(data);
        this.setState({ "email": "", message: data.message, messageType: data.messageType });
        setTimeout(() => this.setState({ message: "", messageType: "" }), 1000);
        $.ajax({
          'url': '/fetchUser',
          'type': 'GET',
          'context': this,
          'headers': {
            'x-access-token': localStorage.getItem('token')
          },
          'success': function(user) {
            console.log(user);
            this.setState({ currentEmail: user.email, currentPubKey: user.key });
          },
          'error': function(error) {
            console.log(error);
          }
        })
      },
      'error': function(error) {
        console.log(error);
      }
    })
  }

  updateKey(e) {
    e.preventDefault();
    let json = {
      "key": this.state.key,
    };
    console.log(json);
    $.ajax({
      'url': '/updateKey',
      'type': 'POST',
      'context': this,
      'headers': {
        'x-access-token': localStorage.getItem('token')
      },
      'data': json,
      'success': function(data) {
        console.log('success');
        this.setState({ "key": "", message: data.message, messageType: data.messageType });
        setTimeout(() => this.setState({ message: "", messageType: "" }), 3000);
        $.ajax({
          'url': '/fetchUser',
          'type': 'GET',
          'context': this,
          'headers': {
            'x-access-token': localStorage.getItem('token')
          },
          'success': function(user) {
            this.setState({ currentEmail: user.email, currentPubKey: user.key });
            setTimeout(() => this.setState({ message: "", messageType: "" }), 3000);
          },
          'error': function(error) {
            console.log(error);
          }
        })
      },
      'error': function(error) {
        console.log(error);
      }
    })
  }

  forgotPassword() {
    this.setState({ redirectForgotPassword: true });
  }

  render() {
    if (this.state.redirectForgotPassword) {
      setTimeout(() => this.setState({ redirectForgotPassword: true }), 1000);
      return <Redirect to="/forgot-password" />
    }
    return (
      <div style={{background: "rgba(255,153,0,0.2)"}}>
        <Container>
          <br></br>
          <Row>
            <Col md={12} lg={6}>
              <h3 className="display-3" style={{color: "#050038", textDecoration: "none"}}><b>Account Settings</b></h3>
              <p className="lead" style={{color: "#050038", textDecoration: "none", fontSize: "28px"}}><i>Update your email, password or BTC Distribution receiving address</i></p>
            </Col>
            <Col md={12} lg={6}>
            {this.state.message.length > 0 ? <Alert key={this.state.messageType} variant={this.state.messageType}>{this.state.message}</Alert> : null}
              <Col>
                <Card style={{background: "rgba(255,153,0,0.2)"}}>
                  <Container style={{padding: 20}}>
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" name="email" value={this.state.email} onChange={this.onChange.bind(this)} style={{backgroundColor: "rgba(255,153,0,0.2)"}} required />
                      </Form.Group>
                      <Row>
                        <Col>
                          <Button className="mb-2" variant="dark" type="submit" style={{cursor: "pointer", background: "#050038", margin: "auto", width: "100%"}} onClick={(e) => this.updateEmail(e)}>Update Email</Button>
                        </Col>
                        <Col>
                          <Button variant="dark" style={{cursor: "pointer", background: "#050038", margin: "auto", width: "100%"}} onClick={this.forgotPassword.bind(this)}>Change Password</Button>
                        </Col>
                      </Row>
                      <Row>
                        <Form.Text style={{textAlign: "center", color: "#050038", fontSize: "14px"}}>Current Email: {this.state.currentEmail}</Form.Text>
                      </Row>
                    </Form>
                  </Container>
                </Card>
              </Col>
              <br></br>
              <Col>
                <Card style={{background: "rgba(255,153,0,0.2)"}}>
                  <Container style={{padding: 20}}>
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>BTC Public Key:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Public Key" name="key" value={this.state.key} onChange={this.onChange.bind(this)} style={{backgroundColor: "rgba(255,153,0,0.2)"}} required />
                        <Form.Text className="text-muted" style={{textAlign: "center"}}>*DO NOT ENTER YOUR PRIVATE KEY*</Form.Text>
                      </Form.Group>
                      <Row>
                        <Col>
                          <Button className="mb-2" variant="dark" type="submit" style={{cursor: "pointer", background: "#050038", width: "50%"}} onClick={(e) => this.updateKey(e)}>Update Key</Button>
                        </Col>
                      </Row>
                      <Row>
                        <Form.Text style={{textAlign: "center", color: "#050038", fontSize: "14px"}}>Current Public Key: {this.state.currentPubKey}</Form.Text>
                      </Row>
                    </Form>
                  </Container>
                </Card>
              </Col>
            </Col>
          </Row>
        </Container>
        <br></br>
      </div>
    )
  }
}

export default Account;