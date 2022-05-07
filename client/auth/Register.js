import { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import UserDetails from '../components/UserDetails';
import PersonalDetails from '../components/PersonalDetails';
import Confirm from '../components/Confirm';

export class Register extends Component {
  state = {
    step: 1,
    email: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    stream: '',
    semester: '',
    branch: '',
    errors: {}
  };

  register = () => {
    const {
      email,
      username,
      password,
      firstName,
      lastName,
      stream,
      branch,
      semester,
      errors = {}
    } = this.state;
    const name = firstName + ' ' + lastName;
    //Headers
    const config = {
      headers: {
        'content-type': 'application/json'
      }
    };

    //request body
    const body = JSON.stringify({ name, username, email, password, stream, branch, semester });

    axios
      .post('http://localhost:3000/bookbee/users/register', body, config)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        console.log(res.data);
        this.setState({ errors: { msg: null } });
        this.props.handleLogin(true);
        //after successfull registration next page success will be called
      })
      .catch((err) => {
        this.setState({ errors: { msg: err.response.data } });
      });
  };

  // go back to previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  // proceed to the next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  // handle field change
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    const {
      email,
      username,
      password,
      firstName,
      lastName,
      stream,
      branch,
      semester,
      errors = {}
    } = this.state;

    const values = {
      email,
      username,
      password,
      firstName,
      lastName,
      stream,
      branch,
      semester,
      errors
    };

    if (this.props.user) {
      return <Redirect to={{ pathname: '/' }} />;
    }

    switch (step) {
      case 1:
        return (
          <UserDetails nextStep={this.nextStep} handleChange={this.handleChange} values={values} />
        );
      case 2:
        return (
          <PersonalDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <Confirm
            register={this.register}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        );
      case 4:
        return <Success />;
      // never forget the default case, otherwise VS code would be mad!
      default:
        console.log('This is a multi-step form built with React.');
    }
  }
}

export default Register;
