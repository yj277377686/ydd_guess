import store from '../store/index.js';
// const baseUrl = 'https://ydd.huangguaxiong.cn/api/'; // development开发环境
// const baseUrl = 'http://192.168.2.6:80/api/'; // development本地环境
// const baseUrl = 'http://www.ydd-test.com/api/'; // development本地环境
const baseUrl = 'https://2f717468a2.oicp.vip/api/'; // development本地环境
const httpRequest = (opts, data, token) => {
	if (!token) {
		token = '';
	}
	let httpDefaultOpts = {
		url: baseUrl + opts.url,
		data: data,
		beforeSend: function (xmlHttp) {
			xmlHttp.setRequestHeader("If-Modified-Since", "0");
			xmlHttp.setRequestHeader("Cache-Control", "no-cache");
		},
		method: opts.method,
		header: opts.method == 'GET' ? {
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8",
			"token": token
		} : {
			'content-type': 'application/x-www-form-urlencoded',
			"token": token
		},
		dataType: 'json',
	}
	let promise = new Promise(function (resolve, reject) {
		uni.request(httpDefaultOpts).then(
			(res) => {
				// console.log(res[1].statusCode)
				if (res[1].statusCode !== 200 || res[1].data.code !== 1) {
					reject(res[1])
				} else {
					resolve(res[1])
				}
			}
		).catch(
			(response) => {
				reject(response)
			}
		)
	})
	return promise
}

export const post = (url, props, token) => {
	return httpRequest({
		url,
		method: 'POST'
	}, props, token).then(res => {
		return res.data
	}, err => {
		// console.log('全局错误处理')
		return errorHandle(err)
	})
}

export const get = (url, props, token) => {
	return httpRequest({
		url,
		method: 'GET'
	}, props, token).then(res => {
		return res.data
	}, err => {
		return errorHandle(err)
	})
}

function errorHandle(err) {
	if (err.statusCode !== 200) {
		return {
			code: err.statusCode,
			msg: '网络请求错误，请稍后重试!'
		}
	} else if (err.data.code === -1) {
		store.commit('logout')
		uni.showModal({
			title: '重新登录',
			content: '您的登录有效时长已过期\n需重新登录',
			showCancel: false,
			success: (res) => {
				uni.reLaunch({
					url: '../login/login'
				});
			}
		});
	} else if (err.data.code !== 200) {
		return {
			code: err.data.code,
			msg: err.data.msg
		}
	}
	return err
}

