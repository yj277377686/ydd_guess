
<template>
	<view class="contents">
         <image :src="shareImg" class="shareImg" :style="{ height: swiperHeight + 'px' }"  mode="aspectFit"></image>
		 <view class="loginBtn ui-cell" @tap="saveImg">保存到相册</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import { get } from '../../utils/http.js';
	import filtersMixin from '../../common/mixins/filters.js';
	import Vue from '../../utils/vue.min.js';
	export default {
		data () {
			return {
				shareImg:'',
				swiperHeight:0
			}
		},
		mixins: [],
		onShow() {  
			
		},
		created () {
		},
		//下拉刷新
		onPullDownRefresh() {
		},
		onLoad(options) {
			if(options){
				this.getmsgData(options.mid);
			}
		},
		methods: {
			getmsgData(id){
				uni.showLoading({
					title:'海报生成中..'
				})
				let that=this;
				let token = uni.getStorageSync('tokens');
				get('share/userPoster',{},token).then(res=>{
					console.log(res);
					if(res.code==1){
						that.shareImg=res.data.url;
						uni.getImageInfo({
							src: res.data.url,
							success: function (image) {
								console.log(image);
								that.swiperHeight=image.height
							}
						});
						uni.hideLoading()
					}else{
						uni.showToast({
							icon:'error',
							title:res.msg
						})
					}
				})
			},
			saveImg(){
				let fail = this.shareImg;
				uni.saveImageToPhotosAlbum({
					filePath: fail,
					success: function() {
						uni.showToast({
							title: "保存成功",
							icon: "none"
						});
					},
					fail: function() {
						uni.showToast({
							title: "保存失败，请稍后重试",
							icon: "none"
						});
					}
				});
			}
	    }
	}
</script>

<style>
	.loginBtn{
		width: 100%;
		height: 90rpx;
		justify-content: center;
		color: #fff;
		background-color: #00012E;
		box-shadow: 0px 5px 10px 1px  #00012E;
		border-radius: 45rpx;
		font-size: 32rpx;
	}
	.shareImg{
		width: 650rpx;
		height: auto;
		margin-bottom: 100rpx;
	}
	.contents{
		width: 100%;
		min-height: 100vh;
		padding:0 50rpx 50rpx 50rpx;
		background-color: #f6f6f6;
	}
	
</style>