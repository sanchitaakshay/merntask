import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
//import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class CustomerList extends Component {

  constructor(props) {
    super(props);
    this.state = {customers: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/customers')
      .then(response => response.json())
      .then(data => this.setState({customers: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/api/customer/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      console.log("Remove Done!");
      let updatedCustomers = [...this.state.customers].filter(i => i._id !== id);
      this.setState({customers: updatedCustomers});
    });
  }

  render() {
    const {customers, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const customerList = customers.map(customer => {
      return <tr key={customer._id}>
        <td style={{whiteSpace: 'nowrap'}}>{customer.taxyear}</td>
        <td>{customer.date}</td>
        <td>{customer.jurisdiction}</td>
        <td>{customer.name}</td>
        <td>{customer.parcelid}</td>
        <td>{customer.status}</td>
        <td>{customer.letter}</td>
        <td>{customer.tvalue}</td>
        <td>{customer.hvalue}</td>
        
        
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/customers/" + customer._id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(customer._id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
       
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/customers/new">Add</Button>
          </div>
          <h3>List</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">TAX YEAR</th>
                <th width="20%">HEARING DATE</th>
                <th width="10%">Jurisdiction</th>
                <th>CLIENT NAME</th>
                <th>PARCEL ID</th>
                <th>APPEAL STATUS</th>
                <th>APPEAL LETTER</th>
                <th>TARGET VALUE</th>
                <th>HEARING VALUE</th>
                <th width="10%">Actions</th>
              </tr>
            </thead>
            <tbody>
            {customerList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default CustomerList;