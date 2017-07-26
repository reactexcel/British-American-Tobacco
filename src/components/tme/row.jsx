import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import Header from '../generic/header/header';
import BodyHead from '../generic/bodyhead';
import SideMenu from '../generic/menu/menu';
import Box from '../layout/Box';
import Table from '../table/table';
import { Router, browserHistory, Link, withRouter } from 'react-router';
import moment from 'moment';

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
class TmeRow extends React.Component {
  constructor(props) {
    super(props);
    this.handle = this.handle.bind(this);
  }
  handle(r,ro){
    this.props.onUnassign(r).then((val)=>{

      this.props.onTmeOutletList(ro);
    });
  }

  render() {
    const row = this.props.rowData;
    if(this.props.outletTme){
      return (
        <tr>
          <td style={styles.tbody}>{row.id || ''}</td>
          <td style={styles.tbody}>{row.bat_id|| ''}</td>
          <td style={styles.tbody}>{row.outlet_name || ''}</td>
          <td style={styles.tbody}>{row.points_value || ''}</td>
          <td style={styles.tbody}>{ ''}</td>
          <td style={styles.tbody}>{ ''}</td>
          <td style={styles.linktd}>
            <a className="sub" onClick={()=>{
              this.handle(row.id,row.tme_id);
            }} style={{color:'#FF344D' ,border:"1px solid #FF344D"}}>Unassign</a></td>
        </tr>
      );
    }else{

      return (
        <tr>
          <td style={styles.tbody}>{row.id || ''}</td>
          <td style={styles.tbody}>{row.first_name|| ''}</td>
          <td style={styles.tbody}>{row.last_name || ''}</td>
          <td style={styles.tbody}>{row.email || ''}</td>
          <td style={styles.tbody}>{ ''}</td>
          <td style={styles.tbody}>{moment(row.updatedAt).format('DD MMMM, YYYY') || ''}</td>
          <td style={styles.linktd}>
            <Link to={`/editTme/${row.id}`} className="sub">Edit</Link></td>
          </tr>
        );
    }
  }
}


export default TmeRow;
