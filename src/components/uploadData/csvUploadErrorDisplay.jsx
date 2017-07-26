import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router';

class CsvUploadErrorDisplay extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let sales_order_no = '';
    let errorMessage = '';
    if( this.props.rowData && this.props.rowData.row ){
      let item = this.props.rowData.row;
      for (let key in item ) {
        if (item.hasOwnProperty(key)) {
          if( key === 'Sales Order No.'){
            sales_order_no = item[key];
          }
        }
      }
    }
    if( this.props.rowData && this.props.rowData.error && this.props.rowData.error.error ){
      errorMessage = this.props.rowData.error.error;
    }
    
    return (
      <div className="alert alert-danger">
        {sales_order_no} - { errorMessage }
      </div>
    );
  }
}

export default CsvUploadErrorDisplay;
