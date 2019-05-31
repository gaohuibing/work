import axios from 'axios';
import qs from 'qs';
import NProgress from 'nprogress';
import Vue from 'vue';
import Cookies from 'js-cookie';

let cookieTokenKey = `${window.location.pathname}/token`;
let storageTokenKey = `token@${window.location.hostname}:${window.location.port}${window.location.pathname}`;
// let apiUrl = window.env.api.url || '';
let apiUrl = '';

let mergeUrl = function(url, params) {
    url += (-1 === url.indexOf('?')) ? '?' : '&';
    if (!!params === true) {
        if (typeof params === 'string') {
            url += params;
        }
        if (typeof params === 'object') {
            url += qs.stringify(params);
        }
    }
    return url;
};

let api = {
    getToken() {
        return Cookies.get(cookieTokenKey + '/access_token');
    },
    /**
     * 设置 token
     * @param token [token_type, expires_in, access_token, refresh_token]
     */
    setToken(token) {
        let accessToken = token.token_type + ' ' + token.access_token;
        Cookies.set(cookieTokenKey + '/access_token', accessToken, {
            expires: new Date().getTime() + token.expires_in * 1000
        });
        window.localStorage.setItem(storageTokenKey + '/refresh_token', token.refresh_token);
        instance.defaults.headers['Authorization'] = accessToken;
    },
    deleteToken() {
        Cookies.remove(cookieTokenKey + '/access_token');
        window.localStorage.removeItem(storageTokenKey + '/refresh_token');
        delete instance.defaults.headers['Authorization'];
    },
    post(url, data) {
        return instance({
            method: 'post',
            url: apiUrl + url,
            data: qs.stringify(data),
        });
    },
    get(url, params) {
        return instance.get(mergeUrl(apiUrl + url, params));
    },
    put(url, data) {
        return instance({
            method: 'put',
            url: apiUrl + url,
            data: qs.stringify(data),
        });
    },
    delete(url, params) {
        return instance({
            method: 'delete',
            url: apiUrl + url,
            params,
        });
    },
    download(url, params, filename) {
        url = mergeUrl(apiUrl + url, params);
        instance
            .get(url, { responseType: 'blob' })
            .then((response) => {
                // 尝试猜出文件名
                // let disposition = response.headers['content-disposition'];
                // let filename = decodeURI(disposition.match(/filename="(.*)"/)[1]);
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();
            });
    }
};

let instance = axios.create({
    headers: {
        'Authorization': api.getToken() || ''
    }
});
instance.interceptors.request.use(config => {
    NProgress.start();
    return config;
});
instance.interceptors.response.use(response => {
    NProgress.done();
    return response;
}, error => {
    NProgress.done();
    // 超时或未登录自动跳转到登录页面
    if (error.response.status === 406 || error.response.status === 401) {
        api.deleteToken();
        Vue.bus.emit('prompt:login'); // 触发登录事件
        return Promise.reject();
    }
    return Promise.reject(error)
});

export default api;