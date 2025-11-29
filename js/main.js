const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbygb9HTvm3EzX0TT-Q1yb3jPlbQuSWU-5-f-iX6EaeSfGiErf4RhkYKB_U3I2CdXYl4/exec"; // <-- REPLACE this with your Apps Script web app URL

async function postToSheet(payload) {
  try {
    const res = await fetch(WEB_APP_URL, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json"
      }
    });
    return await res.json();
  } catch (err) {
    console.error("Error posting to sheet", err);
    return { result: "error", error: err.toString() };
  }
}

/* Email form */
document.addEventListener("DOMContentLoaded", () => {
  const emailForm = document.getElementById("emailForm");
  if (emailForm) {
    emailForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const source = document.getElementById("emailSource").value || "Home";
      const msg = document.getElementById("emailMsg");
      msg.textContent = "Submitting...";
      try {
        const result = await postToSheet({ sheet: "Emails", email, source });
        if (result.result === "success") {
          msg.textContent = "Thanks! You're subscribed.";
          emailForm.reset();
        } else {
          msg.textContent = "Error saving subscription.";
        }
      } catch (err) {
        msg.textContent = "Submission failed — try again later.";
      }
    });
  }

  /* Contact form */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("contactEmail").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const message = document.getElementById("message").value.trim();
      const msg = document.getElementById("contactMsg");
      msg.textContent = "Submitting...";
      try {
        const result = await postToSheet({
          sheet: "Contacts",
          name, email, phone, message, source: "Contact Page"
        });
        if (result.result === "success") {
          msg.textContent = "Message sent! We'll contact you soon.";
          contactForm.reset();
        } else {
          msg.textContent = "Error saving contact.";
        }
      } catch (err) {
        msg.textContent = "Submission failed — try again later.";
      }
    });
  }
});
