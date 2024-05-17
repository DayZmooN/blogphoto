const API_BASE_URL = "https://photos-api-sepia.vercel.app";

async function fetchPhotos() {
  try {
    const response = await fetch(`${API_BASE_URL}/photos`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const photos = await response.json();
    displayPhotos(photos);
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
    await fetchPhotos();
  } catch (error) {
    console.error(error);
  }
}

async function fetchDelete(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/photos/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    await fetchPhotos();
  } catch (error) {
    console.error(error);
  }
}

function displayPhotos(photos) {
  $("#container").empty();
  photos.forEach((photo) => {
    $("#container").append(`
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
          <a href="${photo.url}" data-lightbox="roadtrip">Image #2
            <img class="photo" data-lightbox="${photo.id}"  src="${photo.url}" alt="Placeholder image" /></a>
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4 text text-area" data-id="${photo.id}" contenteditable="false">${photo.description}</p>
            </div>
            <!--<button onclick="SubmitUpdate(event)" class="button is-warning">Update</button>-->
            
          </div>
          <ion-icon class="edit" data-id="${photo.id}" onclick="modal(event)" name="create-outline"></ion-icon>
          </div>
        <div class="buttons">
          <button onclick="fetchDelete(${photo.id})" class="button is-danger">Delete</button>
        </div>
      </div>`);
  });
}

async function modal(event) {
  const icon = event.target.closest(".edit");
  if (icon) {
    const id = icon.dataset.id;
    console.log(id);

    const response = await fetch(`${API_BASE_URL}/photos/${id}`);
    const photoData = await response.json();

    // Afficher les données de la photo dans la modal
    const modalContent = document.querySelector(".modal-content");
    modalContent.innerHTML = `
      <div id="modal-card" class="card-modal  ">
        <img  src="${photoData.url}" alt="Placeholder image" /> <div class="modal-footer">
        <p class="para">Description </p>
        <textarea class="text-area" data-id="${id}"> ${photoData.description}</textarea>
       
        <button onclick="SubmitUpdate(event, '${id}')" class="button is-warning">Update</button>
        </div>
      </div>
    `;

    // Ouvrir la modal
    const modal = document.querySelector(".modal");

    modal.classList.add("is-active");
  }
}

/*function editIcon(event) {
  const icon = event.target;
  const cardContent = icon.closest(".card-content");
  const textArea = cardContent.querySelector(".text-area");
  if (textArea !== null) {
    textArea.setAttribute("contenteditable", "true");
  }
}*/
document.addEventListener("DOMContentLoaded", (event) => {
  async function upload() {
    const urlPic = document.getElementById("urlPic").value;
    const description = document.getElementById("description").value;

    const photo = {
      url: urlPic,
      description: description,
    };

    if (photo.url && photo.description) {
      await fetchUpload(photo);
    } else {
      console.log("Photo non envoyée : veuillez remplir tous les champs.");
    }
  }
  document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();
    upload();
  });
});

async function fetchSearch(search) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/photos/search?description=${search}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

async function search() {
  const search = document.getElementById("search").value;
  const results = await fetchSearch(search);
  console.log(results);
  if (results.length) {
    $("#container").empty();
    displayPhotos(results);
  } else {
    $("#container").empty();
    $("#container").append(`<p>Photo pas trouvée.</p>`);
    console.log("Photo pas trouvée.");
  }
}

async function fetchUpdate(id, description) {
  try {
    const response = await fetch(`${API_BASE_URL}/photos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description }), // Envoie de l'URL de l'image avec la description
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
}

async function SubmitUpdate(event, id) {
  const button = event.currentTarget;
  const card = button.closest(".card, .card-modal"); // Trouver l'élément .card parent

  if (card === null) {
    console.error("Card not found");
    return;
  }

  const textElement = card.querySelector(".text-area");
  if (textElement === null) {
    console.error("Text area not found");
    return;
  }

  const description = textElement.value;

  await fetchUpdate(id, description);
  await fetchPhotos(); // Mettre à jour l'affichage après la modification
}

function activerEdition() {
  document.getElementById("update").style.display = "block";
}

$(document).ready(fetchPhotos);

function editIco(event) {
  const icon = event.currentTarget;
  const cardContent = icon.closest(".card-content");
  const textArea = cardContent.querySelector(".text-area");

  if (textArea.getAttribute("contenteditable") === "false") {
    textArea.setAttribute("contenteditable", "true");
  } else {
    textArea.setAttribute("contenteditable", "false");
  }
}
