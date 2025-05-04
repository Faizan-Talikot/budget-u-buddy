// API base URL
const API_URL = "http://localhost:5000/api";

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "An error occurred");
    }

    return data;
};

// Auth API
export const authApi = {
    login: async (email: string, password: string) => {
        const response = await fetch(`${API_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        return handleResponse(response);
    },

    register: async (userData: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }) => {
        const response = await fetch(`${API_URL}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        return handleResponse(response);
    },

    getProfile: async () => {
        const token = localStorage.getItem("budgetu-token");

        if (!token) {
            throw new Error("No authentication token found");
        }

        const response = await fetch(`${API_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return handleResponse(response);
    },

    changePassword: async (currentPassword: string, newPassword: string) => {
        const token = localStorage.getItem("budgetu-token");

        if (!token) {
            throw new Error("No authentication token found");
        }

        const response = await fetch(`${API_URL}/users/change-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ currentPassword, newPassword }),
        });

        return handleResponse(response);
    },
};

// Helper to check if user is authenticated
export const isAuthenticated = () => {
    return !!localStorage.getItem("budgetu-token");
};

// Helper to get user data from localStorage
export const getUserData = () => {
    const userJson = localStorage.getItem("budgetu-user");
    return userJson ? JSON.parse(userJson) : null;
};

// Helper to logout user
export const logout = () => {
    localStorage.removeItem("budgetu-token");
    localStorage.removeItem("budgetu-user");
};

export default {
    auth: authApi,
    isAuthenticated,
    getUserData,
    logout,
}; 