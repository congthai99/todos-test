// 2: Actions

export const completedJob = (job) => {
    return {
        type: "COMPLETED_JOB",
        payload: job,
    };
};

export const addJob = (job) => {
    return {
        type: "ADD_JOBS",
        payload: job,
    };
};
export const editOneJob = (job) => {
    return {
        type: "EDIT_JOBS",
        payload: job,
    };
};
export const deleteJob = (job) => {
    return {
        type: "DELETE_JOBS",
        payload: job,
    };
};