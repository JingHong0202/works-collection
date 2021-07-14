<template>
	<view class="uni-container">
		<uni-forms ref="form" :value="formData" validate-trigger="submit" err-show-type="toast">
			<radio-group @change="(e) => {type = e.detail.value }" style="margin-bottom: 30rpx;">
				<label style="margin-right: 30rpx;">
					<radio checked value="image" /><text>图片</text>
				</label>
				<label>
					<radio value="video" /><text>视频</text>
				</label>
			</radio-group>
			<!-- <uni-forms-item name="works" :label="type === 'image' ? '作品' : '视频封面' ">
				<uni-file-picker file-mediatype="image" return-type="object" v-model="formData.works" />
			</uni-forms-item>
			<template v-if="type === 'video'">
				<uni-forms-item name="works_video" label="视频">
					<uni-file-picker file-mediatype="video" return-type="object" v-model="formData.works_video" />
				</uni-forms-item>
			</template> -->
			<text style="font-size: 24rpx;color: #BDBDBD;">
				提示: 大小不能超过100M
			</text>
			<uni-forms-item name="works" label="作品" required>
				<uni-file-picker :file-mediatype="type" return-type="object" v-model="formData.works" />
			</uni-forms-item>
			<uni-forms-item name="link" label="作品链接">
				<uni-easyinput placeholder="必须带上http://,无则留空" v-model="formData.link" />
			</uni-forms-item>
			<uni-forms-item name="desc" label="描述">
				<uni-easyinput placeholder="作品描述" v-model="formData.desc" />
			</uni-forms-item>
			<view class="uni-button-group">
				<button type="primary" class="uni-button" @click="submit">提交</button>
			</view>
		</uni-forms>
	</view>
</template>
<script>
	// import {
	// 	validator
	// } from '@/js_sdk/validator/works-collection.js';
	const db = uniCloud.database();
	const dbCollectionName = 'works-collection';
	// function getValidator(fields) {
	// 	let reuslt = {}
	// 	for (let key in validator) {
	// 		if (fields.indexOf(key) > -1) {
	// 			reuslt[key] = validator[key]
	// 		}
	// 	}
	// 	return reuslt
	// }
	export default {
		data() {
			return {
				formData: {
					"works": null,
					"desc": "",
					"link": ""
					// "works_video": null
				},
				type: 'image',
				formOptions: {},
				// rules: {
				// 	...getValidator(["pic", "desc"])
				// }
			}
		},
		// onReady() {
		// 	this.$refs.form.setRules(this.rules)
		// },
		onLoad({
			uid
		}) {
			this.formData.user_id = uid;
		},
		onUnload() {
			this.getOpenerEventChannel().emit('refreshData')
		},
		methods: {
			/**
			 * 触发表单提交
			 */
			submit() {
				if (!this.formData.works) return uni.showModal({
					content: '请先选择要上传的作品',
					showCancel: false
				})
				uni.showLoading({
					mask: true,
					title: '上传中...'
				})
				this.$refs.form.submit().then(() => {
					this.submitForm()
				}).catch((errors) => {
					uni.hideLoading()
				})
			},
			submitForm() {
				// 使用 clientDB 提交数据
				db.collection(dbCollectionName).add(this.formData).then((res) => {
					uni.showToast({
						icon: 'none',
						title: '发布成功'
					})
					
					setTimeout(() => {
						this.ok = true
						uni.navigateBack()
					}, 500)
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				}).finally(() => {
					uni.hideLoading()
				})
			}
		}
	}
</script>
<style scoped>
	.uni-container {
		padding: 15px;
	}

	.uni-input-border,
	.uni-textarea-border {
		width: 100%;
		font-size: 14px;
		color: #666;
		border: 1px #e5e5e5 solid;
		border-radius: 5px;
		box-sizing: border-box;
	}

	.uni-input-border {
		padding: 0 10px;
		height: 35px;
	}

	.uni-textarea-border {
		padding: 10px;
		height: 80px;
	}

	.uni-button-group {
		margin-top: 50px;
		display: flex;
		justify-content: center;
	}

	.uni-button {
		width: 184px;
		padding: 12px 20px;
		font-size: 14px;
		border-radius: 4px;
		line-height: 1;
		margin: 0;
	}
</style>
