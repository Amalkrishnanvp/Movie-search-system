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
const addToFavourites = async (event, imdbID, userId) => {
  console.log(imdbID, userId);
  event.preventDefault();
  event.stopPropagation();

  const heartIcon = document.getElementById(`heart-${imdbID}`);
  const isFavorite = heartIcon.getAttribute("data-favorite") === "true";

  if (isFavorite) {
    // Switch to unfilled state
    heartIcon.setAttribute("fill", "none");
    heartIcon.setAttribute("stroke", "currentColor");
    heartIcon.classList.remove("text-red-500");
    heartIcon.classList.add("text-gray-400");
    heartIcon.setAttribute("data-favorite", "false");
  } else {
    // Switch to filled state
    heartIcon.setAttribute("fill", "currentColor");
    heartIcon.setAttribute("stroke", "none");
    heartIcon.classList.remove("text-gray-400");
    heartIcon.classList.add("text-red-500");
    heartIcon.setAttribute("data-favorite", "true");
  }

  $.ajax({
    url: "/user/add-to-favourites",
    type: "POST",
    data: {
      imdbID,
      userId,
    },
    success: (response) => {
      console.log("Response: ", response);
      if (response.success) {
        alert(response.message);
        const favoriteMovieCountShower = document.getElementById(
          "favourite-movies-count"
        );
        const favouriteMoviesCount = response.favouriteMoviesCount;
        favoriteMovieCountShower.innerText = favouriteMoviesCount;
      } else {
        alert(response.message);
      }
    },
  });

  // API call to add movie to favorites
  // const response = await fetch("/user/add-to-favourites", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ imdbID }),
  // });

  // if (response.ok) {
  //   const favoriteMovieCountShower = document.getElementById(
  //     "favourite-movie-count"
  //   );
  //   const data = await response.json();
  //   alert(data.message);
  //   const favouriteMoviesCount = data.favouriteMoviesCount;
  //   favoriteMovieCountShower.innerText = favouriteMoviesCount;
  // } else {
  //   const error = await response.json();
  //   alert(data.message);
  //   console.error("Error: ", error);
  // }
};

// Function to toggle favourite button
// toggleFavouriteButton = () => {};
