const API_BASE_URL = "https://photos-api-sepia.vercel.app";

async function fetchPhotos() {
  try {
    const response = await fetch(`${API_BASE_URL}/photos`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function fetchUpload(photo) {
  try {
    const response = await fetch(`${API_BASE_URL}/photos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(photo),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function fetchDelete(id) {
  console.log("EEEEEEEEs");
  try {
    const response = await fetch(`${API_BASE_URL}/photos/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
}
export { fetchPhotos, fetchUpload, fetchDelete };
