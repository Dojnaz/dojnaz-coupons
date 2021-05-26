<template>
  <div class="card is-clickable">
    <div class="card-content">
      <div class="content">
        <h1 class="title has-text-centered is-4 m-0">
          {{ title }}
        </h1>
      </div>
    </div>
    <div class="card-image">
      <figure class="image is-4by2">
        <img :src="img" alt="Coca-Cola Energy Poster" />
      </figure>
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
    Tiles
  },
  props: {
    title: String,
    img: String,
    slug: String,
  },
};
</script>

<style>
</style>