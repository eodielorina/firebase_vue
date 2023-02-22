import { fb , db} from "@/firebase";
  
  export default{
  name:"Secteur",
  components: {
  
  },
    data(){
    return {
      titlemodal: "Nouveau personnel",
      secteur:{
        id:"",
        id_personne:"",
        nom_secteur: "",
        description:"",
        image:[]
      },
      id_personne:'',
     timestamp: Date.now(),
     personnel: [],
     secteur_personnel:[],
      
  
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
        id_personne:"",
        description:"" ,
        image:""
      },
      this.type_submit = "insert";
      this.openModal();
  },
    add() {
   
        if(this.type_submit === 'insert' ){
        this.secteur.id = this.timestamp
        db.collection('secteur').add(this.secteur).then(() => {
                 this.secteur.id_personne=''
                 this.secteur.nom_secteur=''
                 this.secteur.description=''
                 this.secteur.image=''
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
                 id_personne:this.secteur.id_personne,
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
    
      //  with relation
      // db.collection('personne')
      // .doc('uid')
      // .collection('secteur').where("personne.id","==",true)
      // .orderBy('nom_secteur')
      // .onSnapshot((snap) => {
      //   console.log(snap)
      //               this.secteur_personnel = [];
      //               snap.forEach((doc) => {
      //               //     this.secteur_personnel.push({
      //               //         key: doc.id,
      //               //         nom_secteur: doc.data().nom_secteur,
      //               //         name: doc.data().name,
      //               //         description:doc.data().description,
                        
      //               //     })
      //               });
      //           })
      // simple
      db.collection('secteur').onSnapshot((snapshotChange) => {
                this.secteur_personnel = [];
                snapshotChange.forEach((doc) => {
                  console.log(snapshotChange)
                    this.secteur_personnel.push({
                        key: doc.id,
                        nom_secteur: doc.data().nom_secteur,
                        id_personne:doc.data().id_personne,
                        description:doc.data().description,
                    })
                });
            })


    // boucle
//     let personne = {} ;
//     let secteur = {};
//     // db.collection('secteur').where('personnne.id', '==', true)
//     db.collection('personne').get().then((results) => {
//         this.secteur_personnel = [];
//       results.forEach((doc) => {
//         personne[doc.id] = doc.data();
//         console.log(doc)
//         this.secteur_personnel.push({
//                                 key: doc.id,
//                                 name: doc.data().name,
//                             })
//       });
      
//       secteur = db.collection('secteur');
//       secteur.get().then((docSnaps) => {
//         docSnaps.forEach((doc) => {
//         secteur[doc.id] = doc.data();
//         console.log(doc)
//         this.secteur_personnel.push({
//             key: doc.id,
//             nom_secteur: doc.data().nom_secteur,
//             description: doc.data().description,
//         })
//         // secteur[doc.data()].id_personne = personne[doc.data()].id;
//       });
//     }); 
// })
  //  db.collection('personne').on('value', function (snapshot) {
  //       var makeID = snapshot.val().makeID; 
  //       makesTable.child('secteur').child(makeID).once('value', function(mediaSnap) {
  //           console.log(makeID + ":" + mediaSnap.val());
  //       });

        //  var modelsID = snapshot.val(). modelsID; 
        // modelsTable.child('models').child(modelsID).once('value', function(mediaSnap) {
        //     console.log(modelsID + ":" + mediaSnap.val());
        // });


    // });

    },
    
    deleteImage(img,index){
      let image = fb.storage().refFromURL(img);
      this.secteur.image.splice(index,1);
      image.delete().then(function() {
        console.log('image deleted');
      }).catch(function(error) {
        // Uh-oh, an error occurred!
        console.log('an error occurred');
      });
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
    uploadImage(e){
      let file=e.target.files[0];
       var storageRef = fb.storage().ref('secteur_file/'+file.name);
        let uploadTask = storageRef.put(file);
      
          uploadTask.on('state_changed', (snapshot) => {
            
          }, (error) => {
           
          }, () => {
            
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
              this.secteur.image=url;
              console.log(url)
            });
          });
      }
  }, 
  }
