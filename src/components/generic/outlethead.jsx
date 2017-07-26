import React from 'react';
import {connect} from 'react-redux';
import {Router, browserHistory, Link, withRouter} from 'react-router';

export default class BodyHead extends React.Component {

	handleClick() {
		this.props.onClick();
	}
  renderTMEList(){
    let div = null;
    if(this.props.tmeList){
      div = this.props.tmeList.map((val)=>{
        return (<option key={val.id} value={val.id} >{val.first_name} {val.last_name} ( {val.id} )</option>)
      })
    }
    return div;
  }
	render() {
    let div = this.renderTMEList();

		return (
			<div className="box">
				<div className="row">
					<div className="col-sm-12">
						<div className="col-sm-3">
							<span style={{
								display: 'block',
								marginTop: '0%',
								fontFamily: 'Roboto',
								fontSize: '20px',
								fontWeight: '900',
								lineHeight: '89px',
								position: 'relative',
								color: '#5E5E5E'
							}}>
								{this.props.pageTitle}
							</span>
							<span style={{
								display: 'block',
								marginTop: '-14%',
								color: '#5E5E5E',
								fontSize: '12px',
								fontWeight: '900',
								lineHeight: '14px'
							}}>
								{this.props.subTitle}</span>
						</div>
						{this.props.hidden
							? null
							: <div>
								<div className="col-sm-2" style={{
									marginTop: '4%',
									marginLeft: '9%',
									color: '#5E5E5E',
									fontSize: '12px',
									fontWeight: '900',
									lineHeight: '14px'
								}}>
									{this.props.selectName}
								</div>
								<div className="col-sm-3" style={{
									marginTop: '3%'
								}}>
									<select value={this.props.tme_name} onChange={(e)=>{
										this.props.handleTme(e.target.value);
									}} className="form-control">
									<option value = '' disabled> none </option>
										{div}
									</select>
								</div>
							</div>
            }
						<div className="col-sm-2" onClick={this.handleClick.bind(this)} style={{
							cursor: 'pointer',
							marginTop: '3%',
							padding: '9px 0 0 60px',
							opacity: '1',
							marginLeft: '6%',
							fontWeight: '500',
							borderRadius: '5px',
							height: '40px',
							backgroundColor: '#DBDBDB',
              float:"right"
						}}>
							{this.props.pageButton}
						</div>
					</div>
				</div>
			</div>

		);
	}
}
