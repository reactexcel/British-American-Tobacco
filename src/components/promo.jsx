import React from 'react'
import {render} from 'react-dom'
import ReactDOM from 'react-dom'
import {Router, Route, Link} from 'react-router'
import Header from './generic/header/header';
import BodyHead from './generic/bodyhead';
import SideMenu from './generic/menu/menu';

export default class Promo extends React.Component {

  handleClick() {
    this.props.router.push('/addingsku');
  }

  render() {
    return (
      <div className="main">
        <div>
          <Header pageTitle={'All promos'} {...this.props} />
        </div>
        <div>
          <SideMenu {...this.props} key="" />
        </div>
        <div>
          <BodyHead pageTitle={'Promotions'} pageButton={'ADD PROMO'} {...this.props} goto={'addingsku'} />
        </div>

        <div className="row">
          <div className="col-12">
            <div className="box2">
              <div className="row">
                <div className="col-12">
                  <div
                    style={{
                    overflow: 'hidden',
                  }}
                  >
                    <table className="table">
                    <thead>
                    <tr>
                    <th>ID</th>
                    <th>SKU</th>
                    <th>
														BAT ID</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Additional Points</th>
                    <th>Status</th>
                    <th />
                    <th />
                  </tr>
                  </thead>

                    <tbody
                    style={{
                    marginLeft: '2%',
                  }}
                  >
                    <tr>
                    <td>231634</td>
                    <td>Dunhil</td>
                    <td>DH</td>
                    <td>09 Dec 2017</td>
                    <td>09 Dec 2017</td>
                    <td>2 Points</td>
                    <td>Live</td>
                    <td />
                    <td>
                    <button onClick={this.handleClick} className="sub">Edit</button>
                  </td>
                  </tr>
                    <tr>
                    <td>231634</td>
                    <td>Dunhil</td>
                    <td>DH</td>
                    <td>09 Dec 2017</td>
                    <td>09 Dec 2017</td>
                    <td>2 Points</td>
                    <td>Live</td>
                    <td />
                    <td>
                    <button onClick={this.handleClick} className="sub">Edit</button>
                  </td>
                  </tr>
                    <tr>
                    <td>231634</td>
                    <td>Dunhil</td>
                    <td>DH</td>
                    <td>09 Dec 2017</td>
                    <td>09 Dec 2017</td>
                    <td>2 Points</td>
                    <td>Live</td>
                    <td />
                    <td>
                    <button onClick={this.handleClick} className="sub">Edit</button>
                  </td>
                  </tr>
                  </tbody>
                  </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
