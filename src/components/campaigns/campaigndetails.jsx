import React from 'react';
import Drawer from 'material-ui/Drawer';
import { Router, Route, Link } from 'react-router';
import BodyHead from '../generic/bodyhead';
import BodyHeading from '../generic/heading';
import SideMenu from '../generic/menu/menu';
import Header from '../generic/header/header';
import Button from '../form/PrimaryButton.jsx';
import Box from '../layout/Box';

export default class CampaignDetails extends React.Component {

  handleClick() {
    this.props.router.push('/allcampaigns');
  }

  render() {
    return (
      <div className="main">
        <Header pageTitle={'CAMPAIGNS DETAILS :'} {...this.props} />
        <SideMenu {...this.props} key="" />
        <BodyHeading pageTitle={'CAMPAIGNS DETAILS : 32233'} pageButton={'Status : Live'} />
        <Box>
          <div
            className="col-md-6"
            style={{ marginTop: '1%' }}
          >
            <label style={{ fontWeight: '500' }}>Headline</label>
            <input type="text" className="form-control" id="usr" />
          </div>
          <div className="col-md-6 container" style={{ marginTop: '2%' }}>
            <label
              className="col-md-3"
              style={{
                marginTop: '1%',
                fontWeight: '500',
              }}
            >Type : </label>

            <select
              className="form-control"
              style={{ width: '54%' }} id="sel1"
            >
              <option>ALL</option>
              <option>xyzx</option>
              <option>xfad</option>
              <option>sadd</option>
            </select>
          </div>
          <div className="col-md-6 ">
            <label className="col-md-3"style={{ marginTop: '5%', fontWeight: '500' }}>Outlets :</label>
            <select className="form-con`trol" style={{ width: '54%', marginTop: '18px' }} id="sel1">
              <option>ALL</option>
              <option>xyzx</option>
              <option>xfad</option>
              <option>sadd</option>
            </select>
          </div>

          <div className="col-md-6">
            <label style={{ fontWeight: '500' }} >Description</label>
            <div>
              <textarea className="form-control" rows="5" id="comment" />
            </div>
            <label />
            <label
              style={{
                fontWeight: '500',
                fontSize: '16px',
                marginTop: '4%',
                marginBottom: '6%',
              }}
            >Image (400 x 400)</label>
            <div
              className="box"
              style={{
                width: '227.44px',
                height: '143.09px',
                backgroundColor: '#f4f4f4',
                marginLeft: '1%',
                opacity: '0.6',
              }}
            >
              <div><i
                className="fa fa-download fa-2x"
                aria-hidden="true"
                style={{ marginTop: '3%' }}
              />
              </div>
              <p
                style={{
                  padding: '33px 0px 0px 14px',
                }}
              >choose a file or drag it here</p>
            </div>
          </div>

          <div className="col-md-3" style={{ marginTop: '3%' }}>
            <div className="form-group">
              <label style={{ fontWeight: '500' }}>From Date</label>
              <label />
              <div className="input-group date" id="datetimepicker6">
                <input type="text" className="form-control" placeholder="DD-MM-YYYY" />
                <span className="input-group-addon">
                  <span className="glyphicon glyphicon-calendar"style={{ color: '#1F8AFD' }} />
                </span>
              </div>
            </div>
          </div>

          <div className="col-md-3" style={{ marginTop: '3%' }}>
            <div className="form-group">
              <label style={{ fontWeight: '500' }} >To Date</label>
              <label />
              <div className="input-group date" id="datetimepicker6">
                <input type="text" className="form-control" placeholder="DD-MM-YYYY" />
                <span className="input-group-addon">
                  <span className="glyphicon glyphicon-calendar" style={{ color: '#1F8AFD' }} />
                </span>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="form-group">
              <div className="input-group date" id="datetimepicker6">
                <input type="text" className="form-control" placeholder="hh : mm" />
                <span className="input-group-addon">
                  <span style={{ color: '#1F8AFD' }}>AM</span>
                </span>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="form-group">
              <div className="input-group date" id="datetimepicker6">
                <input type="text" className="form-control"placeholder="hh : mm" />
                <span className="input-group-addon">
                  <span style={{ color: '#1F8AFD' }}>AM</span>
                </span>
              </div>
            </div>
          </div>
        </Box>
      </div>
    );
  }
}
