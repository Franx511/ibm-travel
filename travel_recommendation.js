// script.js

// JavaScript to fetch and display recommendations
fetch("travel_recommendation_api.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data); // Log the data to ensure it's being fetched correctly

    // Select the recommendations container
    const recommendationsContainer = document.getElementById("recommendations");

    // Loop through each recommendation and create HTML elements to display them
    data.forEach((item) => {
      // Create a div for each recommendation
      const recommendationDiv = document.createElement("div");
      recommendationDiv.className = "recommendation";

      // Create an img element for the image
      const img = document.createElement("img");
      img.src = item.imageUrl;
      img.alt = item.name;

      // Create an h3 element for the name
      const name = document.createElement("h3");
      name.textContent = item.name;

      // Create a p element for the description
      const description = document.createElement("p");
      description.textContent = item.description;

      // Append the image, name, and description to the recommendation div
      recommendationDiv.appendChild(img);
      recommendationDiv.appendChild(name);
      recommendationDiv.appendChild(description);

      // Append the recommendation div to the recommendations container
      recommendationsContainer.appendChild(recommendationDiv);
    });
  })
  .catch((error) => console.error("Error fetching the data:", error));

// script.js

// Function to handle search logic
function handleSearch() {
  const searchInput = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase(); // Get and normalize the search input
  const recommendationsContainer = document.getElementById("recommendations");
  recommendationsContainer.innerHTML = ""; // Clear previous results

  // Predefined keywords and corresponding categories
  const categories = {
    beach: ["beach", "beaches"],
    temple: ["temple", "temples"],
    country: ["paris", "tokyo", "new york"], // Add more country/place keywords here
  };

  // Fetch recommendations from JSON
  fetch("travel_recommendation_api.json")
    .then((response) => response.json())
    .then((data) => {
      // Filter and display matching recommendations
      if (data) {
        const recommendationData =
          searchInput == "countries"
            ? data[searchInput][0].cities
            : data[searchInput];
        recommendationData.forEach((item) => {
          const itemName = item.name.toLowerCase();
          const itemDescription = item.description.toLowerCase();
          displayRecommendation(item);
          // Check if the search input matches any category
        });
      }
      if (recommendationsContainer.innerHTML === "") {
        recommendationsContainer.innerHTML = "<p>No results found.</p>";
      }
    })
    .catch((error) => console.error("Error fetching the data:", error));
}

// Function to display a recommendation
function displayRecommendation(item) {
  const recommendationsContainer = document.getElementById("recommendations");

  const recommendationDiv = document.createElement("div");
  recommendationDiv.className = "recommendation";

  const img = document.createElement("img");
  img.src = item.imageUrl;
  img.alt = item.name;

  const name = document.createElement("h3");
  name.textContent = item.name;

  const description = document.createElement("p");
  description.textContent = item.description;

  recommendationDiv.appendChild(img);
  recommendationDiv.appendChild(name);
  recommendationDiv.appendChild(description);

  recommendationsContainer.appendChild(recommendationDiv);
}

// Event listener for the Search button
document.getElementById("searchButton").addEventListener("click", handleSearch);

// Event listener for the Reset button
document.getElementById("resetButton").addEventListener("click", () => {
  document.getElementById("searchInput").value = "";
  document.getElementById("recommendations").innerHTML = ""; // Clear search results
});
