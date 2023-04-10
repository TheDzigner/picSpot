const firebaseConfig = {
    apiKey: "AIzaSyBBWA3EMFIQZJhXyaq4yoD9VFAWUiK53Fo",
    authDomain: "picspot-a1bd9.firebaseapp.com",
    databaseURL: "https://picspot-a1bd9-default-rtdb.firebaseio.com",
    projectId: "picspot-a1bd9",
    storageBucket: "picspot-a1bd9.appspot.com",
    messagingSenderId: "1017643646577",
    appId: "1:1017643646577:web:6cc3faad54be11f84225d0",
    measurementId: "G-N68PJ5YEJS"
  };

  firebase.initializeApp(firebaseConfig)

  const database = firebase.database()
  const auth = firebase.auth()

  
  auth.onAuthStateChanged((user)=>{
 
    let uid = ""
        if (user) {
         uid = auth.currentUser.uid   
         displayFavorite(uid)
        } else {
          alert("You must create an account to add favorites")  
        }

  })

  function displayFavorite(uid)
  {
    const favRef = database.ref(`favorite/${uid}`)

    favRef.once("value",(snapshot)=>{
    const favorites = snapshot.val()
    let html = ""
    for (const data in favorites) {
       const key = data 
    //    console.log(favorites)

       const url = favorites[data].imageSrc
       const imageId = favorites[data].imageid
       const photographerUrl = favorites[data].photographerUrl
       const photographer = favorites[data].photographer

       const cardImage = `
      <div class="image-card">
      <div class="credit">
      <a href="${photographerUrl}" target="_blank">photo by ${photographer}</a>
     </div>
      <img src="${url}" alt="">
      <div class="action-btns">
          <button class="material-symbols-outlined"data-id="${imageId}" onclick="addToFav(this)">
           delete_forever
          </button>
          <button>
            <a href="${url}" download  type="image/jpeg" class="material-symbols-outlined">
              download
            </a>
          </button>
      </div>
  </div>
      `
      html += cardImage
    }
    document.querySelector("section").innerHTML = html
    }).then(()=>{
        console.log("favorites displayed")
    }).catch((error)=>{
        alert("error.message")
    })
  }