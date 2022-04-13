import React, { useEffect, useState } from "react";
import "./checkBox.scss";
const userData = [
  { id: 1, name: "thai", completed: false },
  { id: 2, name: "tuyen", completed: false },
];

function CheckBox() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(userData);
  }, []);

  const handleOnChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = users.map((user) => {
        return { ...user, isChecked: checked };
      });
      setUsers(tempUser);
    } else {
      let tempUser = users.map((user) =>
        user.name === name ? { ...user, isChecked: checked } : user
      );
      setUsers(tempUser);
    }
  };

  return (
    <div className="container">
      <form className="form">
        <h3>helloCheckbox</h3>
        <div className="form-check-all">
          <input
            type="checkbox"
            name="allSelect"
            onChange={handleOnChange}
            checked={
              users.filter((user) => user?.isChecked !== true).length < 1
            }
          />
          {/* <label>Select All</label> */}
        </div>
        {users.map((user) => (
          <div className="form-check" key={user.id}>
            <input
              type="checkbox"
              name={user.name}
              onChange={handleOnChange}
              checked={user?.isChecked || false}
            />

            <label>{user.name}</label>
          </div>
        ))}
      </form>
    </div>
  );
}

export default CheckBox;
