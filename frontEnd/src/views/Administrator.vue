<template>
  <v-container fluid style="margin: 0 auto 0 auto; padding: 0px; width: 90%">
  <bbbs-header fluid style="margin: 0 auto 0 auto; padding: 0px; width: 90%"></bbbs-header>
  <v-card class="mx-auto">
    <div class="d-flex flex-column justify-space-between align-center">
      <v-img
        src="../assets/Banner_revised.png"
        contain
        margin-top="0px"
        margin-bottom="0px"
        :aspect-ratio="16/9"
        :width="width"
        :height="height"
      ></v-img>
    </div>

    <v-spacer></v-spacer>
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
    <bbbs-footer></bbbs-footer>
  </v-card>
  </v-container>
</template>

<script>
  import {getAllUsers} from "../services/apiServices";
  import Header from "../components/Header.vue";
  import Footer from "../components/Footer.vue";

  export default {
    name: 'Administrator',
    components: {
      'bbbs-header' : Header,
      'bbbs-footer' : Footer
    },
    data () {
      return {
        width: window.innerWidth,
        height: window.innerHeight * 0.3, 
        search: '',
        adminID: '',
        headers: [
          {
            text: 'Name',
            align: 'start',
            selectable: true,
            sortable: true,
            value: 'name',
          },
          { text: 'Status', value: 'status'},
          { text: 'Needs Approval', value: 'waitingApproval' },
        ],
        users: []
      }
    },
    created(){
      this.adminID = this.$route.params.adminID;
      this.getUserList(); //call when instance is new
    },
    methods: {
      async getUserList(){
        await getAllUsers().then(response => {
          let all_users = response.data;
          this.users = all_users.filter(all_users => all_users.isAdmin === false);
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
          user.waitingApproval = awaitingApproval ? "mdi-alert": "mdi-check-circle";
        }
        return this.users;
      },

      getColor(status) {
        if (status === "Completed") {
          return 'accent'
        }else if (status <= "9/18") {
          return 'red'
        }else{
          return 'inprogress'
        }
      },
      
      goToApplicantView(applicantID) {
        this.$router.push(`/admin/${this.adminID}/${applicantID}`)
      }
    },

  }
</script>
<style scoped>
  ::v-deep tbody tr {
    cursor: pointer;
  }
</style>