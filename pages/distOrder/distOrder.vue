<template>
	<view class="contents">
		 <view class="orderNav ui-cell">
			  <view class="orderItem ui-cell"  v-for="(item,index) in orderNav" :key="index" :class="{'itemActive': indexs == index}" @tap="changeOrder(item.index)">{{item.title}}</view>
		 </view>
		 <view class="proList" v-if="orderDate.length>0">
			 <view class="proItem" v-for="(item , index) in orderDate" :key="index" @tap="goDetail(item.id)">
				  <view class="pstate ui-cell">
					   <view class="ordercode">认养编号：{{item.order_sn}}</view>
					   <view>
						   <view class="proState">{{item.status}}</view>
					   </view>
				  </view>
				  <view class="proDetail ui-cell">
					  <view class="imgBox">
						  <image :src="item.image" class="proImg"></image>
					  </view>
					  <view class="proMsg ui-cell">
						  <view class="proName ui-nowrap-2">{{item.goods_name}}</view>
						  <view class="msgx ui-cell">
							  <view class="pricex ui-cell">出售单价: ￥{{item.price}}</view>
						  </view>
						  <view class="proNbm">x{{item.goods_num}}</view>
					  </view>
				  </view>
				  <view class="btMsg ui-cell">
					  <view class="leftBox ui-cell">预估收益：<text>￥{{item.money}}</text></view>
					  <view class="rightBox ui-cell">付款金额：<text>￥{{item.pay_price}}</text></view>
				  </view>
				  <view class="proSetting ui-cell">
					  {{item.create_time}}
				  </view>
			 </view>			 				  
		 </view>
		 <view class="no_product ui-cell" v-else>暂无更多数据~</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import { post,get} from '../../utils/http.js';
	import filtersMixin from '../../common/mixins/filters.js';
	import Vue from '../../utils/vue.min.js';
	import { countDownFun } from './times.js';
	export default {
		data () {
			return {
				indexs:0,
				orderNav:[{index:0,title:'全部'},
						  {index:1,title:'待返佣'},
						  {index:2,title:'已结算'},
						  {index:3,title:'已失效'}],
				orderDate:[],
				
			}
		},
		mixins: [],
		onShow() {
			this.getdisOrder(0);
		},
		created () {
		},
		//下拉刷新
		onPullDownRefresh() {
		},
		onLoad(options) {
		},
		onUnload() {
			clearInterval(this.timer);
		},
		methods: {
			changeOrder(index){
				this.indexs=index;
				this.getdisOrder(index);
			},
			getdisOrder(type){
				let that=this;
				let token =uni.getStorageSync('tokens');
				get('Distribution/order',{status:type,page:1,limit:1000},token).then(res=>{
					console.log(res);
					if(res.code==1){
						that.orderDate=res.data.list
					}
				})
			}
	    }
	}
</script>

<style>
	.rightBox text{
		color:#FC4344 ;
		font-size: 32rpx;
	}
	.leftBox text{
		color:#FF7233 ;
		font-size: 32rpx;
	}
	.leftBox,.rightBox{
		font-size: 28rpx;
		color: #666666;
	}
	.orderTimeBox text{
		font-size: 24rpx;
		color: #fff;
	}
	.timeImg{
		width: 26rpx;
		height: 26rpx;
		margin-right: 10rpx;
	}
	.orderTimeBox{
		width: 160rpx;
		height: 40rpx;
		border-radius: 20rpx;
		background-color: rgba(0,0,0,0.5);
		justify-content: center;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 9;
	}
	.imgBox{
		width: 160rpx;
		height: 160rpx;
		border-radius: 20rpx;
		position: relative;
		margin-right: 20rpx;
	}
	.ordercode{
		font-size: 26rpx;
		color: #666666;
	}
	.pstate{
		width: 100%;
		height: auto;
		justify-content: space-between;
		padding-bottom: 30rpx;
		border-bottom: 1px dashed #e6e6e6;
	}
	.setOne{
		width: 180rpx;
		height: 60rpx;
		justify-content: center;
		font-size: 30rpx;
		color: #00012E;
		border-radius: 30rpx;
		background-color: #fff;
		border: 1px solid #00012E;
	}
	.set{
		width: 180rpx;
		height: 60rpx;
		justify-content: center;
		font-size: 30rpx;
		color: #fff;
		border-radius: 30rpx;
		background-color: #00012E;
	}
	.btnBox{
		flex: 1;
		justify-content: flex-end;
	}
	.sendTime{
		font-size: 26rpx;
		color: #FF001E;
		font-weight: 700;
	}
	.proSetting{
		width: 100%;
		justify-content: space-between;
		color: #999;
		font-size: 26rpx;
	}
	.proPrice text{
		font-size: 26rpx;
	}
	.proPrice{
		font-size: 32rpx;
		color: #FF001E;
		font-weight: 700;
	}
	.btMsg{
		width: 100%;
		height: auto;
		justify-content:space-between;
		padding: 24rpx 0;
		border-top: 1px dashed #e6e6e6;
	}
	
	.proNbm{
		font-size: 26rpx;
		color: #444444;
	}
	.pricex{
		font-size: 26rpx;
		color: #444444;
	}
	.msgx{
		width: 100%;
		justify-content: space-between
	}
	.proName{
		font-size: 32rpx;
		color: #1E1E31;
		line-height: 36rpx;
		width: 420rpx;
		font-weight: 700;
	}
	.proMsg{
		flex: 1;
		height: 180rpx;
		padding: 20rpx 0;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
	}
	.proImg{
		width: 160rpx;
		height: 160rpx;
		background-color: #f8f8f8;
		margin-right: 20rpx;
		border-radius: 20rpx;
	}
	.proDetail{
		width: 100%;
		height: auto;
		padding: 30rpx 0;
		justify-content: center;
	}
	.proState{
		flex: 1;
		font-size: 28rpx;
		color: #00012E;
		font-weight: 700;
		
	}
	.proItem{
		width: 100%;
		height: auto;
		background-color: #fff;
		padding: 30rpx 30rpx 0 30rpx;
		margin-bottom: 30rpx;
		border-radius: 20rpx;
	}
	.deleteTitles{
		font-size: 30rpx;
		color: #1E1E31;
		font-weight: 700;
		text-align: center;
		margin-top:50rpx;
	}
	.deleteBtn{
		width: 184rpx;
		height: 66rpx;
		color: #fff;
		font-size: 28rpx;
		font-weight: 700;
		border-radius: 33rpx;
		justify-content: center;
		align-items: center;
		background-color:#00012E;
	}
	.cancelBtn{
		width: 184rpx;
		height: 66rpx;
		color: #222222;
		font-size: 28rpx;
		font-weight: 700;
		border-radius: 33rpx;
		margin-right: 50rpx;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		border:1px solid #A3A4B2;
	}
	.colsetBox{
		width: 100%;
		height: auto;
		justify-content: center;
		margin-top: 50rpx;
	}
	.deleteTitle{
		width: 100%;
		text-align: center;
		color: #00012E;
		font-size: 34rpx;
		font-weight: 700;
		padding-bottom: 30rpx;
		border-bottom: 1px dashed #CECEFF;
	}
	.deleteBox{
		width: 510rpx;
		height: 360rpx;
		background: url('../../static/img/info.png') no-repeat left top ;
		background-size: 100% 100%;
		padding:50rpx 30rpx 30rpx 30rpx;
	}
	.collectiondlBox{
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999999;
		background-color: rgba(0,0,0,0.5);
		align-items: center;
		justify-content: center;
	}
	.ordercode{
		font-size: 26rpx;
		color: #85819B;
	}
	.pstate{
		width: 100%;
		height: auto;
		justify-content: space-between;
		padding-bottom: 30rpx;
		border-bottom: 1px dashed #e6e6e6;
	}
	.set{
		width: 180rpx;
		height: 60rpx;
		justify-content: center;
		font-size: 30rpx;
		color: #fff;
		border-radius: 30rpx;
		background-color: #00012E;
	}
	.btnBox{
		flex: 1;
		justify-content: flex-end;
	}
	.sendTime{
		font-size: 26rpx;
		color: #FF001E;
		font-weight: 700;
	}
	
	.proPrice text{
		font-size: 26rpx;
	}
	.proPrice{
		font-size: 32rpx;
		color: #FF001E;
		font-weight: 700;
	}
	.msgx{
		width: 100%;
		justify-content: space-between
	}
	.proName{
		font-size: 32rpx;
		color: #1E1E31;
		line-height: 36rpx;
		width: 420rpx;
		font-weight: 700;
	}
	.proMsg{
		flex: 1;
		height: 180rpx;
		padding: 20rpx 0;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
	}
	.proImg{
		width: 160rpx;
		height: 160rpx;
		background-color: #f8f8f8;
		margin-right: 20rpx;
		border-radius: 20rpx;
	}
	.proDetail{
		width: 100%;
		height: auto;
		padding: 30rpx 0;
		justify-content: center;
	}
	.proState{
		flex: 1;
		font-size: 28rpx;
		color: #00012E;
		font-weight: 700;
		
	}
	.proItem{
		width: 100%;
		height: auto;
		background-color: #fff;
		padding: 30rpx;
		margin-bottom: 30rpx;
		border-radius: 20rpx;
	}
	.proList{
		width: 100%;
		height: auto;
		padding: 30rpx;
	}
	.itemActive::after{
		content: '';
		width: 30%;
		height: 8rpx;
		border-radius: 4rpx;
		background-color: #00012E;
		position: absolute;
		bottom: 0;
		left: 35%;
	}
	.orderNav  .itemActive{
		font-weight: 700;
		color: #000;
	}
	.orderItem{
		width: 25%;
		height: 80rpx;
		justify-content:center;
		font-size: 30rpx;
		color: #615F6D;
		position: relative;
	}
	.orderNav{
		width: 100%;
		height: 80rpx;
		background-color: #fff;
		justify-content: space-between;
	}
	.contents{
		width: 100%;
		min-height: 100vh;
		background-color: #f8f8f8;
	}
</style>