import React from 'react';
import Header from '../generic/header/header.jsx';
import BodyHead from '../generic/bodyhead';
import SideMenu from '../generic/menu/menu.jsx';
import Box from '../layout/Box';
import MemberLists from './row.jsx';
import AddDialog from './dialog';
import Table from '../table/table';

export default class Membership extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      id: '',
    };
    this.addOpen = this.addOpen.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.editMember = this.editMember.bind(this);
  }
  componentWillMount() {
    this.props.onMemberList();
  }

  addOpen() {
    this.setState({
      open: true
     });
  }
  handleCloseDialog() {
    this.setState({ open: false });
  }
  editMember(id){
    this.props.onGetMemberById(id).then((val) => {
      this.setState({
        id: id,
        open: true
      })
    });
  }
  render() {
    const mainDivs = _.map(this.props.memberList, (row, i) => <MemberLists key={i} editMember={this.editMember} rowData={row} {...this.props}/>);

    return (
      <div className="main">
        <Header pageTitle={'Memberships'} {...this.props} />
        <SideMenu {...this.props} key="" />
        <BodyHead pageTitle={'Memberships'}
          pageButton={'ADD MEMBERSHIPS'} openHandler={this.addOpen} {...this.props} />

        <AddDialog
          open={this.state.open}
          id={this.state.id}
          member={this.props.member}
          handleCloseDialog={this.handleCloseDialog} {...this.props}
        />
        <div className="main-body">
          <Box>
            <Table cols={['ID', 'Name', 'Points Required', 'Rebate Rate (1 Point)', 'Order', '', '']}>
              {mainDivs}
            </Table>

        </Box>
        </div>
      </div>
    );
  }
}
