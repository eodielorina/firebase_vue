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
     user: null
  
    }
  },
  created() {
    fb.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
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
        console.log(this.secteur = doc.data());
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
   
      // db.collection("personne").doc("name")
      // .collection("secteur").where("id_personne","==","personne.id")
      // .orderBy("nom_secteur")
      // .onSnapshot((secteur) => {
      //     console.log(secteur)
      //       secteur.forEach((sec) => {
      //         personne.forEach((pers)=>{
      //           this.secteur_personnel.push({
      //             key: sec.id,
      //             nom_secteur: sec.data().nom_secteur,
      //             description:sec.data().description,
      //             name:pers.data().name
      //         })
      //       })
      //     })
      //   })
      // const personne = db.collection("personne");
      // personne.onSnapshot((personne) => {
      //   console.log(personne)
      //  db.collection("secteur")
      // //  .where("personne.id","==","id_personne")
      // //  .orderBy("id_personne")
      //   .onSnapshot((secteur) => {
      //   console.log(secteur)
      //     secteur.forEach((sec) => {
      //       personne.forEach((pers)=>{
      //         this.secteur_personnel.push({
      //           key: sec.id,
      //           nom_secteur: sec.data().nom_secteur,
      //           description:sec.data().description,
      //           name:pers.data().name
      //       })
      //     })
      //     })
      //   })
      // })

      
      
      // .orderBy("nom_secteur");
    
    //   const query = db.collectionGroup('personne')
    //             .where('secteur.description', '==', 'gestion')
    //             .orderBy('description');
    //  console.log(query)
    // var test =db.collection("secteur")
    // .where("personne.id","==","id_personne")
    // .get()
    // console.log(test)
    // .then((query) => {
    //   query.forEach((doc) => {
    //       console.log(`${doc.id} => ${doc.data().name}`);
  
  //  .get().then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //         console.log(`${doc.id} => ${doc.data().id_personne}`);
  //     });
  // });
// });
// });
      // db.collection('secteur')
      // .onSnapshot((snapshotChange) => {
      //    console.log(snapshotChange)
      //         this.secteur_personnel = [];
      //         snapshotChange.forEach((doc) => {
      //             this.secteur_personnel.push({
      //                 key: doc.id,
      //                 nom_secteur: doc.data().nom_secteur,
      //                 name: doc.data().name,
      //                 description:doc.data().description,
                   
      //             })
      //         });
      //     })

      // var db = firebase.firestore();
    // var promises = []
    db.collection('personne').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
           db.collection('secteur').onSnapshot((snap) => {
            this.secteur_personnel = [];
            snap.forEach((data) => {
                this.secteur_personnel.push({
                    key: data.id,
                    name: doc.data().name,
                    nom_secteur:data.data().nom_secteur,
                    description:data.data().description,   
                })
            });
            })
        })
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
    logOut() {
      fb.auth().signOut().then(() => {
        fb.auth().onAuthStateChanged(() => {
          this.$router.push('/login')
        })
      })
    },
  }, 
  }
