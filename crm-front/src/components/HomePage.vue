<template>
  <div class="container">
    <ul class="projects-list">
      <router-link
          v-for="(project, i) in projects"
          :key="i"
          :to="'/project_details/' + project.id"
          class="projects-list__item"
          :style="{ backgroundImage: `url('${project.img_url}')` }"
      >
        <li>
          <p>имя: {{ project }}</p>

        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      projects: [
        {
          'id':1
        },
        {
          'id':2
        }
      ]
    }
  },
  methods: {
    load() {
      this.$store.commit('isLoading', true);

      this.$http.get('/projects/main', {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': '*',
          'Authorization': localStorage.getItem('authToken') ? `Bearer ${localStorage.getItem('authToken')}` : sessionStorage.getItem('authToken'),
        },
      })
          .then((response) => {
            this.$store.commit('setNotify', {
              isActive: true,
              text: 'success! ' + response.statusText,
              color: 'lightgreen'
            });
            this.projects = response.data.data;
          })
          .catch(error => {
            this.$store.commit('setNotify', {isActive: true, text: error.message, color: 'red'});
          }).finally(() => {
        this.$store.commit('isLoading', false);
      });
    },
    totalExpenseAmount(project) {
      return project?.expenses?.amount;
    },
  },
  created() {
    this.load();
    this.totalExpenseAmount();

  }
};
</script>

<style scoped>
.projects-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 15px;
  justify-content: center;
}

.projects-list__item {
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  width: 300px;
  height: 300px;
  padding: 10px;
}

.projects-list__item a {
  color: gray;
  text-decoration: none;
}
@media (max-width: 767px) {
  .projects-list {
    grid-template-columns: auto; /* Change to a single column for smaller screens */
  }

  .projects-list__item {
    width: 100%; /* Full width for each item in a single column layout */
    height: auto; /* Adjust height as needed */
  }
}
</style>
