<template>
  <v-container fluid style="margin: 0 auto 0 auto; padding: 0px; width: 90%">
  <bbbs-header fluid style="margin: 0 auto 0 auto; padding: 0px; width: 90%"></bbbs-header>
  <carousel></carousel>
  <v-card class="mx-auto">
    <v-data-table
    :headers="Headers"
    :items="tasks"
    item-key="index"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-card-title>{{applicant.name}}</v-card-title>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <template v-slot:item.status="{item}">
      <v-chip :color=getColor(item.status)> 
        <v-icon class="pl-1" color="white" left>
          {{getIcon(item.status)}}
        </v-icon>
        {{item.status}}
      </v-chip>
    </template>
    <template v-slot:item.upload="{ item }">
      <v-icon v-if="!item.fileUpload" color="accent"> {{downloadIcons.noUpload}}</v-icon>

      <bbbs-download v-if="item.fileUpload" :task="item" class="ml-n5"></bbbs-download>
    </template>
    <template v-slot:item.buttonTitle="{item}">
      <td>
      <v-btn
        color="accent"
        dark
        v-if="!noActions.includes(item.name)"
        @click="changeStatus(item.status, tasks.indexOf(item))"
        rounded
        >
        {{item.buttonTitle}}
      </v-btn>
      </td>
    </template>
  </v-data-table>
  <bbbs-footer></bbbs-footer>
  </v-card>
  </v-container>
</template>

<script>
  import Header from "../components/Header.vue"
  import Footer from "../components/Footer.vue"
  import Carousel from '../components/Carousel.vue';
  import {getUserByID, updateUser} from "../services/apiServices"
  import _ from 'lodash'
  import Download from '../components/Download.vue'

  
export default {
  name: 'AdminApplicant',

  components: {
    'bbbs-header': Header,
    'bbbs-footer': Footer,
    'carousel' : Carousel,
    'bbbs-download': Download
  },

  created(){
    this.adminID = this.$route.params.adminID;
    this.applicantID = this.$route.params.applicantID;
    getUserByID(this.applicantID).then(res => {
        this.applicant = res.data
        let servertasks = res.data.tasks
        for (const task in servertasks) {
          if(servertasks[task].isSubmitted && servertasks[task].isApproved){
            servertasks[task].status = "Complete";
            servertasks[task].buttonTitle = "Mark Incomplete"
          }else if(servertasks[task].isSubmitted && !servertasks[task].isApproved){
            servertasks[task].status = "Requires Approval"
            servertasks[task].buttonTitle = "Mark Complete"
          }else if(!servertasks[task].isSubmitted && !servertasks[task].isApproved){
            servertasks[task].status = "Incomplete"
            servertasks[task].buttonTitle = "Mark Complete"
          }
          this.tasks.push(servertasks[task])
        }
      });
  },
  data(){
    return {
        applicantID: '',
        adminID : '',
        applicant: [],
        tasks: [],
        selectedIndex: '',
        downloadIcons: {
          noUpload: "mdi-download-off-outline",
          upload: "mdi-cloud-download",
          uploadComplete: "mdi-cloud-check",
      },
        Headers: [
          {
            text: 'Task Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          {
            text: 'Completion Status',
            align: 'start',
            value: 'status',
          },
          {
            text: 'Download',
            align: 'start',
            sortable: false,
            value: 'upload',
          },
          {
            text: 'Change Status',
            sortable: false,
            align: 'middle',
            value: 'buttonTitle'
          }
        ],
        noActions: [
          "BIG Profile",
          "You are no BIG Deal :(",
          "You are a BIG Deal!"
        ],
      }
  },

  methods: {
    async updateUser(applicant){
      await updateUser(applicant).then(response => {
          this.applicant = response.data;
          this.$emit('emitToApp', response.data);
      });
    },
    
    changeStatus: function(status, index) {
      let selectedTask = this.tasks[index];
      if (selectedTask.status === "Requires Approval" || selectedTask.status === "Incomplete") {
        selectedTask.status = "Complete";
        selectedTask.buttonTitle = "Mark Incomplete";
        this.applicant.tasks[index].isSubmitted = true;
        this.applicant.tasks[index].isApproved = true;
        this.applicant.notifications.push({"message" : "The administrator has approved " + selectedTask.name,
                                            "date" : new Date().toLocaleString()})
      }else if (selectedTask.status === "Complete") {
        selectedTask.status = "Incomplete";
        selectedTask.buttonTitle = "Mark Complete";
        this.applicant.notifications.push({"message" : "The administrator has rejected your submission for " + selectedTask.name,
                                            "date" : new Date().toLocaleString()})
        this.applicant.tasks[index].isSubmitted = false;
        this.applicant.tasks[index].isApproved = false;
      }
     
      let applicantCopy = _.cloneDeep(this.applicant);
      for (let i = 0; i < applicantCopy.tasks.length; i++){
        delete applicantCopy.tasks[i].status;
        delete applicantCopy.tasks[i].buttonTitle;
      }
      this.updateUser(applicantCopy);
    },

    getColor(status) {
      if (status === "Requires Approval"){
        return 'inprogress'
      }else if (status === "Complete") {
        return 'accent'
      }else{
        return 'red'
      }
    },

    getIcon(status) {
      if (status === "Requires Approval"){
        return 'mdi-dots-horizontal-circle'
      }else if (status === "Complete") {
        return 'mdi-check-circle'
      }else if (status === "Incomplete"){
        return 'mdi-alert'
      }
    }
  }
}
</script>
