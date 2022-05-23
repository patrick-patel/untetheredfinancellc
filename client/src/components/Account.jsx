import React from 'react';
import { Redirect } from 'react-router';
import $ from 'jquery';

import { ButtonGroup, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectForgotPassword: false,
      "email": "",
      "key": "",
    };
  }

  componentDidMount() {
    $.ajax({
      'url': '/userAPI',
      'type': 'GET',
      'context': this,
      'headers': {
        'x-access-token': localStorage.getItem('token')
      },
      'success': function(subAccounts) {
        this.setState({ "subAccounts": subAccounts });
      },
      'error': function(error) {
        console.log(error);
      }
    })
  }

  onChangeRadio({ target }) {
    if (!this.state[target.name]) {
      this.setState({ [target.name]: true })
    } else {
      this.setState({ [target.name]: false })
    }
  }

  onChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  updateEmail() {
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
        console.log('success');
      },
      'error': function(error) {
        console.log(error);
      }
    })
  }

  updateKey() {
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
    const redirectForgotPassword = this.state.redirectForgotPassword;
    if (redirectForgotPassword) {
      return <Redirect to="/forgot-password" />
    }
    return (
      <div style={{background: "rgba(255,153,0,0.2)"}}>
        <Container fluid style={{padding: 90}}>
          <br></br>
          <Row>
            <Col>
              <h3 className="display-3" style={{color: "#050038", textDecoration: "none"}}><b>Account Settings</b></h3>
              <p className="lead" style={{color: "#050038", textDecoration: "none", fontSize: "28px"}}><i>Update your email, password or BTC Distribution receiving address</i></p>
            </Col>
            <Col>
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
                          <Button className="mb-2" variant="dark" type="submit" style={{cursor: "pointer", background: "#050038", margin: "auto", width: "100%"}} onClick={this.updateEmail.bind(this)}>
                            Update Email
                          </Button>
                        </Col>
                        <Col>
                          <Button variant="dark" style={{cursor: "pointer", background: "#050038", margin: "auto", width: "100%"}} onClick={this.forgotPassword.bind(this)}>
                            Change Password
                          </Button>
                        </Col>
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
                        <Form.Text className="text-muted" style={{textAlign: "center"}}>
                          *DO NOT ENTER YOUR PRIVATE KEY*
                        </Form.Text>
                      </Form.Group>
                      <Row>
                        <Col>
                          <Button className="mb-2" variant="dark" type="submit" style={{cursor: "pointer", background: "#050038", width: "50%"}} onClick={this.updateKey.bind(this)}>
                            Update Key
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </Container>
                </Card>
              </Col>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Account;