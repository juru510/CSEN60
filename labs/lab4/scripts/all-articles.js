// Tags
const searchTags = [];

// Individual elements
let parentElement = null;
const tagLists = Array.from(document.querySelectorAll("article .tags"));

// Search Functions

/** 
 * Initializes search by retrieving tags from URL parameters.
 * Sets the parentElement and adds tags from the URL to the searchTags array.
 * Then, it creates clickable tag elements in the DOM for each tag in the URL.
 */
function initializeSearch(newParentElement) {
  const params = new URLSearchParams(window.location.search);
  if (newParentElement === null) {
    console.error(
      "Cannot insert tags, parent element is null",
      params.getAll("tag")
    );
    return;
  }

  parentElement = newParentElement;
  for (const tag of params.getAll("tag")) {
    addSearchTerm(tag);
  }
}

/** 
 * Hides or shows articles based on the searchTags array.
 * Iterates over each article, and if it doesn't match any search tag, hides it.
 */
function hideArticles() {
  if (searchTags.length === 0) {
    for (const article of document.querySelectorAll("article")) {
      article.classList.remove("hidden");
    }
    return;
  }

  const articlesWithTags = [];
  for (const tag of searchTags) {
    articlesWithTags.push(...findArticlesWithTag(tag));
  }

  // Select all articles and hide those not in articlesWithTags
  const allArticles = document.querySelectorAll("article");
  for (const article of allArticles) {
    if (!articlesWithTags.includes(article)) {
      article.classList.add("hidden");
    } else {
      article.classList.remove("hidden");
    }
  }
}

/** 
 * Creates a clickable tag button for a given search term (text). 
 * When clicked, it removes the tag from both the DOM and the searchTags array,
 * and then calls hideArticles to update displayed articles.
 */
function createTag(text) {
  const button = document.createElement("button"); // Create a new button element
  button.classList.add("tag"); // add the class "tag" to its classList
  button.textContent = text; // set the button's textContent property to text (the passed in argument)

  function remove() {
    button.remove(); // Remove the button from the DOM
    const index = searchTags.indexOf(text); // Find the index of the tag in searchTags
    if (index !== -1) {
      searchTags.splice(index, 1); // Remove the tag from the searchTags array
    }

    hideArticles(); // Update the displayed articles
  }

  button.addEventListener("click", remove); // Add click event listener to the button
  return button; // Return the created button element
}

/** 
 * Searches for articles that contain a specified tag.
 * Iterates over all articles, compares each tag, and returns a list of matching articles.
 */
function findArticlesWithTag(phrase) {
  const articles = [];
  const sanitizedPhrase = phrase.toLowerCase().trim(); //  Search phrase
  for (const tl of tagLists) {
    const tags = Array.from(tl.querySelectorAll("li")); // Get all tags in the current article
    for (const tag of tags) {
      if (tag.textContent.toLowerCase().trim() === sanitizedPhrase) {
        articles.push(tl.parentElement); // If tag matches, add the parent article to the results
        break; // Break the inner loop if a match is found
      }
    }
  }

  return articles; 
}

/** 
 * Adds a new search term by creating a tag button in the DOM, 
 * adding the term to searchTags, and calling hideArticles to update articles displayed.
 */
function addSearchTerm(text) {
  parentElement.appendChild(createTag(text)); 
  searchTags.push(text); 
  hideArticles(); 
}

// Handlers

/** 
 * Handles Enter key press in the search input field.
 * Adds the current input value to search tags and clears the input.
 */
function onSearch(event) {
  const input = event.currentTarget;
  if (event.key === "Enter") { // Check if the Enter key was pressed
    addSearchTerm(input.value.trim()); //all addSearchTerm and pass the input element's value
    input.value = ""; //set input value to an empty string
  }
}

// Main function

/** 
 * Main function that initializes search tags from the URL and 
 * attaches event listener to the search input for handling Enter keypress.
 */
function main() {
  initializeSearch(document.querySelector("#searched-tags")); // Initialize the search with the parent element

  document
    .querySelector("input[type=search]")
    .addEventListener("keypress", onSearch); // Add event listener for keypress in the search input
}

// Execute main function
main();

/**
 * Order of execution for each event:
 * 
 * Pressing Enter:
 * onSearch -> addSearchTerm -> createTag -> hideArticles
 * 
 * Clicking to Remove a Tag:
 * createTag -> remove (event listener within createTag) -> hideArticles
 * 
 * Loading the Page:
 * main -> initializeSearch -> addSearchTerm -> createTag -> hideArticles
 */
