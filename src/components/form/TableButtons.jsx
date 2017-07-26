import React from 'react';
import { connect } from 'react-redux';
import { Router, browserHistory, Link, withRouter } from 'react-router';

export default class TableButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={this.props.containerClass}>
        {
        this.props.buttonColor == 'blue' ?

          <input
            type="button"
            className="sub"
            color={this.props.color}
            style={this.props.inputStyle}
            value={this.props.children}
          />
        :
          <input
            type="button"
            className="tme"
            color={this.props.color}
            style={this.props.inputStyle}
            value={this.props.children}
          />
      }
      </div>

    );
  }
}
