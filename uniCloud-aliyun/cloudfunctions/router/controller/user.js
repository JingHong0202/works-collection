const uniID = require('uni-id')
const Controller = require('uni-cloud-router').Controller
// 必须继承 Controller
module.exports = class UserController extends Controller {
	async login() {
		const {
			username,
			password
		} = this.ctx.data // 获取请求参数
		if (username.length > 11 || username.length < 4 || /[^a-zA-Z0-9]/.test(username)) {
			return {
				message: "用户名格式错误,必须是字母数字且长度4-11"
			};
		}
		if (password.length < 6) {
			return {
				message: "密码不正确,最少6位"
			};
		}
		// 使用 uni-id 登录
		return uniID.login({
			username,
			password,
		})
	}
	async register() {
		const {
			username,
			password
		} = this.ctx.data // 获取请求参数
		if (username.length > 11 || username.length < 4 || /[^a-zA-Z0-9]/.test(username)) {
			return {
				message: "用户名格式错误,必须是字母数字且长度4-11"
			};
		}
		if (password.length < 6) {
			return {
				message: "密码不正确,最少6位"
			};
		}
		// 使用 uni-id 登录
		return uniID.register({
			username,
			password,
		})
	}
	async checkToken() {
		const {
			uniIdToken
		} = this.ctx.data
		const res = await uniID.checkToken(uniIdToken)
		if (res.code === 0) delete res.userInfo.password
		return res
	}
	async setAvatar() {
		const {
			avatar,
			uniIdToken
		} = this.ctx.data
		const payload = await uniID.checkToken(uniIdToken)
		if (payload.code) {
			return payload
		}
		return await uniID.setAvatar({
			uid: payload.uid,
			avatar
		})
	}
	async logout() {
		const {
			uniIdToken
		} = this.ctx.data
		
		return await uniID.logout(uniIdToken)
	}
}
