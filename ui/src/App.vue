<template>
  <div id="app" class="vld-parent">
    <loading
      :active="$store.state.isLoading"
      :can-cancel="false"
      :is-full-page="true"
    />
    <template
      v-if="
        $router.currentRoute.path != '/auth' &&
        $router.currentRoute.name != 'view'
      "
    >
      <nav-bar />
      <aside-menu :menu="menu" @menu-click="menuClick" />
    </template>
    <router-view />
    <footer-bar v-if="$router.currentRoute.name != 'view'" />
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar";
import AsideMenu from "@/components/AsideMenu";
import FooterBar from "@/components/FooterBar";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "home",
  components: {
    FooterBar,
    AsideMenu,
    NavBar,
    Loading,
  },
  mounted() {
    window.$buefy = this.$buefy;
  },
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    menu() {
      return [
        "General",
        [
          {
            to: "/",
            icon: "desktop-mac",
            label: "Dashboard",
          },
        ],
        "Examples",
        [
          {
            action: "dark-mode-toggle",
            label: "Dark / White",
            icon: "weather-night",
          },
          {
            to: "/tables",
            label: "Tables",
            icon: "table",
            updateMark: true,
          },
          {
            to: "/forms",
            label: "Forms",
            icon: "square-edit-outline",
          },
          {
            to: "/profile",
            label: "Profile",
            icon: "account-circle",
          },
          {
            label: "Submenus",
            subLabel: "Submenus Example",
            icon: "view-list",
            menu: [
              {
                href: "#void",
                label: "Sub-item One",
              },
              {
                href: "#void",
                label: "Sub-item Two",
              },
            ],
          },
        ],
      ];
    },
  },
  created() {
    /*this.$store.commit("user", {
      name: "Victor Bäck",
      email: "vb@dojnaz.net",
      avatar:
        "https://cdn.discordapp.com/avatars/706902380637192212/360f70d04f20b1d4775b95f7324e3752.png?size=256",
    });*/
  },
  methods: {
    menuClick(item) {
      if (item.action && item.action === "dark-mode-toggle") {
        this.$store.commit("darkModeToggle");
      }
    },
  },
};
</script>

<style>
html {
  overflow-y: auto !important;
}
</style>
