function loadInclude(id, file) {
  fetch(file)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load ${file}`);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;
    })
    .catch(error => {
      console.error(error);
    });
}

loadInclude("header-placeholder", "header.html");
loadInclude("nav-placeholder", "nav.html");
loadInclude("footer-placeholder", "footer.html");
