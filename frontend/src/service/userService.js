import apiClient from "./apiClient";

export const loginUser = async (email, password) => {
    try {
        const response = await apiClient.post('/api/user/login', {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("Error logging in. Please try again.");
        }
    }
}