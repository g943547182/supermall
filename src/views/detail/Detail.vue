<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";

import Scroll from "@/components/common/scroll/Scroll";
import GoodsList from "@/components/content/goods/GoodsList";

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "@/network/detail";
import {itemListenerMixin, backTopMixin} from "@/common/mixin";
import {debounce} from "@/common/utils";


export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    // Toast
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemTopY: null,
      currentIndex: 0,
      // message: '',
      // show: false
    }
  },
  created() {
    this.iid = this.$route.params.iid

    // 请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.result

      this.topImages = data.itemInfo.topImages
      //获得商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      //创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)

      //保存商品的详情数据
      this.detailInfo = data.detailInfo

      //获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      //取出评论的信息
      console.log(data);
      if (data.rate.cRate != 0) {
        this.commentInfo = data.rate.list
        // console.log(data.rate.cRate);
      }
    })

    // 请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })

    this.getThemTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)

      console.log(this.themeTopYs);
    }, 200)
  },
  methods: {
    // 监听详情的图片加载完成
    imageLoad() {
      this.refresh()
      this.getThemTopY()
    },
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },
    contentScroll(position) {
      const positionY = -position.y

      let length = this.themeTopYs.length
      for (let i = 0; i < length - 1; i++) {
        // if (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) {
        //
        // }
        // if (this.currentIndex !== i && ((i < length - 1 && positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) ||
        //   (i === length - 1 && positionY > this.themeTopYs[i]))) {
        //   this.currentIndex = i
        //   console.log(this.currentIndex);
        //   this.$refs.nav.currentIndex = this.currentIndex
        // }
        if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i
          console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex
        }

      }

      // 是否显示回到顶部
      this.isShowBackTop = (-position.y) > 1000

    },
    addToCart() {
      console.log('点击添加到购物车');
      //获取购物车展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.newPrice
      product.iid = this.iid

      //将商品加入购物车
      // this.$store.commit('addCart', product)
      this.$store.dispatch('addCart', product).then(res => {
        // this.show = true
        // this.message = res
        //
        // setTimeout(() => {
        //   this.show = false
        //   this.message = ''
        // }, 1000)
        // console.log(res);
        this.$toast.show(res, 1000)
      })
    }
  },
  mounted() {
  },
  updated() {

  },
  destroyed() {
    // 取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.content {
  height: calc(100% - 44px);
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>
