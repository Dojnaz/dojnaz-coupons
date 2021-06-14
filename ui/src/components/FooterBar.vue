<template>
  <footer v-show="isFooterBarVisible" class="footer">
    <div class="container-fluid">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <div class="footer-copyright">
              <b>&copy; {{ year }}, Dojnaz HB</b> &mdash; Dojnaz Coupons <span class="tag">v1.4.1</span>
              <br>
              <br>
              <p>Do you need help?</p>
              <p><b-icon icon="email" custom-size="default"></b-icon> <a href="mailto:vb@dojnaz.net" target="_blank">vb@dojnaz.net</a></p>
              <p><b-icon icon="android-messages" custom-size="default"></b-icon> <a href="sms:+46734101065" target="_blank">+46734101065</a></p>
            </div>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <div class="logo">
              <a href="https://dojnaz.net" target="_blank">
                <img src="https://dojnaz.net/cdn/dojnaz.png">
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import dayjs from 'dayjs'
import { mapState } from 'vuex'

export default {
  name: 'FooterBar',
  computed: {
    year () {
      return dayjs().year()
    },
    ...mapState([
      'isFooterBarVisible'
    ])
  }
}
</script>
