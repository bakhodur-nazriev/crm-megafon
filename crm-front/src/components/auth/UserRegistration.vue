<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-xl-5 col-lg-6 col-md-9">
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <div class="row p-5">
              <div class="text-center">
                <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
              </div>
              <form class="user" @submit.prevent="register">
                <div class="form-group">
                  <input
                      type="email"
                      class="form-control form-control-user"
                      id="name"
                      aria-describedby="emailHelp"
                      placeholder="Enter Name..."
                      v-model="name"
                      required
                  >
                </div>
                <div class="form-group">
                  <input
                      type="email"
                      class="form-control form-control-user"
                      id="email"
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
                      id="password"
                      placeholder="Password"
                      v-model="password"
                      required
                  >
                </div>
                <div class="form-group">
                  <input
                      type="password"
                      class="form-control form-control-user"
                      id="repeat_password"
                      placeholder="Repeat Password"
                      v-model="password_confirmation"
                      required
                  >
                </div>
                <button
                    type="submit"
                    class="btn btn-primary btn-user btn-block"
                >
                  Register!
                </button>
              </form>
              <hr>
              <div class="text-center">
                <router-link class="small" to="register">Already have and account? Login</router-link>
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
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    };
  },
  mounted() {
  },
  methods: {
    register() {
      this.$http.post('/users/register',
          {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation,
          })
          .then((response) => {
            this.$store.commit('setNotify', {isActive: true, text: 'success!', color: 'lightgreen'});
            const authToken = response.data.token;

            localStorage.setItem('authToken', authToken);

            this.$router.push({name: 'login'});
          })
          .catch(error => {
            console.error('Login failed', error);
          })
          .finally(() => {
            this.$store.commit('isLoading', false);
          });
    },
  },
};
</script>

<style scoped>
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

button {
  background-color: #3498db;
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

a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

form.user .form-control-user {
  font-size: .9rem;
  border-radius: 8px;
  padding: 1rem;
}

.btn-block {
  width: 100%;
}
</style>
