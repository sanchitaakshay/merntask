import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import {  } from 'reactstrap';
//import { customers } from '../../mernstackserver/app/controllers/customer.controller';
import CustomerList from './CustomerList';
import 'bootstrap/dist/css/bootstrap.min.css';
import One from './One';
import Two from './Two';
import Three from './Three';
import Four from './Four';
 import {Tabs, Tab, Modal, Row, Button, Col, Form, Card, Container} from "react-bootstrap";
 

class Home extends Component {
  render() {
    return (
      <div>
        <AppNavbar/>
        {/*<Container fluid>
          <Button color="link"><Link to="/customers">Manage Customer List</Link></Button>
        </Container>*/}

<Container>
                 <Row>
                     <Col>
                         <Tabs defaultActiveKey="Home" 
                               id="controlled-tab-example">
                             <Tab eventKey="customers" title="HEARING COMPLETE">
                                 < CustomerList/>
                                 </Tab>
                                 <Tab eventKey="One" title="ALL APPEALS">
                                 < One/>
                                 </Tab>
                                 <Tab eventKey="Two" title="AWAITING INFORMATION">
                                 < Two/>
                                 </Tab>
                                 
                                 <Tab eventKey="Three" title="INFORMATION RECEIVED">
                                 < Three/>
                                 </Tab>
                                 
                                 <Tab eventKey="Four" title="ANALYSIS COMPLETE">
                                 < Four/>
                                 </Tab>
                             
                         </Tabs>
                     </Col>
                 </Row>
             </Container>
      </div>
    );
  }
}

export default Home;