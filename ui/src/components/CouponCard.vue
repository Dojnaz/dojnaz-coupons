<template>
  <div class="card is-clickable column is-one-quarter">
    <div class="card-content">
      <div class="content">
        <b-skeleton v-if="skeleton" height="25px"/>
        <h1 v-if="!skeleton" class="title has-text-centered is-4 m-0">
          {{ title }}
        </h1>
      </div>
    </div>
    <div class="card-image">
      <figure class="image is-4by2" v-if="!skeleton">
        <img :src="img" :alt="title" />
      </figure>
      <b-skeleton class="imgSkel" v-if="skeleton"/>
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
};
</script>

<style scoped>
.card {
  width: 100%;
  min-height: 350px;
}
.card-image,.imgSkel {
  height: 100%;
}
</style>

<style>
.b-skeleton,.b-skeleton-item {
  height: 100%;
}
</style>