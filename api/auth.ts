import api from "@/lib/axios";

const version = "v1";

export const registerByEmail = async (full_name: string, email: string, password: string) => {
    const response = await api.post(`/api/${version}/auth/register-by-email`, {
        full_name,
        email,
        password,
    });
    return response.data;
};

export const registerByGoogle = async (code: string) => {
    const response = await api.post(`/api/${version}/auth/register-by-google`, {
        code,
    });
    return response.data;
};

export const loginByEmail = async (email: string, password: string) => {
    const response = await api.post(`/api/${version}/auth/login-by-email`, {
        email,
        password,
    });
    return response.data;
};

export const verifyOtp = async (email: string, otp: string) => {
    const response = await api.post(`/api/${version}/auth/verify-otp`, {
        email,
        otp,
    });
    return response.data;
};

export const getProfile = async () => {
    const response = await api.get(`/api/${version}/auth/profile`);
    return response.data;
};

export const forgotPassword = async (email: string) => {
    const response = await api.post(`/api/${version}/auth/forgot-password`, {
        email,
    });
    return response.data;
};

export const verifyOtpForgotPassword = async (email: string, otp: string) => {
    const response = await api.post(`/api/${version}/auth/verify-otp-forgot-password`, {
        email,
        otp,
    });
    return response.data;
};

export const resetPassword = async (new_password: string, token: string) => {
    const response = await api.post(`/api/${version}/auth/reset-password`, {
        new_password,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

//admin

export const getAllUser = async (search?: string, page?: number, limit?: number) => {
    const response = await api.get(`/api/${version}/admin/user/list?`, {
        params: {
            search,
            page,
            limit,
        },
    });
    return response.data;
};

export const deleteUser = async (id: string) => {
    const response = await api.delete(`/api/${version}/admin/user/delete/${id}`);
    return response.data;
};