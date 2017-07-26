import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import Dialog from 'material-ui/Dialog';
import { connect } from 'react-redux';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import style from './tme.scss';

export default class DialogBox extends React.Component {
  constructor(props) {
    super(props);
    this.searchByKey = this.searchByKey.bind(this);
    this.searchByFilter = this.searchByFilter.bind(this);
    this.manage = this.manage.bind(this);
    this.state = {
      open: false,
      arr: [1, 2, 3, 4, 5, 6],
      searchKey:'',
      searchData:[],
      filter:'ALL',
      selectedOption:[],
    };
  }

  componentWillMount(){
    this.setState({
      searchKey:'',
      searchData:[]
    })
  }

  componentWillReceiveProps(props) {
    this.setState({ open: props.open ,searchData: props.tmeList.searchData});

  }
  searchByFilter = (filter) =>{
    this.setState({selectedOption:[]})
    if(filter != ''){
      this.props.onSearchByKey(this.state.searchKey,filter).then((val)=>{
        // console.log(val,"////////////////////");
      })
    }
  }

  searchByKey = (key) =>{
      this.setState({selectedOption:[]})
      this.props.onSearchByKey(key,this.state.filter).then((val)=>{
        // console.log(val,"////////////////////");
      })
  }

  manage(e , id) {
    if(e.target.checked){
      let arr = this.state.selectedOption;
      arr.push(id);
      this.setState({selectedOption: arr});
    }else {
      let array = this.state.selectedOption;
      let newArr = [];
      _.map(array,(val)=>{
        if(val != id){
          newArr.push(val)
        }
      })
      this.setState({selectedOption:newArr});
    }
  }
  render() {
    let arr = this.state.searchData;
    const checkbox = arr.map((val,i) => {
      return (<div
      className="col-md-12" key={i}
    >
      <div className="col-md-6">
        <Checkbox
          key={i}
          style={{
            fontSize: '12px',
            fontWeight: 500,
            lineHeight: '16px' }}
          label={val.outlet_name}
          onCheck={(e)=>{
            this.manage(e,val.id);
          }}
        />
      </div>
      <div key={i} className="col-md-offset-9" style={{fontSize:"14px"}}>
        {
          val.tme_id === null ?  'Status : Un-Assinged' : 'Status : Assigned'
        }

      </div>
    </div>
  )});
    return (
      <div className="main">
        <Dialog
          modal={false}
          OverlayStyle={{
            borderRadius: '10px',
          }}
          bodyStyle={{
            minHeight: '580px',
          }}
          open={this.state.open}
        >

          <div className="modal-body row m-0 ">
            <div
              className="title" style={{
                marginTop: '1%',
                marginLeft: '13%',
              }}
            >{'ASSIGN OUTLETS'}</div>
            <div className="container-fluid ">
              <div className="form-group col-xs-offset-1">
                <input
                  type="search"
                  className="form-control"
                  id="search"
                  placeholder="type name of outlets"
                  style={{
                    height: '55px',
                    width: '97%',
                  }}
                  value={this.state.searchKey}
                  onKeyUp={(e) => {
                    this.searchByKey(e.target.value);
                  }}
                  onChange={(e) => {
                    this.setState({ searchKey: e.target.value });
                  }}
                />
              </div>

              <h5
                style={{
                  marginTop: '4%', fontWeight: '900', marginLeft: '9%',
                }}
              >Show</h5>
              <div className="col-md-12 p-0">
                <div className="col-md-12 p-0 row">
                  <RadioButtonGroup
                    name="filter"
                    style={{ display: 'flex' }}
                    onChange={(e) => {
                      this.searchByFilter(e.target.value);
                      this.setState({ filter: e.target.value });
                    }}
                    defaultSelected='ALL'
                  >
                    <RadioButton
                      className="col-md-5"
                      value="UNASSIGN"
                      label="Un-Assinged Only"
                      style={{ width: '38%', paddingLeft: '15px', opacity: '0.56' }}
                    />
                    <RadioButton
                      value="ALL"
                      className="col-md-5"
                      label="ALL"
                      style={{ width: '65%', paddingLeft: '0px', opacity: '0.56' }}
                    />
                  </RadioButtonGroup>
                </div>
              </div>
              <div
                className="col-md-12 p-0 "
                style={{ marginBottom: '9%',
                  marginTop: '4%' }}
              >

                <div
                  className="col-md-12"
                  style={{
                    padding: '0 0px 0 32px', overflowY: 'scroll', maxHeight: '150px',
                  }}
                >
                  {checkbox}
                </div>
              </div>
              <div
                className="col-md-12 p-0" style={{
                  marginLeft: '6%',
                }}
              >
                <div
                  className="col-md-6" style={{
                    padding: '0 0px 0 10px',
                  }}
                >
                  <button
                    type="button btn-default"
                    style={{ marginLeft: '5%',
                      width: '78%',
                      height: '49px',
                      backgroundColor: '#4A4A4A',
                      color: '#fff' }}
                    onClick={() => {
                      this.setState({searchKey:'',selectedOption:[],filter:"ALL"})
                      this.props.handleClose()
                    }}
                    className="btn btn-default"
                  >CANCEL
                </button>
                </div>
                <div
                  className="col-md-6" style={{
                    padding: '0 0px 0 0',
                  }}
                >
                  <button
                    type="button btn-default"
                    style={{ marginLeft: '1%',
                      width: '78%',
                      height: '49px',
                      backgroundColor: '#1F8AFD',
                      color: '#fff' }}
                    onClick={() => {
                      this.props.handleAssign(this.state.selectedOption);
                      this.setState({searchKey:'',selectedOption:[],filter:"ALL"})
                    }}
                    className="btn btn-default btny"
                  >ASSIGN({this.state.selectedOption.length})</button>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}
