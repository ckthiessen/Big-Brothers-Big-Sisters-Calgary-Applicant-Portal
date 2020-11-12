<template>
  <div class="hello">
    <p>
    </p>
  </div>
</template>

<script>
import apiServices from "@/services/apiServices"

export default {
  name: 'HelloWorld',
  data(){
    //new - initalizes the event object
    return{
      event: {}
    }
  },
  created(){
    this.getHelloWorld(); //call when instance is new
  },
  methods: {
    async getHelloWorld(){
      let res = await apiServices.getHelloworldExample();
      console.log("is the hello working")
      console.log(res.data);
      return res.data;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
