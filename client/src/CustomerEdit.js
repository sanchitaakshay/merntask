import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container,Form,FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class CustomerEdit extends Component {

  emptyCustomer = {
                          taxyear: '',
                          date: '',
                          jurisdiction: '',
                          name: '',
                          parcelid:'',
                          status:'',
                          letter:'',
                          tvalue:'',
                          hvalue:''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyCustomer
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const customer = await (await fetch(`/api/customer/${this.props.match.params.id}`)).json();
      this.setState({item: customer});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch('/api/customer', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/customers');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit Customer' : 'Add Customer'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="taxyear">Tax Year</Label>
            <Input type="text" name="taxyear" id="taxyear" value={item.taxyear || ''}
                   onChange={this.handleChange} autoComplete="taxyear"/>
          </FormGroup>
          <FormGroup>
            <Label for="date">Hearing Date</Label>
            <Input type="text" name="date" id="date" value={item.date || ''}
                   onChange={this.handleChange} autoComplete="date"/>
          </FormGroup>          
          <FormGroup>
            <Label for="jurisdiction">Jurisdiction</Label>
            <Input type="text" name="jurisdiction" id="jurisdiction" value={item.jurisdiction || ''}
                   onChange={this.handleChange} autoComplete="jurisdiction"/>
          </FormGroup>
          <FormGroup>
            <Label for="name">Client Name</Label>
            <Input type="text" name="name" id="name" value={item.name || ''}
                   onChange={this.handleChange} autoComplete="name"/>
          </FormGroup>
          <FormGroup>
            <Label for="parcelid">Parcel Id</Label>
            <Input type="text" name="parcelid" id="parcelid" value={item.parcelid || ''}
                   onChange={this.handleChange} autoComplete="parcelid"/>
          </FormGroup>
          <FormGroup>
            <Label for="status">Appeal Status</Label>
            <Input type="text" name="status" id="status" value={item.status || ''}
                   onChange={this.handleChange} autoComplete="status"/>
          </FormGroup>
         {/* <FormGroup>
            <Label for="letter">Appeal Letter</Label>
            <Input type="text" name="letter" id="letter" value={item.letter || ''}
                   onChange={this.handleChange} autoComplete="letter"/>
         </FormGroup>*/}
          <FormGroup>
          <Label for="letter">Appeal Letter</Label>
          <select class="form-control mt-2"name="letter" id="letter" value={item.letter || ''}
                   onChange={this.handleChange} autoComplete="letter">
        
        <option value="">---select---</option>
        <option value="Male" >Sent</option>
        <option value="Female">Not Sent</option>
        
      </select>
      </FormGroup>

          <FormGroup>
            <Label for="tvalue">Target Value</Label>
            <Input type="text" name="tvalue" id="tvalue" value={item.tvalue || ''}
                   onChange={this.handleChange} autoComplete="tvalue"/>
          </FormGroup>
          <FormGroup>
            <Label for="hvalue">Hearing Value</Label>
            <Input type="text" name="hvalue" id="hvalue" value={item.hvalue || ''}
                   onChange={this.handleChange} autoComplete="hvalue"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/customers">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(CustomerEdit);