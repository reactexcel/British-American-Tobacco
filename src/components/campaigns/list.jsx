import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Header from '../generic/header/header';
import BodyHead from '../generic/bodyhead';
import SideMenu from '../generic/menu/menu';
import Box from '../layout/Box';
import Table from '../table/table';


export default class AllCampaigns extends React.Component {

  handleTest() {
    this.props.router.push('/campaigndetails');
  }

  render() {
    return (
      <div className="main">
        <Header pageTitle={'All Campaigns '} {...this.props} />
        <SideMenu {...this.props} />
        <BodyHead pageTitle={'CAMPAIGNS'} pageButton={'CREATE CAMPAIGN'} {...this.props} goto={'campaigndetails'} />
        <Box>
          <Table cols={['ID', 'Title', 'Start Date', 'End Date', 'Status', 'Type', '']} />
        </Box>
      </div>
    );
  }
}
