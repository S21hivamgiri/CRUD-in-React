import React from "react";

export default function UserList(props) {
  let deleteUser = props.deleteUser;
  let editUser = props.editUser;
  let users = JSON.parse(window.localStorage.getItem("users"));
  if (users.length !== 0) {
    return (
      <div className="col-lg-12 col-md-12">
        <div>
          <table className="table mt-5">
            <thead className="thead-dark">
              <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Address</th>
                <th scope="col">Country</th>
                <th scope="col">City</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map(item => {
                return (
                  <tr key={users.indexOf(item)}>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>{item.country}</td>
                    <td>{item.city}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        data-target="#editmodal"
                        data-toggle="modal"
                        onClick={() => editUser(item)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => deleteUser(users.indexOf(item))}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}
