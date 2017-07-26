import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import Header from '../generic/header/header';
import BodyHead from '../generic/bodyhead';
import SideMenu from '../generic/menu/menu';
import Box from '../layout/Box';
import Table from '../table/table';
import TmeRow from './row';
import { Router, browserHistory, Link, withRouter } from 'react-router';

export class TmeLists extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.onTmeList(-1, 13);
  }
  render() {
    const mainDivs = _.map(this.props.tmeList.tmeList, (row, i) => <TmeRow key={i} rowData={row} handleEdit={this.handleClick} {...this.props} />);

    return (
      <div className="main">
        <Header pageTitle={'TME ACCOUNTS'} {...this.props} />
        <SideMenu {...this.props} key="" />
        <BodyHead pageTitle={'TME Accounts'} pageButton={'ADD TME'} onClick={() => this.props.goto()} {...this.props} />
        <Box>
          <Table cols={['ID', 'First Name', 'Last Name', 'Email', 'Outlets', 'Last Login', '', '']} >
            {mainDivs}
          </Table>
        </Box>
      </div>
    );
  }
}
export default TmeLists;
