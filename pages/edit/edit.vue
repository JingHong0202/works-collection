<template>
	<view class="uni-container" v-if="" >
		<uni-forms ref="form" :value="formData" validate-trigger="submit" err-show-type="toast" v-if='formData.works'>
			<template v-if="formData.works.fileType === 'image'">
				<uni-forms-item name="works" label="作品" required>
					<uni-file-picker file-mediatype="image" return-type="object" v-model="formData.works" />
				</uni-forms-item>
			</template>
			<template v-else>
				<uni-forms-item name="works" label="作品" required>
					<uni-file-picker file-mediatype="video" return-type="object" v-model="formData.works" />
				</uni-forms-item>
			</template>
			<uni-forms-item name="desc" label="描述">
				<uni-easyinput placeholder="作品描述" v-model="formData.desc" />
			</uni-forms-item>
			<uni-forms-item name="link" label="作品链接">
				<uni-easyinput placeholder="必须带上http://,无则留空" v-model="formData.link" />
			</uni-forms-item>
			<view class="uni-button-group">
				<button type="primary" class="uni-button" @click="submit">提交</button>
			</view>
		</uni-forms>
	</view>
</template>
<script>
	// import { validator } from '../../js_sdk/validator/works-collection.js';
	const db = uniCloud.database();
	const dbCollectionName = 'works-collection';
	// function getValidator(fields) {
	//   let reuslt = {}
	//   for (let key in validator) {
	//     if (fields.indexOf(key) > -1) {
	//       reuslt[key] = validator[key]
	//     }
	//   }
	//   return reuslt
	// }
	export default {
		data() {
			return {
				formData: {
					"works": null,
					"desc": "",
					"link": ""
				},
				formOptions: {},
				// rules: {
				//   ...getValidator(["user_id","works","desc","star","link"])
				// }
			}
		},
		onLoad(e) {
			const id = e.id
			this.formDataId = id
			this.getDetail(id)
		},
		onReady() {
			// this.$refs.form.setRules(this.rules)
		},
		methods: {
			/**
			 * 触发表单提交
			 */
			submit() {
				uni.showLoading({
					mask: true,
					title: '加载中'
				})
				this.$refs.form.submit().then((res) => {
					this.submitForm(res)
				}).catch((errors) => {
					uni.hideLoading()
				})
			},
			submitForm(value) {
				// 使用 clientDB 提交数据
				db.collection(dbCollectionName).doc(this.formDataId).update(value).then((res) => {
					uni.showToast({
						icon: 'none',
						title: '修改成功'
					})
					this.getOpenerEventChannel().emit('refreshData')
					setTimeout(() => uni.navigateBack(), 500)
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				}).finally(() => {
					uni.hideLoading()
				})
			},
			/**
			 * 获取表单数据
			 * @param {Object} id
			 */
			getDetail(id) {
				uni.showLoading({
					mask: true,
					title: '加载中'
				})
				db.collection(dbCollectionName).doc(id).field('works,desc,link').get().then((res) => {
					const data = res.result.data[0]
					if (data) {
						this.formData = data
					}
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
<style>
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
