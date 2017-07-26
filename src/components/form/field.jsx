import React from 'react';
import { connect } from 'react-redux';
import { Router, browserHistory, Link, withRouter } from 'react-router';

export default class PrimaryButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={this.props.containerClass} />
    );
  }
}
