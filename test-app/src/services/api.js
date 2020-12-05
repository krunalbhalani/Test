import axios from "axios";
import { API_Currency_ROOT, API_BASE_URL } from "../util/api";


const getCordinator = (action) => {
    const url = `http://www.mocky.io/v2/5bcdd3942f00002c00c855ba`;
    return axios
        .get(url)
        .then(response => {
        return response;
        })
        .catch(err => {
        return console.error(err);
        });
}



const getResponsible = (action) => {
    const url = `http://www.mocky.io/v2/5bcdd7992f00006300c855d5`;
    return axios
        .get(url)
        .then(response => {
        return response;
        })
        .catch(err => {
        return console.error(err);
        });
}


    export {
         getCordinator,
         getResponsible,
    }