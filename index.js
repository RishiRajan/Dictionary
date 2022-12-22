//Function to create Html Elements
let createElement = (type, className, id, parentid) => {
  let element = document.createElement(type);
  element.className = className;
  element.id = id;
  if (parentid) document.getElementById(parentid).append(element);
  else document.body.append(element);
  return element;
};

//--------- Variable Declarations ---------------

let primeUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
var query = "";
// let target = document.getElementById("result");

// Function to prevent default reload when submit
let navdefault = (event) => {
  collectFormData();
  event.preventDefault();
};

//Query gets prepared here
let collectFormData = () => {
  query = document.getElementById("searchbar").value;
  getData(primeUrl + query); //request for meaning of word
};

let getData = (url) => {
  results(url)
    .then((meaning) => {
      cardCreator(meaning);
    })
    .catch((error) => {
      console.log(error);
    });
};

//----------- The Async Function ------------
let results = async (primeUrl) => {
  const response = await fetch(primeUrl);
  if (response.ok) {
    return response.json();
  } else {
    console.log(response.status);
    window.alert("Enter a valid word");
    document.getElementById("searchbar").value = "";
    document.getElementById("result").innerHTML = "";
    throw new Error(`Error! status: ${response.status}`);
  }
};

let cardCreator = (meaning) => {
  document.getElementById("searchbar").value = "";
  document.getElementById("result").innerHTML = "";
  createElement("div", "card", "resCard", "result");
  createElement("div", "card-body", "resCardBody", "resCard");
  createElement("div", "row", "cardtitlerow", "resCardBody");
  createElement("div", "col-lg-12 cardTitle", "titlecol", "cardtitlerow");

  let text = createElement("h3", "card-title", "word", "titlecol");
  text.innerHTML = meaning[0].word;

  if(meaning[0].phonetic){
    let phoneitc  = createElement("h6","card-text phonetic","phonetic","titlecol");
    phoneitc.innerHTML = meaning[0].phonetic;
  }
  createElement("hr", 0, 0, "resCardBody");

  let meanings = meaning[0].meanings;
  let j =0;
  for (let i in meanings) {
    j+=1;
    createElement("div","meanings","temp"+j,"resCardBody");

    let tempM = createElement("h5", "card-text partOfSpeech", "tempM", "temp"+j);
    tempM.innerHTML = meanings[i].partOfSpeech;

    createElement("ul","list","list"+j,"temp"+j)

    createElement("li", "listitem", "listitem" + j, "list" + j);
    let tempdef = createElement("p", "card-text definiton", "tempdef","listitem" + j);
    tempdef.innerHTML = meanings[i].definitions[0].definition;

   
    if(meanings[i].definitions[0].example){
    createElement("li", "listitem", "listitem2" + j, "list" + j);
    let tempEg = createElement("p", "card-text example", "tempeg", "listitem2" + j);
    tempEg.innerHTML = "Example: "+meanings[i].definitions[0].example;    
    }
    

  }
};





