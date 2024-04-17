

let cnt = 0
let date = [
    {
        id:1,
        cnt:cnt+=1,
        name:"Welcome to App Todo",
        status:false,
    },
    {
        id:2,
        cnt:cnt+=1,
        name:"AslidinSdelat Uborku",
        status:false,
    },    
    {
        id:3,
        cnt:cnt+=1,
        name:"Otpravit bratik v sadik",
        status:false,
    },
    {
        id:4,
        cnt:cnt+=1,
        name:"Sdelat Uroki",
        status:false,
    }    
]
let idx = null
let tbody1 = document.querySelector(".tbody")
let dialog = document.querySelector(".dialog")
let form = document.querySelector(".form")
let input1 = document.querySelector(".input1")
function get(){
    tbody1.innerHTML = ""
    date.forEach((el)=>{
        let tr = document.createElement("tr")
        let td = document.createElement("td")
        td.innerHTML = el.cnt

        let tdcopy = document.createElement("td")
        tdcopy.innerHTML = el.name
        let tdButton = document.createElement("td")

        tdButton.classList.add("tdbutton")
        let DeletButton = document.createElement("button")
        DeletButton.onclick = () =>{
            Delet(el.id)
        }
        DeletButton.innerHTML = `
        <svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"></path>
        </svg>
        `

        let EditButton = document.createElement("button")
        DeletButton.classList.add("delet")
        EditButton.innerHTML = `<svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"></path>
      </svg>`

      EditButton.classList.add("Edit1")
      EditButton.onclick = () =>{
        dialog.showModal()
        idx = el.id
        form["name"].value = el.name
    }
    form.onsubmit = (e)=>{
        e.preventDefault()
        date = date.map((el)=>{
            if(el.id==idx){
                el.name = form["name"].value
            }
            return el
        }) 
        dialog.close()
        get()
    }
      let inputtd = document.createElement("input")
      tr.classList.add("tr")
      inputtd.onclick = () =>{
        checkbox(el.id)
      }
      inputtd.checked = el.status
      if(el.status){
        tdcopy.classList.add("tdcopy")
      }
      tbody1.append(tr)
      inputtd.type="checkbox"
      tdButton.append(EditButton,DeletButton,inputtd)
      tr.append(td,tdcopy,tdButton)
    })
}
get()

function Delet(id){
    date = date.filter((el)=>{
        return el.id!=id
    })
    get()
}
function checkbox(id){
    date = date.map((el)=>{
        if(el.id==id){
            el.status =! el.status
        }
        return el
    })
    get()
}
let copydate = date
input1.oninput = (e) =>{
    let sr = e.target.value.trim().toLowerCase()
    if(sr==""){
        date = copydate
    }
    else{
        date = copydate.filter((el)=>{
            return el.name.toLocaleLowerCase().includes(sr)
        })
    }
    get()
}
// Add
let add = document.querySelector(".Add")
let dialog1 = document.querySelector(".dialog1")
let form1 = document.querySelector(".form1")
add.onclick = () =>{
    dialog1.showModal()
}
form1.onsubmit = (e)=>{
    e.preventDefault()
    let user = {
        id:new Date().getTime(),
        cnt:cnt+=1,
        name:form1["name"].value
    }
    date.push(user)
    get()
    dialog1.close()
}
let sort = document.querySelector(".sort")
sort.onclick = () =>{
    date = date.sort((a,b)=>{{
        if(a.name>b.name || a.name.toLocaleLowerCase()>b.name.toLowerCase()){
            return 1
        }
        else if(a.name<b.name || a.name.toLocaleLowerCase()<b.name.toLowerCase()){
            return -1
        }
        else{
            return 0
        }
    }})
    get()
}