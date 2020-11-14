<template>
    <v-app-bar
        color="primary"
        padding-left="1rem"
        padding-right="1rem"
    >
        <v-btn icon rounded>
            <v-icon>mdi-bell</v-icon>
        </v-btn>
        
        <v-spacer></v-spacer>

        <v-btn icon rounded>
            <v-icon>mdi-account</v-icon>
        </v-btn>
        
        <v-btn 
            text
            rounded
            font-family='Roboto, sans-serif'
        >
        Log out
        </v-btn>

        <v-menu
            left
            bottom
        >

        </v-menu>
    </v-app-bar>
</template>

<script>
  export default {
  }
</script>