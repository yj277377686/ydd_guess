
<template>
	<view class="contents">
		 <view class="navBox ui-cell">
			 <view class="navItem ui-cell active">全部记录</view><view class="navItem ui-cell">提现</view><view class="navItem ui-cell">充值</view><view class="navItem ui-cell">兑换</view>
		 </view>
		 <view class="recordList">
			 <view class="recordItem">
				 <view class="itemTop ui-cell">
					 <view class="rechargeType">充值</view><view class="rechargeMoney">+100.00元</view>
				 </view>
				 <view class="itemBottom ui-cell">
					 <view class="rechargeDate">充值时间：2022-07-29 13:14:52</view>
					 <view class="rechargeState">已到账</view>
				 </view>
			 </view>
			 <view class="recordItem">
				 <view class="itemTop ui-cell">
					 <view class="rechargeType">提现</view><view class="rechargeMoney">-100.00元</view>
				 </view>
				 <view class="itemBottom ui-cell">
					 <view class="rechargeDate">提现时间：2022-07-29 13:14:52</view>
					 <view class="rechargeState">已到账</view>
				 </view>
			 </view>
			 <view class="recordItem">
				 <view class="itemTop ui-cell">
					 <view class="rechargeType">充值</view><view class="rechargeMoney">+100.00元</view>
				 </view>
				 <view class="itemBottom ui-cell">
					 <view class="rechargeDate">充值时间：2022-07-29 13:14:52</view>
					 <view class="rechargeState">已到账</view>
				 </view>
			 </view>
			 <view class="recordItem">
				 <view class="itemTop ui-cell">
					 <view class="rechargeType">兑换竞猜币</view><view class="rechargeMoney">+1000</view>
				 </view>
				 <view class="itemBottom ui-cell">
					 <view class="rechargeDate">兑换时间：2022-07-29 13:14:52</view>
					 <view class="rechargeState">已到账</view>
				 </view>
			 </view>
			 <view class="recordItem">
				 <view class="itemTop ui-cell">
					 <view class="rechargeType">竞猜币兑换现金</view><view class="rechargeMoney">+100.00元</view>
				 </view>
				 <view class="itemBottom ui-cell">
					 <view class="rechargeDate">兑换时间：2022-07-29 13:14:52</view>
					 <view class="rechargeState">已到账</view>
				 </view>
			 </view>													
		 </view>
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
			}
		},
		methods: {
	    }
	}
</script>

<style>
	.rechargeState{
		font-size: 26rpx;
		color: #FFFFFF;
		letter-spacing: 0;
		font-weight: 500;
		opacity: 0.8;
	}
	.rechargeDate{
		font-size: 26rpx;
		color: #FFFFFF;
		letter-spacing: 0;
		font-weight: 500;
		opacity: 0.6;
	}
	.rechargeMoney{
		font-size: 32rpx;
		color: #E4CA67;
		letter-spacing: 0;
		font-weight: 500;
	}
	.rechargeType{
		font-size: 32rpx;
		color: #fff;
	}
	.itemTop{
		margin-bottom: 20rpx;
	}
	.itemTop,.itemBottom{
		width: 100%;
		height: auto;
		justify-content: space-between;
	}
	.recordItem{
		width: 100%;
		height: auto;
		padding: 40rpx 0;
		border-bottom: 1px solid #979797;
	}
	.recordList{
		width: 100%;
		height: auto;
		padding: 0 30rpx;
	}
	.navItem.active{
		background-image: linear-gradient(90deg, #1F82F7 0%, #1258EF 100%);
	}
	.navItem{
		width: auto;
		padding: 0 40rpx;
		height: 88rpx;
		border-radius: 16rpx;
		justify-content: center;
		font-size: 30rpx;
		color: #fff;
		font-weight: 500;
	}
	.navBox{
		width: 100%;
		height: 88rpx;
		background-color: #333357;
		padding: 0 50rpx;
		justify-content: space-between;
	}
	.contents{
		width: 100%;
		min-height: 100vh;
		background-color: #00012E;
	}
</style>