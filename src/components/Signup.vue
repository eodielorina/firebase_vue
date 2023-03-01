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
        <form @submit.prevent="userRegistration">
            <h3>Register</h3>
            <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control form-control-lg" v-model="user.name" />
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control form-control-lg" v-model="user.email" />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" v-model="user.password" />
            </div>
            <button type="submit" class="btn btn-dark btn-lg btn-block">
               Register
            </button>
            <p class="forgot-password text-right">
               Vous avez dejà un compte
                <router-link :to="{name: 'login'}">Login?</router-link>
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
        name: '',
        email: '',
        password: ''
      }
    };
  },
  methods: {
    userRegistration() {
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.user.email, this.user.password)
      .then((res) => {
        res.user
          .updateProfile({
            displayName: this.user.name
          })
          .then(() => {
            this.$router.push('/login')
          });
      })
      .catch((error) => {
         alert("Utilisateur existe déjà");
      });
    }
  }
};
</script>