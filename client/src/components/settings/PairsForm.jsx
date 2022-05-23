import React from 'react';
import {Col, ButtonGroup, Button, Row} from 'react-bootstrap';

const PairsForm = (props) => (
  <div>
    <p><label for="ETH"><b>ETH Trading Set To: {props.state["ETH/BTC"] === "off" ? "USD " + props.state["ETH/USD"] : props.state["ETH/USD"] === "off" ? "BTC " + props.state["ETH/BTC"] : "off"}</b></label></p>

    <Button className="mb-2 mt-2" type="submit" style={{cursor: "pointer"}} onClick={props.submitPairs}>Submit</Button>
  </div>

)

export default PairsForm;