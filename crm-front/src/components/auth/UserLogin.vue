<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-xl-5 col-lg-6 col-md-9">
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <div class="row p-5">
              <div class="text-center">
                <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
              </div>
              <form class="user" @submit.prevent="login">
                <div class="form-group">
                  <input
                      type="email"
                      class="form-control form-control-user"
                      id="exampleInputEmail"
                      aria-describedby="emailHelp"
                      placeholder="Enter Email Address..."
                      v-model="email"
                      required
                  >
                </div>
                <div class="form-group">
                  <input
                      type="password"
                      class="form-control form-control-user"
                      id="exampleInputPassword"
                      placeholder="Password"
                      v-model="password"
                      required
                  >
                </div>
                <button
                    type="submit"
                    class="btn btn-primary btn-user btn-block"
                >
                  Login
                </button>
              </form>
              <hr>
              <div class="text-center">
                <router-link class="small" to="register">Create an Account!</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  data() {
    return {
      spinning: false,
      email: '',
      password: '',
      isMobile: false,
    };
  },
  mounted() {
    this.isMobile = window.innerWidth <= 600;
    window.addEventListener('resize', this.checkMobileView);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobileView);
  },
  methods: {
    checkMobileView() {
      this.isMobile = window.innerWidth <= 600;
    },
    login() {
      this.$store.commit('isLoading', true);
      this.$store.commit('setNotify', {isActive: true, color: 'lightgreen', text: 'logging....'});

      this.$http.post('/users/login',
          {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            this.$store.commit('setNotify', {isActive: true, text: 'success!', color: 'lightgreen'});
            const authToken = response.data.token;
            sessionStorage.setItem('authToken', authToken);
            const userName = response.data.user.name;
            const userId = response.data.user.id;
            const userRole = response.data.userRole[0];
            const roleId = response.data.user.roleId;

            localStorage.setItem('roleId', roleId);
            localStorage.setItem('userName', userName);
            localStorage.setItem('userId', userId);
            localStorage.setItem('authToken', authToken);
            localStorage.setItem('userRole', userRole);
            this.$router.push({name: 'main'});
            this.spinning = false;
          })
          .catch(error => {
            this.$store.commit('setNotify', {isActive: true, color: 'lightgreen', text: error.message});

            console.error('Login failed', error);
            this.$router.push({name: 'login'});
          })
          .finally(() => {
            this.$store.commit('isLoading', false);
          });
    },
  },
};
</script>

<style scoped>
form.user .form-control-user {
  font-size: .9rem;
  border-radius: 8px;
  padding: 1rem;
}

.btn-block {
  width: 100%;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #333;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

button {
  background-color: #3498db; /* Blue Button Color */
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
}

button:hover {
  background-color: #2980b9; /* Darker Blue on Hover */
}
</style>
