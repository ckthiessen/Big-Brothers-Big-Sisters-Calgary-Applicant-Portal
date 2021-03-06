<template>
  <v-container fluid style="margin: 0 auto 0 auto; padding: 0px; width: 90%">
    <bbbs-header
      @newNotif="displayNotification"
      fluid
      style="margin: 0 auto 0 auto; padding: 0px; width: 90%"
    ></bbbs-header>
    <carousel></carousel>
    <v-card class="mx-auto">
      <v-data-table
        :headers="Headers"
        :items="tasks"
        item-key="index"
        class="elevation-1"
        :hide-default-footer="true"
        disable-pagination
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-card-title>{{ applicantName }}</v-card-title>
            <v-spacer></v-spacer>
            <v-switch
              class="mt-6"
              :label="userType"
              color="accent"
              :loading="switchLoading"
              :v-model="isCommunityMentor"
              @change="toggleUserType"
            ></v-switch>
          </v-toolbar>
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip :color="getColor(item.status)" text-color="white">
            <v-icon class="pl-1" color="white" left>
              {{ getIcon(item.status) }}
            </v-icon>
            {{ item.status }}
          </v-chip>
        </template>
        <template v-slot:item.upload="{ item }">
          <v-icon v-if="!item.fileUpload" color="accent">
            {{ downloadIcons.noUpload }}</v-icon
          >
          <bbbs-download
            v-if="item.fileUpload"
            :task="item"
            class="ml-n5"
          ></bbbs-download>
        </template>
        <template v-slot:item.buttonTitle="{ item }">
          <td>
            <v-btn
              color="accent"
              dark
              v-if="!noActions.includes(item.name)"
              @click="changeStatus(item.status, tasks.indexOf(item))"
              rounded
            >
              {{ item.buttonTitle }}
            </v-btn>
          </td>
        </template>
      </v-data-table>
      <bbbs-footer></bbbs-footer>
    </v-card>
    <v-snackbar v-model="snackbar" color="accent">
      {{ notif }}
      <template v-slot:action="{ attrs }">
        <v-btn align="right" icon v-bind="attrs" @click="snackbar = false">
          <v-icon small>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Carousel from "../components/Carousel.vue";
import Download from "../components/Download.vue";
import { updateUser } from "../services/apiServices"
import firebase from "firebase";

export default {
  name: "AdminApplicant",
  components: {
    "bbbs-header": Header,
    "bbbs-footer": Footer,
    "carousel": Carousel,
    "bbbs-download": Download,
  },
  data() {
    return {
      applicantID: "",
      adminID: "",
      applicantName: "",
      tasks: [],
      selectedIndex: "",
      switchLoading: false,
      notif: "",
      snackbar: false,
      isCommunityMentor: false,
      downloadIcons: {
        noUpload: "mdi-download-off-outline",
        upload: "mdi-cloud-download",
        uploadComplete: "mdi-cloud-check",
      },
      Headers: [
        {
          text: "Task Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        {
          text: "Due date",
          align: "start",
          sortable: true,
          value: "dueDate",
        },
        {
          text: "Completion Status",
          align: "start",
          value: "status",
        },
        {
          text: "Download",
          align: "start",
          sortable: false,
          value: "upload",
        },
        {
          text: "Change Status",
          sortable: false,
          align: "middle",
          value: "buttonTitle",
        },
      ],
      noActions: [
        "BIG Profile",
        "You are a BIG Deal!",
      ],
    };
  },
  computed: {
    userType: function () {
      return this.isCommunityMentor ? "Community Mentor" : "Education Mentor";
    }
  },
  created() {
    this.adminID = this.$route.params.adminID;
    this.applicantID = this.$route.params.applicantID;
    this.renderUser();
  },
  methods: {
    async updateUser(applicant) {
      await updateUser(applicant).then((response) => {
        this.applicant = response.data;
        this.$emit("emitToApp", response.data);
      });
    },
    async toggleUserType() {
      this.switchLoading = true;
      try {
        await firebase.functions().httpsCallable('updateApplicantType')({ id: this.applicantID, isCommunityMentor: !this.isCommunityMentor });
        this.isCommunityMentor = !this.isCommunityMentor;
        this.switchLoading = false;
      } catch (err) {
        this.notif = err.message;
        this.snackbar = true;
        this.switchLoading = false;
        setTimeout(() => {
          this.snackbar = false;
        }, 5000);
      }
    },
  async renderUser() {
    let doc;
    try {
      doc = await firebase.functions().httpsCallable("getUserByID")({
        id: this.applicantID
      });
    } catch (err) {
      this.displayNotification(err.message);
    }
    this.applicantName = doc.data.name;
    this.isCommunityMentor = doc.data.isCommunityMentor;
    let servertasks = doc.data.tasks;
    for (const task in servertasks) {
      if (servertasks[task].isSubmitted && servertasks[task].isApproved) {
        servertasks[task].status = "Complete";
        servertasks[task].buttonTitle = "Mark Incomplete";
      } else if (servertasks[task].isSubmitted && !servertasks[task].isApproved) {
        servertasks[task].status = "Requires Approval";
        servertasks[task].buttonTitle = "Mark Complete";
      } else if (!servertasks[task].isSubmitted && !servertasks[task].isApproved) {
        servertasks[task].status = "Incomplete";
        servertasks[task].buttonTitle = "Mark Complete";
      }
      this.tasks.push(servertasks[task]);
    }
  },
    async changeStatus(status, index) {
      let selectedTask = this.tasks[index];
      let notification;
      if (
        selectedTask.status === "Requires Approval" ||
        selectedTask.status === "Incomplete"
      ) {
        selectedTask.status = "Complete";
        selectedTask.buttonTitle = "Mark Incomplete";
        notification = `An administrator has approved ${selectedTask.name}`
        selectedTask.isSubmitted = true;
        selectedTask.isApproved = true;
      } else if (selectedTask.status === "Complete") {
        selectedTask.status = "Incomplete";
        selectedTask.buttonTitle = "Mark Complete";
        selectedTask.isSubmitted = false;
        selectedTask.isApproved = false;
        notification = `An administrator has rejected your submission for ${selectedTask.name}`
      }

      let serverTasks = [];
      this.tasks.forEach((task) => {
        let serverTask = {
          dueDate: task.dueDate,
          name: task.name,
          fileUpload: task.fileUpload, 
        };
        if (task.name === selectedTask.name) {
          serverTask.isSubmitted = selectedTask.isSubmitted;
          serverTask.isApproved = selectedTask.isApproved;
        } else {
          serverTask.isSubmitted = task.isSubmitted;
          serverTask.isApproved = task.isApproved;
        }
        serverTasks.push(serverTask);
      });

      try {
        await firebase.functions().httpsCallable("adminUpdateTasks")({
          id: this.applicantID,
          serverTasks,
          notification
        });
      } catch (err) {
        this.displayNotification(err.message);
      }
    },

    getColor(status) {
      if (status === "Requires Approval") {
        return "inprogress";
      } else if (status === "Complete") {
        return "accent";
      } else {
        return "red";
      }
    },

    getIcon(status) {
      if (status === "Requires Approval") {
        return "mdi-dots-horizontal-circle";
      } else if (status === "Complete") {
        return "mdi-check-circle";
      } else if (status === "Incomplete") {
        return "mdi-alert";
      }
    },

    displayNotification(message) {
      this.notif = message;
      this.snackbar = true;
      setTimeout(() => {
        this.snackbar = false;
      }, 5000);
    },
  },
};
</script>