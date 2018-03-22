import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { getData } from '../actions';

class Plans extends Component {
  static renderIdString(ids) {
    let str = '';

    for (let i = 0; i < ids.length; i++) {
      const target = ids[i];
      str += target;
      if (i !== (ids.length - 1)) {
        str += ',';
      }
    }
    return str;
  }

  constructor() {
    super();
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    this.props.getData('vessel_plans').then(() => {
      // its ok to call setstate in a callback in CDM
      this.setState({
        loaded: true,
      });
    });
  }

  handleResponse() {
    const { plans } = this.props;
    const response = [];
    if (plans.length > 0) {
      for (let i = 0; i < plans.length; i++) {
        const target = plans[i];
        response.push(<tr key={i}>
          <td> { target.vessel_id } </td>
          <td> { Plans.renderIdString(target.container_ids) }</td>
        </tr>);
      }
      return response;
    }
    return <tr><td> No plan data was returned by the API </td></tr>;
  }

  render() {
    if (this.state.loaded === false) {
      return (
        <div>
          <div> Loading Plan Data... </div>
          <FontAwesome
            name="spinner"
            size="2x"
            spin
          />
        </div>
      );
    }
    return (
      <div id="vesselContainer">
        <table>
          <thead>
            <tr>
              <th className="header">Id</th>
              <th className="header">Container Ids</th>
            </tr>
          </thead>
          <tbody>
            {this.handleResponse()}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { plans: state.plans };
}

Plans.propTypes = {
  plans: PropTypes.array.isRequired,
  getData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getData })(Plans);
