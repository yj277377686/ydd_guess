
<template>
	<view class="contents">
		<view class="search_Box">
			<uni-search-bar class="uni-mt-10" radius="100" placeholder="请输入搜索内容" clearButton="none" cancelButton="none" @confirm="search" />
		</view>
		<view class="detailNav ui-cell">
			  <view class="navItem ui-cell" :class="{'active': indexs == 0}"  @tap="checkNav(0,'all')">全部</view>
			  <view class="navItem ui-cell" :class="{'active': indexs == 1}"  @tap="checkNav(1,'first')">直推团员</view>
			  <view class="navItem ui-cell" :class="{'active': indexs == 2}"  @tap="checkNav(2,'second')">间推团员</view>
		</view>
		<view class="sortBox ui-cell">
			  <view class="sortItem ui-cell">
				  <view class="sortTl" @tap="sorts(1)">团队排序</view>
				  <image src="/static/img/pxup.png" class="sortImg" v-if="fans=='asc'"></image>
				  <image src="/static/img/px.png" class="sortImg" v-else></image>
			  </view>
			  <view class="sortItem ui-cell">
				  <view class="sortTl" @tap="sorts(2)">金额排序</view>
				  <image src="/static/img/pxup.png" class="sortImg" v-if="money=='asc'"></image>
				  <image src="/static/img/px.png" class="sortImg" v-else></image>
			  </view>
			  <view class="sortItem ui-cell">
				  <view class="sortTl" @tap="sorts(3)">订单排序</view>
				  <image src="/static/img/pxup.png" class="sortImg" v-if="order=='asc'"></image>
				  <image src="/static/img/px.png" class="sortImg" v-else></image>
			  </view>
		</view>
		<view class="fansList" v-if="fansData.length">
			<view class="fansItem ui-cell" v-for="(item, index) in fansData" :key="index">
				<image :src="item.avatar" class="fansImg"></image>
				<view class="fansDetail ui-cell">
					<view class="fansName">{{item.nickname}}</view>
					<view class="fansDate">{{item.create_time}}</view>
				</view>
				<view class="fansNbm ui-cell">
					<view class="nbmItem">{{item.fans_team}}人</view>
					<view class="nbmItem">{{item.fans_order}}单</view>
					<view class="nbmItem">{{item.fans_money}}元</view>
				</view>
			</view>
		</view>
		<view v-else class="nofans ui-cell">
			<image src="/static/img/nopr.png" class="nofansImg"></image>
			<view class="nofansTl">暂无相关数据</view>
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
				fansData:[],
				indexs:0,
				keyword:'',
				fans:'asc',
				money:'asc',
				order:'asc',
				type:'all'
			}
		},
		mixins: [],
		onShow() {  
			this.getmyfans('all');
		},
		created () {
		},
		//下拉刷新
		onPullDownRefresh() {
		},
		onLoad(options) {
			
		},
		methods: {
			sorts(type){
				if(type==1){
				   if(this.fans=='asc'){
					   this.fans='desc'
				   }else{
					   this.fans='asc'
				   }
				}else if(type==2){
				   if(this.money=='asc'){
					   this.money='desc'
				   }else{
					   this.money='asc'
				   }					
				}else{
				   if(this.order=='asc'){
					   this.order='desc'
				   }else{
					   this.order='asc'
				   }					
				}
				this.getmyfans(this.type);
			},
			checkNav(index,type){
				this.indexs=index;
				this.type=type;
				this.getmyfans(type);
			},
			//搜索关键字
			search(res) {
				this.keyword= res.value;
				this.getmyfans(this.type);
			},
			getmyfans(type){
				let that=this;
				let token=uni.getStorageSync('tokens');
				let keyword=that.keyword;
				let fans=that.fans;
				let money=that.money;
				let order=that.order;
				get('user/fans',{type:type,keyword:keyword,fans:fans,money:money,order:order,page:1,limit:1000},token).then(res=>{
					console.log(res);
					if(res.code==1){
						that.fansData=res.data.list;
					}else{
						uni.showToast({
							icon:'none',
							title:res.msg
						})
					}
				})
			}
	    }
	}
</script>

<style>
	.nofansTl{
		font-size: 30rpx;
		color: #AAAAAA;
	}
	.nofansImg{
		width: 100%;
		height: 460rpx;
	}
	.nofans{
		width: 100%;
		height: auto;
		padding-top: 190rpx;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.nbmItem{
		font-size: 24rpx;
		color: #444444;
	}
	.fansNbm{
		height: 100rpx;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
	}
	.fansDate{
		font-size: 26rpx;
		color: #BBBBBB;
	}
	.fansName{
		font-size: 28rpx;
		font-weight: 700;
	}
	.fansDetail{
		flex: 1;
		height: 90rpx;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
	}
	.fansImg{
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		background-color: #e6e6e6;
		margin-right: 24rpx;
	}
	.fansItem{
		width: 100%;
		height: 100rpx;
		justify-content:space-between;
		margin-bottom: 40rpx;
	}
	.fansList{
		width: 100%;
		height: auto;
		padding: 0 30rpx;
	}
	.sortImg{
		width: 24rpx;
		height: 24rpx;
	}
	.sortTl{
		font-size: 30rpx;
		color: #1A1A1A;
		margin-right: 6rpx;
	}
	.sortItem{
		width: 33.3%;
		height: auto;
		justify-content: center;
	}
	.sortBox{
		width: 100%;
		height: auto;
		padding: 30rpx 0;
		justify-content: space-between;
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
		border-bottom: 1px solid #e6e6e6;
	}
	.contents{
		width: 100%;
		min-height: 100vh;
	}
</style>