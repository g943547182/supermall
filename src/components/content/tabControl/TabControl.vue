<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" class="tab-bar-item"
         :class="{active: index===currentIndex}" @click="itemClick(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style scoped>

.tab-control {
  display: flex;
  font-size: 16px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}

.tab-bar-item {
  flex: 1;

}

.active span {
  color: var(--color-high-text);
  border-bottom: 3px solid var(--color-tint);
}

.tab-bar-item span {
  padding: 10px;
}
</style>
