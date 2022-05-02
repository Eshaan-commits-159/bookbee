import { Component } from 'react';
import UserDetails from './UserDetails';

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
    branch: ''
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
      semester,
      branch
    } = this.state;

    const values = {
      email,
      username,
      password,
      firstName,
      lastName,
      stream,
      semester,
      branch
    };

    switch (step) {
      case 1:
        return (
          <UserDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
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
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        );
      case 4:
        return <h1>Success</h1>;
      // never forget the default case, otherwise VS code would be mad!
      default:
        console.log('This is a multi-step form built with React.');
    }
  }
}

export default Register;
