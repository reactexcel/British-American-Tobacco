import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';
import FontIcon from 'material-ui/FontIcon';

const style = {
  paper: {
    opacity:"0.9",
    fontFamily: "'Nunito', sans-serif",
    fontSize: "12px",
    display: 'inline-block',
    height:"800px",
    position:"fixed",
    float: 'left',
    margin: '0px 0px 0px 0px',
  },

};

const Home = () => (
  <div>
    <Paper style={style.paper}>
      <Menu maxHeight="200%">

        <MenuItem
          primaryText="Home"
          leftIcon={<RemoveRedEye />} />
        <MenuItem
          primaryText="Sellers"
          leftIcon={<PersonAdd />} />

        <MenuItem
          primaryText="Redumption request"
          leftIcon={<ContentLink />} />
        <Divider />

        <MenuItem
          primaryText="Advertising"
          leftIcon={<ContentCopy />} />
    <Divider />
        <MenuItem primaryText="Upload data"
          leftIcon={<Download />} />

          <MenuItem
            primaryText="Brand Promotion"
            leftIcon={<FontIcon className="material-icons" style={{color: '#559'}}>settings</FontIcon>}
          />
        <Divider />
      </Menu>
    </Paper>
  </div>
);

export default Home;
