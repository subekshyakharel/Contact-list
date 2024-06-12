const apiEp = "https://randomuser.me/api?results=5";

let userList = []
//slide to go to apps screen
const slider = document.getElementById("myslider")

slider.addEventListener('change', (e)=>{
    const {value }= e.target

    const label = document.getElementById("label")

    
    if(value > 70) {
    label.innerText = "";
    dispAppScreen()
    } else{
        label.innerText = "Slide To Unlock"
    }
})

const dispAppScreen = () =>{
    //hide home screen
    // document.querySelector(".homescreen").style.display = "none" //we can do that also
    document.querySelector(".homescreen").remove();
    //Show app screen
    document.querySelector(".appScreen").style.display = "block"
}

const dispContactScreen = () =>{
    //hide app screen
    // document.querySelector(".homescreen").style.display = "none" //we can do that also
    document.querySelector(".appScreen").remove();

    //Show contact list screen
    document.querySelector(".contactListscreen").style.display = "block"
    fetchUsers(apiEp)
}

const fetchUsers = async (url) =>{

    //promises
//      fetch(url).then((response)=>{
//         console.log(response)
//         return response.json()
//      }).then((data)=>{
//         console.log(data)
//      }).catch((error)=>{
// console.log(error)
//      })

    //async / await
    const response = await fetch(url);
    const data = await response.json()
    userList = data.results;
    
    // console.log(data)

    //hide the spinner
    document.querySelector(".showSpinner").style.display = "none"

    //showw the user
    displayContactList(userList)
}


//display contact list
const displayContactList =(userList) =>{
    
    document.getElementById("list").style.display = "block"

    let str = ""

        userList.map((item, i)=>{
           str +=`
    <div class="accordion-item">
        <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
        <img 
        src="${item.picture.thumbnail}" 
        alt="" 
        width="50px" 
        class="rounded-circle"
        />

        <div class="ms-2">
           <div class="fw-bolder">${item.name.title}
           ${item.name.first}
           ${item.name.last}</div>
            <small>${item.location.street.number} ${item.location.street.name} ${item.location.state}</small>
            </div>
            </button>
            </h2>
             <div id="collapse${i}" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body d-flex flex-column align-items-center">
            <img 
            src="${item.picture.thumbnail}"
            alt="" 
            width="150px" 
            class="rounded-circle"
            />
            <div>
               <div class="fw-bolder">
            <i class="bi bi-person-circle"></i>
            ${item.name.title}
           ${item.name.first}
           ${item.name.last}
            </div>
            <div>
            <a href="tel:${item.cell}">
                <i class="bi bi-phone-fill"></i>
                ${item.cell}
            </a>
                </div>
                <div>
            <a href="mailto:${item.email}">
                <i class="bi bi-envelope-fill"></i>
            ${item.email}</a>
                            
            </div>
            <div>
            <a href="https://www.google.com/maps/place/${item.location.street.number}+${item.location.street.name}+${item.location.city}+${item.location.state}+${item.location.country}" target="_blank"><i class="bi bi-globe-asia-australia"></i>
            ${item.location.street.number} ${item.location.street.name} ${item.location.state}</a>
            </div>
            </div>
                </div>
                 </div>
             </div>
            `
        })

        document.getElementById("userAccordion").innerHTML = str;

        document.getElementById("userCount").innerText = userList.length;
}

//search contact
document.getElementById("search").addEventListener("keyup", (e)=>{
const {value} = e.target

const filteredUserList =  userList.filter((item)=> {
    const name = (item.name.first + " " + item.name.last).toLowerCase()
    return name.includes(value.toLowerCase())
})
displayContactList(filteredUserList)
})



