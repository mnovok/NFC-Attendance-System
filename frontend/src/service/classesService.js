import apiClient from "./apiClient";

export const getClasses = async (professorId) => {
    try {
        const response = await apiClient.get(`/api/classes`, {
            params: { professorId: professorId }
        })
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("Error getting classes.");
        }
    }
}