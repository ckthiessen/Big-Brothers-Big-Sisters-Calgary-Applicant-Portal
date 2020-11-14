<template>
    <v-app-bar
        color="primary"
        padding-left="1rem"
        padding-right="1rem"
        flat
    >
        <v-btn icon rounded>
            <v-icon>mdi-bell</v-icon>
        </v-btn>
        
        <v-spacer></v-spacer>

        <v-btn rounded elevation="0">
            Mr. Worldwide
            <v-icon right>mdi-account</v-icon>
        </v-btn>
        <!-- add name next to icon -->
        
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
  }
</script>