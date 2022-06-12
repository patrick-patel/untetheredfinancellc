import React from 'react';
import { Redirect } from 'react-router';
import $ from 'jquery';

import { Container, ButtonGroup, Button, Form } from 'react-bootstrap';

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
      SetTimeout(() => this.setState({ redirectLogin: false }), 1000);
      return <Redirect to="/login" />
    }
    return (
      <div style={{background: "rgba(255,153,0,0.2)"}}>
        <br></br>
        <Container fluid style={{padding: 90}}>
          {this.state.message.length > 0 ? <Alert key={this.state.messageType} variant={this.state.messageType}>{this.state.message}</Alert> : null}
          <Form style={{width: "50%"}}>
            <Form.Group className="mb-3">
              <Form.Label>User ID</Form.Label>
              <Form.Control type="text"  placeholder="Enter User ID" name="userID" value={this.state.userID} onChange={this.onChange.bind(this)} required />
              <Form.Text className="text-muted">
                  Found in the email
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password Reset Token</Form.Label>
              <Form.Control type="text"  placeholder="Enter Token" name="token" value={this.state.token} onChange={this.onChange.bind(this)} required />
              <Form.Text className="text-muted">
                Found in the email
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password"  placeholder="Enter New Password" name="password" value={this.state.password} onChange={this.onChange.bind(this)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control type="password"  placeholder="Confirm New Password" name="password2" value={this.state.password2} onChange={this.onChange.bind(this)} required />
            </Form.Group>

            <Button variant="primary" type="submit" style={{cursor: "pointer"}} onClick={(e) => this.resetPassword(e)}>
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    )
  }
}

export default PasswordReset;