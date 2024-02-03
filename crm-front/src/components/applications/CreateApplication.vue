<template>
  <h3 class="text-center text-dark">Расход</h3>

  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-4 col-sm-12">
<!--        <div class="form-group m-1">-->
<!--          <label for="name">имя:</label>-->
<!--          <input type="text" class="form-control" v-model="e.name" id="name">-->
<!--        </div>-->

        <div class="form-group m-1">
          <label for="warehouse">выбрать проект:</label>
          <select class="form-control" v-model="expense.project_id" id="warehouse">
            <option value="" disabled selected>
              {{ 'выберите проект' }}
            </option>
            <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</option>
          </select>
        </div>

        <div class="form-group m-1">
          <label for="name">цена:</label>
          <input type="text" class="form-control" v-model="expense.price" id="price">
        </div>

        <div class="form-group m-1">
          <label for="warehouse">валюта:</label>
          <select class="form-control" v-model="expense.currency_id" id="warehouse">
            <option value="" disabled selected>
              {{ 'валюта' }}
            </option>
            <option v-for="currency in currencies" :key="currency.id" :value="currency.id">
              {{ currency.display_name }}
            </option>
          </select>
        </div>

        <div class="form-group m-1">
          <label for="name">количество:</label>
          <input type="text" class="form-control" v-model="expense.amount" id="amount">
        </div>

        <div class="form-group m-1">
          <label for="warehouse">величина:</label>
          <select class="form-control" v-model="expense.measurement_id" id="warehouse">
            <option value="" disabled selected>
              {{ 'величина' }}
            </option>
            <option v-for="measurement in measurements" :key="measurement.id" :value="measurement.id">
              {{ measurement.display_name }}
            </option>
          </select>
        </div>

        <div class="form-group m-1">
          <label for="warehouse">выбрать ресурс:</label>
          <select class="form-control" v-model="expense.income_id" id="warehouse">
            <option value="" disabled selected>
              {{ 'выберите ресурс' }}
            </option>
            <option v-for="income in incomes" :key="income.id" :value="income.id">{{ income.name }}</option>
          </select>
        </div>

        <div class="form-group m-1">
          <label for="status">категория расхода:</label>
          <select class="form-control" v-model="expense.category_id" id="status">
            <option disabled value="">Выбрать ответсвенного</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.display_name }}
            </option>
          </select>
        </div>

        <div class="form-group m-1">
          <label for="status">статус:</label>
          <select class="form-control" v-model="expense.status" id="status">
            <option value="куплено">в просрочку</option>
            <option value="в процессе">наличными</option>
          </select>
        </div>

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
      editing: false,
      method: 'post',
      application: {
        type: '',
        title: '',
        body: 0,
        status: 0,
      }
    };
  },
  methods: {
    saveData() {
      this.$store.commit('isLoading', true);

      const application = {
        type: this.application.type,
        title: this.application.title,
        body: this.application.body,
        status: this.application.status,
      };

      let apiUrl = '/applications';

      if (this.editing) {
        this.method = 'put';
        apiUrl += `/${this.expense.id}`;
      }

      this.$http[this.method](apiUrl, application, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('authToken') ? `Bearer ${localStorage.getItem('authToken')}` : sessionStorage.getItem('authToken'),
        },
      })
          .then((response) => {
            this.$store.commit('setNotify', {isActive: true, text: 'success!', color: 'lightgreen'});
            console.log('Data saved successfully:', response.data);
            this.$router.push({name: 'applications'});
          })
          .catch(error => {
            this.$store.commit('setNotify', {isActive: true, text: error.message, color: '#ffdddd'});
          })
          .finally(() => {
            this.$store.commit('isLoading', false);
          });
    },
  },
  mounted() {
    const editingApplication = localStorage.getItem('editinApplication');
    if (editingApplication) {
      this.editing = true;
      this.expense = JSON.parse(editingApplication);
      localStorage.removeItem('editingApplication');
    }
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
