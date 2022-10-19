// console.log(uni.getStorageSync('user'))
const user = uni.getStorageSync('useInfo') && JSON.parse(uni.getStorageSync('useInfo'));

export default {
	uid: uni.getStorageSync('uid'),
	token:uni.getStorageSync('tokens'),
	user: user,
	company: '答题竞猜',
	imgUrl: '',
	baseUrl : ''
}