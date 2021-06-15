<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Claim your account</p>
      <button type="button" class="delete" @click="$emit('close')" />
    </header>
    <template v-if="!verified">
      <section class="modal-card-body">
        <b-message
          title="Error!"
          type="is-danger"
          aria-close-label="Close message"
          v-model="showError"
        >{{ errorMessage }}</b-message>
        <p>
          <b>
            You have been sent an 6-digit code by SMS.
            <br />The token is valid for 5 minutes
          </b>
        </p>
        <b-field label="Token" key="token">
          <b-input type="number" v-model="token" placeholder="SMS Token" required></b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <b-button label="Close" @click="$emit('close')" />
        <b-button label="Claim" :loading="loading" @click="claim" type="is-primary" />
      </footer>
    </template>
    <template v-else>
      <section class="modal-card-body">
        <b-message
          title="Error!"
          type="is-danger"
          aria-close-label="Close message"
          v-model="showError"
        >{{ errorMessage }}</b-message>
        <b-message
          title="Warning!"
          type="is-warning"
          aria-close-label="Close message"
          v-model="showWarning"
        >{{ warningMessage }}</b-message>
        <p>
          <b>Enter a password</b>
        </p>
        <b-field label="Password" key="password">
          <b-input type="password" v-model="password" placeholder="Password" required></b-input>
        </b-field>
        <b-field label="Repeat Password" key="passwordRepeat">
          <b-input type="password" v-model="passwordRepeat" placeholder="Repeat Password" required></b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <b-button label="Close" @click="$emit('close')" />
        <b-button label="Claim" :loading="loading" @click="claimFinal" type="is-primary" />
      </footer>
    </template>
  </div>
</template>

<script>
export default {
  name: "TokenClaimModal",
  data() {
    return {
      token: "",
      loading: false,
      password: "",
      passwordRepeat: "",
      verified: false,
      showError: false,
      errorMessage: "",
      showWarning: false,
      warningMessage: "",
      previousPass: "",
    };
  },
  methods: {
    claim() {
      this.loading = true;
      this.showError = false;
      axios("/auth/claim/" + $store.state.claimToken + "/" + this.token)
        .then(({ data }) => {
          $store.commit("setClaimToken", data.token);
          this.verified = true;
        })
        .catch((err) => {
          console.log(err.response.data);
          this.showError = true;
          this.errorMessage = err.response.data.message;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    claimFinal() {
      this.showError = false;
      this.showWarning = false;
      if (this.password != this.passwordRepeat) {
        this.showError = true;
        this.errorMessage = "Passwords don't match!";
        return;
      }
      if (this.password.length < 6) {
        this.showError = true;
        this.errorMessage = "Password has to be at least 6 characters. Come on";
        return;
      }
      if (this.password != this.previousPass) {
        if (this.password.length < 10) {
          this.showWarning = true;
          this.warningMessage =
            "Your password is a bit short. If you still want to use this password, press 'Claim' again";
          this.previousPass = this.password;
          return;
        }
      }
      this.loading = true;
      axios
        .post("/auth/claimFinal/" + $store.state.claimToken, {
          password: this.password,
        })
        .then(({ data }) => {
          this.$emit("close");
        })
        .catch((err) => {
          console.error(err);
          console.log(err.response.data);
        });
    },
  },
};
</script>

<style scoped>
.wrap {
  height: 100%;
  width: 100%;
  background-color: white;
}
</style>
