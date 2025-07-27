import axios from 'axios'
const hostUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(hostUrl).then(res => res.data)
}

const create = newPerson => {
    return axios.post(hostUrl, newPerson).then(res => res.data)
}

const deletePerson = person => {
    return axios.delete(`${hostUrl}/${person}`)
}

const updatePerson = person => {
    return axios.put(`${hostUrl}/${person.id}`, person).then(res => res.data)
}

export default {getAll, create, deletePerson, updatePerson}

