let profile = '';
   import {db} from "@/firebase";

export default{
  name:"Personnel",
  components: {

  },
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
        image:""
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
   async add() {

     if(this.type_submit === 'insert' ){
      db.personnel.add({
          name: this.personne.name,
          matricule: this.personne.matricule,
          poste: this.personne.poste,
          telephone: this.personne.telephone,
          email: this.personne.email,
          adresse: this.personne.adresse,
          image: this.personne.image ,
          timestamp: this.timestamp,
          date_modification : null,
        });
        this.closeModal();
        this.readAll()
      }
      else
      {
        this. updatePerson();
        this.closeModal();
        this.readAll()
      }
    
    },
    async getPersonId(id) {
       this.type_submit = "update";
       this.personne =  await db.personnel.where({id:id}).first();
       var that = this;
       that.toDataURL(that.personne.image, function(dataURL) {
        // console.log(dataURL)
                  that.sary.push({
                       image:dataURL,
                       nom_image : that.personne.image,
                       id:that.personne.id,
                   })
               
        });
       this.titlemodal = "Modifier Personnel";
       this.openModal();
       this.readAll();
       this.sary =[];

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

   async get(id){
                this.type_submit = "update";
                this.personne = await db.personne.where({id:id}).first();
            },
    updatePerson() {
     db.personnel.update(this.personne.id,{
        name:this.personne.name,
        matricule: this.personne.matricule,
        adresse: this.personne.adresse,
        image: this.personne.image ,
        poste: this.personne.poste,
        email: this.personne.email,
        telephone: this.personne.telephone,
        timestamp: this.timestamp,
        date_modification : null,
  })

  },
    readAll() {
       
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
      db.personnel.delete(id);
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
    