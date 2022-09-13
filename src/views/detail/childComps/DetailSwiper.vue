<template>
  <div class="detail-swiper">
    <swiper>
      <swiper-item v-for="item in topImages">
        <a :href="item">
          <div class="swiper-img">
            <img :src="item" alt="">
          </div>
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from "@/components/common/swiper";

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.swiper-img{
  height: 300px;
  overflow-y: hidden;
}
</style>
