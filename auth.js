

const switch_btns = document.querySelectorAll(".switch_btns button")
let activeBtn = 0

const signIn = document.getElementById("signin")
const signUp = document.getElementById("signup")

switch_btns.forEach((btn,index)=>{
  btn.addEventListener("click",()=>{
  switch_btns[activeBtn].classList.remove("active")
   activeBtn = index
   switch_btns[activeBtn].classList.add("active")

if (activeBtn == 0) {
  signUp.style.display = "none"
  signIn.style.display = "block"
}else if (activeBtn == 1) {
  signUp.style.display = "block"
  signIn.style.display = "none"
 
}

  })
})


const signin = document.getElementById("signin")
const signup = document.getElementById("signup")




signup.addEventListener("submit",function(e){
    e.preventDefault()

    const emailInput = signup.querySelector("#email-signup").value;
    const passwordInput = signup.querySelector("#password-signup").value;




    auth.createUserWithEmailAndPassword(emailInput,passwordInput).then((userCredential)=>{
     const uid = userCredential.user.uid
     createUser(uid,emailInput)
     alert("Account created")
    }).catch((error)=>{
        alert(error.message)
    })
})



function createUser(uid,email)
{
    const userRef = database.ref(`users/${uid}`)
    userRef.set({
         email:email
     })
}


signin.addEventListener("submit",function(e){
   e.preventDefault()


   const emailInput = signin.querySelector("#email-signin").value
   const passwordInput = signin.querySelector("#password-signin").value

   auth.signInWithEmailAndPassword(emailInput,passwordInput).then((userCredentials)={

   }).catch((error)=>{
    alert(error.message)
   })
})











 
