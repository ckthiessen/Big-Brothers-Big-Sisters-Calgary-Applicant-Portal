<template>
  <v-container fluid style="margin: 0 auto 0 auto; padding: 0px; max-width: 800px; width: 90% !important">
  <v-card>
    <bbbs-logo></bbbs-logo>
    <v-card-title 
    align-middle
    class="center accent white--text">
      Sign In
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
            label="Email"
            outlined
            required
            color="accent"
            :error-messages="errormessage"
          ></v-text-field>
          <v-text-field
            v-model="password"
            placeholder="******"
            label="Password"
            outlined
            required
            color="accent"
            :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
            :type="passwordVisible ? 'text' : 'password'"
            name="input-10-2"
            hint="At least 8 characters"
            :error-messages="errormessage"
            @click:append="passwordVisible = !passwordVisible"
            @keydown.enter="auth(email, password)"
          ></v-text-field>
          <v-row justify="space-around">
            <v-col>
            <v-btn
              color="accent"
              width="100%"
              @click="auth(email, password)"
            > Sign in
            </v-btn>
            </v-col>
          </v-row>
          <v-row justify="space-around">
            <v-col>
            <v-btn
              width="100%"
              color="accent"
              margin-bottom="1em"
              @click="$router.push('/forgot')"
            >
              Forgot Password
            </v-btn>
            </v-col>
          </v-row>
          <v-row justify="space-around">
            <v-col>
            <v-btn
              width="100%"
              color="accent"
              margin-bottom="1em"
              @click="$router.push('/signup')"
            >
              Dont have an account? Sign Up
            </v-btn>
            </v-col>
          </v-row>
          <!-- </v-col> -->
          <!-- </v-row> -->
          <v-col>
            <v-btn
              color="accent"
              margin-bottom="1em"
              @click="auth('abc.123@a.com', 'Abc1234$')"
            >
              BYPASS AUTH AS APPLICANT (DEBUG ONLY)
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              color="accent"
              margin-bottom="1em"
              @click="auth('cole.t@abc.com', 'Abc1234$')"
            >
              BYPASS AUTH AS ADMIN (DEBUG ONLY)
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              color="accent"
              margin-bottom="1em"
              @click="testFunc('Firebase Testing')"
            >
              Test Func
            </v-btn>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </form>
  </v-card>
  </v-container>
</template>

<script>
/*eslint-disable*/
import Logo from "../components/Logo";
import {getUserByID, firebaseTest} from "../services/apiServices";
import firebase from "firebase";

export default {
  name: 'Signin',
  data () {
    return {
      id: '',
      email: '',
      password: '',
      passwordVisible: false,
      errormessage: '',
    }
  },
  components: {
    "bbbs-logo": Logo,
  },
  methods:  {
    async getUserByID(id) {
      getUserByID(id).then(response => {
        console.log(response);
        let currentUser = response.data;
        if(currentUser.isAdmin) {
          this.$router.push(`admin/home/${this.id}`)
        }else if(!currentUser.isAdmin){
          this.$router.push(`applicant/${this.id}`)
        }
      }).catch((error) => {
        this.errormessage = error.message;
      })
    },

    async auth(email, password) {
      // await firebase.auth().signInWithEmailAndPassword(email, password)
      // .then((user) => {
      //   this.id = user.user.uid
        // this.getUserByID(this.id)
        this.getUserByID('123')
        // .then(response => {
        //   console.log(response);
        //   let currentUser = response.data;
        //   if(currentUser.isAdmin) {
        //     this.$router.push(`admin/home/${this.id}`)
        //   }else if(!currentUser.isAdmin){
        //     this.$router.push(`applicant/${this.id}`)
        //   }
        // }).catch((error) => {
        //   this.errormessage = error.message;
        // })
      // }).catch(() => {
      //   this.errormessage = "The email or password is incorrect";
      // })
    },
    /**
     * Runs a firebase function and will echo whatever message is passed in
     */
    async testFunc(message) { 
      console.log(await firebaseTest(message));
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