<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">
        购物车({{ length }})
      </div>
    </nav-bar>

    <cart-list></cart-list>

    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

import CartList from "@/views/cart/childComps/CartList";
import BottomBar from "@/views/cart/childComps/BottomBar";

import {mapGetters} from 'vuex'


export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    BottomBar
  },
  computed: {
    // ...mapGetters(['cartLength', 'cartList'])
    ...mapGetters({
      length: 'cartLength'
    })

  }
}
</script>

<style scoped>
.cart {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>
