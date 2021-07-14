<template>
	<view class="search-component">
		<template v-if="!mode">
			<view class="search-single">
				<view class="input-view">
					<uni-icons class="input-uni-icon" type="search" size="22" color="#666666" />
					<input confirm-type="search" class="nav-bar-input" :disabled='disabled' type="text"
						:placeholder="placeholder" @click="$emit('click')" @confirm='(e) => {$emit("confirm", e)}' />
				</view>
			</view>
		</template>
		<template v-else>
			<uni-nav-bar  statusBar="true" color="white" background-color="#333" rightText="搜索" @clickRight="$emit('confirm', query)"
				@clickLeft="back">
				<block slot="left">
					<view class="back">
						<uni-icons type="arrowleft" color="white" size="22" />
					</view>
				</block>
				<view class="input-view">
					<uni-icons class="input-uni-icon" type="search" size="22" color="#666666" />
					<input focus v-model="query" confirm-type="search" class="nav-bar-input" type="text"
						:placeholder="placeholder" :disabled='disabled' @confirm='$emit("confirm",query)' />
				</view>
			</uni-nav-bar>
		</template>
	</view>
</template>
<script>
	export default {
		props: {
			placeholder: {
				type: String,
				default: '点击进入搜索'
			},
			disabled: {
				type: Boolean,
				default: false
			},
			mode: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			}
		},
		data() {
			return {
				query: ''
			};
		}
	}
</script>
<style lang="scss" scoped>
	$nav-height: 30px;

	.search-single {
		width: 80%;
		margin: auto;
	}

	.back {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		// width: 160rpx;
		margin-left: 4px;
	}

	.input-view {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		color: #333;
		// width: 500rpx;
		flex: 1;
		background-color: $uni-bg-color-grey;
		height: $nav-height;
		border-radius: 15px;
		padding: 0 30rpx;
		flex-wrap: nowrap;
		margin: 50rpx 0;
		line-height: $nav-height;
	}

	.input-uni-icon {
		line-height: $nav-height;
	}

	.input-uni-icon {
		line-height: $nav-height;
	}

	.nav-bar-input {
		height: $nav-height;
		line-height: $nav-height;
		/* #ifdef APP-PLUS-NVUE */
		width: 370rpx;
		/* #endif */
		padding: 0 5px;
		font-size: $uni-font-size-base;
		background-color: $uni-bg-color-grey;
	}
</style>
