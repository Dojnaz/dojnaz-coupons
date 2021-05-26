<template>
  <div
    class="card is-clickable column is-one-quarter"
    v-if="!(title == '' || title == undefined)"
    v-on:click="click"
  >
    <div class="card-content">
      <div class="content">
        <b-skeleton v-if="skeleton" height="25px" />
        <h1 v-if="!skeleton" class="title has-text-centered is-4 m-0">
          {{ title }}
        </h1>
      </div>
    </div>
    <div class="card-image">
      <figure class="image is-4by2" v-if="!skeleton">
        <img :src="img" :alt="title" />
      </figure>
      <div class="imgSkel" v-if="skeleton">
        <b-skeleton />
      </div>
    </div>
  </div>
</template>

<script>
import CardWidget from "@/components/CardWidget";
import CardComponent from "@/components/CardComponent";
import Tiles from "@/components/Tiles";

export default {
  name: "CouponCard",
  components: {
    CardWidget,
    CardComponent,
    Tiles,
  },
  props: {
    title: String,
    img: String,
    slug: String,
    skeleton: false,
  },
  methods: {
    click() {
      this.$router.push("/coupons/" + this.slug);
    },
  },
};
</script>

<style scoped>
.card {
  width: 100%;
}
.card-image,
.imgSkel {
  height: 100%;
}
.imgSkel {
  min-height: 250px;
}
</style>

<style>
.b-skeleton,
.b-skeleton-item {
  height: calc(100% - 37px);
}
</style>