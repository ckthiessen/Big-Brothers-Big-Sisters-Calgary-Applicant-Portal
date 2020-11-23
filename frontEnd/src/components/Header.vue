<template>
    <v-app-bar
        data-app
        color="primary"
        padding-left="1rem"
        padding-right="1rem"
        flat
        absolute
    >
        <v-menu 
          offset-y
          :nudge-width="200"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn 
              icon 
              rounded
              v-on="on"
              v-bind="attrs"
            >
              <v-icon>mdi-bell</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title align="left">Notifications</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    align="right"
                    icon
                    @click="menu = false"
                  >
                    <v-icon small>mdi-close</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list>
              <v-list-item align="left"
                v-for="(notification, index) in notifications"
                :key="index"
              >
                <v-list-item-subtitle>{{ notification }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
        
        <v-spacer></v-spacer>

        <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :close-on-click="true"
            :nudge-width="200"
            offset-y
        >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            rounded 
            elevation="0"
          >
            {{ name }}
            <v-icon right>mdi-account</v-icon>
          </v-btn>
        </template>
  
        <v-card>
          <v-list>
            <v-list-item>
  
              <v-list-item-content>
                <v-list-item-title align="left">Profile Information</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn
                  align="right"
                  icon
                  @click="menu = false"
                >
                  <v-icon small>mdi-close</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>

            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle align="left">{{ name }}</v-list-item-subtitle>
                <v-list-item-subtitle align="left">{{ type }}</v-list-item-subtitle>
                <v-list-item-subtitle align="left">{{ email }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>

        <v-btn 
            text
            rounded
            font-family='Roboto, sans-serif'
            @click="$router.push('/signin')"
        >
        Log out
        </v-btn>
        
    </v-app-bar>
</template>

<script>
import {getUserByID} from "../services/apiServices"
    export default {
        data: () => ({
            menu: false,
            notifications:[],
            name: '',
        }),

        created(){
          this.getUser(); //call when instance is new
        },
        methods: {
          async getUser(){
            await getUserByID(1).then(response => {
              this.user = response;
              this.name = this.user.name;
              this.type = this.user.userType;
              this.email = this.user.Email;
              for (let i = 0; i < this.user["Notifications"].length; i++) {
                let notification = this.user["Notifications"][i];
                console.log(notification.taskName);
                this.notifications.push("Admin has approved " + notification.taskName);
                console.log(this.notifications);
              }
            });
          }
        },
    }
</script>