import axios from 'axios'

export default function ajax(url = '', params = {}, type = 'GET'){
    let promise = '';
    return new Promise((resolve,reject)=>{
        // 判断请求的方式
        if(type.toLocaleLowerCase() === 'get' ){
            // 拼接字符串
            let paramsStr = '';
            Object.keys(params).forEach(key=>{
                paramsStr += key + '=' + params[key] + '&'
            })
            
            // 过滤最后的&
            if(paramsStr !== ''){
                paramsStr = paramsStr.substr(0, paramsStr.lastIndexOf('&'));
            }

            // 拼接完整路径
            url += '?' + paramsStr;

            // 发起请求
            promise = axios.get(url)

        }else if(type.toLocaleLowerCase() === 'post'){
            promise = axios.post(url,params);
        }
        // 返回结果
        promise.then((response)=>{
            resolve(response.data);
        }).catch((error)=>{
            reject(error);
        })
    })
}