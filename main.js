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

const sendRequestBnt = document.querySelector("#sendRequestBnt");

const navBeforeBtn = document.getElementById("nav-before-btn")
const navNextBtn = document.getElementById("nav-next-btn")
const header = document.querySelector("header")
const myKey = "zmp68YUumVuBOUrxgPy1RsXiBCdLFo2rcdVYgEuAy3XkRvixS2er3MQE"

let per_page = 40
let page = 1


navNextBtn.addEventListener("click",()=>{
    page++
    loadData()
    window.scrollTo({
        top : 0,
        behavior : "smooth"
    })
})

navBeforeBtn.addEventListener("click",()=>{
    page <= 0 ? page = page : page--
    loadData()
    window.scrollTo({
        top : 0,
        behavior : "smooth"
    })
})


async function loadData()
{
    
    const query = document.querySelector("#searchInput").value;
    try {

        if (query) {
             const data = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=${per_page}&page=${page}`,{
           headers : {
            Authorization : myKey
         }
        })
        const results = await data.json()
        const dataPhotos = results.photos
        displayImages(dataPhotos)
        if (dataPhotos.length === 0) {
            document.querySelector("section").innerHTML = "<p>No results found for this search query.</p>";
            return;
          }
       
        } else {
            const data = await fetch(`https://api.pexels.com/v1/curated?&per_page=${per_page}&page=${page}`,{
                headers : {
                   Authorization : myKey
                }
               })
               const results = await data.json()
               const dataPhotos = results.photos
               displayImages(dataPhotos)
        }
       
      

       
        
    } catch (error) {
        console.error(error)
    }
}

sendRequestBnt.addEventListener("click",()=>{
    loadData()
})
loadData()



const displayImages = dataPhotos =>
{
    let html = ""
   for (const data in dataPhotos) {
     
       const url = dataPhotos[data].src.portrait
       const photographer =  dataPhotos[data].photographer
       const photographer_url =  dataPhotos[data].photographer_url
       const id =  dataPhotos[data].id
      const cardImage = `
      <div class="image-card">
      <div class="credit">
      <a href="${photographer_url}" target="_blank">photo by ${photographer}</a>
     </div>
      <img src="${url}" alt="">
      <div class="action-btns">
          <button class="material-symbols-outlined" style="color:${dataPhotos[data].avg_color}" data-id="${id}" onclick="addToFav(this)">
              favorite
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
}


let uid = ""
let imageId = ""





 function addToFav(self)
{
    imageId = self.dataset.id

    auth.onAuthStateChanged((user) => {
        if (user) {
             uid = auth.currentUser.uid;
            

        //  alert(`user id ${uid} : image id ${imageId}`)
           favoriteFun(uid,imageId)

        } else {
            alert("create an account to start saving images");
            document.querySelector(".form_wrapper").style.display = "block"
        }
    })




   

}


async function favoriteFun(userId,id)
{
    try {
       const url = await fetch(`https://api.pexels.com/v1/photos/${id}`,{
        headers : {
        Authorization : myKey
        }
       })
       const results = await url.json()
       
         const imageid = results.id
         const imageUrl = results.src.portrait
         const photographer = results.photographer
         const photographerUrl = results.photographer_url

        //  console.table(imageUrl,photographer,photographerUrl)



        const favoriteRef = database.ref(`favorite/${userId}/${imageid}`)
        favoriteRef.set({
            imageSrc : imageUrl,
            photographer : photographer,
            photographerUrl : photographerUrl,
            imageid : imageid
        }).then(()=>{
            alert("added to fav")
        }).catch((error)=>{
            alert(error.message)
        })


    } catch (error) {
        console.error(error);
    }
}








window.addEventListener("scroll",function(event){
   if (window.pageYOffset > header.offsetTop) {
    header.classList.add("active")
   } else {
    header.classList.remove("active")
   }
})