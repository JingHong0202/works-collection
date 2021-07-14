<template>
	<uni-list v-if='list.length'>
		<template v-for="item in list">
			<uni-list-item :key='item._id' :thumb="item.user_id[0].avatar || '/static/avatar.png'"
				:title="item.user_id[0].username" thumbSize="lg" :note="item.star + '赞'" clickable showArrow
				link="navigateTo" :to="'/pages/detail/detail?id=' + item.user_id[0]._id">
			</uni-list-item>
		</template>
	</uni-list>
</template>
<script>
	const database = uniCloud.database()
	export default {
		data() {
			return {
				list: []
			};
		},
		async onReady() {
			uni.showLoading({
				mask: true,
				title: '加载中...'
			})
			this.list = (await database.collection('works-collection,uni-id-users').where('status == 1').field(
				'works,desc,star,user_id,link,user_id{username,avatar}').groupBy('user_id').groupField(
				'sum(star) as star').orderBy('star desc').get()).result.data
			uni.hideLoading()
		}
	}
</script>
<style lang="scss">
</style>
