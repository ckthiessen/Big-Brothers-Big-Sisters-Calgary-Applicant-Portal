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
          <v-text-field
            v-model="email"
            placeholder="first.last@email.com"
            :rules="emailrules"
            label="Email"
            outlined
            required
            color="accent"
            :error-messages="errormessage"
          ></v-text-field>
          <v-row justify="space-around">
            <v-col>
            <v-btn
              color="accent"
              width="100%"
              @click="sendReset(email)"
            > Send Password Reset Email
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
import firebase from "firebase";
import Logo from "../components/Logo"

export default {
  name: 'Forgot',
  data () {
    return {
      email : '',
      confirmemail : '',
      errormessage: '',

      emailrules: [ 
        v => 
        !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) 
        || 'E-mail must be valid'
        || 'E-mail is required'
        ],
    };
  },
    components: {
    "bbbs-logo": Logo,
  },
  methods : {

    sendReset(email){
      console.log(this.errormessage);
      firebase.auth().sendPasswordResetEmail(email).then(function() {
        // Email sent.
      }).catch(function() {
        // An error happened and no email was sent
      });
      this.$router.push(`/forgot/waiting`)
    }
  }
}
</script>

<style scoped>
 .v-text-field--outlined >>> fieldset {
    border-color:#2DCCD3 !important;
    border-width: medium !important
  }
</style>