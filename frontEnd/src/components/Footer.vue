<template>
  <v-footer
    display="flex"
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
        v-for="(link, index) in links"
        :key=index
        :href="link.href"
        text
        rounded
      >
        {{ link.text }}
      </v-btn>
    </v-col>
    <v-col align="right">
      <v-btn
        text
        disabled
      >
        © 2020 - Big Brothers Big Sisters Calgary
      </v-btn>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      links: [
        {
          text: 'Home',
          href: 'https://www.bbbscalgary.ca'
        },
        {
          text: 'Complaints Policy',
          href: 'https://bbbscalgary.ca/complaints-policy/'
        },
        {
          text: 'Diversity and Inclusion Policy',
          href: 'https://bbbscalgary.ca/diversity-inclusion-policy/'
        },
        {
          text: 'Privacy',
          href: 'https://bbbscalgary.ca/privacy-policy/'
        },
        {
          text : 'Help',
          href: 'mailto: intake.calgary@bigbrothersbigsisters.ca'
        }
      ],
    }),
  }
</script>
