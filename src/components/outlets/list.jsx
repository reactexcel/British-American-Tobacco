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
import OutletRow from './row.jsx';
import _ from 'lodash';

export default class Outlets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: -1,
      itemPerPage: 100,
    };
  }
  componentWillMount() {
    this.props.onOutletList(this.state.pageNo, this.state.itemPerPage);
  }

  render() {
    let sortedList = this.props.outletList.viewoutlet.sort((a, b) => {
                      if (a.data.id > b.data.id) return -1;
                      if (a.data.id < b.data.id) return 1;
                      return 0;
                    });
    const mainDivs = sortedList.map((row, i) => <OutletRow key={i} rowData={row} />);
    // _.map(this.props.outletList.viewoutlet, (row, i) => {
    //   mainDivs.push(<OutletRow key={i} rowData={row} />);
    // });

    return (
      <div className="main">
        <Header pageTitle={'All Outlets'} {...this.props} />
        <SideMenu {...this.props} key="" />
        <BodyHead pageTitle={'OUTLETS'} disableTitle />
        <Box>
          <Table cols={['ID', 'BAT ID', 'Store Name', 'Points', 'Last Accessed', 'Performance', 'Assigned TME', '', '']}>
            {mainDivs}
          </Table>
        </Box>
      </div>
    );
  }
}
