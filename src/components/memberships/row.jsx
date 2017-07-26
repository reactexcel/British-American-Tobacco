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
class MemberLists extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const row = this.props.rowData;
    const ID = row.id || '';
    const NAME = row.type_name || '';
    const REBATE_RATE = row.rebate_rate || '';
    const MIN_POINTS = row.min_required_points || '';
    const ORDER = row.order || '';

    return (
      <tr>
        <td style={styles.tbody}>{ID}</td>
        <td style={styles.tbody}>{NAME}</td>
        <td style={styles.tbody}>{REBATE_RATE}</td>
        <td style={styles.tbody}>{MIN_POINTS}</td>
        <td style={styles.tbody}>{ORDER}</td>
        <td style={styles.tbody}></td>
        <td style={styles.linktd}>
          <button onClick={()=>this.props.editMember(ID)} className="sub">Edit</button></td>
      </tr>
    );
  }
}

export default MemberLists;
