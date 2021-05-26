<template>
  <div>
    <hero-bar :has-right-visible="false"> Authentication </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-component
          title="Login"
          icon="login-variant"
          class="tile is-child"
        >
          <b-field label="Email/Phone Number">
            <b-input type="username" />
          </b-field>
          <b-field label="Password">
            <b-input type="password" />
          </b-field>
          <button
            type="submit"
            class="button is-primary"
            :class="{ 'is-loading': isLoading }"
          >
            Submit
          </button>
        </card-component>
        <card-component
          title="Register"
          icon="account-plus"
          class="tile is-child"
        >
          <b-field label="Email">
            <b-input type="email" />
          </b-field>
          <b-field label="Password">
            <b-input type="password" />
          </b-field>
          <b-field label="Repeat Password">
            <b-input type="password" />
          </b-field>
          <button
            type="submit"
            class="button is-primary"
            :class="{ 'is-loading': isLoading }"
          >
            Submit
          </button>
        </card-component>
        <card-component
          title="Claim Account"
          icon="hand-right"
          class="tile is-child"
        >
          <b-field label="Phone Number">
            <p class="control">
              <span class="button is-static">+46</span>
            </p>
            <b-input type="tel" />
          </b-field>
          <button
            type="submit"
            class="button is-primary"
            :class="{ 'is-loading': isLoading }"
          >
            Submit
          </button>
        </card-component>
      </tiles>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CardComponent from "@/components/CardComponent";
import TitleBar from "@/components/TitleBar";
import HeroBar from "@/components/HeroBar";
import Tiles from "@/components/Tiles";

export default {
  name: "Profile",
  components: {
    Tiles,
    HeroBar,
    TitleBar,
    CardComponent,
  },
  computed: {
    titleStack() {
      return ["Authentication"];
    },
    ...mapState(["userName", "userEmail"]),
  },
};
</script>
