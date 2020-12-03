<template>
  <v-form>
    <v-container>
      <v-snackbar v-model="snackbar" color="needsattention">
        Incorrect login information  
        <template v-slot:action="{ attrs }">
          <v-btn
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
      <h1>Sign In</h1>
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
          ></v-text-field>
          <v-text-field
            v-model="password"
            placeholder="******"
            label="Password"
            outlined
            required
            :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
            :type="passwordVisible ? 'text' : 'password'"
            name="input-10-2"
            hint="At least 8 characters"
            @click:append="passwordVisible = !passwordVisible"
          ></v-text-field>
          <v-col>
            <v-btn
              color="accent"
              @click="auth(email, password)"
            > Sign in
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              color="accent"
              margin-bottom="1em"
              @click="$router.push('/signup')"
            >
              Dont have an account? Sign Up
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              color="accent"
              margin-bottom="1em"
              @click="$router.push('/forgot')"
            >
              Forgot Password
            </v-btn>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
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
      snackbar: false,
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
          this.snackbar = true;
        }
      });
    }
  }
}
</script>