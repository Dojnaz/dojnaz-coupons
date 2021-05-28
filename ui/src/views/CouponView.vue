<template>
  <div>
    <tiles>
      <card-component class="tile" id="topCode">
        <p class="title">
          <b-skeleton width="100vw - 48px" height="40px" v-if="!topCode" />
          {{ topCode }}
        </p>
      </card-component>
    </tiles>
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
      topCode: undefined,
    };
  },
  computed: {
    titleStack() {
      return ["", "Coupons", this.$router.currentRoute.params.slug];
    },
  },
  asyncComputed: {
    async topCode() {
      return (await axios("/couponTypes")).data[0].title;
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.title {
  text-align: center;
  width: calc(100vw - 48px);
}
</style>
