// Function to request to server for adding movie to the database
const addMovie = async (event, movieId) => {
  try {
    event.preventDefault();
    // alert(movieId);
    const response = await fetch("/admin/add-movie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movieId }),
    });

    const data = await response.json();
    console.log("Post Response: ", data.result);

    if (data.result.status) {
      alert("Movie added to database");
    }
  } catch (error) {
    console.log("Post Error: ", error);
  }
};

// Toggle favorite state
const addToFavourites = async (event, imdbID) => {
  event.preventDefault();
  event.stopPropagation();

  const heartIcon = document.getElementById(`heart-${imdbID}`);
  const isFavorite = heartIcon.classList.contains("text-red-500");

  if (isFavorite) {
    heartIcon.setAttribute("fill", "none");
    heartIcon.setAttribute("stroke", "currentColor");
    heartIcon.classList.remove("text-red-500");
    heartIcon.classList.add("text-gray-400");
  } else {
    heartIcon.setAttribute("fill", "currentColor");
    heartIcon.setAttribute("stroke", "none");
    heartIcon.classList.remove("text-gray-400");
    heartIcon.classList.add("text-red-500");
  }

  // API call to add movie to favorites
  const response = await fetch("/user/add-to-favourites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ imdbID }),
  });

  if (response.ok) {
    const data = await response.json();
    alert(data.message);
  } else {
    const error = await response.json();
    alert(data.message);
    console.error("Error: ", error);
  }
};
