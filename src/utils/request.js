import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://vegego-server.herokuapp.com/',
    withCredentials: true, // 允许跨域传递cookie
    timeout: 10000
})

export const get = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        instance.get(url, { params }).then((response) => {
            resolve(response.data)
        }, err => {
            reject(err)
        })
    })
}

export const post = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        instance.post(url, data, {
            // 按照后端的要求发送json类型的数据
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            resolve(response.data)
        }, err => {
            reject(err)
        })
    })
}

export const patch = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        instance.patch(url, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            resolve(response.data)
        }).catch(err => {
            reject(err)
        })
    })
}
