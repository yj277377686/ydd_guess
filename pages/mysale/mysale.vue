<template>
	<view class="contents">
		<view class="productList">
			 <view class="productItem ui-cell" v-for="(item , index) in saleData" :key="index">
				 <image :src="'https://ydd.huangguaxiong.cn/'+item.goods_image" class="spImg"></image>
				 <view class="productMsg ui-cell">
					 <view class="productName ui-cell" style="width: 100%;justify-content: space-between;">
					   <view>{{item.goods_name}}</view>
					   <view style="color: #E4CA67;">{{item.status_text}}</view>
					 </view>
					  <view class="productName" style="color: #999;">编号:{{item.sn}}</view>
					 <view class="productSetting ui-cell">
						 <view class="productPrice ui-cell">挂卖价:<text>￥</text>{{item.money}}</view>
					 </view>
					 <view class="saleDate">{{item.create_time}}</view>
				 </view>
			 </view>	
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import { post,get } from '../../utils/http.js';
	import filtersMixin from '../../common/mixins/filters.js';
	import Vue from '../../utils/vue.min.js';
	export default {
		data () {
			return {
				saleData:[]
			}
		},
		mixins: [],
		onShow() {  
			if(uni.getStorageSync('tokens')){
				this.getmysale();
			}else{
				uni.showModal({
					title: '温馨提示',
					content: '登录体验更多功能',
					success: function (res) {
						if (res.confirm) {
							uni.navigateTo({
								url:'/pages/login/login'
							})
						} else if (res.cancel) {
							uni.navigateTo({
								url:'/pages/index/index'
							})
						}
					}
				});
			}
		},
		created () {
		},
		//下拉刷新
		onPullDownRefresh() {
		},
		onLoad(options) {
			
		},
		onUnload() {
		},
		methods: {
			//我的挂卖
			getmysale(){
				let that=this;
				let token=uni.getStorageSync('tokens');
				get('Withdraw/records',{page:1,limit:1000},token).then(res=>{
					console.log(res);
					if(res.code==1){
						that.saleData=res.data.list
					}
				})
			},
	    }
	}
</script>

<style>
	.saleDate{
		font-size: 24rpx;
		color: #666;
	}
	.gobuysoon{
		padding: 12rpx 30rpx;
		color: #fff;
		border-radius: 8rpx;
		font-size: 28rpx;
		background-image: linear-gradient(90deg, #96060B 0%, #CC0100 50%, #94060B 100%);
	}
	.productPrice text{
		font-size: 26rpx;
	}
	.productPrice{
		font-size: 32rpx;
		color: #E4CA67;
		align-items: baseline;
	}
	.productSetting{
		width: 100%;
		height: auto;
		justify-content: space-between
	}
	.productDesc{
		font-size: 26rpx;
		color: #fff;
		opacity: 0.8;
	}
	.productName{
		font-size: 30rpx;
		color: #fff;
		font-weight: 600;
	}
	.productMsg{
		flex: 1;
		height: 180rpx;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
	}
	.spImg{
		width: 160rpx;
		height: 160rpx;
		border-radius: 16rpx;
		margin-right: 30rpx;
	}
	.productItem{
		width: 100%;
		height: auto;
		justify-content: space-between;
		border-bottom: 1px solid #666;
		padding: 30rpx 0;
	}
	.productList{
		width: 100%;
		height: auto;
		padding: 0 30rpx;
	}
	.contents{
		width: 100%;
		min-height: 100vh;
		background-color: #00012E;
	}
</style>