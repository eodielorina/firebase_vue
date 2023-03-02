<template>
    <div class="container-fluid" >
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
              <ul class="nav navbar-nav ms-auto">
                <li class="nav-item ">
                <p class="text-right">{{user.displayName}}</p>
              </li>&nbsp;&nbsp;
              <li class="nav-item ">
                    <button type="submit"  class="btn btn-dark btn-lg   pull-right" @click="logOut()">
                      <i class="fa fa-sign-out-alt "></i>
                    </button> 
                  </li>
           </ul>
          </div>
      </nav>
        <h1>Personnel</h1>
      <br>
      <div class="text-right ms-auto">
        <button class="btn btn-primary btn-sm" @click=" addpers" type="button"  >
          <i class="fas fa-plus text-end "></i> Nouveau
        </button>  
      </div> 
      <div class="form-group">
                   <b-modal
                          id="modal_simple"
                          :title="titlemodal"
                          size="lg"
                          scrollable
                          hide-footer
                          centered
                          no-close-on-backdrop
                    >
                        <form method="post"  id="formulaire" v-on:submit.prevent="add" enctype="multipart/form-data">
                            <div class="row"  >
                                 <div class="col-md-6">
                                    <div class="form-group">
                                       <label for="">Nom</label>
                                      <input type="hidden" id="id_personne" v-model="personne.id">
                                       <input type="text" name="name"  id="name" class="form-control " placeholder="Nom" v-model="personne.name" >
                                     </div>
                                 </div>
                                 <div class="col-6">
                                    <div class="form-group">
                                        <label for="">Email</label>
                                        <input type="email" name="email"  id="email" placeholder="Email" class="form-control" v-model="personne.email"  >
                                    </div>        
                                 </div>
                                 <div class="col-md-6">
                                    <div class="form-group">
                                       <label for="">matricule</label>
                                       <input type="text" name="matricule"  id="matricule" class="form-control " placeholder="matricule" v-model="personne.matricule" >
                                     </div>
                                 </div>
                                 <div class="col-6">
                                    <div class="form-group">
                                        <label for="">poste</label>
                                        <input type="poste" name="poste"  id="poste" placeholder="poste" class="form-control" v-model="personne.poste"  >
                                    </div>        
                                 </div>
                                <div class="col-6">
                                  <div class="form-group">
                                      <label for="">Téléphone</label>
                                      <input type="phone" name="telephone"  id="telephone" placeholder="Téléphone" class="form-control" v-model="personne.telephone" >
                                  </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-group">
                                          <label for="">Adresse</label>
                                          <input type="adresse" name="adresse"   id="adresse" placeholder="Adresse" class="form-control" v-model="personne.adresse" >
    
                                    </div>
                                </div>
                             </div> 
                             <!-- image personnel -->
                        <div class="form-group">
                          <label for="image"> Images</label>
                            <input type="file" @change="uploadImage" class="form-control" >
                            <input type="hidden" name="image" id=""  v-model="personne.image">
                        </div>
                        <div class="row">
                <div class="col-3">
                   <div class="card" style="height: 300px!important;overflow: hidden!important;padding:0.5rem!important;width: 700px!important;">
                    <img 
                              class="card-img-top img-fluid"
                              alt="Image"
                              :src="personne.image"
                              style="width: 100%!important;height: auto!important;"/>
                      
                    </div>
              </div>
           </div>
            <div class="modal-footer">
              <b-button variant="secondary" @click="closeModal()">Fermer</b-button>
              <b-button type="submit" variant="primary" name="submit" >Enregistrer</b-button>
            </div>
         </form>

   </b-modal>
          </div>
      
          <table  class="table table-bordered mt-3">
            <thead>
            <tr>
              <th >Nom</th>
              <th >Matricule</th>
              <th >Poste</th>
              <th >Email</th>
              <th >Télephone</th>
              <th >Adresse</th>
              <th >Images</th>
              <th >Action</th>
            </tr>
          </thead>
          <tbody>
           <tr v-for="pers in personnes" :key="pers.key">
            <td >{{pers.name}}  </td> 
            <td >{{pers.matricule}}  </td> 
            <td >{{pers.poste}}</td>
            <td >{{pers.email}}</td>
            <td >{{pers.telephone}}</td>
            <td >{{pers.adresse}}</td>
            <td>
              <div class="form-group d-flex">
                  <div class="img-wrapp">
                    <!-- {{pers.image}} -->
                      <!-- <nw-img :src="pers.image" alt="" width="150px"></nw-img> -->
                      <!-- <img :data-src="pers.image" class="lazyload" width="150px" /> -->
                      <!-- <img v-lazysizes :data-src="pers.image" width="150px"/> -->
                      <nw-img :src="pers.image" width="150px"/>
                  </div>
                </div>
            </td>
           <td>
            <button @click="getPersonId(pers.key);" class="btn btn-secondary btn-sm mt-1" ><span class="fas fa-pencil-alt"></span></button> 
            &nbsp;
            <button @click="remove(pers.key)" class="btn btn-danger btn-sm"><span class="fas fa-trash"></span></button></td>
          </tr>
        </tbody>
    
          </table>
       
      </div>
    </template> 
    <script src="./Personnel.js"></script>
    <!-- <script src="./lazysizes.min.js" async></script> -->