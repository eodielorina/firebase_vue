<template>
    <div class="vue-tempalte">
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
        <form @submit.prevent="forgetPassword">
            <h3>Mot de passe oublié</h3>
            <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control form-control-lg" v-model="user.email" />
            </div>
            <button type="submit" class="btn btn-dark btn-lg btn-block">Réinitialiser mot de passe</button>
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
        email: ''
      }
    };
  },
  methods: {
    forgetPassword() {
        firebase
        .auth()
        .sendPasswordResetEmail(this.user.email)
        .then(() => {
            alert('verifier votre  email pour réinitialiser votre mot de passe!')
            this.user = {   
              email: ''
            }
        }).catch((error) => {
          alert(error)
        })
    }
  }
};
</script>