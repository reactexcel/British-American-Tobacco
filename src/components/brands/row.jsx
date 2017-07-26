import React from 'react';
import { connect } from 'react-redux';
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
class BrandRow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const row = this.props.rowData;
    const ID = row.brand.id || '';
    const BRAND_NAME = row.brand.brandname || '';
    const BAT_ID = row.brand.bat_id;
    const CREATED_AT = row.brand.createdAt;
    const UPDATED_AT = row.brand.updatedAt;
    return (
      <tr>
        <td style={styles.tbody}>{ID}</td>
        <td style={styles.tbody}>{BRAND_NAME}</td>
        <td />
        <td style={styles.tbody}>{BAT_ID}</td>
        <td style={styles.tbody}>{row.skuNumber}</td>
        <td />
        <td />
        <td />
        <td style={styles.linktd}>
          <Link to={`/addbrand/${ID}`} className="sub">Edit</Link></td>
      </tr>
    );
  }
}


export default BrandRow;
