import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { getData } from '../actions';

class Containers extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      fetchedContainers: false,
    };
  }

  componentDidMount() {
    if (this.props.containers.length === 0 && this.state.fetchedContainers === false) {
      this.setState({
        isLoading: true,
      });
      this.props.getData('containers', this);
    }
  }

  handleResponse(containers) {
    const response = [];
    for (let i = 0; i < containers.length; i++) {
      const target = containers[i];
      response.push(<tr key={i}>
        <td> {target.id} </td>
        <td> { target.container_number }</td>
      </tr>);
    }
    if (this.state.isLoading) {
      this.setState({
        isLoading: false,
      });
    }

    return response;
  }
  render() {
    if (this.props.containers.length === 0) {
      if (this.state.isLoading && this.state.fetchedContainers === false) {
        return (
          <div>
            <div> Loading Container Data... </div>
            <FontAwesome
              name="spinner"
              size="2x"
              spin
            />
          </div>
        );
      }
      return (
        <div> If there are containers they are listed here. No containers were returned from the API. </div>
      );
    }
    return (
      <div id="container">
        <table>
          <thead>
            <tr>
              <th className="header">Id</th>
              <th className="header">Container Number</th>
            </tr>
          </thead>
          <tbody>
            {this.handleResponse(this.props.containers)}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { containers: state.containers };
}

Containers.propTypes = {
  containers: PropTypes.array.isRequired,
  getData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getData })(Containers);
