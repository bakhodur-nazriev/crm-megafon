<template>
  <div class="m-2">
    <router-link
        to="/create_applications"
        class="custom-link"
    >
      + Добавить
    </router-link>

    <hr class="my-4 stylish-line">

    <div class="m-1">
      <span class="text-info">Расходы</span>
    </div>

    <div class="row">
      <div class="col-md-3">
        <label for="">проект:</label>
        <select class="form-control" v-model="projectId" id="">
          <option v-for="type in applicationType" :key="type.id" :value="type.id">{{ type.name }}</option>
          <option value="all">Все</option>
        </select>
      </div>
    </div>
    <br/>
    <table class="table table-striped table-bordered">
      <thead>
      <tr>
        <th>Тип</th>
        <th>Имя</th>
        <th>Текст</th>
        <th>Статус</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(application, index) in applications" :key="index" class="table-row">
        <td>{{ application?.type }}</td>
        <td>{{ application?.title }}</td>
        <td>{{ application?.body }}</td>
        <td>{{ application?.status }}</td>
        <td class="d-flex">
          <button class="m-1 btn btn-primary" @click="editItem(application)">
            <font-awesome-icon icon="pen-to-square"/>
          </button>

          <button class="m-1 btn btn-danger" @click="deleteItem(application.id)">
            <font-awesome-icon icon="trash-can"/>
          </button>
        </td>

      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";

library.add(
    faPenToSquare,
    faTrashCan
)

export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      applicationType: [
        {
          id: 1,
          name: 'application'
        },
        {
          id: 2,
          name: 'complaint'
        }
      ],
      projectId: null,
      applications: [],
    };
  },
  methods: {
    loadApplications() {
      this.$store.commit('isLoading', true);

      this.$http.get('/applications',
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem('authToken') ? `Bearer ${localStorage.getItem('authToken')}` : sessionStorage.getItem('authToken'),
            },
          })
          .then((response) => {
            this.$store.commit('setNotify', {
              isActive: true,
              text: 'success!' + response.data.message,
              color: 'lightgreen'
            });
            this.applications = response.data;
          })
          .catch(error => {
            this.$store.commit('setNotify', {isActive: true, text: error.message, color: 'red'});
          })
          .finally(() => {
            this.$store.commit('isLoading', false);
          });
    },
    deleteItem(itemId) {
      this.$store.commit('isLoading', true);
      this.$http.delete(`${process.env.VUE_APP_BACK_URL}/applications/${itemId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem('authToken') ? `Bearer ${localStorage.getItem('authToken')}` : sessionStorage.getItem('authToken'),
            },
          })
          .then((response) => {
            this.$store.commit('setNotify', {isActive: true, text: 'success!', color: 'lightgreen'});
            console.log('Item deleted successfully:', response.data);
          })
          .catch(error => {
            this.$store.commit('setNotify', {isActive: true, text: error.message, color: 'red'});
          })
          .finally(() => {
            this.$store.commit('isLoading', false);
          });
      this.removeItemById(itemId)
    },

    editItem(editingApplication) {
      localStorage.setItem('editingApplication', JSON.stringify(editingApplication));
      this.$router.push({name: 'edit_applications'});
    }
  },
  mounted() {
    this.loadApplications();
  }
};
</script>

<style scoped>
.stylish-line {
  border: 1px solid #a0cc9d;
  border-radius: 5px;
}

.custom-link {
  text-decoration: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: max-content;
  background-color: #7cc3d9;
  padding: 10px;
  border-radius: 8px;
  color: #fff;
}

.custom-link:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Adjusted shadow on hover */
}

.popup-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: lightblue;
  width: 30%;
  height: 10%;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.popup-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 10px;
}

.popup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
}

button:hover {
  background-color: #adcbec;
  color: #000000;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
}

table {
  display: block;
  max-width: -moz-fit-content;
  max-width: fit-content;
  margin: 0 auto;
  overflow-x: auto;
  white-space: nowrap;
}
</style>
