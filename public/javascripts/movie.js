// Function to request to server for adding movie to the database
const addMovie = async (event, movieId) => {
  try {
    event.preventDefault();
    // alert(movieId);
    const response = await fetch("/movie/add-movie", {
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
const addToFavourites = async (event, tmdbId, userId) => {
  console.log(tmdbId, userId);
  event.preventDefault();
  event.stopPropagation();

  const heartIcon = document.getElementById(`heart-${tmdbId}`);
  const isFavorite = heartIcon.getAttribute("data-favorite") === "true";

  if (isFavorite) {
    // Switch to unfilled state
    heartIcon.setAttribute("fill", "none");
    heartIcon.setAttribute("stroke", "currentColor");
    heartIcon.classList.remove("text-red-500");
    heartIcon.classList.add("text-gray-400");
    heartIcon.setAttribute("data-favorite", "false");

    $.ajax({
      url: "/user/remove-from-favourites",
      type: "POST",
      data: {
        tmdbId,
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
  } else {
    // Switch to filled state
    heartIcon.setAttribute("fill", "currentColor");
    heartIcon.setAttribute("stroke", "none");
    heartIcon.classList.remove("text-gray-400");
    heartIcon.classList.add("text-red-500");
    heartIcon.setAttribute("data-favorite", "true");

    $.ajax({
      url: "/user/add-to-favourites",
      type: "POST",
      data: {
        tmdbId,
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
  }

  //   const getMovieById = async (id) => {
  //     const response = await axios.get(`/movie/get-movie/${id}`);
  //     console.log("Fetched Movie: ", response.data);
  //   };
};

// Function to toggle favourite button
// toggleFavouriteButton = () => {};
