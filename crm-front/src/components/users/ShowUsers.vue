<template>
  <div class="m-2">
    <router-link
        to="/create_user"
        class="text-white custom-link"
    >
      + Добавить
    </router-link>

    <hr class="my-4 stylish-line">

    <label class="text-info">Пользователи</label>

    <br/>
    <table class="table table-striped table-bordered">
      <thead>
      <tr>
        <th>имя</th>
        <th>имейл</th>
        <th>роль</th>
        <th>права</th>

        <th>действия</th>

      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, index) in users" :key="index">
        <td>{{ row.name }}</td>
        <td>{{ row.email }}</td>
        <td>
          <ul>
            <li v-for="(role, id) in row.roles" :key="id">{{ role.name }}</li>
          </ul>
        </td>

        <td>
          <ul>
            <li v-for="(permission, id) in row.permissions" :key="id">{{ permission.name }}</li>
          </ul>
        </td>


        <td>
          <button class="m-1 btn btn-primary" @click="editItem(row)">
            <font-awesome-icon icon="pen-to-square"/>
          </button>

          <button class="m-1 btn btn-danger" @click="deleteItem(row.id)">
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
import {faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {library} from "@fortawesome/fontawesome-svg-core";

library.add(
    faPenToSquare,
    faTrashCan
)

export default {
  components: {FontAwesomeIcon},
  data() {
    return {
      users: [],
      showPopup: false
    };
  },
  methods: {
    load() {
      this.$store.commit('isLoading', true);

      this.$http.get('/users?paginate=true',
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem('authToken') ? `Bearer ${localStorage.getItem('authToken')}` : sessionStorage.getItem('authToken'),
            },
          })
          .then((response) => {
            this.$store.commit('setNotify', {isActive: true, text: 'success!', color: 'lightgreen'});
            if (response.status === 200) {
              this.users = response.data.data;
            } else {
              this.showPopup = true;
            }
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


      this.$http.delete(`${process.env.VUE_APP_BACK_URL}/users/${itemId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': '*',
          'Authorization': localStorage.getItem('authToken') ? `Bearer ${localStorage.getItem('authToken')}` : sessionStorage.getItem('authToken'),
        },
      })
          .then((response) => {
            this.$store.commit('setNotify', {isActive: true, text: 'success!', color: 'lightgreen'});
            console.log('Item deleted successfully:', response.data);
          })
          .catch(error => {
            this.$store.commit('setNotify', {isActive: true, text: error.message, color: 'red'});
          }).finally(() => {
        this.$store.commit('isLoading', false);
      });
      this.removeItemById(itemId);
    },
    editItem(editinguser) {
      localStorage.setItem('editinguser', JSON.stringify(editinguser));
      this.$router.push({name: 'edit_user'});
    },
    removeItemById(itemId) {
      const index = this.users.findIndex((transfer) => transfer.id === itemId);

      if (index !== -1) {
        this.users.splice(index, 1);
      }
    },
  },
  mounted() {
    this.load();
  },
  computed: {
    role() {
      return localStorage.getItem('userRole');
    },
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
  border: none;
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
