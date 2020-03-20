// //引入axios
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import {
  Message
} from 'view-design'
import qs from 'qs'
// import {
//   baseURL
// } from '@/config'
let cancel;
let promiseArr = {}
let errArr = ['-4009', '-4010']

const CancelToken = axios.CancelToken

axios.interceptors.request.use(config => {
  // 发起请求时，取消掉当前正在进行的相同请
  return config
}, err => {
  return Promise.reject(err)
})


axios.interceptors.response.use(response => {

  return response
}, err => {

  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '错误请求'
        break
      case 401:
        store.commit('_setToken', '')
        Message.error('请重新登录')
        router.push({
          name: 'login'
        })
        break
      case 402:
        store.commit('_setToken', '')
        Message.error('请重新登录')
        router.push({
          name: 'login'
        })
        break
      case 403:
        err.message = '拒绝访问'
        break
      case 404:
        err.message = '请求错误,未找到该资源'
        break
      case 405:
        err.message = '请求方法未允许'
        break
      case 408:
        err.message = '请求超时'
        break
      case 500:
        err.message = '服务器端出错'
        break
      case 501:
        err.message = '网络未实现'
        break
      case 502:
        err.message = '网络错误'
        break
      case 503:
        err.message = '服务不可用'
        break
      case 504:
        err.message = '网络超时'
        break
      case 505:
        err.message = 'http版本不支持该请求'
        break
      default:
        err.message = `连接错误${err.response.status}`
    }
  } else {
    err.message = '连接服务器失败'
  }
  Message.error(err.message)
  return Promise.resolve(err.response)
})
// 设置默认请求头
axios.defaults.withCredentials = true
// axios.defaults.baseURL = process.env.VUE_APP_URL
axios.defaults.headers['Content-type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 10000

function axiosRequest(method, url, param, header) {

  return new Promise((resolve, reject) => {
    if (localStorage.getItem('token') && localStorage.getItem('token') != '') {
      axios.defaults.headers['token'] = JSON.parse(localStorage.getItem('token'))
    }


    if (header == '' && method == 'get') {
      axios({
        method: method,
        url,
        params: param,
        timeout: 50000,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      })
    } else {
      axios({
        method: method,
        url,
        data: param,
        headers: {
          'Content-type': header,
        },
        timeout: 50000,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      })
    }
  })
}
export default {
  // get请求
  httpRequest(url, param) {


    return new Promise((resolve, reject) => {
      let method = ''
      let header = ''
      let newParam = ''
      switch (url.method) {
        case 'get': {
          method = 'get'
          newParam = param

        }
        break
      case 'post': {
        method = 'post'
        newParam = qs.stringify(param, {
          arrayFormat: 'repeat'
        })
        header = 'application/x-www-form-urlencoded'
      }
      break
      case 'json': {
        method = 'post'
        header = 'application/json;charset=UTF-8'
        newParam = JSON.stringify(param)
      }
      break
      case 'formData': {
        method = 'post'
        let formData = new FormData()
        for (var key in param) {
          formData.append(key, param[key])
        }
        newParam = formData
        header = 'multipart/form-data;charset=UTF-8'
      }
      break
      default:
        break
      }

      axiosRequest(method, url.url, newParam, header).then(res => {
        resolve(res)
      })
    })
  }
}
