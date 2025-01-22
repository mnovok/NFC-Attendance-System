import apiClient from "./apiClient";

export const getAttendance = async (studentUID) => {
    try {
        const response = await apiClient.get(`/api/attendances`, {
            params: { studentUID: studentUID }
        })
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("Error getting atendance.");
        }
    }
}