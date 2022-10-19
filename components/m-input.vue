<template>
	<view class="m-input-view">
		<input :focus="focus" :type="inputType" :value="value" @input="onInput" placeholder-style='color:#999999' class="m-input-input" :placeholder="placeholder"
		 :password="type==='password'&&!showPassword" @focus="onFocus" @blur="onBlur" />
		<!-- 优先显示密码可见按钮 -->
		<view v-if="clearable&&!displayable&&value.length" class="m-input-icon">
			<image class="icons" src="../static/img/scimg.png" color="#ffffff" type="clear" @click="clear" />
		</view>
		<view v-if="displayable" class="m-input-icon">
			<image class="icons" src="../static/img/see.png" :style="{color:showPassword?'#ffffff':'#ffffff'}" type="eye" @click="display" />
		</view>
	</view>
</template>

<script>
	import mIcon from './m-icon/m-icon.vue'
	export default {
		components: {
			mIcon
		},
		props: {
			/**
			 * 输入类型
			 */
			type: String,
			/**
			 * 值
			 */
			value: String,
			/**
			 * 占位符
			 */
			placeholder: String,
			/**
			 * 是否显示清除按钮
			 */
			clearable: {
				type: [Boolean, String],
				default: false
			},
			/**
			 * 是否显示密码可见按钮
			 */
			displayable: {
				type: [Boolean, String],
				default: false
			},
			/**
			 * 自动获取焦点
			 */
			focus: {
				type: [Boolean, String],
				default: false
			}
		},
		model: {
			prop: 'value',
			event: 'input'
		},
		data() {
			return {
				/**
				 * 显示密码明文
				 */
				showPassword: false,
				/**
				 * 是否获取焦点
				 */
				isFocus: false
			}
		},
		computed: {
			inputType() {
				const type = this.type
				return type === 'password' ? 'text' : type
			}
		},
		methods: {
			clear() {
				this.$emit('input', '')
			},
			display() {
				this.showPassword = !this.showPassword
			},
			onFocus() {
				this.isFocus = true
			},
			onBlur() {
				this.$nextTick(() => {
					this.isFocus = false
				})
			},
			onInput(e) {
				this.$emit('input', e.detail.value)
			}
		}
	}
</script>

<style scoped>
	.icons{
		width: 50rpx;
		height: 50rpx;
	}
	.inputs{
		color: #333;
	}
	.m-input-view {
		display: inline-flex;
		flex-direction: row;
		align-items: center;
		/* width: 100%; */
		flex: 1;
		padding: 0 10px;
	}

	.m-input-input {
		flex: 1;
		width: 100%;
		height: 70rpx;
		min-height: 100%;
		line-height: inherit;
		background-color: rgba(255, 255, 255, 0);
		font-size: 30rpx;
	}

	.m-input-icon {
		width: 20px;
		font-size: 20px;
		line-height: 20px;
		color: #ffffff;
	}
	.m-input-view input {
		color: #333;
	}
</style>
