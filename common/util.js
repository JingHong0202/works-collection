export async function setAppUserInfo() {
	let app = getApp().globalData
	app.token = uni.getStorageSync('uni_id_token')
	if (app.token) {
		let {
			result
		} = await uniCloud.callFunction({
			name: 'router',
			data: {
				action: 'user/checkToken',
				data: {
					uniIdToken: app.token
				}
			}
		})
		if (result.code === 0) {
			uni.setStorageSync('userinfo', result.userInfo)
			app.userinfo = uni.getStorageSync('userinfo')
			// this.$forceUpdate()
		} else {
			uni.showToast({
				title: result.msg,
				icon: 'none'
			})
			clearUserInfo(app)
		}
	}
}
export function clearUserInfo(app) {
	uni.removeStorageSync('userinfo')
	uni.removeStorageSync('uni_id_token')
	app.token = null
	app.userinfo = null
}
