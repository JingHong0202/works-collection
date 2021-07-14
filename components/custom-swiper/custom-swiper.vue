<template>
	<custom-null v-if="!list.length" />
	<swiper v-else vertical class="swiper" @change="change" :current="index" duration='400'>
		<swiper-item class="swiper-item" v-for="(item,i) in list" :key='item._id'
			v-show='i === index || index - 1 === i || index + 1 === i'>
			<template v-if='item.works.fileType === "image"'>
				<image class="bg-filter" :src="item.url || '/static/lazy.png'" mode="aspectFill"></image>
				<image class="pic" @load='imgLoaded' :src="item.url || '/static/lazy.png'" mode="aspectFit"
					@longpress='openlink(item)' <!-- #ifdef H5 --> @dblclick.stop='openlink(item)'
					<!-- #endif --> @tap.stop='preview(item)' >
				</image>
			</template>
			<template v-else>
				<image class="bg"
					:src="item.url ? (item.url + '?x-oss-process=video/snapshot,t_1000,m_fast') : '/static/lazy.png'"
					@load='imgLoaded' mode="aspectFit"></image>
				<!-- #ifndef MP-WEIXIN -->
				<view class="play-btn" @tap.stop='toPreviewVideo(item)' @longpress='preview(item)'>
					<image class="play-icon" src="/static/play.png" mode="aspectFit"></image>
				</view>
				<!-- #endif -->
			</template>
			<view class="btn-list" :style="{bottom: isTabbar ? '100rpx' : '0'}">
				<view class="btn-star" @tap.stop='star(item)' v-if="isStar">
					<!-- #ifdef H5 -->
					<svg t="1623315233211" class="icon" viewBox="0 0 1024 1024" version="1.1"
						xmlns="http://www.w3.org/2000/svg" p-id="2669" width="200" height="200">
						<path
							d="M 884.876 423.143 L 646.971 423.143 c 92.1856 -340.464 -63.5166 -357.853 -63.5166 -357.853 c -65.9931 0 -52.3124 52.1825 -57.3031 60.8816 c 0 166.502 -176.85 296.972 -176.85 296.972 l 0 472.172 c 0 46.6075 63.5166 63.3938 88.4331 63.3938 l 357.452 0 c 33.6412 0 61.0362 -88.2243 61.0362 -88.2243 c 88.4341 -300.706 88.4341 -390.177 88.4341 -390.177 C 944.657 418.179 884.876 423.143 884.876 423.143 L 884.876 423.143 L 884.876 423.143 Z M 884.876 423.143"
							fill="#ffffff" p-id="2670"></path>
						<path
							d="M 251.671 423.3 L 109.215 423.3 c -29.4201 0 -29.8734 28.8961 -29.8734 28.8961 l 29.4201 476.203 c 0 30.3093 30.3615 30.3093 30.3615 30.3093 L 262.42 958.708 c 25.686 0 25.4589 -20.0496 25.4589 -20.0496 L 287.879 459.411 C 287.879 422.837 251.671 423.3 251.671 423.3 L 251.671 423.3 L 251.671 423.3 Z M 251.671 423.3"
							fill="#ffffff" p-id="2671"></path>
					</svg>
					<view style="position: absolute;transform: scale(4);bottom: 260rpx;">
						<lottie :options="defaultOptions" @animCreated="(main) => item.animate = main" />
					</view>
					<!-- #endif -->
					<!-- #ifdef APP-PLUS -->
					<image class="image" src="/static/dianzan.png" mode="aspectFit"></image>
					<!-- #endif -->
					<text class="star-num">
						{{item.star || 0}}
					</text>
				</view>
				<view class="btn-avatar" @tap.stop='toDetail(item.user_id[0]._id)' v-if="isAvatar">
					<image :src="item.user_id[0].avatar || '/static/avatar.png'" mode="aspectFill"
						:class="{'in-preview': i === index}"></image>
				</view>
			</view>
			<view class="info-box" :style="{bottom: isTabbar ? '100rpx' : '0'}">
				<view class="name">
					{{'@'+item.user_id[0].username}}
				</view>
				<view class="desc">
					{{item.desc}}
				</view>
			</view>
		</swiper-item>
	</swiper>
</template>
<script>
	import customNull from '@/components/custom-null/custom-null.vue';
	// #ifdef H5
	import lottie from 'vue-lottie'
	import * as animationData from '@/static/like.json';
	// #endif
	export default {
		components: {
			customNull,
			// #ifdef H5
			lottie
			// #endif
		},
		props: {
			list: {
				type: Array,
				default: () => []
			},
			isAvatar: {
				type: Boolean,
				default: true
			},
			isStar: {
				type: Boolean,
				default: true
			},
			isTabbar: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				index: 0,
				// #ifdef H5
				defaultOptions: {
					animationData,
					loop: false,
					autoplay: false,
					rendererSettings: {
						scaleMode: 'noScale',
					}
				},
				// #endif
			}
		},
		mounted() {
			// #ifdef H5
			window.addEventListener('mousewheel', this.handleScroll, false)
			// #endif
		},
		methods: {
			// #ifndef MP-WEIXIN
			toPreviewVideo(item) {
				uni.navigateTo({
					url: `/pages/preview-video/preview-video?url=${encodeURIComponent(item.works.url)}`
				})
			},
			// #endif
			preview(item) {
				if (!item.link) return uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '该作品没有外置链接'
				})
				// #ifdef H5
				window.open(item.link)
				// #endif
				// #ifdef MP-WEIXIN
				uni.setClipboardData({
					data: item.link,
					success: () => {
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: '链接已复制，请到游览器打开'
						})
					}
				})
				// #endif
				// #ifdef APP-PLUS
				plus.runtime.openURL(item.link);
				// #endif
			},
			async openlink(item) {
				uni.previewImage({
					urls: [item.url]
				})
			},
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + id
				})
			},
			star(item) {
				// #ifdef H5
				if (item.look_ani) return
				item.look_ani = true
				item.animate.playSegments([0, 205]);
				item.animate.addEventListener('complete', () => {
					item.look_ani = false
				})
				// #endif
				this.$emit('star', item)
			},
			imgLoaded() {
				uni.hideLoading()
			},
			change(e) {
				if (!this.list[e.detail.current].url) uni.showLoading({
					title: '加载中...',
					mask: true
				})
				this.index = e.detail.current
			},
			// #ifdef H5
			handleScroll(e) {
				// 鼠标滚轮滚动 swiper
				if (e.deltaY > 0) {
					if (this.index === this.list.length - 1) return
					this.index++
				} else {
					if (!this.index) return
					this.index--
				}
			}
			// #endif
		},
		watch: {
			index(newVal, oldVal) {
				if (!newVal && newVal !== 0) return
				this.$emit('change', newVal)
			}
		}
	}
</script>
<style>
	image {
		will-change: transform;
	}
</style>
<style lang="scss" scoped>
	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

	@keyframes path {
		from {
			stroke-dasharray: 0px 1000px;
		}

		to {
			stroke-dasharray: 1000px 0px;
		}
	}

	.info-box {
		position: absolute;
		// bottom: 100rpx;
		left: 0;
		width: 70%;
		margin: 0 0 30rpx 30rpx;
		height: 100rpx;
		flex-direction: column;
		display: flex;
		z-index: 15;

		.name {
			color: white;
			font-size: 40rpx;
			margin-bottom: 15rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.desc {
			color: white;
			font-size: 26rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}

	.btn-list {
		position: absolute;
		// bottom: 100rpx;
		right: 0;
		width: 140rpx;
		height: 300rpx;
		flex-direction: column;
		display: flex;
		z-index: 15;

		.btn-star {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			// #ifdef APP-PLUS
			& image {
				width: 60rpx;
				height: 60rpx;
				transition: 400ms all;

				&:active {
					transform: translate(calc(-50vw + 60rpx), calc(-50vh + 60rpx)) scale(5);
				}
			}

			// #endif
			// #ifdef H5
			& svg {
				width: 60rpx;
				height: 60rpx;
				transition: 400ms all;
				z-index: 100;
				& path {
					transition: 100ms all;
				}

				&:active {
					transform: scale(2);

					& path {
						fill: red;
					}
				}
			}

			// #endif
			&>text {
				color: white;
				font-size: 20rpx;
				text-align: center;
				margin-top: 10rpx;
			}
		}

		.btn-avatar {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #333;
			transform: scale(.65);
			border-radius: 100%;
			transition: 100ms all;
			z-index: 100;

			&:active {
				transform: scale(1);
			}

			&>.in-preview {
				animation: rotate 3.5s linear infinite;
			}

			&>image {
				width: 95rpx;
				height: 95rpx;
				border-radius: 100%;
			}
		}
	}

	.swiper {
		width: 100%;
		height: 100%;

		.swiper-item {
			&:after {
				content: '';
				display: block;
				background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
				position: fixed;
				bottom: 0;
				left: 0;
				right: 0;
				height: 40%;
			}

			&>image.bg-filter {
				filter: blur(20px);
				width: inherit;
				height: inherit;
				position: absolute;
				top: 0;
				left: 0;
			}

			&>image.bg {
				width: inherit;
				height: inherit;
				position: absolute;
				top: 0;
				left: 0;
			}

			&>.play-btn {
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				background: rgba(0, 0, 0, .4);
				display: flex;
				justify-content: center;
				align-items: center;

				&>.play-icon {
					width: 125rpx;
					height: 125rpx;
				}
			}

			&>image.pic {
				width: inherit;
				height: inherit;
				position: absolute;
				top: 0;
				left: 0;
				box-sizing: border-box;
				padding: 50rpx;
			}
		}
	}
</style>
