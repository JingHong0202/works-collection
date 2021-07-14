<template>
	<view class="rank">
		<view class="nav">
			<text style="color: #fff;font-weight: bold;font-size: 40rpx;">排行</text>
		</view>
		<custom-search :disabled='true' @click='toSearch' />
		<view class="segmentation">
			<text> 点赞排名前十的作品 </text>
		</view>
		<swiper class="works-rank" circular :display-multiple-items="3" autoplay>
			<swiper-item v-for="(item,i) in recommend" :key='item._id' class="works-swiper-item" @tap="toPreview(item)">
				<image
					:src="item.works.fileType === 'image' ? item.url : item.url + '?x-oss-process=video/snapshot,t_1000,m_fast'"
					mode="aspectFit" class="works-swiper-item-image"></image>
			</swiper-item>
		</swiper>
		<view class="segmentation">
			<text> 点赞排名前三的用户 </text>
		</view>
		<view class="star-rank column">
			<view class="column star-1" @tap='toDetail(star_rank[0] && star_rank[0].user_id[0]._id)'>
				<image src="/static/huangguan.png" mode="aspectFit" class="crown"></image>
				<image :src="star_rank[0]&&star_rank[0].user_id[0].avatar || '/static/avatar.png'" mode="aspectFill"
					class='avatar'>
				</image>
				<text class="name">{{star_rank[0]&&star_rank[0].user_id[0].username || ''}}</text>
				<text class="star-num">{{star_rank[0]&&star_rank[0].star || 0}}赞</text>
			</view>
			<view class="star-23-box">
				<view class="column star-2" @tap='toDetail(star_rank[1] && star_rank[1].user_id[0]._id)'>
					<image src="/static/huangguan3-copy-copy.png" class='crown' mode="aspectFit"></image>
					<image :src="star_rank[1]&&star_rank[1].user_id[0].avatar || '/static/avatar.png'" mode="aspectFill"
						class='avatar'></image>
					<text class="name">{{star_rank[1]&&star_rank[1].user_id[0].username || ''}}</text>
					<text class="star-num">{{star_rank[1]&&star_rank[1].star || 0}}赞</text>
				</view>
				<view class="column star-3" @tap='toDetail(star_rank[2] && star_rank[2].user_id[0]._id)'>
					<image src="/static/huangguan_1.png" class='crown' mode="aspectFit"></image>
					<image :src="star_rank[2]&&star_rank[2].user_id[0].avatar || '/static/avatar.png'" mode="aspectFill"
						class='avatar'></image>
					<text class="name">{{star_rank[2]&&star_rank[2].user_id[0].username || ''}}</text>
					<text class="star-num">{{star_rank[2]&&star_rank[2].star || 0}}赞</text>
				</view>
			</view>
		</view>
		<view class="segmentation-reverse">
			<text @tap='toRankDetail'> 查看更多 > </text>
		</view>
	</view>
</template>
<script>
	import customSearch from '@/components/custom-search/custom-search.vue'
	const database = uniCloud.database()
	export default {
		components: {
			customSearch
		},
		data() {
			return {
				star_rank: [],
				recommend: []
			}
		},
		methods: {
			toSearch() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			toPreview(item) {
				if (!item) return
				uni.navigateTo({
					url: '/pages/preview/preview?index=' + item._id + '&data=' + encodeURIComponent(JSON.stringify(
						this.recommend))
				})
			},
			toDetail(id) {
				if (!id) return
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + id
				})
			},
			toRankDetail() {
				uni.navigateTo({
					url: '/pages/rank-detail/rank-detail'
				})
			}
		},
		async created() {
			if (getApp().globalData.star_rank) {
				this.star_rank = getApp().globalData.star_rank
				this.recommend = getApp().globalData.recommend
				return
			}
			uni.showLoading({
				mask: true,
				title: '加载中...'
			})
			const recommend = (await database.collection('works-collection,uni-id-users').where('status == 1').field(
					'works,desc,star,user_id,link,user_id{username,avatar}').orderBy('star desc').limit(10).get())
				.result.data
			this.recommend = recommend.map(item => {
				return {
					...item,
					url: item.works.url
				}
			})
			const star_rank = (await database.collection('works-collection,uni-id-users').where('status == 1').field(
				'works,desc,star,user_id,link,user_id{username,avatar}').groupBy('user_id').groupField(
				'sum(star) as star').orderBy('star desc').limit(3).get()).result.data
			this.star_rank = star_rank
			getApp().globalData.star_rank = [...star_rank]
			getApp().globalData.recommend = [...this.recommend]
			uni.hideLoading()
		}
	}
</script>
<style lang="scss" scoped>
	@keyframes in {
		from {
			opacity: .5;
		}

		to {
			opacity: 1;
		}
	}

	.rank {
		animation: in 500ms;
		background: linear-gradient(to bottom, #536976, #292E49);
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		overflow: auto;
		padding-bottom: 150rpx;

		.works-swiper-item-image {
			box-sizing: border-box;
			width: 100%;
			height: 100%;
			padding: 40rpx;
		}

		.segmentation {
			margin-top: 40rpx;
			padding: 0 25rpx;
			color: white;
			display: flex;
			font-size: 29rpx;
			justify-content: space-between;
			background: linear-gradient(to right, #FF6B6A 200rpx, transparent 500rpx);
			line-height: 80rpx;
		}

		.segmentation-reverse {
			margin-top: 40rpx;
			padding: 0 25rpx;
			color: white;
			display: flex;
			font-size: 29rpx;
			justify-content: flex-end;
			// background: linear-gradient(to left, #FF6B6A 150rpx, transparent 300rpx);
			line-height: 80rpx;
		}

		.nav {
			width: 100%;
			// #ifndef H5
			height: 75px;
			// #endif
			// #ifdef H5
			height: 50px;
			// #endif
			display: flex;
			justify-content: center;
			align-items: flex-end;
		}

		.column {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
		}

		.works-rank {
			// margin-top: 40rpx;
		}

		.star-rank {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			margin-top: 40rpx;

			.crown {
				width: 80rpx;
				height: 80rpx;
			}

			.avatar {
				width: 90rpx;
				height: 90rpx;
				border-radius: 100%;
				margin-top: 10rpx;
			}

			.name {
				font-size: 30rpx;
				margin-top: 20rpx;
				font-weight: 400;
				color: white;
			}

			.star-num {
				font-size: $uni-font-size-base;
				font-weight: 100;
				color: white;
			}

			.star-23-box {
				display: flex;
				width: 100%;
				justify-content: center;
				align-items: center;
			}

			.star-1 {
				margin-bottom: 20rpx;
			}

			.star-2 {
				width: 50%;
			}

			.star-3 {
				width: 50%;
			}
		}

		animation: in 500ms;

		&:after {
			content: '';
			display: block;
			background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			height: 100rpx;
		}
	}
</style>
