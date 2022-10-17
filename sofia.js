//Hämtar in alla nödvändiga värden från HTML samt deklarerar globala variabler
let output = document.getElementById("output");
let output1 = document.getElementById("output1");
const btn = document.getElementById("btn");
const btn1 = document.getElementById("clear");
const btn2 = document.getElementById("info")
const btn3 = document.getElementById("docu")
const gender = document.getElementById("gender");
const age = document.getElementById("age");
const length = document.getElementById("length");
const hair = document.getElementById("hair");
const tattoos = document.getElementById("tattoos");
const doc = document.getElementById("documentation");
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
    output1.style="display: block;"
    removeDancers()
    displayPeople.forEach((person) => {
      let info = document.createElement("p")
      info.setAttribute("class", "dancers");
      info.innerText = 
      `Firstname: ${person.firstname}
      Lastname: ${person.lastname}
      Gender: ${person.gender}
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
  output1.style="display: none;"
}

//Samtliga knappar med deras funktion
btn.addEventListener('click', getDancers)
btn1.addEventListener('click', clearAll)
btn2.addEventListener('click', moreInformation)
btn3.addEventListener('click', documentationFunction)


//Rensar skärmen när användaren byter preferenser i formen
function removeDancers() {
  let removeText = document.querySelectorAll(".dancers")
  removeText.forEach((person) => {
    person.remove()
  })
  noMatch = true;
}


function documentationFunction() {
  doc.innerHTML =`<div id="documentDiv"><p>
  This code is developed for the ability to handle an archive of dancers to
  make it easier for choreographers, producers, director and others to
  find the type of dancers they need for upcoming projects. By choosing the criterias down
  below you get the dancers matching your choises. You can also get all the dancers by just choosing "All"
  in respective tabs.
</p>
<p>
  For some proffessions in the showbiz there is a lot of dancers to consider when choosing
  who to send to which job. With a code like this we can easily pick out the group of dancers
  that would fit for a specific job. <br>
  For example there could be an artist asking for two male dancers
  of a specific height to match the artists specific vision of the musicvideo. 
  With this form you can put in those values to get the dancers that matches those criterias. <br>
  There could also be choreographers that want dancers with a certain haircolor to a project 
  or dancers of a certain age. There is all kinds of visions to be considered but here it is possible 
  for some of those visions to easily be fulfilled by finding the right kind of dancer/dancers.
</p>
<p>
  This code is built on a json-file with a bunch of different dancers and information about 
  each one of them. An HTML-file builds up the structure of the page and has both a CSS- and 
  a Javascript-file linked to it. 
  The js-file takes all of the registered dancers from the json-file and takes out the different 
  dancers that matches the criterias chosen by the user in the form on the page. For more:<br>
  <a href="https://github.com/SofiaCoder/frontend1-exam">Get the code and read more about the project in README!</a>
</p>
<button onclick="clearDocu()">Clear documentation</button>
</div>`
}
function clearDocu() {
  doc.innerHTML = '';
}