import React from 'react';
import { render } from 'react-dom';
import moment from 'moment';
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
class OutletLists extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const row = this.props.rowData;
    const ID = row.data.id || '';
    const BAT_ID = row.data.bat_id || '';
    const STORE_NAME = row.data.outlet_name || '';
    const POINTS = row.data.points_value || '';
    const LAST_ACCESSED = moment(row.data.updatedAt).format('DD MMMM, YYYY') || '';
    const PERFORMANCE = row.performance || '';
    const FIRSTNAME = row.tme ? row.tme.first_name : 'none';
    const LASTNAME = row.tme ? row.tme.last_name : '';
    const ASSIGN_TME = `${FIRSTNAME} ${LASTNAME}`;
    return (
      <tr>
        <td style={styles.tbody}>{ID}</td>
        <td style={styles.tbody}>{BAT_ID}</td>
        <td style={styles.tbody}>{STORE_NAME}</td>
        <td style={styles.tbody}>{POINTS}</td>
        <td style={styles.tbody}>{LAST_ACCESSED}</td>
        <td style={styles.tbody}>{PERFORMANCE}</td>
        <td style={styles.tbody}>{ASSIGN_TME}</td>
        <td style={styles.linktd}>
          <Link to={`/outletdetails/${ID}`}>Edit Account</Link>
        </td>
      </tr>
    );
  }
}

export default OutletLists;
