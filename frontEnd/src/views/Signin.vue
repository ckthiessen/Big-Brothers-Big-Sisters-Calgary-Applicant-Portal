<template>
  
  <v-form>
    <v-container>
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
              @click="$router.push('/applicant/:id')"
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

export default {
  name: 'Signin',
  data () {
    return {
      id: ''
    }
  }
}
</script>