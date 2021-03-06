import React from 'react';
import { Redirect } from 'react-router';
import $ from 'jquery';

import { Alert, ButtonGroup, Button, Col, Card, Container, Form, Row } from 'react-bootstrap';

class PasswordReset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "userID": "",
      "token": "",
      "password": "",
      "password2": "",
      message: "",
      messageType: "",
      redirectLogin: false,
    };
    this.resetPassword = this.resetPassword.bind(this);
  }

  onChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  resetPassword(e) {
    e.preventDefault();
    var params = {
      userID: this.state.userID,
      token: this.state.token,
      password: this.state.password,
      password2: this.state.password2
    };
    $.ajax({
      'url': '/password-reset',
      'type': 'POST',
      'context': this,
      'data': params,
      'success': function(data) {
        console.log(data);
        this.setState({message: data.message, messageType: data.messageType})
        if (data.messageType === "success") {setTimeout(() => this.setState({message: "", messageType: "", redirectLogin: true}), 1000)}
        else {setTimeout(() => this.setState({message: "", messageType: ""}), 1000)}
      },
      'error': function(error) {
        console.log(error);
      }
    })
  }

  render() {
    if (this.state.redirectLogin === true) {
      setTimeout(() => this.setState({ redirectLogin: false }), 1000);
      return <Redirect to="/login" />
    }
    return (
      <div style={{background: "rgba(255,153,0,0.2)"}}>
        <Container>
          <br></br>
          <Row>
            <Col className="mb-2" md={12} lg={6}>
              <h3 className="display-3" style={{color: "#050038", textDecoration: "none"}}><b>Password Reset</b></h3>
              <p className="lead" style={{color: "#050038", textDecoration: "none", fontSize: "28px"}}><i>Enter the information provided in the email to reset your password</i></p>
            </Col>
            <Col className="mb-2" md={12} lg={6}>
              {this.state.message.length > 0 ? <Alert key={this.state.messageType} variant={this.state.messageType}>{this.state.message}</Alert> : null}
              <Card style={{background: "rgba(255,153,0,0.2)"}}>
                <Container style={{padding: 20}}>
                  <Form style={{width: "50%"}}>
                    <Form.Group className="mb-3">
                      <Form.Label>User ID</Form.Label>
                      <Form.Control type="text"  placeholder="Enter User ID" name="userID" value={this.state.userID} onChange={this.onChange.bind(this)} style={{backgroundColor: "rgba(255,153,0,0.2)"}} required />
                      <Form.Text className="text-muted">Found in the email</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Password Reset Token</Form.Label>
                      <Form.Control type="text"  placeholder="Paste Token" name="token" value={this.state.token} onChange={this.onChange.bind(this)} style={{backgroundColor: "rgba(255,153,0,0.2)"}} required />
                      <Form.Text className="text-muted">Found in the email</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control type="password"  placeholder="Enter New Password" name="password" value={this.state.password} onChange={this.onChange.bind(this)} style={{backgroundColor: "rgba(255,153,0,0.2)"}} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Confirm New Password</Form.Label>
                      <Form.Control type="password"  placeholder="Confirm New Password" name="password2" value={this.state.password2} onChange={this.onChange.bind(this)} style={{backgroundColor: "rgba(255,153,0,0.2)"}} required />
                    </Form.Group>
                    <Button className="mb-2" variant="dark" type="submit" style={{cursor: "pointer", background: "#050038", width: "50%"}} onClick={(e) => this.resetPassword(e)}>Submit</Button>
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

export default PasswordReset;