<template>
  <div>
    <hero-bar :has-right-visible="false">Authentication</hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-component title="Login" icon="login-variant" class="tile is-child">
          <b-message
            title="Error!"
            type="is-danger"
            aria-close-label="Close message"
            v-model="loginData.showError"
          >{{ loginData.errorMessage }}</b-message>
          <p class="loginSwitch" @click="toggleUsernameType">
            <a>
              Use
              <template v-if="!loginData.isNumber">phone number</template>
              <template v-else>email</template>
              instead
            </a>
          </p>
          <b-field label="Phone Number" key="loginPN" v-if="loginData.isNumber">
            <!--🇦🇧🇨🇩🇪🇫🇬🇭🇯🇰🇱🇲🇳🇴🇵🇶🇷🇸🇹🇺🇻🇼🇽🇾🇿-->
            <b-select v-model="loginData.country" placeholder="Country">
              <option value="US">+1 🇺🇸</option>
              <option value="CA">+1 🇨🇦</option>
              <option value="GB">+44 🇬🇧</option>
              <option value="SE">+46 🇸🇪</option>
              <option value="DE">+49 🇩🇪</option>
            </b-select>
            <b-input type="tel" v-model="loginData.username" @blur="loginFormatNumber" />
          </b-field>
          <b-field label="Email" key="loginEM" v-else>
            <b-input name="Username" v-model="loginData.username" />
          </b-field>
          <b-field label="Password">
            <b-input type="password" v-model="loginData.password" />
          </b-field>
          <button
            type="submit"
            class="button is-primary"
            :class="{ 'is-loading': isLoading }"
            @click="login"
          >Submit</button>
        </card-component>
        <card-component title="Register" icon="account-plus" class="tile is-child">
          <b-message
            title="Error!"
            type="is-danger"
            aria-close-label="Close message"
            v-model="registerData.showError"
          >{{ registerData.errorMessage }}</b-message>
          <b-field label="Email">
            <b-input type="email" v-model="registerData.email" disabled />
          </b-field>
          <b-field label="Password">
            <b-input type="password" v-model="registerData.password" disabled />
          </b-field>
          <b-field label="Repeat Password">
            <b-input type="password" v-model="registerData.repeatPassword" disabled />
          </b-field>
          <button
            type="submit"
            class="button is-primary"
            :class="{ 'is-loading': isLoading }"
            @click="register"
          >Submit</button>
        </card-component>
        <card-component title="Claim Account" icon="hand-right" class="tile is-child">
          <b-message
            title="Error!"
            type="is-danger"
            aria-close-label="Close message"
            v-model="claimData.showError"
          >{{ claimData.errorMessage }}</b-message>
          <b-field label="Phone Number">
            <!--<p class="control">
              <span class="button is-static">+46</span>
            </p>-->
            <!--🇦🇧🇨🇩🇪🇫🇬🇭🇯🇰🇱🇲🇳🇴🇵🇶🇷🇸🇹🇺🇻🇼🇽🇾🇿-->
            <b-select v-model="claimData.country" placeholder="Country">
              <option value="US">+1 🇺🇸</option>
              <option value="CA">+1 🇨🇦</option>
              <option value="GB">+44 🇬🇧</option>
              <option value="SE">+46 🇸🇪</option>
              <option value="DE">+49 🇩🇪</option>
            </b-select>
            <b-input type="tel" v-model="claimData.number" @blur="claimFormatNumber" />
          </b-field>
          <button
            type="submit"
            class="button is-primary"
            :class="{ 'is-loading': isLoading }"
            @click="claim"
          >Submit</button>
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
import TokenClaimModal from "@/components/TokenClaimModal";

import parsePhoneNumber from "libphonenumber-js";
import Tables from "./Tables.vue";

window.parsePhoneNumber = parsePhoneNumber;

export default {
  name: "Auth",
  components: {
    Tiles,
    HeroBar,
    TitleBar,
    CardComponent,
    Tables,
  },
  data() {
    return {
      isLoading: false,
      loginData: {
        isNumber: true,
        username: "",
        password: "",
        errorMessage: "",
        showError: false,
        country: "SE",
      },
      registerData: {
        email: "",
        password: "",
        repeatPassword: "",
        errorMessage: "",
        showError: false,
      },
      claimData: {
        number: "",
        errorMessage: "",
        showError: false,
        country: "SE",
      },
    };
  },
  methods: {
    login() {
      this.isLoading = true;
      this.loginData.showError = false;
      let username = this.username;
      if (this.loginData.isNumber) {
        const phone = parsePhoneNumber(
          this.loginData.username,
          this.loginData.country
        );
        if (!phone) {
          this.isLoading = false;
          this.loginData.showError = true;
          this.loginData.errorMessage = "Invalid phone number";
          return;
        }
        username = phone.number;
      }
      axios
        .post("/auth/login", {
          username,
          password: this.loginData.password,
        })
        .then(({ data }) => {
          if (!data.token) {
            this.loginData.showError = true;
            this.loginData.errorMessage = "An unknown error has occured";
            return;
          }
          $store.commit("setToken", data.token);
          $router.push("/");
        })
        .catch((err) => {
          this.loginData.showError = true;
          this.loginData.errorMessage = err.response.data.message;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    register() {
      this.isLoading = true;
      this.registerData.showError = false;
    },
    claim() {
      this.isLoading = true;
      this.claimData.showError = false;
      const phone = parsePhoneNumber(
        this.claimData.number,
        this.claimData.country
      );
      if (!phone) {
        this.isLoading = false;
        this.claimData.showError = true;
        this.claimData.errorMessage = "Invalid phone number";
        return;
      }
      axios("/auth/claim/" + phone.number)
        .then(({ data }) => {
          this.isLoading = false;
          $store.commit("setClaimToken", data.token);
          this.$buefy.modal.open({
            parent: this,
            component: TokenClaimModal,
            hasModalCard: true,
            trapFocus: true,
          });
        })
        .catch((err) => {
          this.isLoading = false;
          this.claimData.showError = true;
          this.claimData.errorMessage = err.response.data.message;
        });
    },

    claimFormatNumber() {
      const phone = parsePhoneNumber(this.claimData.number, "SE");
      if (!phone) return;
      this.claimData.number = phone.nationalNumber;
    },
    loginFormatNumber() {
      const phone = parsePhoneNumber(this.loginData.username, "SE");
      if (!phone) return;
      this.loginData.username = phone.nationalNumber;
    },
    toggleUsernameType() {
      this.loginData.isNumber = !this.loginData.isNumber;
    },
  },
  computed: {
    titleStack() {
      return ["Authentication"];
    },
    ...mapState(["userName", "userEmail"]),
  },
};
</script>

<style scoped>
.loginSwitch {
  float: right;
  text-align: center;
}
</style>
