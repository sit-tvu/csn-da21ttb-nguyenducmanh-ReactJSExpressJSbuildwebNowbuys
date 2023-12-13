
import { axiosAppJson } from '../../configs/axios.js';

export default new class AuthenAPI { 
    async getProfile() {
        try {
            let res = await axiosAppJson.post(`${process.env.REACT_APP_API_AUTH_GET_PROFILE}`);
            return {data: res.data, status: {code: res.status, text: res.statusText}};
        } catch (err) {
            return {
                is_err: true,
                status: `${process.env.REACT_APP_API_AUTH_GET_PROFILE} -> failed!`,
                message: err
            }
        }
    }

    async signinLocal(username, password) {
        try {
            let res = await axiosAppJson.post(`${process.env.REACT_APP_API_AUTH_SIGNIN_LOCAL}`, {
                username: username,
                password: password
            });

            return {data: res.data, status: {code: res.status, text: res.statusText}};

        } catch (err) {
            return {
                is_err: true,
                status: `${process.env.REACT_APP_API_AUTH_SIGNIN_LOCAL} -> failed!`,
                message: err
            }
        }
    }

    async signinGoogle(data) {
        try {
            let res = await axiosAppJson.post(`${process.env.REACT_APP_API_AUTH_SIGNIN_GOOGLE}`, {
                data: data
            });

            return {data: res.data, status: {code: res.status, text: res.statusText}};

        } catch (err) {
            return {
                is_err: true,
                status: `${process.env.REACT_APP_API_AUTH_SIGNIN_GOOGLE} -> failed!`,
                message: err
            }
        }
    }

    async signout() {
        try {
            let res = await axiosAppJson.post(`${process.env.REACT_APP_API_AUTH_SIGNOUT}`);

            return {data: res.data, status: {code: res.status, text: res.statusText}};
        } catch (err) {
            return {
                is_err: true,
                status: `${process.env.REACT_APP_API_AUTH_SIGNOUT} -> failed!`,
                message: err
            }
        }
    }
} 