(async () => {
  const status = document.getElementById("status");
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (!token) {
    status.textContent = "Invalid confirmation link.";
    return;
  }

  try {
    await fetch("https://api.github.com/repos/domg6027/dots6027/dispatches", {
      method: "POST",
      headers: {
        "Accept": "application/vnd.github+json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        event_type: "dots-confirm",
        client_payload: { token }
      })
    });

    status.textContent = "Your email has been confirmed. Welcome.";
  } catch (e) {
    status.textContent = "Confirmation failed. Please contact support.";
  }
})();
