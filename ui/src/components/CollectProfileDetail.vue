<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Adding {{ dataType }}</p>
      <button type="button" class="delete" @click="$emit('close')" />
    </header>
    <template v-if="!verified">
      <section class="modal-card-body">
        <b-message
          title="Error!"
          type="is-danger"
          aria-close-label="Close message"
          v-model="showError"
        >
          {{ errorMessage }}
        </b-message>
        <b-field :label="dataType" key="email">
          <b-input
            type="number"
            v-model="token"
            placeholder="SMS Token"
            required
          >
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <b-button label="Close" @click="$emit('close')" />
        <b-button
          label="Save"
          :loading="loading"
          @click="claim"
          type="is-primary"
        />
      </footer>
    </template>
  </div>
</template>

<script>
export default {
  name: "CollectProfileDetail",
  data() {
    return {
      value: '',
      loading: false,
      errorMessage: '',
      showError: false
    };
  },
  props: {
    dataType: String
  },
  methods: {
    save() {
      alert("ok")
    }
  },
};
</script>

<style scoped>
</style>
