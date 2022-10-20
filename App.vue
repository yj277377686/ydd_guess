<script>

</script>

<style>
	.left_img{
		width: 40rpx;
		height:40rpx;
		position: absolute;
		left: 30rpx;
		bottom: 0rpx;
	}
	.room_Title{
		width: 100%;
		height: 40rpx;
		position: relative;
		font-size: 32rpx;
		color: #fff;
		font-weight: 700;
		justify-content: center;
	}
	.room_head{
		width: 100%;
		height: 8vh;
		background-color: #DF3927;
		padding-top: 60rpx;
	}
	.rightImg{
		width: 32rpx;
		height: 32rpx;
	}
	.roomMsg{
		font-size: 26rpx;
		margin-bottom: 10rpx;
	}
	.roomName{
		font-size: 38rpx;
		font-weight: 700;
		margin-bottom: 10rpx;
	}
	.room_four{
		background: url('/static/img/room4.png') no-repeat left top;
	}
	.room_three{
		background: url('/static/img/room3.png') no-repeat left top;
	}
	.room_two{
		background: url('/static/img/room2.png') no-repeat left top;
	}
	.room_one{
		background: url('/static/img/room1.png') no-repeat left top;
	}
	.ope{
		opacity: 0.8;
	}
	.color_bai{
		color: #fff;
	}
	.color_hei{
		color: #222;
	}
	.answerBox .roomItems{
		width: 100%;
		height: 200rpx;
		margin-bottom: 32rpx;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		background-size: 100% 100%;
		padding-left: 60rpx;
	}
	.musicBtn .closeImg{
		width: 60rpx;
		height: 60rpx;
		position: absolute;
		left: 0;
		bottom: 0;
		border-radius: 50%;
	}
	.musicBtn image{
		width: 100%;
		height: 100%;
	}
	.musicBtn{
		width: 60rpx;
		height: 60rpx;
		position: fixed;
		right: 30rpx;
		top: 110rpx;
		z-index: 999;
		animation: myfirst 15s infinite linear;
	}
	@keyframes myfirst
	{
	from {transform: rotate(0deg);}
	to {transform: rotate(-359deg);}
	}
	/* 头条小程序需要把 iconfont 样式放到组件外 */
	@import './common/styles/index.css';
	@import "components/m-icon/m-icon.css";
	.uni-switch .uni-switch-input{
		margin-right: 0;
	}
	.uni-picker-container{
		z-index: 99999;
	}
	/*每个页面公共css */
	.no_product{
		width: 100%;
		justify-content: center;
		text-align: center;
		font-size: 28rpx;
		color:#999;
		margin-top: 100rpx;
	}
	@keyframes mymove {
		0% {
			transform: scale(1);
			/*开始为原始大小*/
		}

		25% {
			transform: scale(1.2);
			/*放大1.1倍*/
		}

		50% {
			transform: scale(1);
		}

		75% {
			transform: scale(1.2);
		}

	}
	view{
		box-sizing: border-box;
	}
	page {
		min-height: 100vh;
		/* display: flex; */
		font-size: 16px;
		box-sizing: border-box;
	}

	/* #ifdef MP-BAIDU */
	page {
		width: 100%;
		height: 100%;
		display: block;
	}

	swan-template {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* 原生组件模式下需要注意组件外部样式 */
	custom-component {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	/* #ifdef MP-ALIPAY */
	page {
		min-height: 100vh;
	}

	/* #endif */

	/* 原生组件模式下需要注意组件外部样式 */
	m-input {
		width: 100%;
		/* min-height: 100%; */
		display: flex;
		flex: 1;
	}

	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #f7f7f7;
		box-sizing: border-box;
	}

	.input-group {
		background-color: #ffffff;
		margin-top: 20px;
		position: relative;
	}

	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
		font-size: 18px;
		line-height: 40px;
	}

	.input-row .title {
		width: 100px;
		padding-left: 15px;
	}

	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 8px;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.btn-row {
		margin-top: 25px;
		padding: 10px;
	}

	button.primary {
		background-color: #0faeff;
	}
	.ui-primary {
	    -webkit-box-flex: 1;
	    -webkit-flex: 1;
	    -ms-flex: 1;
	    flex: 1;
	  }
	
  .ui-cell {
	position: relative;
	display: -webkit-box;
	display: -moz-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-moz-box-align: center;
	-webkit-align-items: center;
	-ms-flex-align: center;
	align-items: center;
  }
  .ui-cell-cl {
	  flex-direction: column;
	  justify-content: space-between;
  }
  .ui-cell-lt{
	-webkit-align-self: flex-start;
	-moz-align-self:flex-start;
	align-self: flex-start;
  }
  .ui-cell-ft{
	text-align: right;
	color: #aaa;
	-webkit-box-align: center;
	-webkit-align-items: center;
	-ms-flex-align: center;
	align-items: center;
  }

  .ui-nowrap {
	max-width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
  }

  .clearfix::after {
	content: "";
	display: block;
	height: 0;
	clear: both;
	visibility: hidden;
  }
  /* 文字截断 */
  .ui-nowrap,
  .ui-nowrap-flex,
  .ui-nowrap-2,
  .ui-nowrap-3{
	overflow: hidden;
	text-overflow: ellipsis;
  }
  .ui-nowrap {
	max-width: 100%;
	white-space: nowrap;
  }
  .ui-nowrap-flex,
  .ui-nowrap-2,
  .ui-nowrap-3{
	display: -webkit-box;
	-webkit-box-orient: vertical;
  }
  .ui-nowrap-flex {
	-webkit-line-clamp: 1;
	-webkit-box-flex: 1;
	height: inherit;
  }
  /*要截断的行数*/
  .ui-nowrap-2 {
	-webkit-line-clamp: 2;
  }
  .ui-nowrap-3{
	-webkit-line-clamp: 3;
  }
  /*文字截断*/
  .ui-nowrap-2 {
	-webkit-line-clamp: 2;
  }
  .ui-nowrap-flex, .ui-nowrap-2, .ui-nowrap-3{
	display: -webkit-box;
	-webkit-box-orient: vertical;
  }
  .ui-nowrap, .ui-nowrap-flex, .ui-nowrap-2, .ui-nowrap-3 {
	overflow: hidden;
	text-overflow: ellipsis;
  }
  image{width: 100%;height: 100%; will-change: transform}
  .noData{
    width: 100%;
    height: auto;
    flex-direction: column;
    justify-content: center;
    margin-top: 100rpx;
  }
  .noImg{
    width: 198rpx;
    height: 128rpx;
    margin-bottom: 30rpx;
  }
  .noTitle{
    font-size: 32rpx;
    color: #999999;
  }
</style>
