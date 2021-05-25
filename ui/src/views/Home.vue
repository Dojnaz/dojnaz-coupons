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
        <card class="card is-clickable">
          <div class="card-content">
            <div class="content">
              <h1 class="title has-text-centered is-4 m-0">Free Coca-Cola Energy (2kr)</h1>
            </div>
          </div>
          <div class="card-image">
            <figure class="image is-4by2">
              <img
                src="https://3.kupong.se/uploaded-images/coupon/Coke_Energy_new-480x675-Swedish.jpg"
                alt="Coca-Cola Energy Poster"
              />
            </figure>
          </div>
        </card>
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
  },
  data() {
    return {
      defaultChart: {
        chartData: null,
        extraOptions: chartConfig.chartOptionsMain,
      },
    };
  },
  computed: {
    titleStack() {
      return ["", "Overview"];
    },
  },
  mounted() {
    this.fillChartData();

    this.$buefy.snackbar.open({
      message: "Welcome back",
      queue: false,
    });
  },
  methods: {
    randomChartData(n) {
      const data = [];

      for (let i = 0; i < n; i++) {
        data.push(Math.round(Math.random() * 200));
      }

      return data;
    },
    fillChartData() {
      this.defaultChart.chartData = {
        datasets: [
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.primary,
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: chartConfig.chartColors.default.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.randomChartData(9),
          },
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.info,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.info,
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: chartConfig.chartColors.default.info,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.randomChartData(9),
          },
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.danger,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.danger,
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: chartConfig.chartColors.default.danger,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.randomChartData(9),
          },
        ],
        labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09"],
      };
    },
  },
};
</script>
