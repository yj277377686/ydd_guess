export default {
	login(state, data) {
		state.token = data.token;
		state.uid = data.id;
		state.username = data.name;
		uni.setStorageSync('tokens', data.token);
		uni.setStorageSync('uid', data.id);
	},
	setUserInfo (state, data) {
		state.user = data;
		uni.setStorageSync('user', JSON.stringify(data));
	},
	logout(state) {
		state.token = '';
		state.uid = '';
		state.name = '';
		state.user = '';
		uni.removeStorageSync('tokens');
		uni.removeStorageSync('uid');
		uni.removeStorageSync('useInfo');
	}
}