<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar :has-right-visible="false"> {{ couponTitle }} </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-widget
          class="tile is-child"
          type="is-success"
          icon="cash"
          :number="$store.state.stats.balance"
          suffix="kr"
          label="Balance"
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
    return {
      couponTitle: undefined,
    };
  },
  computed: {
    titleStack() {
      return ["", "Coupons", this.$router.currentRoute.params.slug];
    },
  },
  mounted() {},
  methods: {},
};
</script>
