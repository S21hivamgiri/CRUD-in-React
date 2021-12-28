import React, { Component } from "react";


export default class List extends Component {
  constructor() {
    super();
    this.state = {};
  }

  deleteUser(index) {
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
  }

  editUser(user) {
    console.log("inside editUser");
    this.refs.editfirstname.value = user.firstName;
    this.refs.editlastname.value = user.lastName;
    this.refs.editaddress.value = user.address;
    this.refs.editcountry.value = user.country;
    this.refs.editcity.value = user.city;
  }
  
  render() {
    var users = JSON.parse(window.localStorage.getItem("users"));
    console.log(users);

    return (
      <div className="container">
        <div className="col-lg-12 col-md-12">
          {users.length != 0 ? (
            <table className="table mt-5">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Country</th>
                  <th scope="col">City</th>
                  <th scope="col">Delete</th>
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
                          onClick={() => this.deleteUser(users.indexOf(item))}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="container">
              <h3 className="text-center" style={{ marginTop: "20%" }}>
                No Users To Display
              </h3>
            </div>
          )}
        </div>
      </div>
    );
  }
}
