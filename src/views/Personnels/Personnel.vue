<template>
    <div class="container-fluid" >
        <h1>Personnel</h1>
      
      <div class="text-right">
                      <button class="btn btn-primary btn-sm" @click=" addpers" type="button"  >
                       <i class="fas fa-plus text-end"></i> Nouveau
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
                    
                            <b-form-file
                               v-model="fichier"
                              :state="Boolean(fichier)"
                               placeholder="Choisisser votre fichier"
                               drop-placeholder="Placer votre fichier ici..."
                              name="file-input"
                              class="mt-1"
                              @change="uploadFile($event)"
                              multiple plain
                            ></b-form-file>
                             </div>
          <div class="row">
            <div class="col-3" v-for="(img,index_img) in sary" :key="index_img+'llll'">
              <input type="hidden" name="image[]" id=""  v-model="img.nom_image">
          
                  <div class="card" style="height: 300px!important;overflow: hidden!important;padding:0.5rem!important;width: 90%!important;">
                      <img
                              class="card-img-top img-fluid"
                              alt="Image"
                              :src="img.image"
                              id="photos"
                              style="width: 100%!important;height: auto!important;"
                      />
                   </div>

                  <button @click="deleteImage(index_img,img)" type="button" class="btn btn-block btn-danger btn-sm mb-3 mt-1" style="width: 70%!important;"><i class="fa fa-times"></i> Supprimer</button>
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
              <!-- <th >Images</th> -->
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
            <!-- <td >
              <img
                              class="card-img-top img-fluid"
                              alt="Image"
                              :src="pers.image"
                              id="photos"
                              style="width: 120px!important;"
                      />
            </td> -->

           <td>
            <button @click="getPersonId(pers.key);" class="btn btn-secondary btn-sm mt-1" ><span class="fas fa-pencil-alt"></span>Editer</button> 
            &nbsp;
            <button @click="remove(pers.key)" class="btn btn-danger btn-sm"><span class="fas fa-trash"></span>Supprimer</button></td>
          </tr>
        </tbody>
    
          </table>
       
      </div>
    </template> 
<script>
   import {db} from "@/firebase";

export default{
  name:"Personnel",
    data(){
    return {
      titlemodal: "Nouveau personnel",
      imgData: null,
      personne:{
        id:"",
        name: "",
        matricule:"",
        poste:"",
        phone: "",
        email: "",
        adresse:"",
        image:"",
      },
      fichier:null,
     timestamp: Date.now(),
     personnes: [],
      retryCount: 0,
      sary:[],
      files: [],

    }
  },
  mounted(){
    this.readAll();
  },
 
  methods:{
    openModal() {
      this.$bvModal.show("modal_simple");
    },
  closeModal() {
      this.$bvModal.hide("modal_simple");
      this.titlemodal;
  },
  createBase64Image(FileObject) {
    console.log(FileObject)
      const reader = new FileReader();
      reader.onload = (event) => {
        this.base64 = event.target.result;
      }
      reader.readAsDataURL(FileObject);
    },


  addpers()
  {
      this.titlemodal = "Nouveau Personnel";
      this.personne={
        id:"",
        name: "",
        matricule:"",
        poste:"",
        telephone: "",
        email: "",
        adresse:"",
        image:"" 
      },
      this.type_submit = "insert";
      this.openModal();
      this.sary=[];

  },
    add(event) {

     if(this.type_submit === 'insert' ){
        event.preventDefault()
        this.personne.id = this.timestamp
        db.collection('personne').add(this.personne).then(() => {
                 this.personne.name=''
                 this.personne.matricule=''
                 this.personne.poste=''
                 this.personne.telephone=''
                 this.personne.email=''
                 this.personne.adresse=''
                 this.personne.image =''
                }).catch((error) => {
                    console.log(error);
                });
        this.closeModal();
        this.readAll()
      }
      else
      {
        event.preventDefault()
        this. updatePerson();
        this.closeModal();
        this.readAll()
      }
    
    },

  getPersonId(id) {
    this.type_submit = "update";
    let dbRef = db.collection('personne').doc(id);
        dbRef.get().then((doc) => {
        this.personne = doc.data();
       console.log(doc)
      }).catch((error) => {
                console.log(error)
      })

       this.titlemodal = "Modifier Personnel";
       this.openModal();
       this.readAll();
       this.sary =[];
    },
    updatePerson() {
      const id = this.personne.id;
       const promises = [];
       db.collection('personne')
       .where('id', '==', id )
       .get()
       .then(snap => {
       snap.forEach(doc => {
        promises.push(
            doc.ref.update({
                 email: this.personne.email,
                 name:this.personne.name,
                 matricule:this.personne.matricule,
                 poste:this.personne.poste,
                 telephone:this.personne.telephone,
                 adresse:this.personne.adresse,
                 image:this.personne.image  
             })
        );
        return Promise.all(promises);
      })
    })
    .then(() => {
      console.log('update avec succes')
    })
    .catch(error => {
      console.error(' error ' + error)
    })

  },
    readAll() {
       db.collection('personne').onSnapshot((snapshotChange) => {
                this.personnes = [];
                snapshotChange.forEach((doc) => {
                  console.log(snapshotChange)
                    this.personnes.push({
                        key: doc.id,
                        name: doc.data().name,
                        matricule:doc.data().matricule,
                        poste:doc.data().poste,
                        email: doc.data().email,
                        telephone: doc.data().telephone,
                        adresse:doc.data().adresse
                     
                    })
                });
            })
 

    },
    toDataURL(src, callback) {
            var image = new Image();
            image.crossOrigin = 'Anonymous';
            image.onload = function() {
                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');
                canvas.height = this.naturalHeight;
                canvas.width = this.naturalWidth;
                context.drawImage(this, 0, 0);
                var dataURL = canvas.toDataURL('image/jpeg');
                callback(dataURL);
            };
     image.src = src;
    },
    createFile(fichier) {
        
        var reader = new FileReader();
        var that = this;
        reader.onload = (e) => {
                that.sary.push({
                    image: e.target.result,
                    nom_image : e.target.result,
                    id:0,
                });
        var bolb_image = e.target.result;
         that.personne.image = bolb_image;
        };
        reader.readAsDataURL(fichier);
    },
    uploadFile(event) {
      let files = event.target.files || event.dataTransfer.files;
            this.files = files;
      for (let i = 0; i < files.length; i++) {
        let data = new FormData();
                data.append('name', 'file-input');
                data.append('file-input', event.target.files[i]);
                var fichier = event.target.files || event.dataTransfer.files;
                console.log(this.createFile(files[i]));
    }
  },

    remove(id) {
      console.log(id)
      if (window.confirm("Vous voulez Supprimer?")) {
                db.collection("personne").doc(id).delete().then(() => {
                    console.log("Document Supprimer avec succes!");
                })
                .catch((error) => {
                    console.error(error);
                })
              }
      this.readAll();
    }, 
    deleteImage(index){
            this.sary.splice(index,1);
            if (this.type_submit ==='update'){
               
                db.personnel.delete(id);
                };
            }
    
  } 
}
    </script>