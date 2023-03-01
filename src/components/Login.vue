<template>
    <div class="vue-tempalte ">
      <div class="vertical-center">
          <div class="inner-block">
      <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
        <div class="container">
          <a class="navbar-brand float-left" target="_blank">
             Firebase.vue
          </a>
          <ul class="nav navbar-nav flex-row float-right">
            <li class="nav-item">
              <router-link class="nav-link pr-3" to="/login">Login</router-link>
            </li>&nbsp;
            <li class="nav-item">
              <router-link class="btn btn-outline-primary" to="/">S'enregistrer</router-link>
            </li>
          </ul>
        </div>
      </nav>
        <form @submit.prevent="userLogin">
            <h3>Login</h3>
            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control form-control-lg" v-model="user.email" />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" v-model="user.password" />
            </div>
            <button type="submit" class="btn btn-dark btn-lg btn-block">Login</button>
            <p class="forgot-password text-right mt-2 mb-4">
                <router-link to="/forgot-password">Mot de passe oublié ?</router-link>
            </p>
        </form>
    </div>
  </div>
    </div>

</template>

<script>
import firebase from "firebase";
import '@/assets/css/main.css'
export default {
  data() {
    return {
      user: {   
        email: '',
        password: ''
      }
    };
  },
  methods: {
    userLogin() {
        firebase
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(() => {
            this.$router.push('/personnel')
        })
        .catch((error) => {
          alert("Mot de passe incorrecte");
        });
    }
  }
};
</script>