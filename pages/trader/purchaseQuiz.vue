<template>
    <view class="purchaseQuiz">
        <view class="head">
            <view class="name">购买竞猜币</view>
            <view class="input">
                <input placeholder-style="color:#CCCCCC;" placeholder="输入您购买竞猜币数量" />
            </view>
        </view>
        <!-- // 支付方式 -->
        <view class="paymentMethod">
            <view class="nameValue">请选择支付方式</view>
            <view class="ul">
                <view class="li" v-for="(item,index) in paymentMethodList" :key="item.id">
                    <view class="left">
                        <view class="img">
                            <image :src="item.icon"></image>
                        </view>
                        <view class="name">{{item.name}}</view>
                    </view>
                    <view class="right">
                        <label class="radio" @click="on_chioce(index,item.id)">
                            <radio :checked="index == indexs?true:false" />
                        </label>
                    </view>
                </view>
            </view>
        </view>

        <view class="footer">
            <view class="btn" @click="on_submit">提交</view>
        </view>
    </view>
</template>

<script>
import Alipay from "../../static/img/zhifubao.png"
import WeChat from "../../static/img/weixin.png"
export default {
    data() {
        return {
            indexs: 0,
            Alipay,
            value: '',
            paymentMethodList: [
                {
                    id: 1,
                    name: '支付宝',
                    icon: Alipay
                },
                {
                    id: 2,
                    name: '微信',
                    icon: WeChat
                }
            ]
        };
    },
    onLoad() { },
    methods: {
        aaa(arr) {
            if (arr && arr.length > 0) {
                arr.forEach(item => {
                    item.chainId = item.chainId ? item.chainId : item.departmentId;
                    item.chainName = item.chainName ? item.chainName : item.departmentName;
                    if (item.departmentInfo && item.departmentInfo.length > 0) {
                        this.aaa(item.departmentInfo)
                    }
                })
            }
        },
        on_chioce(index) {
            this.indexs = index
        },
        on_submit() {
            uni.navigateTo({
                url: '/pages/trader/collectionCode'
            });
        }
    }
};
</script>

<style lang="scss">
.purchaseQuiz {
    padding: 45rpx;

    .head {
        .input {
            width: 100%;
            display: flex;
            justify-content: center;
            margin-top: 20rpx;
            border-bottom: 1px solid #CCCCCC;
            height: 100rpx;

            input {
                height: 100%;
            }
        }

        .name {
            font-size: 15px;
        }
    }

    .paymentMethod {
        margin-top: 80rpx;

        .nameValue {
            font-size: 15px;
        }

        .ul {

            .li {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 40rpx;

                .left {
                    display: flex;
                    align-items: center;

                    .img {
                        width: 50rpx;
                        height: 50rpx;

                        image {
                            width: 100%;
                            height: 100%;
                        }
                    }

                    .name {
                        font-weight: 700;
                        margin-left: 10rpx;
                    }
                }
            }
        }
    }

    .footer {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 100rpx;

        .btn {
            width: 94%;
            height: 90rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #DF3927;
            color: #fff;
            border-radius: 180rpx;
        }
    }


}
</style>