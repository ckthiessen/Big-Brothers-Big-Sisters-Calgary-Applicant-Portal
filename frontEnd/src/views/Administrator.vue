<template>
  <v-card>
    <!-- <Header></Header> -->
    <v-card-title>
      Applicants
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="users"
      :search="search"
      item-key="id"
    >
      <template v-slot:item.name="{item}">
        <td @click="goToApplicantView(item.id)">{{item.name}}</td>
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip
          :color="getColor(item.status)"
          dark
        >
          {{ item.status }}
        </v-chip>
      </template>
      <template v-slot:item.waitingApproval="{ item }">
        <v-icon :color="item.waitingApproval === 'mdi-check-circle' ? 'green': 'inprogress'">
          {{item.waitingApproval}}
        </v-icon>

      </template>
    </v-data-table>
    <Footer></Footer>
  </v-card>
</template>

<script>
  import {getAllUsers} from "../services/apiServices";
  //import Header from "../components/Header.vue";
  import Footer from "../components/Footer.vue";

  export default {
    name: 'Administrator',
    components: {
      //'Header' : Header,
      'Footer' : Footer
    },
    props: {
    },
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Name',
            align: 'start',
            selectable: true,
            sortable: true,
            value: 'name',
          },
          { text: 'Status', value: 'status'},
          // { text: 'Last Completed Item', value: '' },
          { text: 'Needs Approval', value: 'waitingApproval' },
        ],
        users: []
      }
    },
    created(){
      this.getUserList(); //call when instance is new
    },
    methods: {
      async getUserList(){
        await getAllUsers().then(response => {
          console.log(response.data)
          this.users = response.data;
          this.completionStatus();
        });
      },
      completionStatus() {
        for (let i = 0; i < this.users.length; i++) {
          let user = this.users[i];
          let completedCount = 0;
          let awaitingApproval = false;
          
          for (let j = 0; j < user["tasks"].length; j++) {
            let activity = user["tasks"][j]
            if (activity["isApproved"] === true) {
              completedCount += 1
            }
            if (activity["isApproved"] === false && activity["isSubmitted"] === true){
              awaitingApproval = true;
            }
          }
          user.status = completedCount === user["tasks"].length ? "Completed" : (completedCount + "/" + user["tasks"].length + " completed");
          user.waitingApproval = awaitingApproval ? "mdi-check-circle" : "mdi-alert";
        }
        return this.users;
      },

      getColor(status) {
        if (status === "Completed") {
          return 'accent'
        }else if (status <= "5/11") {
          return 'red'
        }else{
          return 'inprogress'
        }
      },
      
      goToApplicantView(applicantID) {
        this.$router.push(`/admin/${applicantID}`)
      }
    },

  }
</script>
<style scoped>
  ::v-deep tbody tr {
    cursor: pointer;
  }
</style>