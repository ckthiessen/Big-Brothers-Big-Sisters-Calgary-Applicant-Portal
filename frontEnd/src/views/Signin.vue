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
        </v-col>
      </v-row>
    </v-container>
  </form>
  </v-card>
  </v-container>
</template>

<script>
  import {getUserByEmail} from "../services/apiServices";
  
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
  methods: {
    async auth(email, password) {
      await getUserByEmail({ email, password })
      .then(response => {
        //build cookie - SUPER WEIRD EDGE CASE THING
        let user = response.data;
        this.$cookies.set(user.id); //cookie includes the ID
        if(user.isAdmin){
          this.$router.push(`/admin/home/${user.id}`)
        }else{
          this.$router.push(`/applicant/${user.id}`)
        }
      })
      .catch(error => {
        if (error.response.status == 401) {
          this.errormessage = 'Invalid email or password'
        }
      });
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