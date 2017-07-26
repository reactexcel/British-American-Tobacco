import React from 'react';
import moment from 'moment';
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
class RowReport extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    const row = this.props.rowData;
    const rowData = row.data;
    const ID = rowData.id || '';

    let UPLOAD_DATE = '';
    if( rowData.createdAt && rowData.createdAt != '' ){
      UPLOAD_DATE = moment( rowData.createdAt ).format("Do MMMM YYYY")
    }

    const TYPE = row.type || '';
    const rollback_by = rowData.rollback_by;


    let rollback_status = '';
    let rollback_message = '';
    
    let rollbackText = '';
    if( rollback_by == '' || rollback_by == -1 ){
      rollback_status = 'No';
      let createdTimestamp = moment(rowData.createdAt).format("X");
      let currentTimestamp = moment().format("X");
      let timeDiff = currentTimestamp - createdTimestamp;
      let timeDiffHours = Math.floor(timeDiff / 3600);
      if( timeDiffHours > 23 ){
        rollback_status = 'No';
      }else{
        rollback_status = 'Before';
        rollback_message = moment(rowData.createdAt).add(1, 'days').format("Do MMMM YYYY, h:mm a")
      }
    }else{
      rollback_status = 'Yes';
      rollback_message = 'By - ' + rollback_by;
    }
    let url_type = TYPE;
    if( TYPE == 'DELIVERY & RETURN' ){
      url_type = 'DELIVERY_RETURN'
    }


    return (
      <tr>
        <td style={styles.tbody}>{ID}</td>      
        <td style={styles.tbody}>{UPLOAD_DATE}</td>       
        <td style={styles.tbody}>{TYPE}</td>  
        <td style={styles.tbody}>
          {rollback_status}
          <br/>
          {rollback_message}
        </td>      
        <td style={styles.linktd}>
          <Link to={`/uploadreport/${ID}/${url_type}`}>Details</Link>
        </td>
      </tr>
    );
  }
}

export default RowReport;
