import React from 'react';
import Dialog from 'material-ui/Dialog';
import Button from '../form/PrimaryButton';
import styles from './outlet.scss';

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
          OverlayStyle={styles.modelbody}
          open={this.state.open}
          contentStyle={styles.customContentStyle}
          autoDetectWindowHeight
          autoScrollBodyContent
        >
          <div className="main">
            <div className="col-md-12" style={{ height: '180px' }}>
              <div className="model-title">
                {'EDIT THIS MONTHS TARGET'}</div>

              <div className="row" style={{ marginTop: '6%', marginLeft: '18%' }}>
                <div className="col-xs-2" style={{ marginTop: '2%' }}>
                  <label>{'TARGET ='}</label>
                </div>
                <div className="col-xs-6">
                  <input type="text" className="model-input" />
                </div>
                <div className="col-xs-offset-8" style={{ marginTop: '2%' }}>
                  <label>cartons</label>
                </div>
              </div>
            </div>
            <div className="break" />
            <div className="col-md-offset-2">
              <button
                onClick={() => { this.props.handleClose(); }}
                type="button"
                className="btn btn-default model-btn"
              >CANCEL</button>
              <button
                type="button"
                className="btn btn-default model-btns"
              >APPLY</button>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}
