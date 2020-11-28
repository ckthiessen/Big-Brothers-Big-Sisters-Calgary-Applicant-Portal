<template>
  <v-form>
    <v-container>
      <h1>Sign Up</h1>
      <v-row
        justify="center">
        <v-col
          cols="12"
          sm="10"
        >
          <v-text-field
            v-model="firstName"
            placeholder="First"
            label="First"
            outlined
            required
          ></v-text-field>
          <v-text-field
            v-model="lastName"
            placeholder="Last"
            label="Last"
            outlined
            required
          ></v-text-field>
          <v-text-field
            v-model="email"
            placeholder="first.last@email.com"
            :rules="emailrules"
            label="Email"
            outlined
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            placeholder="******"
            :rules="passwordrules"
            label="Password"
            outlined
            required
            :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
            :type="passwordVisible ? 'text' : 'password'"
            name="input-10-2"
            hint="At least 8 characters"
            @click:append="passwordVisible = !passwordVisible"
          ></v-text-field>
          <v-text-field
            v-model="checkpassword"
            :rules="matches"
            placeholder="******"
            :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
            :type="passwordVisible ? 'text' : 'password'"
            name="input-10-2"
            label="Confirm"
            outlined
            required
          ></v-text-field>
          <v-col>
            <v-btn
              color="accent"
              margin-bottom="1em"
              :disabled="!isValid"
              @click="signUp()"
            >
              Sign Up
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              color="accent"
              @click="$router.push('signin')"
            > Already a member? Sign in
            </v-btn>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import {v4 as uuidv4} from 'uuid';
import {createUser} from "../services/apiServices";

export default {
  name: 'Signup',
    data () {
      return {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        checkpassword: '',
        passwordVisible: false,
        isValid: true,

        emailrules: [ 
        v => 
        !!v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) 
        || 'E-mail must be valid'
        || 'E-mail is required'
        ],
        passwordrules: [
          v => (v && v.length >= 8) || 'Password must have 8+ characters',
          v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character', 
          v => /(?=.*\d)/.test(v) || 'Must have one number', 
          v => /([!@$%])/.test(v) || 'Must have one special character [!@#$%]'
        ],
        matches: [
          v => (this.password === v || 'Passwords must match')
        ]
      }
    },

    methods:{
      signUp(){
        let userInfo = {
          'id' : uuidv4(),
          'name' : this.firstName + ' ' + this.lastName,
          'email' : this.email,
          'password' : this.password,
        };
        createUser(userInfo)
        .then(() => {
            this.$router.push(`/`);
          }
        );
      },
    }
}
</script>

<style scoped>
  .v-text-field {
    font-size: 1.2em;
  }
</style>