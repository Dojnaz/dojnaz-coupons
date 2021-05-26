<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar :has-right-visible="false"> Dashboard </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-widget
          class="tile is-child"
          type="is-danger"
          icon="ticket-percent"
          :number="512"
          label="Unused Coupons"
        />
        <card-widget
          class="tile is-child"
          type="is-info"
          icon="ticket-percent"
          :number="7770"
          label="Claimed Coupons"
        />
        <card-widget
          class="tile is-child"
          type="is-success"
          icon="cash"
          :number="256"
          suffix="kr"
          label="Balance"
        />
      </tiles>

      <tiles class="is-centered columns">
        <CouponCard
          :skeleton="true"
        />
        <CouponCard v-for="type in $store.state.couponTypes" :key="type.slug" :slug="type.slug" :title="type.title" :img="type.img" />
      </tiles>
    </section>
  </div>
</template>

<script>
import * as chartConfig from "@/components/Charts/chart.config";
import TitleBar from "@/components/TitleBar";
import HeroBar from "@/components/HeroBar";
import Tiles from "@/components/Tiles";
import CardWidget from "@/components/CardWidget";
import CardComponent from "@/components/CardComponent";
import LineChart from "@/components/Charts/LineChart";
import ClientsTableSample from "@/components/ClientsTableSample";
import CouponCard from "@/components/CouponCard";

export default {
  name: "home",
  components: {
    ClientsTableSample,
    LineChart,
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
    this.$buefy.snackbar.open({
      message: "Welcome back",
      queue: false
    });
    this.$store.dispatch("getCouponTypes")
  },
  methods: {},
};
</script>
