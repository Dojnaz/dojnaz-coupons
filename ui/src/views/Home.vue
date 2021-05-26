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

      <tiles class="is-centered">
        <CouponCard
          title="Free Coca-Cola Energy (2kr)"
          img="https://3.kupong.se/uploaded-images/coupon/Coke_Energy_new-480x675-Swedish.jpg"
        />
      </tiles>

      <!--<card-component
        title="Performance"
        @header-icon-click="fillChartData"
        icon="finance"
        header-icon="reload"
      >
        <div v-if="defaultChart.chartData" class="chart-area">
          <line-chart
            style="height: 100%"
            ref="bigChart"
            chart-id="big-line-chart"
            :chart-data="defaultChart.chartData"
            :extra-options="defaultChart.extraOptions"
          >
          </line-chart>
        </div>
      </card-component>-->

      <!--<card-component title="Clients" class="has-table has-mobile-sort-spaced">
        <clients-table-sample :data-url="`${$router.options.base}data-sources/clients.json`"/>
      </card-component>-->
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
  },
  methods: {},
};
</script>
