import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { getData } from '../actions';

class Containers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedContainers: false,
    };
  }

  componentDidMount() {
    if (this.props.containers.length === 0 && this.state.fetchedContainers === false) {
      this.props.getData('containers').then(() => {
        this.setState({
          fetchedContainers: true,
        });
      });
    }
  }

  handleResponse() {
    const { containers } = this.props;
    const response = [];
    for (let i = 0; i < containers.length; i++) {
      const target = containers[i];
      response.push(<tr key={i}>
        <td> {target.id} </td>
        <td> { target.container_number }</td>
      </tr>);
    }

    return response;
  }
  render() {
    console.log("what is thius ", this);
    if (this.props.containers.length === 0) {
      if (this.state.fetchedContainers === false) {
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
              <th className="header">Container Id</th>
              <th className="header">Container Number</th>
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
  return { containers: state.containers };
}

Containers.propTypes = {
  containers: PropTypes.array.isRequired,
  getData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getData })(Containers);
