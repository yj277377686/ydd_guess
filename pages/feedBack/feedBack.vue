<template>
	<view class="contents ui-cell">
		<view>
			<view class="fbTitle ui-cell">反馈内容<text>*</text></view>
			<textarea name="fbcontent" id="fbcontent" maxlength="200" class="fbcontent" cols="30" rows="10" placeholder="请详细说明，以便于我们解决问题，您最多可填写200字。" @input='changeContent'></textarea>
			<view class="fbTitle ui-cell">添加图片</view>
			<view class="imgBox ui-cell">
				<view class="imgList ui-cell" v-if="imgList.length">
					 <view class="imgItem addImg" v-for="(item,index) in imgList" :key="index" @tap="previewImg(index)">
						 <image :src="item"></image> <image src="/static/img/close.png" class="cloeseImg" @tap.stop="delImg(index)"></image>
					 </view>
				</view>
				<view class="addImg" @tap="uploadImg()" v-if="imgList.length<3"></view>
			</view>
			<view class="fbTitle ui-cell">联系方式</view>
			<view class="phoneBox"><input type="number" class="uphone" placeholder="请输入您的手机号或邮箱（以便我们及时反馈）" @input="changePhone"></view>
		</view>
		<view class="adds ui-cell" @tap="submitFb">提交</view>
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
				imgList:[],
				indexe:0,
				upImgList:[],
				content:'',
				imageFile:'',
				phone:'',
				subFlag:true
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
		onLoad() {
			
		},
		methods: {
			//举报投诉
			submitFb(){
				let that=this;
				if(that.subFlag){
					if(!that.content){
						uni.showToast({
							icon:'none',
							title:'请填写反馈内容~'
						})
					}else{
						if(that.upImgList.length>0){
							for(var i in that.upImgList){
								if(!that.imageFile){
									that.imageFile=that.upImgList[i]
								}else{
									that.imageFile+=','+that.upImgList[i];
								}
						     }
						}	
						 let tokens=uni.getStorageSync('tokens');
						post('User/sumbitComplain',{content:that.content,image:that.imageFile,phone:that.phone},tokens).then(res=>{
							console.log(res);
							if(res.code==1){
								uni.showToast({
									icon:'none',
									title:'提交成功'
								})
							}else{
								uni.showToast({
									icon:'error',
									title:res.msg
								})
							}
							setTimeout(function () {
							   uni.navigateBack({
							   	delta:1
							   })
							}, 2000);
						})
					}
				}
			},
			changeContent(e){
				this.content=e.target.value;
			},
			changePhone(e){
				this.phone=e.target.value;
			},
			//上传图片
			uploadImg(){
				let self = this
				var count = Number(3 - self.imgList.length) 
				uni.chooseImage({
					count: count,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认都有
					sourceType: ['album', 'camera'], //从相册选择
					success(res) {
						const tempFilePaths = res.tempFilePaths
						var i = 0
						self.upload(tempFilePaths, i, self.imgList)
					}
				})
			   },
			   upload(tempFilePaths, i, pics) {
				let self = this
				self.subFlag=false;
				uni.showLoading({
					title:'上传中...'
				})
				uni.uploadFile({
				 url: 'https://h5.echengmeta.com/api/file/formimage', //仅为⽰例，⾮真实的接⼝地址
				 filePath: tempFilePaths[i],
				 name: 'file',
				 formData: {
					 name:'举报投诉'
				 },
				 success: (res) => {
				  let sult=	 JSON.parse(res.data);
				  self.imgList.push(tempFilePaths[i]);	 
			      self.upImgList.push(sult.data.base_url);	 
				  uni.hideLoading();
				  i++;
				  if (i == tempFilePaths.length) { //当图⽚传完时，停⽌调⽤
					  uni.showToast({
						  title: '上传成功！',
						  icon: 'none',
					  });
					  self.subFlag=true;
					  return
				  } else {
					  self.upload(tempFilePaths, i, pics)
				  }
				 },
				 fail() {
					 uni.showToast({
						 title: '上传失败！',
						 icon: 'none',
					 });
				 }
			   });
			   console.log(self.upImgList);
			},
			//删除图片
			delImg(index){
				this.imgList.splice(index,1);
				this.upImgList.splice(index,1);
				 console.log(this.upImgList);
			},
			//预览图片
			previewImg(index){
				let that=this;
				let imgList =that.imgList;
			    uni.previewImage({
				 current:imgList[index],
				 urls: imgList,
				 loop:true,
				 indicator:'number'
			   })
			},
		}
	}
</script>

<style>
	.cloeseImg{
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		top: -18rpx;
		right: -18rpx;
	}
	.imgItem{
		margin-right: 30rpx;
		position: relative;
	}
	.imgList{
		justify-content: flex-start;
	}
	.addImg{
		width: 150rpx;
		height: 150rpx;
		background: url('/static/img/ul.png') no-repeat center center;
		background-size: 50% 50%;
		background-color: #efefef;
		border-radius: 16rpx;
	}
	.imgBox{
		width: 100%;
		height: auto;
		padding: 30rpx;
		background-color: #fff;
		border-radius: 20rpx;
		justify-content: flex-start;
		margin-bottom: 30rpx;
	}
	.phoneBox{
		width: 100%;
		height: auto;
		padding: 20rpx;
		background-color: #fff;
		border-radius: 20rpx;
		margin-bottom: 100rpx;
	}
	.uphone{
		width: 100%;
		height: 60rpx;
		background-color: #fff;
		font-size: 28rpx;
		color: #9C99AC;
		padding-left: 10rpx;
	}
	.fbcontent{
		width: 640rpx;
		background-color: #fff;
		padding: 30rpx;
		font-size: 28rpx;
		color: #9C99AC;
		line-height: 40rpx;
		margin-bottom: 30rpx;
		border-radius: 20rpx;
	}
	.fbTitle text{
		color: #FF001E;
		margin-left: 8rpx;
	}
	.fbTitle{
		width: 100%;
		height: auto;
		padding: 30rpx 0;
		justify-content: flex-start;
		font-size: 30rpx;
		color: #1E1E31;
		font-weight: 700;
	}
	.adds{
		width: 100%;
		height: 80rpx;
		justify-content: center;
		border-radius: 40rpx;
		color: #fff;
		background-color:#DF3927 ;
		font-size: 32rpx;
	}
	.contents{
		width: 100%;
		min-height: 100vh;
		background-color: #f8f8f8;
		padding: 30rpx;
		flex-direction: column;
		justify-content: space-between;
		padding-bottom:100rpx;
	}
</style>