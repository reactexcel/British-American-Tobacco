import React from 'react';
import Header from '../generic/header/header';
import _ from 'lodash';
import BodyHead from '../generic/bodyhead';
import SideMenu from '../generic/menu/menu';
import Table from '../table/table';
import Box from '../layout/Box';
import UploadDialog from './dialog';
import RowReport from './rowReport';

export default class UploadData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.open = this.open.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }
  componentWillMount() {
    this.props.onGetUploadedReports().then((val) => {});
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ open: false }); // to close the modal window
  }
  open() {
    this.setState({ open: true });
  }
  handleCloseDialog(){
    this.setState({ open: false }); // to close the modal window
  }
  render() {
    let allReports = '';
    if( this.props.allReports && this.props.allReports.length > 0 ){
      let repData = this.props.allReports;
      let newData = _.sortBy( repData,[(item) => {
        return item.data.id * -1;
      }])
      allReports = newData.map(function(row, i) {
        return <RowReport key={i} rowData={row}/>
      });
    }

    return (
      <div className="main">
        <Header pageTitle={'UPLOAD DATA'} {...this.props} />
        <SideMenu {...this.props} key="" />
        <BodyHead pageTitle={'UPLOAD DATA'} pageButton={'UPLOAD REPORTS'} onClick={() => this.open()} {...this.props} />
        <UploadDialog open={this.state.open} {...this.props} handleCloseDialog={this.handleCloseDialog} />
        <div className="main-body">
          <Box>
            <Table cols={['Report ID', 'Upload Date', 'Type', 'Rollback', '']} >
              {allReports}
            </Table>
            
          </Box>
        </div>
      </div>
    );
  }
}
