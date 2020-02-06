// const axios = require('axios');
// import { apiUrl, statusCodes } from './global-variables.js';
//
// export function loginCustomer(loginData) {
//     return axios
//         .post(`${apiUrl}/auth/customer/login`, loginData)
//         .then(function(response) {
//             if (response.status === statusCodes.accepted) {
//                 return response;
//             }
//         })
//         .catch(function(error) {
//             console.log(error);
//         });
// }
//
// export function createNewCustomer(customerData) {
//     return axios
//         .post(`${apiUrl}/customer`, customerData)
//         .then(function(response) {
//             return response;
//         })
//         .catch(function(error) {
//             console.log(error);
//         });
// }
