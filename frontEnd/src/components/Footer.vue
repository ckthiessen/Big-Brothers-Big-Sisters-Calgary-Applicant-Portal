<template>
  <v-footer
    color="primary"
    padding-left="1rem"
    padding-right="1rem"
  >
    <v-row
      justify="center"
      no-gutters
    >
    <v-col
      align="left">
      <v-btn
        v-for="link in links"
        :key="link"
        :href="link.href"
        text
        rounded
      >
        {{ link.text }}
      </v-btn>
    </v-col>
    <v-col
        text
        font-family='Roboto, sans-serif'
        rounded
        align="right"
        class="primary"
      >
      © 2020 - Big Brothers Big Sisters Calgary
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      links: [
        {
          text: 'Support',
          href: 'https://www.google.com/'
        },
        {
          text: 'Help Center',
          href: 'https://www.google.com/'
        },
        {
          text: 'Privacy',
          href: 'https://www.google.com/'
        },
        {
          text: 'Terms of Service',
          href: 'https://www.google.com/'
        }
      ],
    }),
  }
</script>