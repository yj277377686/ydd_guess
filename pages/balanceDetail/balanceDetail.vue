<template>
	<view class="contents">
		  <view class="detailNav ui-cell">
			  <view class="navItem ui-cell" :class="{'active': indexs == 0}"  @tap="checkNav(0)">全部</view>
			  <view class="navItem ui-cell" :class="{'active': indexs == 1}"  @tap="checkNav(1)">收入</view>
			  <view class="navItem ui-cell" :class="{'active': indexs == 2}"  @tap="checkNav(2)">支出</view>
			  
		  </view>
		  <view class="detailBox" v-if="detail.length>0"> 
			<view class="recordItem ui-cell" v-for="(item, index) in detail" :key="index">
				<view class="itemLeft">
					<view class="leftTitle">{{item.source_type}}</view>
					<view class="leftDate">{{item.create_time}}</view>
				</view>
				<view class="itemRight ui-cell">
					 <view class="rightMoney ui-cell red" v-if="item.change_type==2"><text>￥</text>{{item.change_amount}}</view>
				     <view class="rightMoney ui-cell green" v-else><text>￥</text>{{item.change_amount}}</view>
				</view>
			</view>
		  </view>
		 <view class="no_product ui-cell" v-else>暂无更多数据~</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import { post } from '../../utils/http.js';
	import filtersMixin from '../../common/mixins/filters.js';
	import Vue from '../../utils/vue.min.js';
	export default {
		data () {
			return {
				indexs:0,
				detail:[]
			}
		},
		mixins: [],
		onShow() {
			if(!uni.getStorageSync('tokens')){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}else{
				this.getDetail(0)
			}
		},
		created () {
		},
		//下拉刷新
		onPullDownRefresh() {
			this.getDetail(this.indexs)
		},
		onLoad() {
			
		},
		methods: {
			checkNav(index){
				this.indexs=index;
				this.getDetail(index)
			},
			getDetail(type){
				let that=this;
				let tokens=uni.getStorageSync('tokens');
				post('user/accountLog',{source:1,type:type,page:1,limit:1000},tokens).then(res=>{
					console.log(res);
					if(res.code==1){
						that.detail=res.data.list;
						uni.stopPullDownRefresh()
					}
				})
			}
	    }
	}
</script>

<style>
	.detailBox .green{
		color: #23C77E;
	}
	.detailBox .red{
		color: #FC4344;
	}
	.active::after{
		content: '';
		width: 20%;
		height: 8rpx;
		border-radius: 4rpx;
		background-color: #00012E;
		position: absolute;
		bottom: 0;
		left: 40%;
	}
	.navItem.active{
		font-weight: 700;
	}
	.navItem{
		width: 33.3%;
		height: 80rpx;
		justify-content: center;
		font-size: 32rpx;
		color: #666666;
	}
	.detailNav{
		width: 100%;
		height: 80rpx;
		justify-content: space-between;
		background-color: #fff;
	}
	.rightMoney text{
		font-size: 26rpx;
	}
	.rightMoney{
		font-size:32rpx;
		color: #1E1E31;
		font-weight: 700;
		align-items: baseline;
	}
	.leftDate{
		font-size: 26rpx;
		color: #BBB8C8;
	}
	.leftTitle{
		font-size: 32rpx;
		color: #1E1E31;
		margin-bottom: 20rpx;
		font-weight: 700;
	}
	.itemLeft{
		flex: 1;
	}
	.recordItem:last-child{
		border-bottom: none;
	}
	.recordItem{
		width: 100%;
		height: auto;
		padding: 30rpx;
		justify-content: space-between;
		border-bottom: 1px dashed #DEDEDE;
		background-color: #fff;
	}
	.recordBox{
		width: 100%;
		height: auto;
		background-color: #fff;
		padding: 0 30rpx;
	}
	.detailBox{
		width: 100%;
		padding:30rpx;
	}
	.xiaImg{
		width: 30rpx;
		height: 30rpx;
	}
	.uni-input{
		color: #615F6D;
		font-size: 30rpx;
	}
	.selectBox{
		width: 150rpx;
	}
	.detailDate{
		width: 100%;
		height: 80rpx;
		padding: 0 30rpx;
		justify-content: flex-end;
	}
	.contents{
		width: 100%;
		min-height: 100vh;
		background-color: #F8F8FA;
	}
</style>