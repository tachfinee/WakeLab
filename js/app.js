
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

    const div1=document.createElement("div")
    div1.className="sm:col-6 mb-3 sm:mb-0"
    const div2=document.createElement("div")
    div2.className="card"
    const div3=document.createElement("div")
    div3.className="card-body"
    const div4=document.createElement("h4")
    div4.className="card-title"

    activitesCards.appendChild(div1)
    div1.appendChild(div2)
    div2.appendChild(div3)
    div3.appendChild(div4)
    

    activites.forEach(activite => {


    activitesCards.innerHTML+=`<div class="sm:col-6 mb-3 sm:mb-0">
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
        </div>`
    });


    

    console.log(activites)
}


// const ajouterActivites = async () => {

// }

afficherActivites();



form = document.getElementById("username")

function enregistrerUser(){
    form.addEventListener("submit",(e)=>{
    e.preventDefault()
    localStorage.clear()
    
    window.localStorage.setItem("username", form.user.value)
    
})
}

enregistrerUser()

// window.localStorage.setItem("user", );

// console.log(window.localStorage.getItem('chat'))
