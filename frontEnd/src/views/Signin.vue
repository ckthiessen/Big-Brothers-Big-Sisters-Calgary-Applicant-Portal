<template>
  <v-container fluid style="margin: 0 auto 0 auto; padding: 0px; max-width: 800px; width: 90% !important">
  <v-card>
    <v-img  
      src="../assets/thumbnail_Calgary_horizontal_primary_CMYK_EN.png"
      contain
      position="left"
      height="250px"
    ></v-img>
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
          <!-- <v-row> -->
            <!-- <v-col>
            <v-btn
              color="accent"
              margin-bottom="1em"
              @click="$router.push('/forgot')"
            >
              Forgot Password
            </v-btn>
            </v-col>
          <v-spacer></v-spacer> -->
           <!-- <v-col> -->
            <v-btn
              width="100%"
              color="accent"
              margin-bottom="1em"
              @click="$router.push('/signup')"
            >
              Dont have an account? Sign Up
            </v-btn>
          <!-- </v-col> -->
          <!-- </v-row> -->
          <!-- <v-col
            <v-btn
              color="accent"
              margin-bottom="1em"
              @click="auth('benjamin.cook@ucalgary.ca', 'password')"
            >
              BYPASS AUTH AS ADMIN (DEBUG ONLY)
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              color="accent"
              margin-bottom="1em"
              @click="auth('r.l@mail.com', 'Abc123!!!')"
            >
              BYPASS AUTH AS APPLICANT (DEBUG ONLY)
            </v-btn>
          </v-col> -->
        </v-col>
      </v-row>
    </v-container>
  </form>
  </v-card>
  </v-container>
</template>

<script>
//import {getUserByEmail} from "../services/apiServices";
import {getUserByID} from "../services/apiServices";
import firebase from "firebase";
// import Administrator from './Administrator.vue';
//import ApplicantPortal from './ApplicantPortal.vue';
//import * as router from 'vue-router'


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

  methods:  {
    async auth(email, password) {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        // console.log(user.user)
        // console.log("Hitting here")
        this.id = user.user.uid
        // console.log(currentId)
        getUserByID(this.id)
        .then(response => {
          console.log(response.data)
          let currentUser = response.data;
          console.log(this.id);
          //console.log(currentUser.isAdmin)
          //alert("Signing in now!")
          if(currentUser.isAdmin) {
            this.$router.push(`administrator/home/${this.id}`)
          }else{
            console.log("trying to push")
            this.$router.push(`applicant/${this.id}`)
            //this.$router.push({name: ApplicantPortal, params: { applicantID: currentUser.id}})
            //this.$router.push({name: ApplicantPortal, params: { applicantID: currentUser.id}})
            //this.$router.push({path: `applicant/${currentUser.id}`})
          }
        }).catch((error) => {
          console.log(error)
        })
      }).catch((error) => {
        //Error block
        this.errormessage = error.message;
      })
    },
  }
}
</script>

<style scoped>
 .v-text-field--outlined >>> fieldset {
    border-color:#2DCCD3 !important;
    border-width: medium !important
  }
</style>