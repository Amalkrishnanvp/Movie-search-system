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

// Function to delete movie from database
const deleteMovie = async (event, movieId) => {
  try {
    event.preventDefault();
    event.stopPropagation();
    // alert(movieId);
    const response = await axios.post("/movie/delete-movie", {
      movieId,
    });

    const data = response.data;
    console.log("Post Response: ", data.result);

    if (data.result.status) {
      alert(data.result.message);
      window.location.reload();
    }
  } catch (error) {
    console.log("Post Error: ", error);
  }

  // Function to suspend user

  const suspendUser = async (event, userId) => {
    try {
      event.preventDefault();
      const response = await axios.post("/user/suspend", { userId });
      const data = response.data;
      console.log("Suspend Response: ", data.result);
      if (data.result.status) {
        alert(data.result.message);
        window.location.reload();
      }
    } catch (error) {
      console.log("Suspend Error: ", error);
    }
  };
};

const deleteSelectedMovies = async (params) => {
  // alert("hi");
  const checkboxes = document.querySelectorAll(".movie-checkbox:checked");
  const selectedIds = Array.from(checkboxes).map((checkbox) => checkbox.value);
  // alert(selectedMovies);

  if (selectedIds.length === 0) {
    alert("Please select atleaset one movie to delete");
    return;
  }

  // alert(selectedIds);
  if (
    confirm(
      `Are you sure you want to delete ${selectedIds.length} selected movie(s)?`
    )
  ) {
    // AJAX request to server
    $.ajax({
      url: "/movie/delete-selected-movies",
      type: "POST",
      data: {
        movieIds: selectedIds,
      },
      success: (response) => {
        const result = response.result;
        console.log("Response: ", response);
        if (result.status) {
          alert(result.message);
          window.location.reload();
        } else {
          alert(result.message);
        }
      },
    });
  }
};

const toggleSelectAll = async () => {
  const selectAll = document.getElementById("selectAllCheckbox");
  const checkboxes = document.querySelectorAll(".movie-checkbox");

  checkboxes.forEach((checbox) => {
    checbox.checked = selectAll.checked;
  });
};

const selectAllCheckbox = document.getElementById("selectAllCheckbox");
if (selectAllCheckbox) {
  selectAllCheckbox.addEventListener("change", toggleSelectAll);
}

// Function to toggle favourite button
// toggleFavouriteButton = () => {};
