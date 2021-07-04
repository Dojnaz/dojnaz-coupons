<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar :has-right-visible="false">
      Dashboard
      <router-link slot="right" to="/" class="button">asd</router-link>
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-widget
          class="tile is-child"
          type="is-danger"
          icon="ticket-percent"
          :number="$store.state.stats.unused"
          label="Unused Coupons"
        />
        <card-widget
          class="tile is-child"
          type="is-info"
          icon="ticket-percent"
          :number="$store.state.stats.claimed"
          label="Claimed Coupons"
        />
        <card-widget
          class="tile is-child"
          type="is-success"
          icon="cash"
          :number="$store.state.stats.balance"
          suffix="kr"
          label="Balance"
        />
      </tiles>

      <tiles class="is-centered columns" v-if="$store.state.couponTypes.length == 0">
        <template>
          <CouponCard v-for="index in 4" :key="index" :skeleton="true" title="Loading..." />
        </template>
      </tiles>
      <tiles class="is-centered columns">
        <CouponCard
          v-for="type in $store.state.couponTypes"
          :key="type.slug"
          :slug="type.slug"
          :title="type.title"
          :img="type.img"
        />
      </tiles>
    </section>
  </div>
</template>

<script>
import TitleBar from "@/components/TitleBar";
import HeroBar from "@/components/HeroBar";
import Tiles from "@/components/Tiles";
import CardWidget from "@/components/CardWidget";
import CardComponent from "@/components/CardComponent";
import CouponCard from "@/components/CouponCard";

export default {
  name: "home",
  components: {
    CardComponent,
    CardWidget,
    Tiles,
    HeroBar,
    TitleBar,
    CouponCard,
  },
  data() {
    return {};
  },
  computed: {
    titleStack() {
      return ["", "Overview"];
    },
  },
  mounted() {
    this.$store.dispatch("getCouponTypes");
  },
  methods: {},
};
</script>
