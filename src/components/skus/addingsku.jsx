import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Header from '../generic/header/header';
import BodyHead from '../generic/bodyhead';
import SideMenu from '../generic/menu/menu';
import Box from '../layout/Box';
import Button from '../form/PrimaryButton';
import ButtonGrey from '../form/SecondaryButtons';

export default class AddingSku extends React.Component {

  handleClick() {
    this.props.router.push('/promotions');
  }

  render() {
    return (
      <div className="main">
        <Header pageTitle={'ADD SKU :'} {...this.props} />
        <SideMenu {...this.props} key="" />
        <BodyHead pageTitle={'ADD SKU'} disableTitle />

        <div className="body-main">
          <Box loader ={this.props.loader.show_loading}>
            <div
              className="col-md-6 " style={{
                marginTop: '2%',
              }}
            >
              <div className="row">
                <div className="col-md-6">
                  <label
                    className="col-md-3 p-0" style={{
                      marginTop: '1%',
                      width: '100%',
                      color: '#667685',
                      fontWeight: '500',
                    }}
                  >Select SKU :</label>
                </div>
                <div className="col-md-6">
                  <select
                    className="form-control" style={{
                      width: '95%',
                      backgroundColor: '#f4f4f4',
                    }} id="sel1"
                  >
                    <option>Select Brand</option>
                    <option>brand1</option>
                    <option>brand2</option>
                    <option>brand3</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-6 pull-right">
              <div
                className="col-md-6" style={{
                  marginTop: '5%',
                  color: '#667685',
                }}
              >0
                <div className="form-group">
                  <label
                    style={{
                      fontWeight: '500',
                    }}
                  >From Date</label>
                  <label />
                  <div className="input-group date" id="datetimepicker6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="DD-MM-YYY"
                    />
                    <span className="input-group-addon">
                      <span
                        className="glyphicon glyphicon-calendar" style={{
                          color: '#1F8AFD',
                        }}
                      />
                    </span>
                  </div>
                </div>
              </div>

              <div
                className="col-md-6" style={{
                  marginTop: '6%',
                  fontWeight: '500',
                }}
              >
                <div className="form-group">
                  <label />
                  <div className="input-group date" id="datetimepicker6">
                    <input type="text" className="form-control" placeholder="hh:mm" />
                    <span className="input-group-addon">
                      <span
                        style={{
                          color: '#1F8AFD',
                        }}
                      >AM</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <label
                style={{
                  fontWeight: '500',
                  marginTop: '5%',
                  marginLeft: '3%',
                }}
              >Promotion Description</label>
              <div >
                <textarea
                  className="form-control" style={{
                    marginLeft: '2%',
                  }}
                  rows="5"
                  id="comment"
                />
              </div>
            </div>

            <div className="col-md-6 pull-right">
              <div
                className="col-md-6" style={{
                  marginTop: '5%',
                  color: '#667685',
                }}
              >
                <div className="form-group">
                  <label
                    style={{
                      fontWeight: '500',
                    }}
                  >To Date</label>
                  <label />
                  <div className="input-group date" id="datetimepicker6">
                    <input type="text" className="form-control" placeholder="DD-MM-YYY" />
                    <span className="input-group-addon">
                      <span
                        className="glyphicon glyphicon-calendar" style={{
                          color: '#1F8AFD',
                        }}
                      />
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="col-md-6" style={{
                  marginTop: '6%',
                  fontWeight: '500',
                }}
              >
                <div className="form-group">
                  <label />
                  <div className="input-group date" id="datetimepicker6">
                    <input type="text" className="form-control" placeholder="hh:mm" />
                    <span className="input-group-addon">
                      <span
                        style={{
                          color: '#1F8AFD',
                        }}
                      >AM</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-md-6 pull-left" style={{
                marginTop: '5%',
                color: '#667685',
                fontSize: '16px',
                marginLeft: '1%',
              }}
            >
              <label
                style={{
                  fontWeight: '500',
                  marginLeft: '2%',
                }}
              >Additional Points</label>
              <h5
                style={{
                  marginTop: '2%',
                  fontSize: '16px',
                  fontWeight: '500',
                  marginLeft: '2%',
                }}
              >1 Cartoon =</h5>
              <input
                type="text" className="form-control p-0" style={{
                  width: '334px',
                  height: '42px',
                  marginLeft: '25%',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D0D0D0',
                  borderRadius: '5px',
                  marginTop: '-8%',
                }}
              />
            </div>
            <div
              className="col-md-6 pull-right" style={{
                marginTop: '12%',
              }}
            >
              <div className="form-group">
                <Button buttonType={'primary'}>Update</Button>
                <Button buttonType={'secondary'}>Cancel</Button>
                <ButtonGrey>Unpublish</ButtonGrey>
              </div>
            </div>
          </Box>
        </div>
      </div>
    );
  }
}
