<template>
  <h3 class="text-center text-dark">Расход</h3>

  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-4 col-sm-12">
        <div class="form-group m-1">
          <label for="name">имя:</label>
          <input type="text" class="form-control" v-model="client.name" id="name">
        </div>

        <div class="form-group m-1">
          <!--          <label for="warehouse">выбрать проект:</label>-->
          <!--          <select class="form-control" v-model="client.project_id" id="warehouse">-->
          <!--            <option value="" disabled selected>-->
          <!--              {{ 'выберите проект' }}-->
          <!--            </option>-->
          <!--            <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</option>-->
          <!--          </select>-->
        </div>

        <!--        <div class="form-group m-1">-->
        <!--          <label for="name">цена:</label>-->
        <!--          <input type="text" class="form-control" v-model="client.price" id="price">-->
        <!--        </div>-->

        <!--        <div class="form-group m-1">-->
        <!--          <label for="status">статус:</label>-->
        <!--          <select class="form-control" v-model="client.status" id="status">-->
        <!--            <option value="куплено">в просрочку</option>-->
        <!--            <option value="в процессе">наличными</option>-->
        <!--          </select>-->
        <!--        </div>-->

        <button class="m-1 btn btn-primary text-white btn-block" @click="saveData">Cохранить</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      projects: [],
      incomes: [],
      categories: [],
      measurements: [],
      currencies: [],
      editing: false,
      method: 'post',
      client: {
        id: '',
        name: '',
        phone: ''
      }
    };
  },
  methods: {
    saveData() {
      this.$store.commit('isLoading', true);

      const income = {
        name: this.client.name,
        phone: this.client.phone,
      };

      let apiUrl = '/clients';

      if (this.editing) {
        this.method = 'put';
        apiUrl += `/${this.client.id}`;
      }

      this.$http[this.method](apiUrl, income, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('authToken') ? `Bearer ${localStorage.getItem('authToken')}` : sessionStorage.getItem('authToken'),
        },
      })
          .then((response) => {
            this.$store.commit('setNotify', {isActive: true, text: 'success!', color: 'lightgreen'});
            console.log('Data saved successfully:', response.data);
            this.$router.push({name: 'clients'});
          })
          .catch(error => {
            this.$store.commit('setNotify', {isActive: true, text: error.message, color: '#ffdddd'});
          }).finally(() => {
        this.$store.commit('isLoading', false);
      });
    },
  },
  mounted() {
  }
};
</script>

<style scoped>
table {
  display: block;
  max-width: -moz-fit-content;
  max-width: fit-content;
  margin: 0 auto;
  overflow-x: auto;
  white-space: nowrap;
}
</style>
