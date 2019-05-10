//class based component b/c need need helper methods 
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamCreate extends Component {
  renderError({error, touched}) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      )
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    )
  }

  onSubmit(formValues) {
    console.log(formValues);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field 
          name="title" 
          label="Enter Title" 
          component={this.renderInput} 
        />
        <Field 
          name="description" 
          label="Enter Description" 
          component={this.renderInput} 
        />
        <button className="ui button primary">Submit</button>
      </form>
    )
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    //only ran if the user did not enter a title
    errors.title = 'You must enter a title.';
  }
  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }
  return errors;
}

export default reduxForm({
  form: 'streamCreate',
  validate: validate
})(StreamCreate);

