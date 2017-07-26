import React from 'react';
import Header from '../generic/header/header';
import BodyHead from '../generic/bodyhead';
import SideMenu from '../generic/menu/menu';
import Box from '../layout/Box';
import Table from '../table/table';
import BrandRow from './row';

export default class AllBrand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      perPageLimit: 40,
    };
  }

  componentWillMount() {
    this.props.allBrandList(this.state.page, this.state.perPageLimit);
  }
  goto() {
    this.props.router.push('/addbrand');
  }
  render() {
    const mainDivs = [];
    _.map(this.props.brands.viewbrands, (row, i) => {
      mainDivs.push(<BrandRow key={i} rowData={row} {...this.props} />);
    });
    return (
      <div className="main">
        <Header pageTitle={'ALL BRANDS '} {...this.props} />
        <SideMenu {...this.props} key="" />
        <BodyHead pageTitle={'All Brands'} pageButton={'ADD BRAND'} {...this.props} onClick={() => this.goto()} />
        <Box loader ={this.props.loader.show_loading}>
          <Table cols={['ID', 'Name', ' ', 'BAT ID', 'Number of SKU', '', '', '', '']}>
            {mainDivs}
          </Table>
        </Box>
      </div>
    );
  }
}
