document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("enrol-form");
  const successBox = document.getElementById("enrol-success");
  const errorBox = document.getElementById("enrol-error");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    errorBox.style.display = "none";

    const formData = new FormData(form);

    const payload = {
      event_type: "dots-enroll",
      client_payload: {
        first_name: formData.get("first_name")?.trim(),
        last_name: formData.get("last_name")?.trim(),
        email: formData.get("email")?.trim(),
        country: formData.get("country")?.trim() || ""
      }
    };

    // Basic client-side validation
    if (!payload.client_payload.email) {
      errorBox.innerText = "Email is required.";
      errorBox.style.display = "block";
      return;
    }

    try {
      const response = await fetch(
        "https://api.github.com/repos/domg6027/dots6027/dispatches",
        {
          method: "POST",
          headers: {
            "Accept": "application/vnd.github+json",
            "Content-Type": "application/json",
            "Authorization": "Bearer __REPO_DISPATCH_TOKEN__"
          },
          body: JSON.stringify(payload)
        }
      );

      if (!response.ok) {
        throw new Error("Dispatch failed");
      }

      form.style.display = "none";
      successBox.style.display = "block";

    } catch (err) {
      console.error(err);
      errorBox.innerText =
        "Enrollment could not be submitted. Please try again later.";
      errorBox.style.display = "block";
    }
  });
});
