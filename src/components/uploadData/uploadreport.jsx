import React from 'react';
import Header from '../generic/header/header';
import moment from 'moment';
import BodyHead from '../generic/bodyhead';
import SideMenu from '../generic/menu/menu';
import Table from '../table/table';
import Box from '../layout/Box';
import RowReportItem from './rowReportItem';
import CsvUploadErrorDisplay from './csvUploadErrorDisplay';

export default class UploadReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      id: '',
    };
    this.doRollBack = this.doRollBack.bind(this);
  }
  componentWillMount() {
    const reportId = this.props.params.id;
    const type = this.props.params.type;
    if (reportId) {
      this.setState({ id: reportId });
      this.props.onGetUploadReportById(reportId, type).then((val) => {
      });
    }
  }

  doRollBack() {
    const componentProps = this.props;
    const reportId = this.props.params.id;
    const type = this.props.params.type;
    this.props.doRollBack(reportId, type).then((val) => {
      const newURL = 'upload';
      componentProps.router.push(newURL);
      // this.props.onGetUploadReportById(reportId, type).then((val) => {
      // });
    }, () => {

      const newURL = 'upload';
      componentProps.router.push(newURL);
      // this.props.onGetUploadReportById(reportId, type).then((val) => {
      // });
    });
  }
  render() {

    let allReports = '';
    let firstRow = false;
    let dataToShowArray = [];
    if (this.props.report && this.props.report.data) {
      const reportType = this.props.report.type;
      if( reportType == 'DELIVERY & RETURN'){
        let DR_sales_order = this.props.report.data.sales_order;
        let sales_return = this.props.report.data.sales_return;
        let completeData = DR_sales_order.concat( sales_return );
        dataToShowArray = completeData;
        firstRow = completeData[0];
        allReports = completeData.map((row, i) => <RowReportItem key={i} rowData={row} />);  
      }else{
        dataToShowArray = this.props.report.data;
        firstRow = this.props.report.data[0];
        allReports = this.props.report.data.map((row, i) => <RowReportItem key={i} rowData={row} type={reportType} />);  
      }      
    }

    // check to show rol back or not
    let showRollBack = true;
    if( firstRow && firstRow.createdAt ){
      let createdTime = moment(firstRow.createdAt).format("X");
      let currentTime = moment().format("X");
      let timeDiff = currentTime - createdTime;
      let timeDiffHours = Math.floor(timeDiff / 3600);
      if( timeDiffHours > 23 ){
        showRollBack = false;
      }
    }
    if( dataToShowArray.length == 0 ){
      showRollBack = false;
    }
    
    let showUploadErrorMessages = '';
    let showUploadErrors = '';
    if (this.props.csvUplodErrors && this.props.csvUplodErrors.length > 0) {
      showUploadErrorMessages = this.props.csvUplodErrors.map((row, i) => <CsvUploadErrorDisplay key={i} rowData={row} />);
      showUploadErrors = (<Box>
        <div className="row" style={{ paddingTop: '15px', padding: '10px' }}>
          {showUploadErrorMessages}
        </div>
      </Box>);
    }

    return (
      <div className="main">
        <Header pageTitle={'UPLOAD DATA'} {...this.props} />
        <SideMenu {...this.props} key="" />
        {
          showRollBack ? 
            <BodyHead pageTitle={`Report ID : ${this.state.id}`} pageButton={'ROLL BACK'} {...this.props} onClick={this.doRollBack} />
          : <BodyHead pageTitle={`Report ID : ${this.state.id}`} {...this.props} disableTitle={true} />
        }
        
        <div className="main-body">
          {showUploadErrors}
          <Box>
            <Table cols={['Transactions ID', 'Outlet Name', 'Type', 'SKU', 'Cartons', 'Points(+/-)', '']} >
              {allReports}
            </Table>
          </Box>
        </div>
      </div>
    );
  }
}
