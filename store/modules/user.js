export default {
	namespaced: true,
	state: {
		info: {},
		token: null
	},
	actions: {
		async clear({commit}) {
			commit('CHANGE_TOKEN', null)
			commit('CHANGE_USER_INFO', {})
			uni.removeStorageSync('uni_id_token')
		},
		async INIT({
			commit,
			state
		}) {
			let token = uni.getStorageSync('uni_id_token')
			if (token) {
				let {
					result
				} = await uniCloud.callFunction({
					name: 'router',
					data: {
						action: 'user/checkToken',
						data: {
							uniIdToken: token
						}
					}
				})
				if (result.code === 0) {
					// uni.setStorageSync('userinfo', result.userInfo)
					commit('CHANGE_TOKEN', token)
					commit('CHANGE_USER_INFO', result.userInfo)
				} else {
					uni.showToast({
						title: result.msg,
						icon: 'none'
					})
					commit('CHANGE_TOKEN', null)
					commit('CHANGE_USER_INFO', {})
					uni.removeStorageSync('uni_id_token')
				}
			}
		}
	},
	mutations: {
		CHANGE_TOKEN(state, val) {
			state.token = val
		},
		CHANGE_USER_INFO(state, val) {
			state.info = val
		}
	},
	// getters: {
	// }
}
