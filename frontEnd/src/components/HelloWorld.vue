<template>
  <div class="hello">
    <p>This is the HelloWorld component</p>
    <ul>
      <li v-for="user in users" :key="user">{{user}}</li>
    </ul>
  </div>
</template>

<script>
import {getAllUsers} from "../services/apiServices"
export default {
  name: 'HelloWorld',
  data(){
    //new - initalizes the event object
    return{
      users: [],
    }
  },
  created(){
    this.getAllUsers(); //call when instance is new
  },
  methods: {
    async getAllUsers(){
      await getAllUsers().then(response => {
        console.log("All users:");
        console.log(response);
        this.users = response;
        this.$emit('emitToApp', response);
      });
    },
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