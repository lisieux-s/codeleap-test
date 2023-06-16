import axios from "axios";

const baseAPI = axios.create({
    baseURL: 'https://dev.codeleap.co.uk/careers'
})

export async function createPost(data) {
    await baseAPI.post('/', data);
}

export async function getPosts() {
    return await baseAPI.get('/');
}

export async function editPost(id, data) {
    return await baseAPI.patch(`/${id}/`, data);
}

export async function deletePost(id) {
    return await baseAPI.delete(`/${id}/`)
}
