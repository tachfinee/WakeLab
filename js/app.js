
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


async function afficherActivites() {
    activites = await chargerActivites();

    let activitesCards = document.getElementById("activites")


    

    activites.forEach(activite => {

    activitesCards.appendChild(activiteCard(activite))


    });

    
function activiteCard(activite){
    const div1=document.createElement("div")
    div1.setAttribute("class","sm:col-6 mb-3 sm:mb-0")
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
    const div12=document.createElement("a")
    div12.setAttribute("class","btn-solid theme-danger")


    divheader.textContent=`Objectif : ${activite.objectifs}`
    div4.textContent=`${activite.titre}`
    
    div7.textContent=`Thème : ${activite.theme}`
    div8.textContent=`Durée : ${activite.duree} min`
    div9.textContent=`Auteur : ${activite.auteur}`
    div11.textContent="Modifier"
    div12.textContent="Supprimer"

    div1.appendChild(div2)
    div2.append(divheader,div3)
    div3.append(div4,div5)
    div5.append(div7,div8,div9,div10)
    div10.append(div11,div12)

    return div1
}


{/* <div class="sm:col-6 mb-3 sm:mb-0">
            <div class="card">
            <div class="card-body">
                <h4 class="card-title">${activite.titre}</h4>
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <div class="d-flex justify-content-end gap-3">
                    <a href="#" class="btn-solid theme-primary">Modifier</a>
                    <a href="#" class="btn-solid theme-danger">Supprimer</a>
                </div>

            </div>
            </div>
        </div> */}
    

    console.log(activites)
}


// const ajouterActivites = async () => {

// }

afficherActivites();



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
