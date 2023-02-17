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
                                <label for="id_personnel">Personne</label>
                                <select name="id_personnel" v-model="secteur.id_personnel" id="id_personnel" class="form-control form-control-sm">
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
            <td >{{sec.personne.name}} &nbsp; </td>
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
  <script>
  import {db} from "@/firebase";
  
  export default{
  name:"Secteur",
  components: {
  
  },
    data(){
    return {
      titlemodal: "Nouveau personnel",
      secteur:{
        id:"",
        id_personnel:"",
        nom_secteur: "",
        description:"",
      },
      id_personnel:'',
     timestamp: Date.now(),
     personnel: [],
     secteur_personnel:[],
      retryCount: 0,
  
    }
  },
  created() {
        this.getAllPersonne();
        },
  mounted(){
    this.readAll()
  },
  
  methods:{
    openModal() {
      this.$bvModal.show("modal_simple");
  },
  closeModal() {
      this.$bvModal.hide("modal_simple");
      this.titlemodal;
  },
  addsecteur()
  {
      this.titlemodal = "Nouveau Secteur";
      this.secteur={
        id:"",
        id_personnel:"",
        description:"" 
      },
      this.type_submit = "insert";
      this.openModal();
  },
    add() {
   
        if(this.type_submit === 'insert' ){
        this.secteur.id = this.timestamp
        db.collection('secteur').add(this.secteur).then(() => {
                 this.secteur.id_personnel=''
                 this.secteur.nom_secteur=''
                 this.secteur.description=''
                }).catch((error) => {
                    console.log(error);
                });
                
        this.closeModal();
        this.readAll()      
      }
      else
      {
        this. updateSecteur();
        this.closeModal();
        this.readAll()
      }
    
    },
   getSecteurId(id) {
    console.log(id)
    this.type_submit = "update";
    var dbRef = db.collection('secteur').doc(id);
        dbRef.get().then((doc) => {
        this.secteur = doc.data();
      }).catch((error) => {
                console.log(error)
      })
        this.titlemodal = "Modifier Secteur";
        this.openModal();
        this.readAll();
    },
    getAllPersonne(){
         db.collection('personne').onSnapshot((snapshotChange) => {
                this.personnel = [];
                snapshotChange.forEach((doc) => {
                    this.personnel.push({
                        id: doc.data().id,
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
    updateSecteur() {
      const id = this.secteur.id;
       const promises = [];
       db.collection('secteur')
       .where('id', '==', id )
       .get()
       .then(snap => {
       snap.forEach(doc => {
        promises.push(
            doc.ref.update({
                 nom_secteur: this.secteur.nom_secteur,
                 id_personnel:this.secteur.id_personnel,
                 description:this.secteur.description,
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
       
    //   QuerySnapshot querySnapshotColumn = await  FirebaseFirestore.instance
    //   .collection("secteur").where("id_personnel", isEqualTo: id).orderBy("ordre").get();
    //   List allDataColumn = querySnapshotColumn.docs.map((doc) async {
    //   var post_ = doc.data() as Map<String, dynamic>;
    //   post_['uid'] = doc.id;
    //   String id_personnel = post_['id'];
    //   List<PersonneFirebaseCollectionModel> personne = await getColletions(id_personnel);
    //   post_['id_personnel'] = secteur.toList(); 
    //   return post_;
    // }).toList();
    // let pers = db.collection("personne")
    // var promises = []
    // db.collection('secteur').get()
    //     .then(snapshot => {
    //         snapshot.forEach( doc => {
    //    promises.push(doc.data());
    //         })
    //     console.log(promises)
            
    //     });
    // var tab = []
    //     pers.get()
    //     .then(snap=>{
    //       snap.forEach(i=>{
    //         tab.push(i.data())
    //       })
    //       console.log(tab)
    //     })
//ty kar mahazo az jiab
  //  db.collection('personne').doc('uid')
  //               .collection('secteur').doc('uid');
  // firestore
 var personnel = db.collection('personne')
  .doc('id')
  .collection('secteur').orderBy('nom_secteur')
  .onSnapshot((snapshotChange) => {
                this.secteur_personnel = [];
                snapshotChange.forEach((doc) => {
                    this.secteur_personnel.push({
                        key: doc.id,
                        nom_secteur: doc.data().nom_secteur,
                        name: doc.data().name,
                        description:doc.data().description,
                     
                    })
                });
            })
  console.log(personnel)
// FirebaseAuth.getInstance().currentUser?.apply {
//     db.collection("personne").document(uid).collection("secteur")
//         .whereEqualTo(id_personnel, true)
// }
// router.get('', function(req, res){
    // var personne = db.collection('personne').ref;
    // var secteur = db.collection('secteur').ref;

    // personne.once('value', function (snapshot) {
    //     var promises = [];
    //     snapshot.forEach(function (childSnapshot) {

    //         var childKey = childSnapshot.key;
    //         var fk = snapshot.child(childKey).val();

    //         var promise = secteur.child(childSnapshot.val().id_personnel).once('value');

    //         promises.push(promise);
    //     });
    //     Promise.all(promises).then(function(snapshots) {
    //         var dataSet = [];
    //         snapshots.forEach(function(secteur) {

    //             var childData =  _.assign(secteur.key, secteur.val());

    //             dataSet.push({
    //                 childKey: secteur.key, 
    //                 childData: childData
    //             });

    //         });
    //         res.json(dataSet);
    //     });

    // });
// });

// var promises = []
// db.collection('personne').get()
//     .then(snapshot => {
//         snapshot.forEach(doc => {
           
//             promises.push(doc.ref.collection('secteur').get());
//             console.log(doc.id, " => ", doc.data());

//         })
//         return Promise.all(promises);
//     })
//     .then(results => {
//         results.forEach(querySnapshot => {
//             querySnapshot.forEach(function (doc) {
//                 console.log(doc.id, " => ", doc.data());
//             });
//         });
//     });

    },
    
    remove(id) {
        console.log(id)
        if (window.confirm("Vous voulez Supprimer?")) {
                db.collection("secteur").doc(id).delete().then(() => {
                    console.log("Document Supprimer avec succes!");
                })
                .catch((error) => {
                    console.error(error);
                })
              }
      this.readAll();
    }, 
  } 
  }
  </script>
  