<template>
  <div>
  <h1>This is the individual applicant view for the admin</h1>
  <Header></Header>
    <v-data-table
    :headers="Headers"
    :items="tasks"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="name"
    show-expand
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{applicant.name}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-switch
          v-model="singleExpand"
          label="Single expand"
          class="mt-2"
        ></v-switch>
      </v-toolbar>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        More info about {{ item.name }}
        <v-btn
            class="float-right mt-5"
            :disabled="item.value == 'Incomplete'"
            @click="changeStatus(item.status, tasks.indexOf(item))"
        >
          {{buttonTitle(item.status)}}
        </v-btn>
      </td>
    </template>
    <template v-slot:item.status="{ item }">{{item.status}}</template>
    <template v-slot:item.upload="{ item }">
      <v-icon color="accent"> {{item.upload ? downloadIcons.upload : downloadIcons.noUpload}}</v-icon>
    </template>
  </v-data-table>
  <Footer></Footer>
  </div>
</template>

<script>
  import Header from "../components/Header.vue"
  import Footer from "../components/Footer.vue"
  import {getUserByID, updateUser} from "../services/apiServices"
;
export default {
  name: 'AdminApplicant',

  components: {
    'Header': Header,
    'Footer': Footer
  },

  created(){
    this.id = this.$route.params.id;
    //console.log(this.id)
    getUserByID(this.id).then(res => {
      this.applicant = res
      for (const task in res.tasks) {
        if(res.tasks[task].isApproved && res.tasks[task].isApproved){
          res.tasks[task].status = "Complete";
        }else if(res.tasks[task].isSubmitted && !res.tasks[task].isApproved){
          res.tasks[task].status = "Requires Approval"
        }else if(!res.tasks[task].isApproved && !res.tasks[task].isApproved){
          res.tasks[task].status = "Incomplete"
        }
        this.tasks.push(res.tasks[task])
      }
    });
  },

  data(){
    return {
        expanded: [],
        singleExpand: false,
        id: '',
        applicant: [],
        tasks: [],
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
        downloadIcons: {
        noUpload: "mdi-cloud-off-outline",
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
            value: 'upload',
          }
        ],
      }
  },
  methods: {
    async updateUser(){
      await updateUser(this.id).then(response => {
        this.applicant = response;
        this.$emit('emitToApp', response);
    });
    },
    
    buttonTitle(status) {
      return (status === "Requires Approval" || status === "Incomplete") ? "Mark Complete" : "Mark Incomplete"
    },
    
    changeStatus(status, index) {
      let selectedTask = this.tasks[index];
      if (selectedTask.status === "Requires Approval") {
        selectedTask.status = "Complete";
      }else if (selectedTask.status === "Complete") {
        selectedTask.status === "Incomplete";
      }
    },
  }
}
</script>
