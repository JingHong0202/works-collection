(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-index"],{"0f8a":function(t,a,e){var n=e("24fb");a=n(!1),a.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.content[data-v-48afc321]{position:absolute;left:0;right:0;top:0;bottom:0;overflow:hidden}.tabbar[data-v-48afc321]{width:100%;position:fixed;bottom:0;z-index:10;height:%?100?%;background-color:hsla(0,0%,100%,.08);border-top:2px solid hsla(0,0%,100%,.1);display:-webkit-box;display:flex}.tabbar .tabbar-item[data-v-48afc321]{-webkit-box-flex:1;flex:1;height:100%;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;display:-webkit-box;display:flex}.tabbar .tabbar-item > .add-icon[data-v-48afc321]{width:%?70?%;height:%?70?%;opacity:.8}.tabbar .tabbar-item > .have-login[data-v-48afc321]{border-radius:100%}.tabbar .tabbar-item .active[data-v-48afc321]{color:#fff!important;opacity:1!important;font-weight:700!important}.tabbar .tabbar-item > .tabbar-text[data-v-48afc321]{color:#fff;font-size:%?30?%;height:100%;font-weight:100;display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;opacity:.7}',""]),t.exports=a},4399:function(t,a,e){"use strict";var n=e("7ce8"),r=e.n(n);r.a},6858:function(t,a,e){"use strict";e.r(a);var n=e("dd27"),r=e.n(n);for(var i in n)"default"!==i&&function(t){e.d(a,t,(function(){return n[t]}))}(i);a["default"]=r.a},"6df0":function(t,a,e){var n=e("7c44");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var r=e("4f06").default;r("244dbcda",n,!0,{sourceMap:!1,shadowMode:!1})},"775d":function(t,a,e){"use strict";(function(t){var n=e("4ea4");e("7db0"),e("4e82"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var r=n(e("5530"));e("96cf");var i=n(e("1da1")),s=n(e("4103")),o=n(e("949c")),c=e("2f62"),u=t.database(),d={components:{customSwiper:s.default,rank:o.default},data:function(){return{list:[],activeIndex:0,star_rank:[]}},onLoad:function(){var t=this;return(0,i.default)(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return uni.showLoading({title:"初始化中...",mask:!0}),a.next=3,t.$store.dispatch("user/INIT");case 3:return a.next=5,t.init();case 5:uni.hideLoading(),uni.showModal({showCancel:!1,title:"提示: 长按预览，点击跳转链接"});case 7:case"end":return a.stop()}}),a)})))()},mounted:function(){window.addEventListener("mousewheel",this.handleScroll,!1)},computed:(0,r.default)({},(0,c.mapState)("user",{userinfo:function(t){return t.info},token:function(t){return t.token}})),methods:{toRank:function(){this.activeIndex=1},more:function(){var t=this;return(0,i.default)(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:t.token?uni.navigateTo({url:"/pages/my/my"}):uni.showModal({title:"该操作需要先登录,是否登录?",success:function(){var t=(0,i.default)(regeneratorRuntime.mark((function t(a){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e=a.confirm,e){t.next=3;break}return t.abrupt("return");case 3:uni.navigateTo({url:"/pages/login/login"});case 4:case"end":return t.stop()}}),t)})));function a(a){return t.apply(this,arguments)}return a}()});case 1:case"end":return a.stop()}}),a)})))()},init:function(){var t=this;return(0,i.default)(regeneratorRuntime.mark((function a(){var e,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,u.collection("works-collection,uni-id-users").where("status==1").field("works,desc,star,user_id,link,user_id{username,avatar}").get();case 3:e=a.sent,n=e.result.data,t.list=n.sort((function(){return.5-Math.random()})),t.list[0].url=t.list[0].works.url,a.next=12;break;case 9:a.prev=9,a.t0=a["catch"](0),uni.hideLoading();case 12:case"end":return a.stop()}}),a,null,[[0,9]])})))()},star:function(a){var e=this;return(0,i.default)(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(r=e.list.find((function(t){return t._id===a._id})),!r.star_interval){n.next=3;break}return n.abrupt("return",uni.showToast({title:"点赞太频繁,请稍后10秒再试",position:"bottom",icon:"none"}));case 3:return r.star_interval=!0,setTimeout((function(){r.star_interval=!1}),1e4),n.next=7,t.callFunction({name:"star",data:{_id:r._id}});case 7:return n.abrupt("return",++r.star);case 8:case"end":return n.stop()}}),n)})))()},change:function(t){var a=this;return(0,i.default)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:n=a.list[t],a.$set(n,"url",n.works.url);case 2:case"end":return e.stop()}}),e)})))()}}};a.default=d}).call(this,e("a9ff")["default"])},"7a84":function(t,a,e){"use strict";e.d(a,"b",(function(){return r})),e.d(a,"c",(function(){return i})),e.d(a,"a",(function(){return n}));var n={customSearch:e("9bda").default},r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-uni-view",{staticClass:"rank"},[e("v-uni-view",{staticClass:"nav"},[e("v-uni-text",{staticStyle:{color:"#fff","font-weight":"bold","font-size":"40rpx"}},[t._v("排行")])],1),e("custom-search",{attrs:{disabled:!0},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.toSearch.apply(void 0,arguments)}}}),e("v-uni-view",{staticClass:"segmentation"},[e("v-uni-text",[t._v("点赞排名前十的作品")])],1),e("v-uni-swiper",{staticClass:"works-rank",attrs:{circular:!0,"display-multiple-items":3,autoplay:!0}},t._l(t.recommend,(function(a,n){return e("v-uni-swiper-item",{key:a._id,staticClass:"works-swiper-item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toPreview(a)}}},[e("v-uni-image",{staticClass:"works-swiper-item-image",attrs:{src:"image"===a.works.fileType?a.url:a.url+"?x-oss-process=video/snapshot,t_1000,m_fast",mode:"aspectFit"}})],1)})),1),e("v-uni-view",{staticClass:"segmentation"},[e("v-uni-text",[t._v("点赞排名前三的用户")])],1),e("v-uni-view",{staticClass:"star-rank column"},[e("v-uni-view",{staticClass:"column star-1",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.toDetail(t.star_rank[0]&&t.star_rank[0].user_id[0]._id)}}},[e("v-uni-image",{staticClass:"crown",attrs:{src:"/static/huangguan.png",mode:"aspectFit"}}),e("v-uni-image",{staticClass:"avatar",attrs:{src:t.star_rank[0]&&t.star_rank[0].user_id[0].avatar||"/static/avatar.png",mode:"aspectFill"}}),e("v-uni-text",{staticClass:"name"},[t._v(t._s(t.star_rank[0]&&t.star_rank[0].user_id[0].username||""))]),e("v-uni-text",{staticClass:"star-num"},[t._v(t._s(t.star_rank[0]&&t.star_rank[0].star||0)+"赞")])],1),e("v-uni-view",{staticClass:"star-23-box"},[e("v-uni-view",{staticClass:"column star-2",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.toDetail(t.star_rank[1]&&t.star_rank[1].user_id[0]._id)}}},[e("v-uni-image",{staticClass:"crown",attrs:{src:"/static/huangguan3-copy-copy.png",mode:"aspectFit"}}),e("v-uni-image",{staticClass:"avatar",attrs:{src:t.star_rank[1]&&t.star_rank[1].user_id[0].avatar||"/static/avatar.png",mode:"aspectFill"}}),e("v-uni-text",{staticClass:"name"},[t._v(t._s(t.star_rank[1]&&t.star_rank[1].user_id[0].username||""))]),e("v-uni-text",{staticClass:"star-num"},[t._v(t._s(t.star_rank[1]&&t.star_rank[1].star||0)+"赞")])],1),e("v-uni-view",{staticClass:"column star-3",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.toDetail(t.star_rank[2]&&t.star_rank[2].user_id[0]._id)}}},[e("v-uni-image",{staticClass:"crown",attrs:{src:"/static/huangguan_1.png",mode:"aspectFit"}}),e("v-uni-image",{staticClass:"avatar",attrs:{src:t.star_rank[2]&&t.star_rank[2].user_id[0].avatar||"/static/avatar.png",mode:"aspectFill"}}),e("v-uni-text",{staticClass:"name"},[t._v(t._s(t.star_rank[2]&&t.star_rank[2].user_id[0].username||""))]),e("v-uni-text",{staticClass:"star-num"},[t._v(t._s(t.star_rank[2]&&t.star_rank[2].star||0)+"赞")])],1)],1)],1),e("v-uni-view",{staticClass:"segmentation-reverse"},[e("v-uni-text",{on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.toRankDetail.apply(void 0,arguments)}}},[t._v("查看更多 >")])],1)],1)},i=[]},"7c44":function(t,a,e){var n=e("24fb");a=n(!1),a.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */@-webkit-keyframes in-data-v-9c24b6a4{from{opacity:.5}to{opacity:1}}@keyframes in-data-v-9c24b6a4{from{opacity:.5}to{opacity:1}}.rank[data-v-9c24b6a4]{-webkit-animation:in-data-v-9c24b6a4 .5s;animation:in-data-v-9c24b6a4 .5s;background:-webkit-linear-gradient(top,#536976,#292e49);background:linear-gradient(180deg,#536976,#292e49);position:absolute;left:0;right:0;top:0;bottom:0;overflow:auto;padding-bottom:%?150?%;animation:in-data-v-9c24b6a4 .5s}.rank .works-swiper-item-image[data-v-9c24b6a4]{box-sizing:border-box;width:100%;height:100%;padding:%?40?%}.rank .segmentation[data-v-9c24b6a4]{margin-top:%?40?%;padding:0 %?25?%;color:#fff;display:-webkit-box;display:flex;font-size:%?29?%;-webkit-box-pack:justify;justify-content:space-between;background:-webkit-linear-gradient(left,#ff6b6a %?200?%,transparent %?500?%);background:linear-gradient(90deg,#ff6b6a %?200?%,transparent %?500?%);line-height:%?80?%}.rank .segmentation-reverse[data-v-9c24b6a4]{margin-top:%?40?%;padding:0 %?25?%;color:#fff;display:-webkit-box;display:flex;font-size:%?29?%;-webkit-box-pack:end;justify-content:flex-end;line-height:%?80?%}.rank .nav[data-v-9c24b6a4]{width:100%;height:50px;display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:end;align-items:flex-end}.rank .column[data-v-9c24b6a4]{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.rank .star-rank[data-v-9c24b6a4]{width:100%;display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;width:100%;margin-top:%?40?%}.rank .star-rank .crown[data-v-9c24b6a4]{width:%?80?%;height:%?80?%}.rank .star-rank .avatar[data-v-9c24b6a4]{width:%?90?%;height:%?90?%;border-radius:100%;margin-top:%?10?%}.rank .star-rank .name[data-v-9c24b6a4]{font-size:%?30?%;margin-top:%?20?%;font-weight:400;color:#fff}.rank .star-rank .star-num[data-v-9c24b6a4]{font-size:%?28?%;font-weight:100;color:#fff}.rank .star-rank .star-23-box[data-v-9c24b6a4]{display:-webkit-box;display:flex;width:100%;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center}.rank .star-rank .star-1[data-v-9c24b6a4]{margin-bottom:%?20?%}.rank .star-rank .star-2[data-v-9c24b6a4]{width:50%}.rank .star-rank .star-3[data-v-9c24b6a4]{width:50%}.rank[data-v-9c24b6a4]:after{content:"";display:block;background-image:-webkit-linear-gradient(top,transparent,rgba(0,0,0,.4));background-image:linear-gradient(180deg,transparent,rgba(0,0,0,.4));position:fixed;bottom:0;left:0;right:0;height:%?100?%}',""]),t.exports=a},"7ce8":function(t,a,e){var n=e("0f8a");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var r=e("4f06").default;r("04edde67",n,!0,{sourceMap:!1,shadowMode:!1})},"949c":function(t,a,e){"use strict";e.r(a);var n=e("7a84"),r=e("6858");for(var i in r)"default"!==i&&function(t){e.d(a,t,(function(){return r[t]}))}(i);e("d81f");var s,o=e("f0c5"),c=Object(o["a"])(r["default"],n["b"],n["c"],!1,null,"9c24b6a4",null,!1,n["a"],s);a["default"]=c.exports},"9d0a":function(t,a,e){"use strict";e.r(a);var n=e("c2ae"),r=e("d23a");for(var i in r)"default"!==i&&function(t){e.d(a,t,(function(){return r[t]}))}(i);e("4399");var s,o=e("f0c5"),c=Object(o["a"])(r["default"],n["b"],n["c"],!1,null,"48afc321",null,!1,n["a"],s);a["default"]=c.exports},c2ae:function(t,a,e){"use strict";e.d(a,"b",(function(){return r})),e.d(a,"c",(function(){return i})),e.d(a,"a",(function(){return n}));var n={customSwiper:e("4103").default},r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-uni-view",{staticClass:"content"},[t.activeIndex?t._e():e("custom-swiper",{attrs:{list:t.list},on:{change:function(a){arguments[0]=a=t.$handleEvent(a),t.change.apply(void 0,arguments)},star:function(a){arguments[0]=a=t.$handleEvent(a),t.star.apply(void 0,arguments)}}}),1===t.activeIndex?e("rank"):t._e(),e("v-uni-view",{staticClass:"tabbar"},[e("v-uni-view",{staticClass:"tabbar-item",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.activeIndex=0}}},[e("v-uni-text",{staticClass:"tabbar-text",class:{active:!t.activeIndex}},[t._v("发现")])],1),e("v-uni-view",{staticClass:"tabbar-item",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.more.apply(void 0,arguments)}}},[e("v-uni-image",{staticClass:"add-icon",class:{"have-login":t.userinfo},attrs:{src:t.token?t.userinfo.avatar||"/static/avatar.png":"/static/add.png",mode:"aspectFill"}})],1),e("v-uni-view",{staticClass:"tabbar-item",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.activeIndex=1}}},[e("v-uni-text",{staticClass:"tabbar-text",class:{active:1===t.activeIndex}},[t._v("排行")])],1)],1)],1)},i=[]},d23a:function(t,a,e){"use strict";e.r(a);var n=e("775d"),r=e.n(n);for(var i in n)"default"!==i&&function(t){e.d(a,t,(function(){return n[t]}))}(i);a["default"]=r.a},d81f:function(t,a,e){"use strict";var n=e("6df0"),r=e.n(n);r.a},dd27:function(t,a,e){"use strict";(function(t){var n=e("4ea4");e("d81d"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var r=n(e("2909")),i=n(e("5530"));e("96cf");var s=n(e("1da1")),o=n(e("9bda")),c=t.database(),u={components:{customSearch:o.default},data:function(){return{star_rank:[],recommend:[]}},methods:{toSearch:function(){uni.navigateTo({url:"/pages/search/search"})},toPreview:function(t){t&&uni.navigateTo({url:"/pages/preview/preview?index="+t._id+"&data="+encodeURIComponent(JSON.stringify(this.recommend))})},toDetail:function(t){t&&uni.navigateTo({url:"/pages/detail/detail?id="+t})},toRankDetail:function(){uni.navigateTo({url:"/pages/rank-detail/rank-detail"})}},created:function(){var t=this;return(0,s.default)(regeneratorRuntime.mark((function a(){var e,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(!getApp().globalData.star_rank){a.next=4;break}return t.star_rank=getApp().globalData.star_rank,t.recommend=getApp().globalData.recommend,a.abrupt("return");case 4:return uni.showLoading({mask:!0,title:"加载中..."}),a.next=7,c.collection("works-collection,uni-id-users").where("status == 1").field("works,desc,star,user_id,link,user_id{username,avatar}").orderBy("star desc").limit(10).get();case 7:return e=a.sent.result.data,t.recommend=e.map((function(t){return(0,i.default)((0,i.default)({},t),{},{url:t.works.url})})),a.next=11,c.collection("works-collection,uni-id-users").where("status == 1").field("works,desc,star,user_id,link,user_id{username,avatar}").groupBy("user_id").groupField("sum(star) as star").orderBy("star desc").limit(3).get();case 11:n=a.sent.result.data,t.star_rank=n,getApp().globalData.star_rank=(0,r.default)(n),getApp().globalData.recommend=(0,r.default)(t.recommend),uni.hideLoading();case 16:case"end":return a.stop()}}),a)})))()}};a.default=u}).call(this,e("a9ff")["default"])}}]);