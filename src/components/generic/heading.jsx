import React from 'react';
import { connect } from 'react-redux';
import { Router, browserHistory, Link, withRouter } from 'react-router';

export default class BodyHeading extends React.Component {
  render() {
    return (
      <div className="box">
        <div className="row">
          <div className="col-md-6" style={{ marginLeft: '2%' }}>
            <div
              className="navbar-item"
              style={{
                fontFamily: 'Roboto',
                fontSize: '20px',
                fontWeight: '900',
                lineHeight: '89px',
                position: 'relative',
                color: '#5E5E5E',
                marginLeft: '0px',
              }} id="pageTitle"
            >{this.props.pageTitle}</div>
          </div>
          <div
            className="btn pull-right"
            style={{
              fontFamily: 'Roboto',
              fontSize: '18px',
              padding: '11px 0 0 0',
              marginRight: '4%',
              marginTop: '2%',
              opacity: '1',
              textAlign: 'center',
              width: '16%',
              height: '40px',
            }} id="pageTitle2"
          >{this.props.pageButton}</div>
        </div>
      </div>

    );
  }
}
