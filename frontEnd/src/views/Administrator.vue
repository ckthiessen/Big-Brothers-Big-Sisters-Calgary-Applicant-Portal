<template>
  <v-card>
    <Header></Header>
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
    >
      <template v-slot:item.status="{ item }">
        <v-chip
          :color="getColor(item.status)"
          dark
        >
          {{ item.status }}
        </v-chip>
      </template>
    </v-data-table>
    <Footer></Footer>
  </v-card>
</template>

<script>
  import {getAllUsers} from "../services/apiServices";
  import Header from "../components/Header.vue";
  import Footer from "../components/Footer.vue";

  export default {
    name: 'Administrator',
    components: {
      'Header' : Header,
      'Footer' : Footer
    },
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Status', value: 'status'},
          { text: 'Last Completed Item', value: '' },
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
          this.users = response;
          this.completionStatus();
        });
      },
      /*
      Calculates the completion status of the activities and updates the user object
      these calculations are based on the user object with the following config
        {
          "id": 1,
          "name": "Himika Dastidar",
          "userType": "Admin",
          "Email": "Test@Testing.com",
          "Activities": [
            {
              "taskName": "Big Project",
              "dueDate": "2020-05-09",
              "isSubmitted": true,
              "isApproved": true,
            },
            {
              "taskName": "Big Thing",
              "dueDate": "2020-05-09",
              "isSubmitted": true,
              "isApproved": true,
            }
          ]
        }
      */
      completionStatus() {
        for (let i = 0; i < this.users.length; i++) {
          let user = this.users[i];
          let completedCount = 0;
          let awaitingApproval = false;
          for (let j = 0; j < user["Activities"].length; j++) {
            let activity = user["Activities"][j]
            if (activity["isApproved"] === true) {
              completedCount += 1
            }
            if (activity["isApproved"] === false && activity["isSubmitted"] === true){
              awaitingApproval = true;
            }
          }
          user.status = completedCount === user["Activities"].length ? "Completed" : (completedCount + "/" + user["Activities"].length + " completed");
          user.waitingApproval = awaitingApproval ? "true" : "false";       //REPLACE ME WITH ICONS LATER!
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
      }
    },
  }
</script>