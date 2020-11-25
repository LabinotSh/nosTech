import axios from "axios";

const baseUrl = 'http://localhost:3001/api/'

export default {
    postCategory(url = baseUrl + 'category/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newCategory => axios.post(url, newCategory),
            update: (id, updatedCategory) => axios.put(url + id, updatedCategory),
            delete: id => axios.delete(url + id)
        }
    },

    postTags(url = baseUrl + 'tags/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newTags => axios.post(url, newTags),
            update: (id, updatedTags) => axios.put(url + id, updatedTags),
            delete: id => axios.delete(url + id)
        }
    }
}