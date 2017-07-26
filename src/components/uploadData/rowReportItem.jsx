import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router';

const styles = {
  tbody: {
    fontFamily: 'Roboto',
    fontSize: '12px',
    paddingTop: '18px',
    paddingBottom: '18px',
    paddingLeft: '25px',
  },
  linktd: {
    fontSize: '12px',
    color: '#1F8AFD',
    cursor: 'pointer',
    paddingTop: '18px',
  },
};
class RowReportItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const row = this.props.rowData;
    const ID = row.id || '';
    const OUTLET_NAME = row.Outlet && row.Outlet.outlet_name || '';

    const SKU = row.SKU && row.SKU.productname || '';    
    const CARTONS = row.transaction_value || '';
    //const POINTS = row.Outlet && row.Outlet.points_value;
    const POINTS = "";
    let TYPE =  '' ;
    if( typeof row.sales_order_no != 'undefined' ){
      TYPE = 'DELIVERY';
    }
    if( typeof row.sales_return_no != 'undefined' ){
      TYPE = 'RETURN';
    }
    if( TYPE == '' && this.props.type && this.props.type != ''){
      TYPE = this.props.typel
    }

    return (
      <tr>
        <td style={styles.tbody}>{ID}</td>      
        <td style={styles.tbody}>{OUTLET_NAME}</td>       
        <td style={styles.tbody}>{TYPE}</td>  
        <td style={styles.tbody}>{SKU}</td>  
        <td style={styles.tbody}>{CARTONS}</td>      
        <td style={styles.tbody}>{POINTS}</td>
      </tr>
    );
  }
}

export default RowReportItem;
