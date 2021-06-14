<template>
  <card-component title="Edit Profile" icon="account-circle">
    <form @submit.prevent="submit">
      <!--<b-field label="Avatar" disabled>
        <file-picker />
      </b-field>
      <hr />-->
      <b-field label="Name">
        <b-input v-model="form.name" name="name" />
        <p class="control">
          <b-button
            class="button is-primary"
            @click="updateName()"
            :class="{ 'is-loading': isLoading }"
          >
            Update
          </b-button>
        </p>
      </b-field>
      <b-field label="E-mail">
        <b-input v-model="form.email" name="email" type="email" readonly />
        <p class="control" key="pNumber" v-if="!form.email">
          <b-button class="button is-primary" @click="collectDetail('email')">
            Add
          </b-button>
        </p>
      </b-field>
      <b-field label="Phone number">
        <b-input v-model="form.number" name="number" type="tel" readonly />
        <p class="control" key="pNumber" v-if="!form.number">
          <b-button class="button is-primary" @click="collectDetail('number')">
            Add
          </b-button>
        </p>
      </b-field>
    </form>
  </card-component>
</template>

<script>
import { mapState } from "vuex";
import FilePicker from "@/components/FilePicker";
import CardComponent from "@/components/CardComponent";
import CollectProfileDetail from "@/components/CollectProfileDetail";

export default {
  name: "ProfileUpdateForm",
  components: {
    CardComponent,
    FilePicker,
  },
  data() {
    return {
      isFileUploaded: false,
      isLoading: false,
      form: {
        name: null,
        email: null,
        number: null,
      },
    };
  },
  computed: {
    ...mapState(["userName", "userEmail", "userNumber"]),
  },
  mounted() {
    this.form.name = this.name;
    this.form.email = this.userEmail;
    this.form.number = this.userNumber;
  },
  methods: {
    submit() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        this.$store.commit("user", this.form);
        this.$buefy.snackbar.open({
          message: "Updated",
          queue: false,
        });
      }, 500);
    },
    collectDetail(type) {
      this.$buefy.modal.open({
        parent: this,
        component: CollectProfileDetail,
        hasModalCard: true,
        trapFocus: true,
        props: {
          dataType: type,
        },
      });
    },
    updateName() {
      this.isLoading = true;
      axios.post('/me/name', {
        name: this.form.name
      })
    },
  },
  watch: {
    name(newValue) {
      this.form.name = newValue;
    },
    userName(newValue) {
      this.form.userName = newValue;
    },
    userEmail(newValue) {
      this.form.email = newValue;
    },
  },
};
</script>
