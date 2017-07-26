import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Router, Route, Link } from 'react-router';
import Header from '../generic/header/header';
import BodyHead from '../generic/bodyhead';
import SideMenu from '../generic/menu/menu';
import Box from '../layout/Box';
import Table from '../table/table';
import _ from 'lodash';

export default class PerformanceHis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: -1,
      itemPerPage: 100,
    };
  }

  render() {
    return (
      <div className="main">
        <Header pageTitle={'Outlet : Details 734656: Performance History'} {...this.props} />
        <SideMenu {...this.props} key="" />
        <BodyHead pageTitle={'OUTLET 734656 : Performance History'} {...this.props} />
        <Box>
          <Table cols={['ID', 'Month', 'Target', 'Sales', 'Last sale txn', 'Status', '']} />
        </Box>
      </div>
    );
  }
}
