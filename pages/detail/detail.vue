<template>
	<view class="detail">
		<waterfallsFlow :list="list" imageSrcKey='url' v-if='list.length' @image-click='imageClick' />
	</view>
</template>
<script>
	import waterfallsFlow from "@/components/maramlee-waterfalls-flow/maramlee-waterfalls-flow.vue";
	const db = uniCloud.database()
	export default {
		components: {
			waterfallsFlow
		},
		data() {
			return {
				list: []
			}
		},
		methods: {
			imageClick(index, user_id) {
				uni.navigateTo({
					url: `/pages/preview/preview?index=${index}&user_id=${user_id}`
				})
			}
		},
		async onLoad({
			id
		}) {
			uni.showLoading({
				title: '加载中...',
				mask: true
			})
			let {
				result
			} = await db.collection('works-collection,uni-id-users').where(`status == 1 && user_id._id == "${id}"`).field(
				'works,desc,star,user_id,link,user_id{username,avatar}').get()
			
			uni.setNavigationBarTitle({
				title: (await db.collection('uni-id-users').doc(id).field('username').get({getOne: true})).result.data.username + '的作品集'
			})
			this.list = result.data
			this.$nextTick(function(){
				uni.hideLoading()
			})
		}
	}
</script>
<style lang="scss" scoped>
	.detail {
		padding: 10rpx;
	}

	.detail-item {
		position: absolute;
		right: 10rpx;
		bottom: 10rpx;
	}
</style>
