<template>
  <view class="trader">
    <view class="head">
      <view class="each">
        <view class="title">联系方式：</view>
        <view class="inputValue">
          <input maxlength="11" v-model="value" placeholder-style="color:#CCCCCC;" placeholder="请输入您的联系方式"
            type="number" />
        </view>
      </view>

      <view class="each eachTwo">
        <view class="title">上传收款码：</view>
        <view class="collection" @click="on_upload">
          <view class="name">点击上传收款码</view>
          <view class="img">
            <image src="/static/img/arrow.png"></image>
          </view>
        </view>
      </view>
    </view>
    <view class="ul">
      <view class="li">
        <view class="contentValue">
          <view class="left">卖币上线：</view>
          <view class="right" @click="on_confirmPurchase(1)">
            <view class="name">查看详情</view>
            <view class="img">
              <image src="/static/img/arrowTwo.png"></image>
            </view>
          </view>
        </view>
        <view class="contentValue">
          <view class="left">卖币范围：</view>
          <view class="right">
            <view class="inputBox">
              <view class="input">
                <input v-model="currencyPurchaseRange.value" type="number" />
              </view>
              <view class="seizeSeat">~</view>
              <view class="input">
                <input v-model="currencyPurchaseRange.valueTwo" type="number" />
              </view>
            </view>
          </view>
        </view>
        <view class="contentValue">
          <view class="btn">
            <view class="btnValue" @click="on_goUrl">确认挂卖</view>
          </view>
        </view>
      </view>
      <view class="li">
        <view class="contentValue">
          <view class="left">买币上线：</view>
          <view class="right" @click="on_confirmPurchase(2)">
            <view class="name">查看详情</view>
            <view class="img">
              <image src="/static/img/arrowTwo.png"></image>
            </view>
          </view>
        </view>
        <view class="contentValue">
          <view class="left">卖币范围：</view>
          <view class="right">
            <view class="inputBox">
              <view class="input">
                <input v-model="currencyPurchaseRange.value" type="number" />
              </view>
              <view class="seizeSeat">~</view>
              <view class="input">
                <input v-model="currencyPurchaseRange.valueTwo" type="number" />
              </view>
            </view>
          </view>
        </view>
        <view class="contentValue">
          <view class="btn">
            <view class="btnValue" @click="on_goUrl">确认够买</view>
          </view>
        </view>

      </view>
    </view>

    <view class="myBox">
      <view class="nameValue">我的竞猜币</view>
      <view class="contentQuiz">
        <view class="numberValue">93487</view>
        <view class="imgName" @click="on_buy">
          <view class="name">购买竞猜币</view>
          <view class="img">
            <image src="/static/img/arrowTwo.png"></image>
          </view>
        </view>
      </view>
    </view>

    <view class="footer">
      <view class="title">内部公告栏：</view>
      <view class="contentValueTwo">平台活动、优惠信息、9折购买竞猜币</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currencyPurchaseRange: {
        value: 100,
        valueTwo: 500,
      },
      value: ''
    };
  },
  onLoad() { },
  methods: {
    on_buy() {
      // 购买竞猜币
      uni.navigateTo({
        url: '/pages/trader/purchaseQuiz'
      });
    },
    // 跳转上传收款码
    on_upload() {
      uni.navigateTo({
        url: '/pages/trader/collectionCodeTwo'
      });
    },
    // 确认购买
    on_confirmPurchase(index) {
      console.log(index)
      uni.navigateTo({
        url: '/pages/trader/trader?type=' + index
      });
    },
    // 跳转
    on_goUrl() {
      uni.navigateTo({
        url: '/pages/index/index'
      });
    }
  }
};
</script>

<style lang="scss">
.trader {
  padding: 40rpx;

  .title {
    font-weight: 700;
  }

  .head {
    width: 100%;

    .each {
      display: flex;
      align-items: center;
      margin-top: 40rpx;
      justify-content: space-between;

      .inputValue {
        display: flex;
        flex: 1;
        height: 70rpx;

        input {
          width: 100%;
          height: 100%;
          border: 1px solid #cccccc;
          border-radius: 20rpx;
          font-weight: 700;
          padding-left: 15rpx;
          font-size: 15px;
        }
      }
    }

    .each:nth-child(1) {
      margin-top: 20rpx;
    }

    .collection {
      display: flex;
      align-items: center;

      .name {
        color: #cccccc;
        font-size: 14px;
        margin-right: 20rpx;
      }

      .img {
        display: flex;
        width: 20rpx;
        height: 24rpx;

        image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .ul {
    .li {
      box-shadow: 0px 0px 12px 0px rgba(17, 17, 17, 0.16);
      border-radius: 20rpx;
      margin-top: 60rpx;
      padding: 40rpx 30rpx;

      .contentValue:nth-child(1) {
        margin-top: 0;
      }

      .contentValue {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 40rpx;

        .left {
          font-weight: 700;
          min-width: 160rpx;
        }

        .right {
          display: flex;
          align-items: center;

          .inputBox {
            display: flex;
            align-items: center;
          }

          .name {
            color: #1E82F6;
          }

          .input {
            width: 200rpx;
            height: 70rpx;

            input {
              width: 100%;
              height: 100%;
              border: 1px solid #cccccc;
              border-radius: 20rpx;
              text-align: center;
              font-weight: 700;
            }
          }

          .seizeSeat {
            margin: 0 15rpx;
          }

          .img {
            width: 24rpx;
            height: 24rpx;
            display: flex;
            margin-left: 14rpx;

            image {
              width: 100%;
              height: 100%;
            }
          }
        }

        .btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;

          .btnValue {
            width: 90%;
            background-color: #DF3927;
            height: 80rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 180rpx;
            color: #fff;
          }
        }
      }
    }
  }

  .myBox {
    background: url('/static/img/bg.png') no-repeat;
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -o-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 60rpx;
    height: 240rpx;
    border-radius: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 60rpx;

    .nameValue {}

    .contentQuiz {
      width: 100%;
      display: flex;
      align-items: center;
      margin-top: 25rpx;
      justify-content: space-between;

      .numberValue {
        color: #DF3927;
        font-size: 22px;
        font-weight: 700;
      }


      .imgName {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .img {
          width: 24rpx;
          height: 24rpx;
          display: flex;

          image {
            width: 100%;
            height: 100%;
          }
        }

        .name {
          color: #1E82F6;
          margin-right: 10rpx;
        }
      }
    }
  }

  .footer {
    margin-top: 60rpx;

    .title {
      font-weight: 700;
    }

    .contentValueTwo {
      margin-top: 20rpx;
      font-size: 14px;
    }
  }
}
</style>