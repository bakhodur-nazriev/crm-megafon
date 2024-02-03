<template>
  <h3 class="text-center text-dark">Создать пользователя</h3>

  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-4 col-sm-12">
        <div class="form-group m-1">
          <label for="name">имя: </label>
          <input type="text" class="form-control" v-model="user.name" id="name">
        </div>

        <div class="form-group m-1">
          <label for="name">email: </label>
          <input type="text" class="form-control" v-model="user.email" id="location ">
        </div>

        <div class="form-group m-1">
          <label for="name">password: </label>
          <input type="password" class="form-control" v-model="user.password" id="type">
        </div>


        <div class="form-group m-1">
          <label for="">роль: </label>
          <select class="form-control" v-model="user.roleName" id="">
            <option disabled value="">Выбрать роль</option>
            <option v-for="role in roles" :key="role.id" :value="role.name">{{ role.name }}</option>
          </select>
        </div>


        <div class="form-group m-1">
          <label for="">права: </label>
          <select multiple class="form-control" v-model="user.permissionNames" id="">
            <option disabled value="">Выбрать права</option>
            <option v-for="permission in permissions" :key="permission.id" :value="permission.name">{{ permission.name }}</option>
          </select>
        </div>

        <button class="m-1 btn btn-primary text-white btn-block" @click="save">Cохранить</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      roles: [],
      permissions: [],
      editing: false,
      method: 'post',
      user: {
        id: '',
        name: '',
        email: '',
        password: '',
        roleName: '',
        permissionNames: [],
      }
    };
  },
  methods: {
    save() {
      this.$store.commit('isLoading', true);

      const data = {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
        permission_names: this.user.permissionNames,
        role_name: this.user.roleName,
      };

      let apiUrl =  '/users';

      if (this.editing) {
        this.method = 'put';
        // If editing, append the id to the URI
        apiUrl += `/${this.user.id}`;
      }

      this.$http[this.method](apiUrl, data, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': '*',
          'Authorization': localStorage.getItem('authToken') ? `Bearer ${localStorage.getItem('authToken')}` : sessionStorage.getItem('authToken'),
        },
      })
          .then((response)=>{
       this.$store.commit('setNotify', {isActive: true, text: 'success!', color: 'lightgreen'});
            console.log('Data saved successfully:', response.data);
            this.$router.push({ name: 'users' });
          })
          .catch(error => {
            this.$store.commit('setNotify', {isActive: true, text: error.message, color:'#ffdddd'});
          }).finally(() => {
        this.$store.commit('isLoading', false);
      });
    },
    loadRolesAndPermissions() {
      this.$store.commit('isLoading', true);

      this.$http.get(`${process.env.VUE_APP_BACK_URL}/users/roles_and_permissions`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': '*',
          'Authorization': localStorage.getItem('authToken') ? `Bearer ${localStorage.getItem('authToken')}` : sessionStorage.getItem('authToken'),
        },
      })
          .then(response => {
              this.$store.commit('setNotify', {isActive: true, text: 'success!', color: 'lightgreen'});
              this.roles = response.data.roles;
              this.permissions = response.data.permissions;
              console.log(response.data)
          })
          .catch(error => {
            this.$store.commit('setNotify', {isActive: true, text: error.message, color: 'red'});
          }).finally(() => {
        this.$store.commit('isLoading', false);
      });
    },
  },
  mounted() {
    const editinguser = localStorage.getItem('editinguser');
    if (editinguser) {
      this.editing = true;
      this.user = JSON.parse(editinguser);
      localStorage.removeItem('editinguser');
    }
    this.loadRolesAndPermissions();
  }
};
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
