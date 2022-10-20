<template>
    <view class="billingDetails">
        <view class="head">
            <view class="img">
                <image :src="type==1?'/static/img/processing.png':'/static/img/Completed.png'"></image>
            </view>
            <view class="name">{{type==1?'进行中':'已完成'}}</view>
        </view>

        <view class="contentValue">
            <view class="title">购买竞猜币</view>
            <view class="number">100</view>
        </view>

        <view class="ul">
            <view class="li">
                <view class="left">玩家昵称</view>
                <view class="right">某某昵称</view>
            </view>
            <view class="li">
                <view class="left">支付方式</view>
                <view class="right">支付宝</view>
            </view>
            <view class="li">
                <view class="left">支付金额</view>
                <view class="right">￥1.00</view>
            </view>
            <view class="li">
                <view class="left">支付时间</view>
                <view class="right">2021/09/03 14:13:52</view>
            </view>
            <view class="li" v-if="type==2">
                <view class="left">确认收款时间</view>
                <view class="right">2021/09/03 14:13:52</view>
            </view>
        </view>

        <!-- 付款截图 -->
        <view class="paymentScreenshot">
            <view class="titleValue">
                付款截图
            </view>
            <view class="upload">
                <image src="/static/img/upload.png"></image>
            </view>
        </view>

        <view class="footer" v-if="type==1">
            <view class="btnBox">
                <view class="btn one">拒绝</view>
                <view class="btn two">确认收款</view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            type: null
        };
    },
    onLoad(data) {
        this.type = data.type
    },
    methods: {

    }
};
</script>

<style lang="scss">
.billingDetails {
    padding: 20rpx 35rpx 35rpx 35rpx;

    .head {
        display: flex;
        align-items: center;
        padding: 30rpx 0;
        border-bottom: 1px solid #EEEEEE;

        .img {
            width: 40rpx;
            height: 40rpx;
            display: flex;

            image {
                width: 100%;
                height: 100%;
            }
        }

        .name {
            font-weight: 700;
            margin-left: 20rpx;
        }
    }

    .contentValue {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40rpx 0;
        border-bottom: 1px solid #EEEEEE;

        .number {
            margin-top: 25rpx;
            font-weight: 700;
            font-size: 22px;
        }
    }

    .ul {
        margin-top: 60rpx;
        border-bottom: 1px solid #EEEEEE;
        padding-bottom: 60rpx;

        .li {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 24rpx;

            .left {
                color: #222222;
            }

            .right {
                font-weight: 700;
            }
        }
    }

    .paymentScreenshot {
        margin-top: 40rpx;

        .titleValue {
            font-weight: 700;
            font-size: 20px;
        }

        .titleValue:after {
            content: ' *';
            color: red;
            font-size: 150%;
        }


        .upload {
            width: 140rpx;
            height: 140rpx;
            margin-top: 40rpx;

            image {
                width: 100%;
                height: 100%;
            }
        }

    }

    .footer {
        position: fixed;
        bottom: 4%;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        display: flex;
        justify-content: center;

        .btnBox {
            width: 88%;
            display: flex;
            align-items: center;

            .btn {
                width: 50%;
                height: 100rpx;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .one {
                background-color: #CCCCCC;
                color: #fff;
                border-top-left-radius: 180rpx;
                border-bottom-left-radius: 180rpx;
            }

            .two {
                background-color: red;
                color: #fff;
                border-top-right-radius: 180rpx;
                border-bottom-right-radius: 180rpx;
            }
        }
    }
}
</style>