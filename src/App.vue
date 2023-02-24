<template>
  <div id="app">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">Firebase</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                  <li class="nav-item active">
                      <router-link to="/personnel" class="nav-link">
                          <span>Personnel</span>
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link to="/secteur" class="nav-link">
                          <span>Secteur</span>
                      </router-link>
                  </li> 
              </ul>
          </div>
      </nav>
      <router-view/>
  </div>
</template>
<script>
</script>

