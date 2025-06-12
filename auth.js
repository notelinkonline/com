// auth.js
document.addEventListener("DOMContentLoaded", () => {
  const stored = JSON.parse(localStorage.getItem("userLogin"));
  const now = new Date();

  if (stored && new Date(stored.expiry) > now) {
    if (stored.device === getDeviceId()) {
      window.location.href = "homepage.html";
    } else {
      showMessage("⚠️ This account is already active on another device.");
    }
  }

  document.getElementById("loginBtn").addEventListener("click", login);
});

function getDeviceId() {
  // Simple fake device ID using localStorage
  let id = localStorage.getItem("deviceId");
  if (!id) {
    id = "device_" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("deviceId", id);
  }
  return id;
}

function login() {
  const username = document.getElementById("username").value.trim();
  const accessCode = document.getElementById("accessCode").value.trim();
  const stored = JSON.parse(localStorage.getItem("userLogin"));

  if (!validUsers.includes(username)) {
    showMessage("❌ Username not available");
    return;
  }

  if (stored && stored.username === username && stored.device !== getDeviceId()) {
    showMessage("⚠️ Already logged in on another device.");
    return;
  }

  if (accessCode !== currentAccessCode) {
    showMessage("❌ Invalid access code.");
    return;
  }

  const expiry = new Date();
  expiry.setMonth(expiry.getMonth() + 1);

  const loginData = {
    username,
    device: getDeviceId(),
    expiry: expiry.toISOString()
  };

  localStorage.setItem("userLogin", JSON.stringify(loginData));
  window.location.href = "homepage.html";
}

function showMessage(msg) {
  document.getElementById("message").textContent = msg;
}
