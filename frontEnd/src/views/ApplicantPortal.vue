<template>
  <v-container fluid style="margin: 0 auto 0 auto; padding: 0px; width: 90%">
  <bbbs-header @newNotif="displayNotification" fluid style="margin: 0 auto 0 auto; padding: 0px; width: 90%"></bbbs-header>
  <carousel></carousel>
  <v-card class="mx-auto">
     <v-data-table
       :headers="Headers"
       :items="rankedTasks"
       :single-expand="singleExpand"
       :expanded.sync="expanded"
       show-expand
       :hide-default-footer="true"
       disable-pagination
       item-key="name"
       class="elevation-1"
     >
      <v-divider></v-divider>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Activities</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
     </template>
      <template v-slot:expanded-item="{headers, item}">
        <td :colspan="headers.length">
         <p class="float-left mt-7" style="width: 40%; text-align: left">
                {{ item.description }}
              </p>
              <v-btn
                @click="changeStatus(item.status, item.rank - 1)"
                v-if="!noActions.includes(item.name)"
                class="float-right my-5"
                rounded
                color="accent"
                dark
              >
                {{ buttonTitle(item.status) }}
              </v-btn>
              <bbbs-upload v-if="item.upload && !item.fileUpload"  class="float-right mt-1 mr-5" @Uploaded="handleUpload"></bbbs-upload>
              <bbbs-download v-if="item.upload && item.fileUpload" :task="item" buttonText="Offense Declaration" class="float-right mt-5 mr-5"></bbbs-download>
        </td>
      </template>
      <template v-slot:item.status="{item}">
        <v-chip
          :color="status[item.status].color"
          text-color="white"
        >
          <v-icon class="pl-1" color="white" left>
            {{ status[item.status].icon }}
          </v-icon>
          {{ status[item.status].title }}
        </v-chip>
      </template>
      <template v-slot:item.dueDate="{item}">
        {{ item.dueDate }}
      </template>
      <template v-slot:item.upload="{item}"> 
        <v-icon color="accent">
          {{ item.upload ? uploadIcons.upload : uploadIcons.noUpload }}
        </v-icon>
      </template>
     </v-data-table>
    <bbbs-footer></bbbs-footer>
  </v-card>
   <v-snackbar v-model="snackbar" color="accent">
      {{ notif }}
      <template v-slot:action="{ attrs }">
        <v-btn
          align="right"
          icon
          v-bind="attrs"
          @click="snackbar = false"
        >
          <v-icon small>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Upload from '../components/Upload.vue'
import Download from '../components/Download.vue'
import Carousel from '../components/Carousel.vue'

import {getUserByID, updateTask} from "../services/apiServices" 

export default {
  data() {
    return {
      applicant: {},
      tasks: [],
      expanded: [],
      singleExpand: false,
      Headers: [{
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          {
            text: 'Status',
            align: 'start',
            sortable: false,
            value: 'status',
          },
          {
            text: 'Due Date',
            align: 'start',
            sortable: false,
            value: 'dueDate',
          },
          {
            text: 'Upload',
            align: 'middle',
            sortable: false,
            value: 'upload'
          },
          { 
            text: '', 
            value: 'data-table-expand' 
          },
      ],
      status: {
        Complete: {
          color: "complete",
          title: "Complete",
          icon: "mdi-check-circle",
        },
        InProgress: {
          color: "inprogress",
          title: "Waiting Approval",
          icon: "mdi-dots-horizontal-circle",
        },
        Incomplete: {
          color: "needsattention",
          title: "Incomplete",
          icon: "mdi-alert",
        },
      },
      uploadIcons: {
        noUpload: "mdi-cloud-off-outline",
        upload: "mdi-cloud-upload",
        uploadComplete: "mdi-cloud-check",
      },
      requiresHomeAssessment: false,
      isCommunityMentor: false,
      noActions: [
        "BIG Profile",
        "You are no BIG Deal :(",
        "You are a BIG Deal!",
      ],
      username: "",
      notif: "",
      id: this.$route.params.applicantID,
      snackbar: false,
    };
  },
  components: {
    "bbbs-header": Header,
    "bbbs-footer": Footer,
    "bbbs-upload": Upload,
    "bbbs-download": Download,
    "carousel" : Carousel
  },
  methods: {
    //function for updating the users filepath in the upload 
    handleUpload(filePath){
      //now update users filepath
      console.log("path: " + filePath)
      //hard coded for now
      let selectedTask = this.tasks[13];
      let serverTasks = []
      this.tasks.forEach(task =>{
        let serverTask = {
          dueDate: task.dueDate,
          name: task.name,
          isApproved: task.isApproved,
          isSubmitted: task.isSubmitted, //don't change the submitted value when updating files
        }
        //change the selected tasks filepath
        if(task.name === selectedTask.name){
          serverTask.fileUpload = filePath
          task.fileUpload = filePath;
        } else{
          serverTask.fileUpload = task.fileUpload
        }
      serverTasks.push(serverTask);
      });
      let notification = `${this.username} has uploaded a file to ${selectedTask.name}`;
      updateTask(this.id, serverTasks, notification);
    },
    changeStatus: function(status, index) {
      let selectedTask = this.tasks[index];
      let notification;
      if(selectedTask.status === "Complete") { return; }
      if (selectedTask.status === "Incomplete") {
        selectedTask.status = "InProgress";
        selectedTask.isSubmitted = true;
        notification = `${this.username} has submitted ${selectedTask.name}`;
      } else if (selectedTask.status === "InProgress") {
        selectedTask.status = "Incomplete";
        selectedTask.isSubmitted = false;
        notification = `${this.username} has unsubmitted ${selectedTask.name}`;
      }
      let serverTasks = []
      this.tasks.forEach(task => {
        let serverTask = {
          dueDate: task.dueDate,
          name: task.name,
          isApproved: task.isApproved,
          fileUpload: task.fileUpload       //added after to fix
        }
          if(task.name === selectedTask.name) {
            serverTask.isSubmitted = selectedTask.isSubmitted;
          }
          else {
            serverTask.isSubmitted = task.isSubmitted;
          }
        serverTasks.push(serverTask);
      });
      updateTask(this.id, serverTasks, notification);
    },
    buttonTitle: function (status) {
      return status === "InProgress" ? "Mark Incomplete" : "Request Approval"
    },
    displayNotification(message) {
      this.notif = message;
      this.snackbar = true;
      setTimeout(() => { 
        this.snackbar = false; 
      }, 5000);
    }
  },
  created() {
    let defaults = require("../assets/defaults.json");
    getUserByID(this.id).then(res => {
      // TODO: Refactor this to be more extensible
      this.notifs = res.data["notifications"];
      this.username = res.data.name;
      for (const serverTask of Object.values(res.data.tasks)) {
        let clientTask = {} 
        clientTask.name = serverTask.name;
        clientTask.dueDate = serverTask.dueDate; 
        clientTask.isSubmitted = serverTask.isSubmitted;
        clientTask.isApproved = serverTask.isApproved;
        clientTask.fileUpload = serverTask.fileUpload;
        if(serverTask.isApproved) {
            clientTask.status = "Complete"; 
        }
        else if(serverTask.isSubmitted) { 
            clientTask.status = "InProgress"; 
        } else {
            clientTask.status = "Incomplete"; 
        }
        clientTask.description = defaults[serverTask.name].description;
        clientTask.upload = defaults[serverTask.name].upload;
        this.tasks.push(clientTask);
      }
    })
  },
  computed: {
    rankedTasks() {
        const items = [];
        if (this.tasks.length > 0) {
            items[0] = this.tasks[0];
            items[0].rank = 1;
            for (let index = 1; index < this.tasks.length; index++) {
                items[index] = this.tasks[index];
                if (items[index].name === items[index - 1].name) {
                    items[index].rank = "";
                } else {
                    items[index].rank = index + 1;
                }
            }
        }
        return items;
    }
  }
}
</script>