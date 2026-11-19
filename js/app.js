
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: { "Content-Type": "application/json" },
});

const chargerActivites = async () => {
  try {
    const response = await api.get("/activites");
    // console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error(error.response?.data?.message ?? "API inaccessible");
    return [];
  }
};

let activitesCards = document.getElementById("activites")

async function afficherActivites() {
    let activites = await chargerActivites();


    

    activites.forEach(activite => {



    activitesCards.appendChild(activiteCard(activite))
    activitesCards.appendChild(modifierActiviteCard(activite))
    

    });


    console.log(activites)
}



function eventSupprimer(){


  activitesCards.addEventListener('click',(event)=>{

    let id = event.target.dataset.supprimer
    if (!id){
      console.log("vous n'avez pas cliqué sur supprimer")
      return
    }
    supprimerActivite(id)
    

    let thisActivite = document.getElementById(id)

    activitesCards.removeChild(thisActivite)


  })

}


afficherActivites();

eventSupprimer()

async function supprimerActivite(id){
  try{
  const response = await api.delete('/activites/'+id)

  return response;
  } catch (error) {
    console.error(error.response?.data?.message ?? "API inaccessible");
    return [];
  }
}

function eventModifier(form,id){
  form.addEventListener('submit',(event)=>{
      // let id = event.target.dataset.modifier
      // if (!id){
      //   return
      // }
      event.preventDefault()
      alert("modifier ok")
      modifierActivite(event,id)

      
  })
}

function modiferActiviteFrontend(activite){

      let act=document.getElementById(activite.id)
      

      let actModifier = document.getElementById(`dialog${activite.id}`)

      //fermeture du modal
      // actModifier.close()
      activitesCards.removeChild(act)

      console.log("dialog fermé")

      activitesCards.removeChild(actModifier)

      console.log("dialog supprimé")
      activitesCards.prepend(activiteCard(activite))
      let nouveauModal = modifierActiviteCard(activite)
      activitesCards.prepend(nouveauModal)
      console.log("dialog ajouté")


      //reouvrire le modal
      // nouveauModal.show()
}

async function modifierActivite(event,id){
    try{

        let activite ={
                titre: event.currentTarget.titre.value,
                theme: event.currentTarget.theme.value,
                objectifs: event.currentTarget.objectifs.value,
                duree: Number(event.currentTarget.duree.value),
                description: event.currentTarget.description.value,
                auteur: window.localStorage.getItem("username")
        }

  const response = await api.put('/activites/'+id,activite)
      
      modiferActiviteFrontend(response.data)
  return response;
  } catch (error) {
    console.error(error.response?.data?.message ?? "API inaccessible");
    return [];
  }
}


function activiteCard(activite){
    const div1=document.createElement("div")
    div1.setAttribute("class","sm:col-6 mb-3 sm:mb-0")
    div1.setAttribute("id",activite.id)
    const div2=document.createElement("div")
    div2.setAttribute("class","card")
    const divheader=document.createElement("div")
    divheader.setAttribute("class","card-header")
    const div3=document.createElement("div")
    div3.setAttribute("class","card-body")
    const div4=document.createElement("h4")
    div4.setAttribute("class","card-title")
    const div5=document.createElement("div")
    div5.setAttribute("class","card-text")
    const div7=document.createElement("p")
    const div8=document.createElement("p")
    const div9=document.createElement("p")
    const div10=document.createElement("div")
    div10.setAttribute("class","d-flex justify-content-end gap-3")
    const div11=document.createElement("a")
    div11.setAttribute("class","btn-solid theme-primary")
    div11.setAttribute("data-modifier",`${activite.id}`)
    // div11.setAttribute("data-bs-toggle","dialog")
    // div11.setAttribute("data-bs-target",`#dialog${activite.id}`)
    div11.addEventListener("click", () => {
    document.getElementById(`dialog${activite.id}`).showModal()
})
    const div12=document.createElement("a")
    div12.setAttribute("class","btn-solid theme-danger btn-supprimer")
    div12.setAttribute("data-supprimer",`${activite.id}`)
    



    divheader.textContent=`Objectif : ${activite.objectifs}`
    div4.textContent=`${activite.titre}`
    
    div7.textContent=`Thème : ${activite.theme}`
    div8.textContent=`Durée : ${activite.duree} min`
    div9.textContent=`Auteur : ${activite.auteur} | id : ${activite.id}`
    div11.textContent="Modifier"
    div12.textContent="Supprimer"

    div1.appendChild(div2)
    div2.append(divheader,div3)
    div3.append(div4,div5)
    div5.append(div7,div8,div9,div10)
    div10.append(div11,div12)

    
    

    return div1
}



function modifierActiviteCard(activite){

  const div1= document.createElement("dialog")
  div1.setAttribute("class","dialog")
  div1.setAttribute("id",`dialog${activite.id}`)
  // div1.textContent=`id = ${activite.id}`
  const form = document.createElement("form")
  form.setAttribute("class","row g-3 m-5")
  form.setAttribute("id",`formModifierActivite${activite.id}`)


  const div2 = document.createElement("div")
  div2.setAttribute("class","col-md-6")
  const div3 = document.createElement("label")
  div3.setAttribute("for","titre")
  div3.setAttribute("class","form-label")
  div3.textContent="Titre"
  const div4 = document.createElement("input")
  div4.setAttribute("type","text")
  div4.setAttribute("class","form-control")
  div4.setAttribute("name","titre")
  div4.setAttribute("value",activite.titre)


  const div5 = document.createElement("div")
  div5.setAttribute("class","col-md-6")
  const div6 = document.createElement("label")
  div6.setAttribute("for","theme")
  div6.setAttribute("class","form-label")
  div6.textContent="Thème"
  const select=document.createElement("select")
  select.setAttribute("class","form-control form-control-sm")
  select.setAttribute("name","theme")
  const div7 = document.createElement("option")
  div7.textContent="Sélectionner un thème"
  const div8 = document.createElement("option")
  div8.setAttribute("value","jeu")
  div8.textContent="Jeu"
  const div9 = document.createElement("option")
  div9.setAttribute("value","apprentissage")
  div9.textContent="Apprentissage"
  const div10 = document.createElement("option")
  div10.setAttribute("value","exercice")
  div10.textContent="Exercice"
  const div11 = document.createElement("option")
  div11.setAttribute("value","autre")
  div11.textContent="Autre"


  const div12 = document.createElement("div")
  div12.setAttribute("class","col-12")
  const div13 = document.createElement("label")
  div13.setAttribute("for","objectifs")
  div13.setAttribute("class","form-label")
  div13.textContent="Objectifs"
  const div14 = document.createElement("input")
  div14.setAttribute("type","text")
  div14.setAttribute("class","form-control")
  div14.setAttribute("name","objectifs")
  div14.setAttribute("value",activite.objectifs)


  const div15 = document.createElement("div")
  div15.setAttribute("class","col-12")
  const div16 = document.createElement("label")
  div16.setAttribute("for","duree")
  div16.setAttribute("class","form-label")
  div16.textContent="Durée"
  const div17 = document.createElement("input")
  div17.setAttribute("type","text")
  div17.setAttribute("class","form-control")
  div17.setAttribute("name","duree")
  div17.setAttribute("value",activite.duree)


    const div18 = document.createElement("div")
  div18.setAttribute("class","col-12")
  const div19 = document.createElement("label")
  div19.setAttribute("for","description")
  div19.setAttribute("class","form-label")
  div19.textContent="Description"
  const div20 = document.createElement("input")
  div20.setAttribute("class","form-control")
  div20.setAttribute("name","description")
  div20.setAttribute("value",activite.description)


  const div21 = document.createElement("div")
  div21.setAttribute("class","col-12")
  const div22 = document.createElement("button")
  div22.setAttribute("type","submit")
  div22.setAttribute("class","btn btn-primary")
  div22.textContent="Modifier"
  

  let div23= document.createElement("button")
  div23.setAttribute("type","button")
  div23.setAttribute("class","btn-solid theme-secondary")
  // div23.setAttribute("data-bs-dismiss","dialog")
  div23.addEventListener("click", () => {
    div1.close()
})
  div23.textContent="Fermer"

  div1.append(form,div23)
  form.append(div2,div5,div12,div15,div18,div21)
  div2.append(div3,div4)
  div5.append(div6,select)
  select.append(div7,div8,div9,div10,div11)
  div12.append(div13,div14)
  div15.append(div16,div17)
  div18.append(div19,div20)
  div21.append(div22)

  eventModifier(form,activite.id)


  return div1
}

async function ajouterActivite(event){

  let activite ={
    titre: event.currentTarget.titre.value,
    theme: event.currentTarget.theme.value,
    objectifs: event.currentTarget.objectifs.value,
    duree: Number(event.currentTarget.duree.value),
    description: event.currentTarget.description.value,
    auteur: window.localStorage.getItem("username")
  
  }

  alert("ajout ok")
  let addActivite = await api.post("/activites", activite)

  // activitesCards.remove()

  activitesCards.prepend(activiteCard(addActivite.data))
  // afficherActivites()

  return addActivite
}


function activiteCardArray(){


}

function removeElements(){

}

let formAjoutActivite=document.getElementById("formAjoutActivite")


formAjoutActivite.addEventListener('submit',(event)=>{
  event.preventDefault()
  
  
  ajouterActivite(event)
  
})




formUser = document.getElementById("username")

function enregistrerUser(){
    formUser.addEventListener("submit",(e)=>{
    e.preventDefault()
    localStorage.clear()
    
    window.localStorage.setItem("username", formUser.user.value)
    
})
}

enregistrerUser()

// window.localStorage.setItem("user", );

// console.log(window.localStorage.getItem('chat'))


