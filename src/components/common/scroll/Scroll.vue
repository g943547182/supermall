<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })

    //2.监听滚动的位置
    this.scroll.on('scroll', (position) => {
      this.$emit('scroll', position)
    })

    //3.监听滚动的位置
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }

  },
  methods: {
    scrollTo(x, y, time) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    refresh() {
      console.log('防抖动加载');
      this.scroll && this.scroll.refresh()
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    }
  }
}
</script>

<style scoped>

</style>
