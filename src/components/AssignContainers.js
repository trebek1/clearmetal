import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { getData, setPlan } from '../actions';
import AssignContainersHeader from './AssignContainersHeader';

class AssignContainers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedContainers: (props.containers.length > 0),
      fetchedVessels: (props.vessels.length > 0),
      selectedContainers: [],
      success: false,
      fail: false,
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

    if (this.props.vessels.length === 0 && this.state.fetchedVessels === false) {
      this.props.getData('vessels').then(() => {
        this.setState({
          fetchedVessels: true,
        });
      });
    }
  }

  submitForm(e) {
    e.preventDefault();
    const select = document.getElementById('select');
    const index = select.selectedIndex;
    const data = {
      vessel_id: index,
      container_ids: this.state.selectedContainers,
    };

    const clickedContainers = document.getElementsByClassName('clicked');
    while (clickedContainers.length) {
      const target = clickedContainers[0];
      target.classList.remove('clicked');
    }

    this.props.setPlan(data)
      .then(res => res.json())
      .then((response) => {
        this.setState({
          success: true,
          fail: false,
        });
        console.log('Success:', response);
      })
      .catch((error) => {
        this.setState({
          fail: true,
          success: false,
        });
        console.error('Error:', error);
      });
  }

  clickRow(e) {
    const row = e.target.parentElement;
    const containerId = parseInt(row.children[0].innerHTML, 10);
    const arrayOfContainers = this.state.selectedContainers;
    if (row.classList.contains('clicked')) {
      row.classList.remove('clicked');

      const index = arrayOfContainers.indexOf(containerId);
      if (index !== -1) arrayOfContainers.splice(index, 1);

      this.setState({
        selectedContainers: arrayOfContainers,
      });
    } else {
      row.classList.add('clicked');
      arrayOfContainers.push(containerId);
      this.setState({
        selectedContainers: arrayOfContainers,
      });
    }
  }

  renderOptions() {
    const options = [];
    for (let i = 0; i < this.props.vessels.length; i++) {
      const target = this.props.vessels[i];
      options.push(<option key={i} value={target.id}>{target.name}</option>);
    }
    return options;
  }

  renderContainers() {
    const response = [];
    const { containers } = this.props;
    for (let i = 0; i < containers.length; i++) {
      const target = containers[i];
      response.push(<tr key={i} onClick={(e) => { this.clickRow(e); }}>
        <td> {target.id} </td>
        <td> { target.container_number }</td>
      </tr>);
    }
    return response;
  }

  renderForm() {
    if (this.state.fetchedContainers && this.state.fetchedVessels) {
      // if there are zero containers or zero vessels available you cant make a new plan
      if (this.props.containers.length === 0 || this.props.vessels.length === 0) {
        return (
          <div> Either There are No Containers to be shipped or no vessels available for shipping </div>
        );
      }

      return (
        <div>
          <div id="leftAssignForm">
            <form onSubmit={(e) => { this.submitForm(e); }}>
              <select id="select" name="vessels">
                {this.renderOptions()}
              </select>
              <br />
              <br />
              <input type="submit" value="Submit Plan" />
            </form>
            <div id="messageSuccess" className={this.state.success ? 'show' : 'hide'}> Successfully Saved Plan! </div>
            <div id="messageFail" className={this.state.fail ? 'show' : 'hide'}> There was an error saving the plan </div>
          </div>
          <div id="rightAssignForm">
            <div id="tableContainer">
              <table>
                <thead>
                  <tr>
                    <th className="header">Id</th>
                    <th className="header">Container Number</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderContainers()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div> Loading Vessel Data and Container Data... </div>
        <FontAwesome
          name="spinner"
          size="2x"
          spin
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        <AssignContainersHeader />
        <div id="formContainer">
          {this.renderForm()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    containers: state.containers,
    vessels: state.vessels,
  };
}

AssignContainers.propTypes = {
  containers: PropTypes.array.isRequired,
  vessels: PropTypes.array.isRequired,
  getData: PropTypes.func.isRequired,
  setPlan: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getData, setPlan })(AssignContainers);
