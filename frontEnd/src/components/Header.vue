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
              @click="clearNotification()"
            >
              <v-icon :color="getColor()">{{ seen ? "mdi-bell" : "mdi-bell-alert" }}</v-icon>
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
                  >
                    <v-icon small>mdi-close</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list>
              <v-list-item align="left"
                v-for="(notification, index) in notifications.slice().reverse()"
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
            name: "",
            type: "",
            user: {},
            email: "",
            lastNotification: {},
            seen: true,
        }),

        created(){
          getUserByID(1).then(response => {
              //get user information
              this.user = response.data;
              this.name = this.user.name;
              if (this.user.isAdmin === true) {
                this.type = "Administrator";
              } else if (this.user.isCommunityMentor === true) {
                this.type = "Community Mentor";
              } else {
                this.type = "Education Mentor";
              }
              this.email = this.user.email;
              console.log(this.seen);
              //get notifications for user
              if (this.user["notifications"].length === 0) {
                this.notifications.push("No notifications");
                this.lastNotification = "No notifications";
              } else {
                for (let i = 0; i < this.user["notifications"].length; i++) {
                  let notification = this.user["notifications"][i];
                  this.notifications.push(notification.message + "   " + notification.date);
                  this.lastNotification = notification.message + "   " + notification.date;
                } 
              }
            });
            //call pullNotifications() every 3 seconds
            setInterval(function () {
              this.pullNotifications();
            }.bind(this), 3000); 
        },
        methods: {
          pullNotifications() {
            getUserByID(1).then(response => {
                this.user = response.data;
                let length = this.user["notifications"].length;
                if (length > 0) {
                  //check the last notification
                  let notification = this.user["notifications"][length - 1];
                  //if last notification is not new
                  if (this.lastNotification === notification.message + "   " + notification.date) {
                    return;
                  }

                  //display new notification
                  this.notifications.push(notification.message + "   " + notification.date);
                  this.seen = false;
                  //remove "No notifications"
                  if (this.notifications[0] === "No notifications") {
                    this.notifications.shift();
                  }
                  //set the last notification again
                  this.lastNotification = notification.message + "   " + notification.date;
                }
            })
          },
          clearNotification() {
            this.seen = true;
          }, 
          getColor() {
            if (this.seen === true) {
              return;
            } else {
              return "notificationgreen";
            }
          }
        },
    }
</script>