import {fb,db} from "@/firebase";
import firebase from "firebase";
import NwImg from 'nw-img-vue'

export default{
  name:"Personnel",
    data(){
    return {
      titlemodal: "Nouveau personnel",
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
     user: null
    }
  },
  mounted(){
    this.readAll();
    
},
created() {
  fb.auth().onAuthStateChanged((user) => {
    if (user) {
      this.user = user;
    } else {
      this.user = null;
    }
  });
},
  methods:{
    openModal() {
      this.$bvModal.show("modal_simple");
    },
  closeModal() {
      this.$bvModal.hide("modal_simple");
      this.titlemodal;
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
       db.collection('personne').onSnapshot((snap) => {
                this.personnes = [];
                snap.forEach((doc) => {
                    this.personnes.push({
                        key: doc.id,
                        name: doc.data().name,
                        matricule:doc.data().matricule,
                        poste:doc.data().poste,
                        email: doc.data().email,
                        telephone: doc.data().telephone,
                        adresse:doc.data().adresse,
                        image:doc.data().image
                     
                    })

                });
            })
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
    uploadImage(e){
      let file=e.target.files[0];
      console.log(file)
       var storageRef = fb.storage().ref('personnel/'+file.name);
        let uploadTask = storageRef.put(file);
          uploadTask.on('state_changed', (snapshot) => {
            
          }, (error) => {
           
          }, () => {
            
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
              this.personne.image=url;
              console.log(url)
            });
          });
      },
      logOut() {
        fb.auth().signOut().then(() => {
          fb.auth().onAuthStateChanged(() => {
            this.$router.push('/login')
          })
        })
      },
      uploadToStorage(imageURL){
      let file=imageURL.target.files[0];
       this.getFileBlob(blob =>{
       var img=fb.storage().ref('personnel/'+file.name);
       img.put(blob).then(function(snapshot) {
         
                  
        })
       })
   },
    getFileBlob  (url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.addEventListener('load', function() {
      cb(xhr.response);
    });
    xhr.send();
  },
} 
}