<template>
	<view class="content">
		<custom-swiper v-if="!activeIndex" :list='list' @change='change' @star='star' />
		<rank v-if='activeIndex === 1'></rank>
		<view class="tabbar">
			<view class="tabbar-item" @click="activeIndex = 0">
				<text class="tabbar-text" :class="{active: !activeIndex}">发现</text>
			</view>
			<!-- #ifndef MP-WEIXIN -->
			<view class="tabbar-item" @tap='more'>
				<image class="add-icon" :class="{'have-login': userinfo}"
					:src="token ? (userinfo.avatar || '/static/avatar.png') :  '/static/add.png'" mode="aspectFill">
				</image>
			</view>
			<!-- #endif -->
			<view class="tabbar-item" @click="activeIndex = 1">
				<text class="tabbar-text" :class="{active: activeIndex === 1}">排行</text>
			</view>
		</view>
	</view>
</template>
<script>
	import customSwiper from '@/components/custom-swiper/custom-swiper.vue'
	import rank from '@/components/page/rank/rank.vue'
	import {
		mapState
	} from 'vuex'
	// import {
	// 	setAppUserInfo
	// } from '@/common/util.js'
	const database = uniCloud.database()
	export default {
		components: {
			customSwiper,
			rank
		},
		data() {
			return {
				list: [],
				activeIndex: 0,
				star_rank: []
			}
		},
		async onLoad() {
			uni.showLoading({
				title: '初始化中...',
				mask: true
			})
			// #ifndef MP-WEIXIN
			await this.$store.dispatch('user/INIT')
			// #endif
			await this.init()
			uni.hideLoading()
		},
		mounted() {
			// #ifdef H5
			window.addEventListener('mousewheel', this.handleScroll, false)
			// #endif
		},
		computed: {
			...mapState('user', {
				userinfo: state => state.info,
				token: state => state.token
			})
			// app() {
			// 	return getApp().globalData
			// }
		},
		methods: {
			toRank() {
				this.activeIndex = 1
			},
			async more() {
				if (this.token) {
					uni.navigateTo({
						url: '/pages/my/my'
					})
				} else {
					uni.showModal({
						title: '该操作需要先登录,是否登录?',
						success: async ({
							confirm
						}) => {
							if (!confirm) return
							uni.navigateTo({
								url: '/pages/login/login'
							})
						}
					})
				}
			},
			async init() {
				try {
					let {
						result: {
							data
						}
					} = await database.collection('works-collection,uni-id-users').where('status==1').field(
						'works,desc,star,user_id,link,user_id{username,avatar}').get()
					this.list = data.sort(function() {
						return .5 - Math.random();
					})
					this.list[0].url = this.list[0].works.url
				} catch (e) {
					uni.hideLoading()
				}
			},
			async star(item) {
				let find = this.list.find(item2 => item2._id === item._id)
				if (find.star_interval) return uni.showToast({
					title: '点赞太频繁,请稍后10秒再试',
					position: 'bottom',
					icon: 'none'
				})
				find.star_interval = true
				setTimeout(() => {
					find.star_interval = false
				}, 10000)
				await uniCloud.callFunction({
					name: 'star',
					data: {
						_id: find._id
					}
				})
				return ++find.star
			},
			async change(index) {
				let cur = this.list[index]
				this.$set(cur, 'url', cur.works.url)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.content {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		overflow: hidden;
	}

	.tabbar {
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 10;
		height: 100rpx;
		background-color: rgba(255, 255, 255, .08);
		border-top: 2px solid rgba(255, 255, 255, .1);
		display: flex;

		.tabbar-item {
			flex: 1;
			height: 100%;
			justify-content: center;
			align-items: center;
			display: flex;

			&>.add-icon {
				width: 70rpx;
				height: 70rpx;
				opacity: .8;
			}

			&>.have-login {
				border-radius: 100%;
			}

			& .active {
				color: white !important;
				opacity: 1 !important;
				font-weight: bold !important;
			}

			&>.tabbar-text {
				color: white;
				font-size: 30rpx;
				height: 100%;
				font-weight: 100;
				display: flex;
				justify-content: center;
				align-items: center;
				opacity: .7;
			}
		}
	}
</style>
