<template>
	<view class="search">
		<!-- #ifdef MP-WEIXIN -->
		<view :style="'background-color: #333;'+'height:'+offsetTop+'rpx'">
		</view>
		<!-- #endif -->
		<custom-search mode placeholder='输入要搜索的用户' @confirm='confirm' />
		<uni-list v-if='list.length'>
			<template v-for="item in list">
				<uni-list-item :key='item._id' :thumb="item.avatar || '/static/avatar.png'" :title="item.username"
					thumbSize="lg" clickable showArrow link="navigateTo" :to="'/pages/detail/detail?id=' + item._id">
				</uni-list-item>
			</template>
		</uni-list>
	</view>
</template>
<script>
	import customSearch from '@/components/custom-search/custom-search.vue'
	const database = uniCloud.database()
	export default {
		components: {
			customSearch
		},
		methods: {
			async confirm(query) {
				if (!query.trim() === '' || !query) return uni.showToast({
					title: '请输入要搜索的用户名',
					icon: 'none'
				})
				uni.showLoading({
					title: '搜索中...',
					mask: true
				})
				this.list = (await database.collection('uni-id-users').where(`/${query}/ig.test(username)`).field(
					'username,avatar').get()).result.data
				uni.hideLoading()
			}
		},
		data() {
			// #ifdef MP-WEIXIN
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			// #endif
			return {
				list: [],
				// #ifdef MP-WEIXIN
				offsetTop: menuButtonInfo.top + menuButtonInfo.height,
				// #endif
			};
		}
	}
</script>
<style lang="scss" scoped>
	.search {
		// width: 100%;
		// height: 100%;
		// background: linear-gradient(to bottom, #536976, #292E49);
	}
</style>
