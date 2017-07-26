import React from 'react';
import _ from 'lodash';

const styles = {
  table: {
    borderStyle: '1px solid',
    borderColor: '#ffffff',
    marginLeft: '0%',
  },
  th: {
    fontFamily: 'Roboto',
    paddingTop: '19px',
    paddingBottom: '18px',
    paddingLeft: '25px',
  },
};

export default class Table extends React.Component {
  constructor(props) {
    super(props);
  }
  _renderHead() {
    return _.map(this.props.cols, (col, i) => <th key={i} className="th" style={styles.th}>{col}</th>);
  }
  render() {
    const head = this._renderHead();
    return (
      <table
        className="table tables"
        style={styles.table}
      >
        <thead>
          <tr>
            {head}
          </tr>
        </thead>
        <tbody>
          {this.props.children}
        </tbody>
      </table>
    );
  }
}
