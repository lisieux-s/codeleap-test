import axios from "axios";

const baseAPI = axios.create({
    baseURL: 'https://dev.codeleap.co.uk/careers/'
})

export async function createPost(data) {
    await baseAPI.post('', data);
}

export async function getPosts() {
    return await baseAPI.get('');
}

export async function EditPost(id) {
    return await baseAPI.put(`/${id}/`)
}

export async function deletePost(id) {
    return await baseAPI.delete(`/${id}/`)
}
