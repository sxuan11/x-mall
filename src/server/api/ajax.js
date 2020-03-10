import axios from 'axios';

export default function ajax(
    url='',
    params={},
    type='GET',
) {
    //变量
    let promise;
    //返回一个promise
    return new Promise((res,rej)=>{
        //判断请求的类型
        if (type.toUpperCase() === 'GET'){
            //拼接字符串
            let paramsStr = '';
            //遍历参数
            Object.keys(params).forEach(key=>{
                paramsStr += key + '=' + params[key] + '&';
            });
            //过滤最后的&
            if (paramsStr) {
                paramsStr = paramsStr.substr(0,paramsStr.lastIndexOf('&'))
            }
            //拼接完整路径
            url = url + '?' + paramsStr
            //发起get请求
            promise = axios.get(url)
        }else if (type.toUpperCase() === "POST") {
            //post请求
            promise = axios.post(url,params);
        }
        //处理结果，并返回
        promise.then((response)=>{
            res(response.data)
        }).catch(error=>{
            rej(error)
        })

    })
}