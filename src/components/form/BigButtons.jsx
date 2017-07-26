import React from 'react';
import { connect } from 'react-redux';
import { Router, browserHistory, Link, withRouter } from 'react-router';

export default class BigButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={this.props.containerClass}>
        <input
          type="submit"
          value={this.props.children}
          className="btn buttonbox btn-change"
          onClick={event => this.props.onClick(event)}
        />
      </div>
    );
  }
}
