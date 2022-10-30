/* eslint-disable indent */
import axios from 'axios'

const baseUrl = 'http://localhost:3000'

export function getData(url) {
    return axios.get(`${baseUrl}/${url}`)
}

export function foundData(url, foundtext) {
    return axios.get(`${baseUrl}/${url}?name_like=${foundtext}`)
}

export function leiData(url, foundtext) {
    return axios.get(`${baseUrl}/${url}?type_like=${foundtext}`)
}

export default {
    getData, foundData, leiData
}
