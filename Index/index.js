import { add } from "./function.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://testing-fire-77afc-default-rtdb.europe-west1.firebasedatabase.app/"
}

//  console.log("answer is ",add(2,2))

const app = initializeApp(appSettings)


const database = getDatabase(app)
const moviesInDB = ref(database, "chimaShoppingList")
let setList = document.getElementById("list")
const input1 = document.getElementById("input1");
//clear input
const clearInput = () => {
  return input1.value = ""
}
//  creat list


const fetchData = () => {
  onValue(moviesInDB, (snapshot) => {
    setList.innerHTML = ``
    const newValues = Object.entries(snapshot.val())
    let data = ``

    for(let i=0 ; i < newValues.length; i++){
      const key = newValues[i][0]
      const value = newValues[i][1]
      
      data +=`
      <div
      id="${key}"
  
      class="chima cursor-pointer grid rounded bg-[#ffeac1] text-zinc-700 p-2 font-semibold italic tracking-wider"
      >
        <p class="self-center text-center flex flex-wrap">${value}</p>
      </div>
      `
    }

    setList.innerHTML = data
  })
}


const cartHandler = () => {

  const myData = input1.value
  push(moviesInDB, myData)
  console.log(`${myData} was added succesfully`);

  clearInput()
  fetchData()

};

const button1 = document.getElementById("btn1")

//  console.log(button1)
button1.addEventListener("click", () => cartHandler())