import React from 'react';
import Header from '../generic/header/header';
import BodyHead from '../generic/bodyhead';
import SideMenu from '../generic/menu/menu';
import SkuLists from './row';
import Table from '../table/table';
import Box from '../layout/Box';
import _ from 'lodash';

export default class AllSku extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      perPageLimit: 100,
    };
  }
  componentWillMount() {
    this.props.allSkuList(this.state.page, this.state.perPageLimit);
  }
  goto() {
    this.props.router.push('/addsku');
  }

  render() {
    const mainDivs = _.map(this.props.sku, (row, i) => <SkuLists key={i} handleEdit={this.handleClick} rowData={row} {...this.props} />);

    return (
      <div className="main">
        <Header pageTitle={'ALL SKU '} {...this.props} />
        <SideMenu {...this.props} key="" />
        <BodyHead pageTitle={"SKU's"} pageButton={'ADD SKU'} {...this.props} onClick={() => this.goto()} />
        <div className="main-body">
          <Box loader={this.props.loader.show_loading}>
            <Table cols={['ID', 'Name', 'Brand ID', 'Start Date', 'BAT ID', 'Base Points', '']}>
              {mainDivs}
            </Table>
          </Box>
        </div>
      </div>
    );
  }
}
