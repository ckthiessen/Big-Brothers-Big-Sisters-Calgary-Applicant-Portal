<template>
  <v-carousel
    height="auto"
    :show-arrows="false"
    cycle>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      :width="width"
      contain
      :aspect-ratio="16/5.33"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    data () {
      return {
        width : screen.width,
        items: [
          {
            src: require("@/assets/bg-bigger-together2.png"),
          },
          {
            src: require("@/assets/Banner.png"),
          }
        ],
      }
    },
  }
</script>

<style scoped>

</style>