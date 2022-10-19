<template>
	<view class="contents">
		<view class="room_head">
			<view class="room_Title ui-cell"><image src="/static/img/left.png" class='left_img' @tap="go_index"></image>竞技区</view>
		</view>
		<view class="roomList answerBox ui-cell">
			<view class="listTop">
			<view class="roomItems room_three ui-cell">
				<view class="roomName color_bai">竞技区</view>
				<view class="roomMsg color_bai ope">竞猜币：1000-50000</view>
			</view>
				<view class="autoJoin ui-cell" @tap="autoJoin">自动加入房间</view>
			</view>	
			<scroll-view scroll-y="true" class="scroll-Y">	
				<view class="listBox ui-cell">
					<view class="listItem" @tap="startGame(item.id,item.online,item.num)" v-for="(item, index) in roomList" :key="index">
						<image src="/static/img/hsfj.png" class="hsfj" v-if="item.online>=item.num"></image>
						<image src="/static/img/zcfj.png" class="zcfj" v-else></image>
						<view class="room_Nbm">{{item.name}}房间</view>
						<image src='/static/img/room.png' class='room_img'></image>
						<view class="room_pr ui-cell" v-if="item.online>=item.num">已满/{{item.num}}</view>
						<view class="room_pr ui-cell" v-else>{{item.online}}/{{item.num}}</view>
					</view>
				</view>
			</scroll-view>
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
				roomList:[],
				intervalb:''
			}
		},
		mixins: [],
		onHide: function () { // 后台运行清除定时器
		    clearInterval(this.intervalb);
			this.intervalb = null
		},
		onUnload() {
			clearInterval(this.intervalb);
			this.intervalb = null
		},
		onShow() {  
			let that=this;
			this.intervalb = setInterval(function () {
			  that.getroom();
			}, 5000);
		},
		created () {
		},
		//下拉刷新
		onPullDownRefresh() {
		},
		onLoad(options) {
			this.getroom();
		},
		onUnload() {
			 
		},
		methods: {
			autoJoin(){
				let that=this;
				let token=uni.getStorageSync('tokens');
				get('Broom/quickly_room',{},token).then(res=>{
					console.log(res);
					if(res.code==1){
						that.startGame(res.data);
					}
				})
			},
			startGame(rid,online,num){
				if(online>=num){
					uni.showToast({
						icon:'none',
						title:'房间人数已满'
					})
				}else{
					clearInterval(this.intervalb);
					this.intervalb = null
					uni.navigateTo({
						url:'/pages/gameRoom/gameRoom?rid='+rid+'&qname=竞技区'+'&status=2'
					})
				}
			},
			getroom(){
				let that=this;
				get('Aroom/room_lists',{initial:3}).then(res=>{
					console.log(res);
					if(res.code==1){
						that.roomList=res.data
					}
				})
			},
			go_index(){
				uni.navigateTo({
					url:'/pages/index/index'
				})
			},
	    }
	}
</script>

<style>
	.listTop{
		width: 100%;
		height: 24vh;
	}
	.room_pr{
		width: 208rpx;
		height: 72rpx;
		justify-content: center;
		font-size: 28rpx;
		color: #fff;
		font-weight: 600;
		position: absolute;
		bottom: 32rpx;
		left: 46rpx;
		z-index: 99;
		background: url('/static/img/sz.png') no-repeat left top;
		background-size: 100% 100%;
	}
	.room_img{
		width: 164rpx;
		height: 130rpx;
		position: absolute;
		left: 68rpx;
		bottom:128rpx;
		z-index: 99;
	}
	.room_Nbm{
		width: 100%;
		height: auto;
		padding-left: 40rpx;
		font-size: 34rpx;
		color: #fff;
		position: absolute;
		left: 0rpx;
		top: 16rpx;
		z-index: 99;
	}
	.hsfj{
		width: 300rpx;
		height: 360rpx;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 999;
	}
	.zcfj{
		width: 300rpx;
		height: 360rpx;
		position: absolute;
		left: 0;
		top: 0;
	}
	.listItem{
		width: 300rpx;
		height: 360rpx;
		position: relative;
		margin-bottom: 48rpx;
	}
	.listBox{
		width: 100%;
		height: auto;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.autoJoin{
		width: 610rpx;
		height: 88rpx;
		background: url('/static/img/zd.png') no-repeat left top;
		background-size: 100% 100%;
		justify-content: center;
		font-size: 32rpx;
		color: #fff;
		font-weight: 700;
		margin: 0 auto;
	}
	.scroll-Y {
		width: 100%;
		flex: 1;
		height: 66vh;
	}
	.roomList{
		width: 100%;
		height: 92vh;
		padding: 32rpx;
		flex-direction: column;
		justify-content: space-between;
	}
	.contents{
		width: 100%;
		min-height: 100vh;
		background: url('/static/img/tyfj.png') no-repeat left top;
		background-size: 100% 100%;
	}
</style>