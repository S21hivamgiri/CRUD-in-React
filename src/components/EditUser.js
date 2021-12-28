import React, { Component } from "react";

const formFields = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  country: ""
};


export default class List extends Component {
  constructor() {
    super();
    this.state = {
      editIndex: null,
      formFields: formFields,
      cities: [],
      countries: ["India", "USA", "Japan"]
    };
  }

  handleChange = event => {
    const formFields = this.state.formFields;
    formFields[event.target.name] = event.target.value;
    if (event.target.name == "country") {
      switch (event.target.value) {
        case "India":
          this.setState({
            cities: ["Mumbai", "Noida", "Delhi", "Hyderabad", "Kochi"]
          });
          break;
        case "USA":
          this.setState({
            cities: ["NewYork", "Las Vegas", "Chicago", "Michigan"]
          });
          break;
        case "Japan":
          this.setState({
            cities: ["Tokyo", "Kyoto", "Osaka", "Hiroshima"]
          });
          break;
      }
    }
    this.setState({
      formFields: formFields
    });
  };

  reset = () => {
    this.refs.editfirstName.value = "";
    this.refs.editlastName.value = "";
    this.refs.editaddress.value = "";
    this.refs.editcountry.value = "";
    this.refs.editcity.value = "";
    this.setState({
      editIndex: null
    });
  };

  editUser(user, index) {
    this.setState({
      editIndex: index
    });
    setTimeout(() => {
      switch (user.country) {
        case "India":
          this.setState({
            cities: ["Mumbai", "Noida", "Delhi", "Hyderabad", "Kochi"]
          });
          break;
        case "USA":
          this.setState({
            cities: ["NewYork", "Las Vegas", "Chicago", "Michigan"]
          });
          break;
        case "Japan":
          this.setState({
            cities: ["Tokyo", "Kyoto", "Osaka", "Hiroshima"]
          });
          break;
      }

      this.refs.editfirstName.value = user.firstName;
      this.refs.editlastName.value = user.lastName;
      this.refs.editaddress.value = user.address;
      this.refs.editcountry.value = user.country;
      this.refs.editcity.value = user.city;
    })

  }

  handleSave = index => {
    if (index != null) {
      let users = JSON.parse(window.localStorage.getItem("users"));
      users[index].firstName = this.refs.editfirstName.value;
      users[index].lastName = this.refs.editlastName.value;
      users[index].address = this.refs.editaddress.value;
      users[index].country = this.refs.editcountry.value;
      users[index].city = this.refs.editcity.value;
      window.localStorage.setItem("users", JSON.stringify(users));
      users = JSON.parse(window.localStorage.getItem("users"));

      this.setState({
        editIndex: null
      });
      this.forceUpdate();
    }
  };
  render() {
    var users = JSON.parse(window.localStorage.getItem("users"));
    return (
      <div className="container">
        {users.length != 0 ? (
          <div className="">
            <div className="">

              <table className="table mt-5">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Country</th>
                    <th scope="col">City</th>
                    <th scope="col">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(item => {
                    return (
                      <tr className="border-bottom border-danger" key={users.indexOf(item)}>

                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.address}</td>
                        <td>{item.country}</td>
                        <td>{item.city}</td>
                        <td>
                          <button
                            className="btn btn-success"
                            data-toggle="modal"
                            data-target="#exampleModal"
                            onClick={() =>
                              this.editUser(item, users.indexOf(item))
                            }
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {this.state.editIndex !== null ?
              (
                <div className="alert alert-success">
                  <div>
                    First Name:{" "}
                    <input
                      ref="editfirstName"

                      type="text"
                      name="firstName"
                      onChange={this.handleChange}
                    />
                    <span className="text-danger">
                    </span>
                  </div>
                  <div>
                    Last Name:{" "}
                    <input
                      ref="editlastName"
                      type="text"
                      name="lastName"

                    />
                    <span className="text-danger">
                    </span>
                  </div>
                  <div>
                    Address:{" "}
                    <input
                      ref="editaddress"

                      type="text"
                      name="address"

                    />
                    <span className="text-danger">
                    </span>
                  </div>
                  <div>
                    Country:
                    <select
                      ref="editcountry"
                      onChange={this.handleChange}
                      name="country"
                      class="mr-sm-2 mt-3"
                      id="inlineFormCustomSelect"
                    >
                      <option value="">Choose...</option>
                      {this.state.countries.map(function (name) {
                        return (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        );
                      })}
                    </select>
                    <span className="text-danger">
                    </span>
                  </div>
                  <div>
                    City:
                    <select
                      ref="editcity"
                      onChange={this.handleChange}
                      name="city"
                      class="mr-sm-2 mt-3"
                      id="inlineFormCustomSelect"
                    >
                      <option value="">Choose...</option>
                      {this.state.cities.map(function (name) {
                        return (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <button
                      className="btn btn-success mr-3 mt-3"
                      onClick={() => this.handleSave(this.state.editIndex)}
                    >
                      Save Changes
                    </button>
                    <button
                      className="btn btn-success mt-3"
                      value="Reset"
                      onClick={this.reset}
                    >
                      Reset
                    </button>
                  </div>
                </div>) : (<div></div>)
            }
          </div>
        ) : (
          <div className="container">
            <h3 className="text-center" style={{ marginTop: "20%" }}>
              No Users to edit
            </h3>
          </div>
        )}
      </div>
    );
  }
}
