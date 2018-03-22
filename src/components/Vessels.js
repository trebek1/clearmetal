import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { getData } from '../actions';

class Vessels extends Component {
  constructor() {
    super();
    this.state = {
      fetchedVessels: false,
    };
  }

  componentDidMount() {
    if (this.props.vessels.length === 0 && this.state.fetchedVessels === false) {
      this.props.getData('vessels').then(() => {
        this.setState({
          fetchedVessels: true,
        });
      });
    }
  }

  handleResponse() {
    const { vessels } = this.props;
    const response = [];
    for (let i = 0; i < vessels.length; i++) {
      const target = vessels[i];
      response.push(<tr key={i}>
        <td> { target.id } </td>
        <td className="name"> { target.name }</td>
      </tr>);
    }
    return response;
  }
  render() {
    if (this.props.vessels.length === 0) {
      if (this.state.fetchedVessels === false) {
        return (
          <div>
            <div> Loading Vessel Data... </div>
            <FontAwesome
              name="spinner"
              size="2x"
              spin
            />
          </div>
        );
      }
      return (
        <div> If there are vessels then they are listed here. No vessels were returned from the API. </div>
      );
    }
    return (
      <div id="vesselContainer">
        <table>
          <thead>
            <tr>
              <th className="header">Vessel Id</th>
              <th className="header">Vessel Name</th>
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
  return { vessels: state.vessels };
}

Vessels.propTypes = {
  vessels: PropTypes.array.isRequired,
  getData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getData })(Vessels);
