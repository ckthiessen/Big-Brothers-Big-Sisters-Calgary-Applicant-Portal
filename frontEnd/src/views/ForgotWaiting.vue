<template>
<v-container fluid style="margin: 0 auto 0 auto; padding: 0px; max-width: 800px; width: 90% !important">
  <v-card>
    <bbbs-logo></bbbs-logo>
    <v-card-title 
    align-middle
    class="center accent white--text">
      Forgot Password
    </v-card-title>
  <form>
    <v-container fluid style="margin: 0 auto 0 auto;">
      <v-row
        justify="center">
        <v-col
          cols="12"
          sm="10"
        >
        If an account belonging to that email exists, then you will receive an email requesting a password reset.
          <v-row justify="space-around">
            <v-col>
            <v-btn
              color="accent"
              width="100%"
              @click="$router.push('/')"
            > Return to Sign in Page
            </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </form>
  </v-card>
  </v-container>
</template>

<script>

import Logo from "../components/Logo"

export default {
  name: 'ForgotWaiting',
  data () {
    return {

    };
  },
    components: {
    "bbbs-logo": Logo,
  },
  methods : {

  }
}
</script>

<style scoped>
 .v-text-field--outlined >>> fieldset {
    border-color:#2DCCD3 !important;
    border-width: medium !important
  }
</style>