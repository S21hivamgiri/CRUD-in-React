import React, { Component } from "react";

const formFields = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  country: ""
};

var users = [];
var dummyUsers = [];
if (JSON.parse(window.localStorage.getItem("users")) == null) {
  window.localStorage.setItem("users", JSON.stringify(dummyUsers));
}

export default class Form extends Component {
  constructor() {
    super();
    this.state = {
      formFields: formFields,
      errors: {},
      cities: [],
      countries: ["India", "USA", "Japan"]
    };
  }

  userdelete = function userdelete(index) {
    let users = JSON.parse(window.localStorage.getItem("users"));
    console.log(users);
    let newUsers = [];
    users.map(item => {
      if (users.indexOf(item) != index) {
        newUsers.push(item);
      }
    });

    window.localStorage.setItem("users", JSON.stringify(newUsers));
    console.log(JSON.parse(window.localStorage.getItem("users")));
    this.forceUpdate();
  };

  useredit(user) {
    this.refs.editfirstname.value = user.firstName;
    this.refs.editlastname.value = user.lastName;
    this.refs.editaddress.value = user.address;
    this.refs.editcountry.value = user.country;
    this.refs.editcity.value = user.city;
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
    this.validateControl(event.target.name);
  };

  validateControl(control) {
    const errors = this.state.errors;

    if (this.state.formFields[control] == "") {
      this.state.errors[control] = `please enter ${control}`;
    } else {
      this.state.errors[control] = "";
    }

    if (this.state.formFields[control] == "" && control == "country") {
      console.log("here");
      this.state.errors[control] = "please select country";
    }
    if (this.state.formFields[control] == "" && control == "city") {
      this.state.errors[control] = "please select city";
    }

    this.setState({
      errors
    });
  }

  reset = () => {
    this.refs.firstName.value = "";
    this.refs.lastName.value = "";
    this.refs.address.value = "";
    this.refs.country.value = "";
    this.refs.city.value = "";
  };
  handleSave = () => {
    let flag = true;
    const formFields = this.state.formFields;
    for (const key in formFields) {
      this.validateControl(key);
    }
    const errors = this.state.errors;
    for (const key in errors) {
      if (errors[key] != "") {
        flag = false;
        break;
      }
    }
    if (flag) {
      let user = this.state.formFields;

      if (JSON.parse(window.localStorage.getItem("users")) == null) {
        window.localStorage.setItem("users", JSON.stringify(user));
      } else {
        users = JSON.parse(window.localStorage.getItem("users"));
        console.log(typeof users);
        console.log(users);
        users.push(user);
        window.localStorage.setItem("users", JSON.stringify(users));
      }
      alert("User added successfully");
    }
  };

  componentDidMount() {
    switch (this.refs.country.value) {
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

  clearStorage = () => {
    window.localStorage.clear();
    console.log("cleared storage");
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="mt-5 col-lg-6 offset-lg-3 alert alert-success">
            <p classname="lead"> Enjoy our Community for free </p>
            <hr className="my-4" />


            <div>
              First Name:{" "}
              <input
                ref="firstName"

                type="text"
                name="firstName"
                value={this.state.formFields["firstName"]}
                onChange={this.handleChange}
              />
              <span className="text-danger">
                {this.state.errors["firstName"]}
              </span>
            </div>
            <div>
              Last Name:{" "}
              <input
                ref="lastName"
                type="text"
                name="lastName"
                value={this.state.formFields["lastName"]}
                onChange={this.handleChange}
              />
              <span className="text-danger">
                {this.state.errors["lastName"]}
              </span>
            </div>
            <div>
              Address:{" "}
              <input
                ref="address"
                type="text"
                name="address"
                value={this.state.formFields["address"]}
                onChange={this.handleChange}
              />
              <span className="text-danger">
                {this.state.errors["address"]}
              </span>
            </div>
            <div>
              Country:
              <select
                ref="country"
                value={this.state.formFields["country"]}
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
                {this.state.errors["country"]}
              </span>
            </div>
            <div>
              City:
              <select
                ref="city"
                value={this.state.formFields["city"]}
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
              <span className="text-danger">{this.state.errors["city"]}</span>
            </div>
            <div>
              <button
                style={{ display: "inline-block" }}
                className="btn btn-success mr-3 mt-3"
                value="Submit"
                onClick={this.handleSave}
              >
                Submit
              </button>
              <button
                style={{ display: "inline-block" }}
                className="btn btn-success mt-3"
                value="Reset"
                onClick={this.reset}
              >
                Reset
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
