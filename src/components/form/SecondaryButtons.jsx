import React from 'react';
import { connect } from 'react-redux';
import { Router, browserHistory, Link, withRouter } from 'react-router';


export default class ButtonGrey extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={this.props.containerClass}>
        <input
          type="button"
          className={'btn btn-primary btngrey'}
          style={this.props.inputStyle}
          value={this.props.children}
        />
      </div>
    );
  }
}
