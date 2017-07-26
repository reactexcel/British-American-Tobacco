import React from 'react';
import Dialog from 'material-ui/Dialog';
import Button from '../form/PrimaryButton';

export default class DialogBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  componentWillReceiveProps(props) {
    this.setState({ open: props.open });
  }

  render() {
    const { open } = this.props;
    return (
      <div className={this.props.containerClass}>
        <Dialog
          modal={false}
          open={this.state.open}
          autoDetectWindowHeight
          autoScrollBodyContent
        >
          <div className="main">
            <div className="col-md-12" style={{ height: '180px' }}>
              <div className="model-title">
                {this.props.modelTitle}
              </div>
            </div>

            {
            this.props.children
          }
          </div>
        </Dialog>
      </div>
    );
  }
}
