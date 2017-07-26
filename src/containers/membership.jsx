import React from 'react';
import { CONFIG } from '../config/index.js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as _ from 'lodash';
import * as memberActions from '../actions/membership/index';
import Membership from '../components/memberships/index';

class MembershipContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
  }

  handleBack(){
    this.props.router.push('/membership');
  }

  render() {
    return (
      <div>
        <Membership handleBack={this.handleBack} {...this.props} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  var member = state.membership.toJS();

  return {
    loader: state.loader.toJS(),
    memberList: member.membershipData,
    Addmembership: member.Addmembership,
    member: member.member,
  };
}
const mapDispatchToProps = dispatch => ({
  onMemberList: () => dispatch(memberActions.memberList()),
  onAddMember: (memberData) => dispatch(memberActions.addMember(memberData)),
  onGetMemberById: (id) => dispatch(memberActions.getMemberById(id)),
  onUpdateMember: (id, memberData) => dispatch(memberActions.updateMember(id, memberData)),
});

const VisibleMembershipContainer = connect(mapStateToProps, mapDispatchToProps)(MembershipContainer);

const RouterVisibleMembershipContainer = withRouter(VisibleMembershipContainer);

export default RouterVisibleMembershipContainer;
