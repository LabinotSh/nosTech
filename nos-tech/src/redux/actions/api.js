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
    }
}