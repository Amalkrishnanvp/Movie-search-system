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
      alert("Movie added to database",)
    }
  } catch (error) {
    console.log("Post Error: ", error);
  }
};
