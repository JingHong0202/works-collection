<template>
	<video class="video"  id='c-video' :src="url" v-if="url" enable-play-gesture  show-center-play-btn autoplay vslide-gesture-in-fullscreen page-gesture
		play-btn-position='center'></video>
</template>
<script>
	export default {
		data() {
			return {url:''};
		},
		onLoad({
			url
		}) {url:''
			this.url = decodeURIComponent(url)
		},
		mounted() {
		}
	}
</script>
<style>
	page {
		background-color: black;
		width: 100%;
		height: 100%;
	}
</style>
<style lang="scss">
	.video {
		width: 100%;
		height: 100%;
	}
</style>
