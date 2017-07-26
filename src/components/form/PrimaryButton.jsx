import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_loading : false
    }
  }

  componentWillReceiveProps(props){
    if(props.loader){
      this.setState({show_loading:true})
    }
  }
  
  render() {
    return (
      <a className={this.state.show_loading}>

      <span>
        {
          this.props.buttonType == 'primary' ?
            <input
              type="button"
              onClick={event => this.props.onClick(event)}
              className={'btn btn-primary btns'}
              style={this.props.inputStyle}
              value={this.props.children}
			  disabled={this.props.disabled}
            />
          :
            <input
              type="button"
              onClick={event => this.props.onClick(event)}
              className={'btn btn-default btna'}
              style={this.props.inputStyle}
              value={this.props.children}
			  disabled={this.props.disabled}
            />
        }
      </span>
  </a>
    );
  }
}
