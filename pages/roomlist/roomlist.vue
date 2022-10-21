<template>
	<view class="content">
<!-- 		<view class="musicBtn" @tap="musicBtn">
			<image src="/static/img/music.png"></image>
			<image src="/static/img/close.png" class="closeImg" v-if="muteBgMusic"></image>
		</view> -->
		<view class="bodyBox">
			<view class="roomList ui-cell">
				<view class="roomItem"   v-for="(item , index) in roomList" :key="index"  @tap="goroom(item.id)">
					<view class="itemTop ui-cell">
						<view class="roomNbm ui-cell">{{item.name}}<view class="nbmitem">区</view></view>
						<view class="roomUsernbm ui-cell">{{item.online}}/{{item.num}}</view>
					</view>
					<view class="roomN0 ui-cell">点击进入{{item.name}}区答题竞猜</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import { post } from '../../utils/http.js';
	import filtersMixin from '../../common/mixins/filters.js';
	import Vue from '../../utils/vue.min.js';
	export default {
		data() {
			return {
				muteBgMusic:true,
				roomList:[],
				intervals:''
			}
		},
	    onHide: function () { // 后台运行清除定时器
		    clearInterval(this.intervals);
			this.intervals = null
	    },
		onUnload() {
			clearInterval(this.intervals);
			this.intervals = null
		},
		onLoad() {
			this.getroom()
		},
		onShow() {
		   // if(uni.getStorageSync('muteBgMusic')!=''){
			  //  this.muteBgMusic = uni.getStorageSync('muteBgMusic');
			  //  if(uni.getStorageSync('muteBgMusic')){
				 //    this.music.playBgm({mute:true})
			  //  }else{
				 //   this.music.playBgm({mute:false})
			  //  }
		   // }else{
			  //    this.music.playBgm({mute:true})
		   // }
		   let that=this;
		   this.intervals = setInterval(function () {
		     that.getroom();
		   }, 5000);
		},
		methods: {
			getroom(){
				let that =this;
				post('Index/room_lists',{}).then(res=>{
					console.log(res);
					if(res.code==1){
						that.roomList=res.data;
					}else{
						uni.showToast({
							icon:'none',
							title:res.msg
						})
					}
				})
			},
	        //关闭或开启 音乐 
			musicBtn() {
				this.muteBgMusic = !this.muteBgMusic;
				uni.setStorageSync('muteBgMusic',this.muteBgMusic);
				console.log(this.muteBgMusic,this.muteBgMusic?'已关闭音乐####':'已开启音乐####');      
				if (this.muteBgMusic) {
					// 开启静音
					this.music.playBgm({mute:true})
				} else {
					// 关闭 静音
					this.music.playBgm({mute:false})
				}
			},
		   onTabItemTap(e) {
			   // this.music.play_didi();
		   },
           goroom(id){
			   // this.music.play_didi();
			   if(uni.getStorageSync('tokens')){
				   uni.navigateTo({
				   	url:'/pages/gameRoom/gameRoom?rid='+id
				   })
			   }else{
				   uni.navigateTo({
				   	url:'/pages/login/login'
				   })
			   }
		   }
		}
	}
</script>

<style>
	.roomN0{
		font-size: 24rpx;
		color: #fff;
		opacity: 0.8;
		margin-top: 16rpx;
		justify-content: center;
	}
	.roomUsernbm{
		width: 180rpx;
		height: 56rpx;
		justify-content: center;
		background-color: #fff;
		border-radius: 12rpx;
		font-size: 28rpx;
		color: #C80100;
		font-weight: 600;
	}
	.nbmitem{
		font-size: 48rpx;
		padding-bottom: 14rpx;
		margin-left: 10rpx;
	}
	.roomNbm{
		font-size: 80rpx;
		font-weight: 600;
		color: #fff;
		align-items: flex-end;
	}
	.itemTop{
		width: 280rpx;
		height: 200rpx;
		border-radius: 16rpx 16rpx 8rpx 8rpx;
		flex-direction: column;
		justify-content: space-between;
		background: url('/static/img/itemImg.png') no-repeat left top;
		background-size: 100% 100%;
		padding-bottom: 20rpx;
	}
	.roomItem{
		width: 280rpx;
		height: auto;
		margin-bottom: 50rpx;
	}
	.roomList{
		width: 100%;
		height: auto;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.bodyTitle{
		font-size: 80rpx;
		font-weight: 600;
		color: #fff;
		position: absolute;
		top: 80rpx;
		left: 120rpx;
	}
	.bodyBox{
		width: 100%;
		height: 100%;
		min-height: 3258rpx;
		background-size: 100% 100%;
		padding: 220rpx 40rpx 60rpx 40rpx;
	}
	.content {
		width: 100%;
		height: auto;
		min-height: 100vh;
        background-color: #00012E;
		padding: 30rpx;
		position: relative;
	}
</style>
