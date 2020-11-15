<template>
    <v-app-bar
        data-app
        color="primary"
        padding-left="1rem"
        padding-right="1rem"
        flat
    >
        <v-btn icon rounded>
            <v-icon>mdi-bell</v-icon>
        </v-btn>
        
        <v-spacer></v-spacer>

        <!-- <v-btn rounded elevation="0">
            Tim Apple
            <v-icon right>mdi-account</v-icon>
        </v-btn> -->
        <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :close-on-click="true"
            :nudge-width="200"
            offset-x
        >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            rounded 
            elevation="0"
          >
            Steve Buscemi
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
              <v-list-item-subtitle align="left">Steve Buscemi</v-list-item-subtitle>
              <v-list-item-subtitle align="left">Community Mentor</v-list-item-subtitle>
                <v-list-item-subtitle align="left">steve@gmail.com</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>

        <v-btn 
            text
            rounded
            font-family='Roboto, sans-serif'
        >
        Log out
        </v-btn>
        
    </v-app-bar>
</template>

<script>
    export default {
        data: () => ({
            menu: false,
        }),
    }
</script>