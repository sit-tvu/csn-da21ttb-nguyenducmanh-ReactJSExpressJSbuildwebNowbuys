
import { axiosAppJson } from '../../config/axios.js';

export default new class Authen {

    async getInfo() {
        let res = await axiosAppJson.get(process.env.REACT_APP_API_AUTHEN_GETINFO);
        return res;
    }
}