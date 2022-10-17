//Hämtar in alla nödvändiga värden från HTML samt deklarerar globala variabler
let output = document.getElementById("output");
let output1 = document.getElementById("output1");
const btn = document.getElementById("btn");
const btn1 = document.getElementById("clear");
const btn2 = document.getElementById("info")
const gender = document.getElementById("gender");
const age = document.getElementById("age");
const length = document.getElementById("length");
const hair = document.getElementById("hair");
const tattoos = document.getElementById("tattoos");
let dancers = [];
let displayPeople = [];
let noMatch = true;
const ageRanges = [{min: 0, max: 200}, {min: 20, max: 25}, {min: 26, max: 30}, {min: 31, max: 35}, {min: 36, max: 40}, {min: 41, max: 45}];
const lengthRange = [{min:0, max:220}, {min:0, max: 165}, {min:166, max: 175}, {min:176, max: 185}, {min:186, max: 220}]


//Hämtar in alla dansare från dancers.json
function getData() {
    fetch("/dancers.json") 
      .then((response) => response.json()) //Konverterar till json
      .then((data) => { 
        dancers = data.users; 
        }
    )
};  

//Filtrerar och skriver ut dansarna utifrån vad användaren väljer i browsern
function getDancers () {
  removeDancers()
  const filteredDancers = dancers.filter((person) => {
    return ((person.gender == gender.value || gender.value == 0) &&
      (person.hair == hair.value || hair.value == 0)&&
      person.age >= ageRanges[age.value].min && person.age <= ageRanges[age.value].max &&
      person.length >= lengthRange[length.value].min && person.length <= lengthRange[length.value].max &&
      (person.tattoos == tattoos.value || tattoos.value == 0))
      })
      
      displayPeople = filteredDancers;

      filteredDancers.map(person => {
        const out = document.createElement("li");
          out.setAttribute("class", "dancers");
          out.innerHTML = `${person.firstname} ${person.lastname}`
          output.appendChild(out);
          noMatch = false
      })
      if (noMatch === true) {
        const out = document.createElement("li");
          out.setAttribute("class", "dancers");
          out.innerHTML = `No match was found`
          output.appendChild(out);
      }
  }

  //Ger användaren all information som finns om de personer som valts ut i getDancers()
  function moreInformation() {
    removeDancers()
    displayPeople.forEach((person) => {
      let info = document.createElement("p")
      info.setAttribute("class", "dancers");
      info.innerText = 
      `Firstname: ${person.firstname}
      Lastname: ${person.lastname}
      Age: ${person.age}
      Length: ${person.length}
      Size: ${person.size}
      Hair: ${person.hair}
      Shoesize: ${person.shoesize}
      Past jobs: ${person.pastJobs}
      Dance styles: ${person.styles}
      Tattoos: ${person.tattoos}`
      output1.appendChild(info);
    })};

//Rensar sökresultatet på skärmen i browsern
function clearAll() {
  output.textContent = '';
  output1.textContent = '';
}

//Samtliga knappar med deras funktion
btn.addEventListener('click', getDancers)
btn1.addEventListener('click', clearAll)
btn2.addEventListener('click', moreInformation)


//Rensar skärmen när användaren byter preferenser i formen
function removeDancers() {
  let removeText = document.querySelectorAll(".dancers")
  removeText.forEach((person) => {
    person.remove()
  })
}


