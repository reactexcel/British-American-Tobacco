import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default class Box extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="main-body">
        <div className="row">
          <div className="col-12" >
            <div className="box2" >
              <div className="row">
                <div className="col-12">
                  {
                    this.props.children
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
