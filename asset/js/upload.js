/*$(document).ready(function () {
  $("#upload").on("submit", async function (e) {
    e.preventDefault();

    const urlPic =
      "https://static.hitek.fr/img/bas/ill_m/855475761/onepieceluffymortace.jpg";
    const description =
      "test hahaha le one piece c'est moi je serai le roi des pirates";

    const photo = {
      url: urlPic,
      description: description,
    };

    fetchUpload(photo);
  });
});*/

document.addEventListener("DOMContentLoaded", (event) => {
  function upload() {
    const urlPic = document.getElementById("urlPic").value;
    const description = document.getElementById("description").value;

    const photo = {
      url: urlPic,
      description: description,
    };

    if (photo.url && photo.description) {
      fetchUpload(photo);
    } else {
      console.log("Photo non envoyée : veuillez remplir tous les champs.");
    }
  }
  document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();
    upload();
  });
});
