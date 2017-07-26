import React from 'react';
import { connect } from 'react-redux';
import { Router, browserHistory, Link, withRouter } from 'react-router';

export default class BodyHead extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if(this.props.openHandler){
      this.props.openHandler();
    }else{
      this.props.onClick();
    }
  }
  render() {
    return (
      <div className="box">
        <div className="row">
          <div className="col-md-6" style={{ marginLeft: '0%' }}>
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
                borderRadius: '5px',
              }}
              id="pageTitle"
            >
              {this.props.pageTitle}
            </div>
          </div>

          {
              this.props.disableTitle ? null
              :
              <div
                onClick={() => {this.handleClick();}}
                className="btn pull-right head"
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '12px',
                  padding: '11px 0 0 0',
                  marginRight: '3%',
                  marginTop: '3%',
                  opacity: '1',
                  textAlign: 'center',
                  width: '17%',
                  fontWeight: '500',
                  borderRadius: '5px',
                  height: '40px',
                }}
                id="pageTitle2"
              >
                {this.props.pageButton}
              </div>
            }
        </div>
      </div>

    );
  }
}
