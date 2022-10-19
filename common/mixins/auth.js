import { mapState } from 'vuex';
import { post } from '../../utils/http.js';
export default {
	computed: mapState(['token']),
	onLoad () {
		if (!this.token) {
			uni.showModal({
				title: '重新登录',
				content: '您的登录有效时长已过期\n需重新登录',
				showCancel: false,
				success: (res) => {
					uni.navigateTo({
						url: '/pages/login/login'
					});
				}
			});
			
		} else {
			this.getUserInfo();
		}
	},
	methods: {
		confirm ( content = '提示' , showCancel = false) {
			uni.showModal({
				content,
				showCancel
			});
		},
		getUserInfo () {
			post('user/info/', { token: this.token }).then(res => {
				if (res.code == 1) {
					this.$store.commit('setUserInfo',res.data)
				} else {
					uni.showToast({
						icon: 'none',
						title: res.msg
					});
				}
			})
		},

	}
}