<template>
	<view class="content">
		<view class="back">
			<uni-icons type="back" @click="back" size="26" color="white"></uni-icons>
		</view>
		<custom-swiper :list='list' @change='change' @star='star' ref='swiper' :isTabbar="false" />
	</view>
</template>
<script>
	import customSwiper from '@/components/custom-swiper/custom-swiper.vue'
	const database = uniCloud.database()
	export default {
		components: {
			customSwiper
		},
		data() {
			return {
				list: []
			}
		},
		async onLoad(params) {
			if (params.user_id) {
				await this.init(params.user_id)
				let i = this.list.findIndex(item => item._id === params.index)
				this.$refs['swiper'].index = i
				this.$set(this.list[i], 'url', this.list[i].works.url)
			} else if (params.data) {
				await this.$nextTick()
				this.list = JSON.parse(decodeURIComponent(params.data))
				this.$refs['swiper'].index = this.list.findIndex(item => item._id === params.index)
			}
		},
		mounted() {
			// #ifdef H5
			window.addEventListener('mousewheel', this.handleScroll, false)
			// #endif
		},
		methods: {
			back() {
				return uni.navigateBack({
					delta: 1
				})
			},
			async init(user_id) {
				uni.showLoading({
					title: '初始化中...'
				})
				try {
					let {
						result
					} = await database.collection('works-collection,uni-id-users').where(
						`user_id._id == "${user_id}" && status == 1`).field(
						'works,desc,star,user_id,link,user_id{username,avatar}').get()
					this.list = result.data
					uni.hideLoading()
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
	}

	.back {
		position: fixed;
		top: var(--status-bar-height);
		left: 15rpx;
		width: 70rpx;
		height: 70rpx;
		z-index: 20;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, .2);
		border-radius: 50px;
	}
</style>
