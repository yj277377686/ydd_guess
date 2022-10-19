<template>
	<view class="contents">
		 <view class="zftdBox">
			 <view class="topTitle">客服通道：</view>
			 <view class="zftdTitle">微信通道一：{{zftdData.wechat1}}</view>
			 <view class="zftdTitle">微信通道二：{{zftdData.wechat2}}</view>
			 <view class="zftdTitle">支付宝通道一：{{zftdData.alipay1}}</view>
			 <view class="zftdTitle">支付宝通道二：{{zftdData.alipay2}}</view>
			 <view class="zftdTitle">电话通道一：{{zftdData.phone1}}</view>
			 <view class="zftdTitle">电话通道二：{{zftdData.phone2}}</view>
			 <view class="zftdTitle">服务时间 : {{zftdData.time}}</view>
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
				zftdData:[]
			}
		},
		mixins: [],
		onShow() {  
			this.getpayType()
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
			getpayType(){
				let that = this;
				post('Service/lists',{}).then(res=>{
					console.log(res);
					if(res.code==1){
						that.zftdData=res.data;
					}
				})
			},
	    }
	}
</script>

<style>
	.topTitle{
		font-size: 32rpx;
		color: #fff;
	}
	.zftdBox{
		width: 100%;
		height: auto;
		padding: 50rpx 30rpx;
	}
	.zftdTitle{
		font-size: 26rpx;
		color: #fff;
		opacity: 0.6;
		margin-top: 20rpx;
		padding-left: 20rpx;
	}
	.contents{
		width: 100%;
		min-height: 100vh;
		background-color: #00012E;
	}
</style>