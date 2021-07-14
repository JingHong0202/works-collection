<template>
	<view class="my">
		<view class="userinfo">
			<image :src="userinfo.avatar || '/static/avatar.png'" mode="aspectFill" @click="setUserOptions"></image>
			<text>{{userinfo.username}}</text>
			<button class="upload-btn" type="default" hover-class='btn-hover' @click="toUpload"
				size='mini'>发布作品</button>
		</view>
		<view class="content">
			<view class="segmentation">
				<text>作品({{list.length || 0}})</text>
			</view>
			<waterfallsFlow :list="list" imageSrcKey='url' v-if='list.length' @image-click='imageClick'>
				<!-- #ifndef MP-WEIXIN -->
				<template v-slot:default="item">
					<view class="functional">
						<view class="edit" @click.stop='edit(item)' v-if="item.status !== 1">
							<uni-icons type="compose" size='26' color='white'>
							</uni-icons>
						</view>
						<view class="del" @click.stop='del(item)'>
							<uni-icons type="trash" size='26' color='white'>
							</uni-icons>
						</view>
					</view>
					<view class="not-audit" v-if="item.status !== 1" @tap='imageClick(item._id, item.user_id[0]._id)'>
						<uni-icons :type="!item.status ? 'help' : 'close'" size='46' color='white'>
						</uni-icons>
						<text>{{!item.status ? '该作品还未审核' : '审核未通过'}}</text>
					</view>
				</template>
				<!-- #endif -->
				<!--  #ifdef  MP-WEIXIN -->
				<template v-for="item in list">
					<view :key='item._id' slot="slot{{item._id}}">
						<view class="functional">
							<view class="edit" @click.stop='edit(item)' v-if="item.status !== 1">
								<uni-icons type="compose" size='26' color='white'>
								</uni-icons>
							</view>
							<view class="del" @click.stop='del(item)'>
								<uni-icons type="trash" size='26' color='white'>
								</uni-icons>
							</view>
						</view>
						<view class="not-audit" v-if="item.status !== 1"
							@tap='imageClick(item._id, item.user_id[0]._id)'>
							<uni-icons :type="!item.status ? 'help' : 'close'" size='46' color='white'>
							</uni-icons>
							<text>{{!item.status ? '该作品还未审核' : '审核未通过'}}</text>
						</view>
					</view>
				</template>
				<!--  #endif -->
			</waterfallsFlow>
			<text style="text-align: center;width:100%;display: block;color:white;" v-else> 暂无作品，赶紧发布吧！ </text>
		</view>
	</view>
	<!-- ?x-oss-process=video/snapshot,t_1000,m_fast -->
</template>
<script>
	const db = uniCloud.database()
	import waterfallsFlow from "@/components/maramlee-waterfalls-flow/maramlee-waterfalls-flow.vue";
	import customNull from '@/components/custom-null/custom-null.vue'
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				list: []
			};
		},
		components: {
			waterfallsFlow,
			customNull
		},
		methods: {
			setUserOptions() {
				uni.showActionSheet({
					itemList: ['设置头像', '退出登录'],
					success: ({
						tapIndex
					}) => {
						switch (tapIndex) {
							case 0:
								return this.setAvatar()
								break;
							case 1:
								return this.logout()
								break;
						}
					}
				})
			},
			logout() {
				uni.showModal({
					title: '确定要退出登录吗?',
					success: ({
						confirm
					}) => {
						uniCloud.callFunction({
							name: 'router',
							data: {
								action: 'user/logout',
								data: {
									uniIdToken: this.token,
								}
							}
						}).then(({
							result
						}) => {
							if (result.code === 0) {
								uni.showToast({
									icon: 'none',
									title: result.message
								})
								this.$store.dispatch('user/clear')
								uni.reLaunch({
									url: '/pages/index/index'
								})
							}
						})
					}
				})
			},
			imageClick(id, user_id) {
				let find = this.list.find(item => item._id === id)
				uni.showActionSheet({
					itemList: find.status === 1 ? ['删除', '详情'] : ['删除', '修改'],
					success: ({
						tapIndex
					}) => {
						switch (tapIndex) {
							case 0:
								this.del(find)
								break;
							case 1:
								if (find.status === 1) uni.navigateTo({
									url: '/pages/preview/preview?index=' + find._id + '&user_id=' +
										find.user_id
								})
								else this.edit(find)
								break;
						}
					}
				})
			},
			setAvatar() {
				uniCloud.chooseAndUploadFile({
					type: 'image',
					count: 1,
					sourceType: ['album'],
					success: (res) => {
						uni.showLoading({
							title: '设置头像中...',
							mask: true
						})
						uniCloud.callFunction({
							name: 'router',
							data: {
								action: 'user/setAvatar',
								data: {
									uniIdToken: this.token,
									avatar: res.tempFiles[0].url
								}
							}
						}).then(res => {
							if (res && res.result.code === 0) {
								uni.hideLoading()
								uni.showToast({
									title: '头像设置成功',
									success: () => {
										this.$store.dispatch('user/INIT')
									}
								})
							} else {
								throw Error()
							}
						}).catch(err => {
							uni.showModal({
								title: '头像上失败',
								showCancel: false
							})
							uni.hideLoading()
						})
					},
					onChooseFile({
						tempFiles
					}) {
						if (tempFiles[0].size > 5242880) {
							return uni.showModal({
								title: '头像大小不能超过5M',
								showCancel: false
							})
						}
					}
				});
			},
			edit(item) {
				uni.navigateTo({
					url: '/pages/edit/edit?id=' + item._id,
					events: {
						refreshData: async () => {
							this.list = []
							setTimeout(() => {
								 this.init()
							},1000)
						}
					}
				})
			},
			async init() {
				let {
					result
				} = await db.collection('works-collection').where('user_id == $cloudEnv_uid').get()
				if (!result.data.length) return uni.hideLoading()
				this.list = result.data.map(item => {
					return {
						...item,
						url: item.works.url
					}
				})
			},
			del(item) {
				uni.showModal({
					title: "确定要删除该作品吗?",
					success: ({
						confirm
					}) => {
						if (confirm) {
							uni.showLoading({
								mask: true,
								title: '删除中...'
							})
							db.collection('works-collection').where(
								`user_id == $cloudEnv_uid && _id == "${item._id}"`).remove().then(res => {
								if (res.result.deleted) {
									uni.showModal({
										content: '删除成功',
										showCancel: false,
										success: async () => {
											this.list = []
											await this.init()
											this.$forceUpdate()
											uni.hideLoading()
										}
									})
								} else {
									throw Error('删除失败')
								}
							}).catch((err) => {
								uni.hideLoading()
								uni.showModal({
									content: err.message || '删除失败',
									showCancel: false
								})
							})
						}
					}
				})
			},
			toUpload() {
				uni.navigateTo({
					url: '/pages/upload/upload?uid=' + this.userinfo._id,
					events: {
						refreshData: async () => {
							await this.init()
							this.$forceUpdate()
						}
					}
				})
			}
		},
		async onLoad() {
			if (!this.token) return uni.reLaunch({
				url: '/pages/index/index'
			})
			uni.showLoading({
				mask: true,
				title: '加载中...'
			})
			await this.init()
			uni.hideLoading()
		},
		computed: {
			...mapState('user', {
				userinfo: state => state.info,
				token: state => state.token
			})
		}
	}
</script>
<style>
	page {
		background: #4b4b4b;
	}
</style>
<style lang="scss" scoped>
	.not-audit {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, .7);
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		&>text {
			color: white;
			font-size: 25rpx;
		}
	}

	.functional {
		background-color: rgba(0, 0, 0, .7);
		border-radius: 10rpx;
		position: absolute;
		bottom: 5rpx;
		right: 5rpx;
		padding: 10rpx;
		z-index: 1;

		.del {}

		.edit {
			margin-bottom: 10rpx;
		}
	}

	.my {
		.userinfo {
			height: 250rpx;
			position: relative;
			background: #333;

			.btn-hover {
				opacity: .7;
			}

			&>.upload-btn {
				position: absolute;
				bottom: 10rpx;
				right: 20rpx;
				color: white;
				background-color: #ff6b81;
				font-size: 30rpx;
			}

			&>image {
				width: 150rpx;
				height: 150rpx;
				border-radius: 100%;
				position: absolute;
				bottom: -75rpx;
				left: 40rpx;
			}

			&>text {
				color: #fff;
				position: absolute;
				bottom: 10px;
				left: 215rpx;
				font-size: 40rpx;
				font-weight: 100;
			}
		}

		.segmentation {
			margin: 40rpx 0 40rpx 0;
			padding: 0 25rpx;
			color: white;
			display: flex;
			font-size: 29rpx;
			justify-content: space-between;
			background: linear-gradient(to right, #FF6B6A 200rpx, transparent 500rpx);
			line-height: 80rpx;
		}

		.content {
			position: relative;
			top: 100rpx;
		}
	}
</style>
