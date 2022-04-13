// 1: Init state

const initstate = {
  jobsList: [
    { id: 1, name: "rua bat", completed: false, editing: false },
    { id: 2, name: "nau com", completed: false, editing: false },
  ],
  jobEdit: {},
};

const todoReducer = (state = initstate, action) => {
  switch (action.type) {
    case "COMPLETED_JOB":
      const { name, checked } = action.payload.e.target;
      if (name === "allSelect") {
        let toggleJob = state.jobsList.map((job) => {
          return { ...job, isChecked: checked, completed: true };
        });
        return {
          ...state,
          jobsList: toggleJob,
        };
      } else {
        let toggleJob = state.jobsList.map((job) =>
          job.name === name
            ? { ...job, isChecked: checked, completed: true }
            : job
        );
        return {
          ...state,
          jobsList: toggleJob,
        };
      }

    case "ADD_JOBS":
      return {
        ...state,
        jobsList: [...state.jobsList, action.payload],
      };
    case "EDIT_JOBS":
      return {
        ...state,
        jobEdit: action.payload,
      };
    case "DELETE_JOBS":
      const newJobsList = [...state.jobsList];

      newJobsList.splice(action.payload, 1);

      return {
        ...state,
        jobsList: newJobsList,
      };
    default:
      return state;
  }
};

export default todoReducer;
