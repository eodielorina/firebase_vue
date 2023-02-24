<template>
    <div class="container-fluid" >
    <h1>Secteur</h1>
    <div class="text-right">
                      <button class="btn btn-primary btn-sm" @click=" addsecteur" type="button"  >
                       <i class="fas fa-plus text-end"></i> Nouveau
                    </button>  
      </div> 
    <div class="wrap">
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
                 
                    <div class="row">
                        <div class="col-12">
                            <div class="form-group">
                                <label for="">Nom Secteur</label>
                                      <input type="hidden" id="id_secteur" v-model="secteur.id">
                                       <input type="text" name="nom_secteur"  id="nom_secteur" class="form-control " placeholder="Nom" v-model="secteur.nom_secteur" >
                            </div>
                        </div>
                       
                        <div class="col-12">
                            <div class="form-group">
                                <label for="id_personne">Personne</label>
                                <select name="id_personne" v-model="secteur.id_personne" id="id_personne" class="form-control form-control-sm">
                                    <option value="" disabled selected> choisissez une personne</option>
                                    <option v-for="(p,index_p) in personnel" :key="index_p" :value="p.id"> {{p.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-group">
                                <label for="Description">Description</label>
                                <textarea type="text" v-model="secteur.description" name="description" class="form-control form-control-sm" id="qte_achat"></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                          <label for="image"> Images</label>
                            <input type="file" @change="uploadImage" class="form-control">
                          </div>
                           <div class="form-group d-flex">
                      <!-- <div class="p-1" v-for="(image, index) in secteur.image">
                          <div class="img-wrapp">
                              <img :src="image" alt="" width="80px">
                              <span class="delete-img" @click="deleteImage(image,index)">X</span>
                          </div>
                      </div> -->
                    </div>
                        <div class="modal-footer">
                             <b-button variant="secondary" @click="closeModal()">Fermer</b-button>
                             <b-button type="submit" variant="primary" name="submit" >Enregistrer</b-button>
    
                          </div>
                        </div>
                
                        </form>
                    </b-modal>
                    </div>
    <table  class="table table-bordered mt-3">
            <thead>
            <tr>
              <th >Secteur</th>
              <th >Personnel</th>
              <th >Description</th>
              <th >Action</th>
            
            </tr>
          </thead>
          <tbody>
           <tr v-for="sec in secteur_personnel" :key="sec.key">
            <td >{{sec.nom_secteur}}  </td> 
            <td >{{sec.name}} &nbsp; </td>
            <!-- <td >{{sec.id_personne}} &nbsp; </td> -->
            <td >{{sec.description}}</td>
           <td>
            <button @click="getSecteurId(sec.key);" class="btn btn-secondary btn-sm mt-1" ><span class="fas fa-pencil-alt"></span>Editer</button> 
            &nbsp;
            <button @click="remove(sec.key)" class="btn btn-danger btn-sm"><span class="fas fa-trash"></span>Supprimer</button></td>
          </tr>
        </tbody>
    </table>
    </div>
  
  </template>
  <script src="./Secteur.js"></script>
  
  
  