console.log("Meoooow");
import axios from "axios";

// Base URLs for the APIs
let photosBaseURL = "https://api.thecatapi.com/v1/images/search?limit=";
let factsBaseURL = "https://meowfacts.herokuapp.com/?count=";

let NumberofCatFactsInput = document.getElementById("cat-facts-number");
let NumberofCatPhotosInput = document.getElementById("cat-photos-number");
let getCatFactsButton = document.getElementById("get-cat-facts");
let getCatPhotosButton = document.getElementById("get-cat-photos");
let resultsContainer = document.getElementById("results-div");
let spinner = document.getElementById("spinner");
getCatFactsButton.addEventListener("click", async () => {
  let numberOfFacts = NumberofCatFactsInput.value;

  //ensure there is correct input for number of facts
  if (numberOfFacts < 1 || numberOfFacts > 50) {
    alert("Please enter a number between 1 and 50.");
    return;
  }

  //clear results.container
  resultsContainer.innerHTML = "";

  //fetch facts
  fetchFacts(numberOfFacts);
});

getCatPhotosButton.addEventListener("click", async () => {
  console.log("Fetching photos....");
  let numberofPhotos = NumberofCatPhotosInput.value;
  console.log("Number of Photos:", numberofPhotos);
  if (numberofPhotos < 1 || numberofPhotos > 10) {
    alert("Please enter a number between 1 and 10.");
    return;
  }
  // Clear previous results
  resultsContainer.innerHTML = "";
  //fetch Cat Phostos
  fetchCatPhotos(numberofPhotos);
});

//fetch facts
async function fetchFacts(numberOfFacts) {
  spinner.style.display = "block";
  try {
    console.log("Fetching facts....");
    const res = await axios.get(factsBaseURL + numberOfFacts);
    let facts = res.data.data;
    console.log("Facts:", facts);

    let factsContainer = document.createElement("ol");
    factsContainer.className = "facts-container";

    facts.forEach((fact) => {
      let factItem = document.createElement("li");
      factItem.textContent = fact;
      factsContainer.appendChild(factItem);
    });
    resultsContainer.appendChild(factsContainer);
  } catch (error) {
    console.error("Error fetching cat facts:", error);
    resultsContainer.textContent =
      "Error fetching cat facts. Please try again later.";
    return;
  } finally {
    spinner.style.display = "none";
  }
}

async function fetchCatPhotos(numberofPhotos) {
  spinner.style.display = "block";
  try {
    const res = await axios.get(photosBaseURL + numberofPhotos);
    console.log(photosBaseURL + numberofPhotos);
    let photos = res.data;
    console.log("Photos:", photos);
    let photosContainer = document.createElement("div");
    photosContainer.className = "photos-container";

    photos.forEach((photo) => {
      let img = document.createElement("img");
      img.src = photo.url;
      img.alt = "Cat Photo";
      img.style.width = "350px";
      photosContainer.appendChild(img);
    });
    resultsContainer.appendChild(photosContainer);
  } catch (error) {
    console.error("Error fetching cat photos:", error);
    resultsContainer.textContent =
      "Error fetching cat photos. Please try again later.";
    return;
  } finally {
    spinner.style.display = "none";
  }
}
