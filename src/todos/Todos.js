import React, { useState } from "react";
import "./Todos.scss";
import { useSelector, useDispatch } from "react-redux";
import { addJob, editOneJob, deleteJob, completedJob } from "../actions";
import { v4 as uuidv4 } from "uuid";

function Todos() {
  const jobs = useSelector((state) => state.todos.jobsList);
  const jobEdit = useSelector((state) => state.todos.jobEdit);

  const dispatch = useDispatch();

  const [job, setJob] = useState("");
  const [checkInputUnChange, setcheckInputUnChange] = useState(true);
  console.log(checkInputUnChange);

  let isEmptyObj = Object.keys(jobEdit).length === 0;

  const handleOnChange = (e) => {
    setJob(e);
  };

  const handleOnEditChange = (e) => {
    let editJobCopy = { ...jobEdit };
    editJobCopy.name = e;

    dispatch(editOneJob(editJobCopy));
  };

  const handleOnClickEditAndSaveJob = (e, job) => {
    e.preventDefault();
    let editJobCopy = jobEdit;
    //save
    if (isEmptyObj === false && job.id === editJobCopy.id) {
      //Find index of specific object using findIndex method.
      let objIndex = jobs.findIndex((job) => job.id === editJobCopy.id);

      //Update object's name property.
      jobs[objIndex].name = editJobCopy.name;
      dispatch(editOneJob({}));

      return;
    }

    //edit
    dispatch(editOneJob(job));
    setcheckInputUnChange(true);
  };

  const handleOnClickAdd = (e) => {
    e.preventDefault();
    dispatch(
      addJob({
        id: uuidv4(),
        name: job,
        completed: false,
        editing: false,
      })
    );
    setJob("");
  };

  //Delete
  const handleOnClickDelete = (e, job) => {
    e.preventDefault();
    dispatch(deleteJob(job));
  };

  //CheckBox
  const handleCheckBox = (e, job) => {
    dispatch(completedJob({ e, job }));
  };

  return (
    <div className="container">
      <div className="todos">
        <form
          className="form-check-all-add"
          onSubmit={(e) => handleOnClickAdd(e)}
        >
          <input
            type="checkbox"
            onChange={(e) => handleCheckBox(e, job)}
            name="allSelect"
            checked={jobs.filter((job) => job?.isChecked !== true).length < 1}
          />
          <input
            className="input-add"
            type="text"
            value={job}
            placeholder="What needs to be done"
            onChange={(e) => handleOnChange(e.target.value)}
          />
        </form>
        <div className="form-list">
          <ul className="list-job">
            {jobs &&
              jobs.map((job) => (
                <div className="form-check" key={job.id}>
                  <li className="form-check-detail">
                    {isEmptyObj === true ? (
                      <>
                        <input
                          type="checkbox"
                          name={job.name}
                          onChange={(e) => handleCheckBox(e, job)}
                          checked={job?.isChecked || false}
                        />
                        <label>{job.name}</label>
                      </>
                    ) : (
                      <>
                        {job.id === jobEdit.id ? (
                          <input
                            className={"input-change"}
                            type="text"
                            value={jobEdit.name}
                            onChange={(e) => handleOnEditChange(e.target.value)}
                          />
                        ) : (
                          <input
                            className={"input-change"}
                            type="text"
                            value={jobEdit.name}
                            onChange={(e) => handleOnEditChange(e.target.value)}
                          />
                        )}
                      </>
                    )}
                    <span>
                      <button
                        onClick={(e) => handleOnClickEditAndSaveJob(e, job)}
                      >
                        {!isEmptyObj === true && job.id === jobEdit.id
                          ? "Save"
                          : "Edit"}
                      </button>
                    </span>
                    <span>
                      <button onClick={(e) => handleOnClickDelete(e, job.id)}>
                        &times;
                      </button>
                    </span>
                  </li>
                </div>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Todos;
