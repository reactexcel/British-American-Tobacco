import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';

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
class SkuLists extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const row = this.props.rowData.sku;

    return (
      <tr>
        <td style={styles.tbody}>{row.id || ''}</td>
        <td style={styles.tbody}>{row.productname}</td>
        <td style={styles.tbody}>{row.brand_id }</td>
        <td style={styles.tbody}>{moment(row.createdAt).format('DD MMMM, YYYY')}</td>
        <td style={styles.tbody}>{row.bat_id}</td>
        <td style={styles.tbody}>{row.basepoint}</td>
        <td style={styles.linktd}>
          <Link to={`/editsku/${row.id}`} className="sub">Edit</Link></td>
      </tr>
    );
  }
}


export default SkuLists;
