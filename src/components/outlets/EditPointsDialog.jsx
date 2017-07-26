import React from 'react';
import Dialog from 'material-ui/Dialog';
import Button from '../form/PrimaryButton';
import styles from './outlet.scss';

export default class EditPointsDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openApply: false,
    };
  }
  componentWillReceiveProps(props) {
    const controlBox = props.openApply;
    this.setState({ openApply: controlBox });
  }
  render() {
    return (
      <div className={this.props.containerClass}>
        <Dialog
          modal={false}
          OverlayStyle={styles.modelbody}
          open={this.state.openApply}

        >
          <div className="main">
            <div className="col-md-12" style={{ height: '230px' }}>
              <div className="model-title">
                {'EDIT THIS MONTHS TARGET'}</div>

              <div className="row" style={{ marginTop: '6%', marginLeft: '0' }}>
                <div className="col-xs-3" style={{ marginTop: '2%' }}>
                  <label>{'+/- AMMOUNT'}</label>
                </div>
                <div className="col-xs-9">
                  <input type="text" className="model-input" />
                </div>

              </div>
              <div className="row" style={{ marginLeft: '0%', marginTop: '3%' }}>
                <div className="col-xs-3" style={{ marginTop: '2%' }}>
                  <label>{'DETAILS'}</label>
                </div>
                <div className="col-xs-9">
                  <input type="text" className="model-input" />
                </div>

              </div>
            </div>

            <div className="break" />
            <div className="col-md-offset-6" style={{ marginTop: '0%', marginLeft: '5%' }}>
              <button
                onClick={() => {
                  this.props.handleCloseApply();
                }
                }
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
