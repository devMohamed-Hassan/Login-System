// alert("script is working...")

let users = JSON.parse(localStorage.getItem("users")) || [];
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");
    const signinForm = document.getElementById("signinForm");
    const logoutButton = document.getElementById("logout");
    if (signupForm) signupForm.addEventListener("submit", signUp);
    if (signinForm) signinForm.addEventListener("submit", login);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const welcomeMessage = document.getElementById("welcomeMessage");
    if (welcomeMessage && currentUser) {
        welcomeMessage.innerText = `Welcome, ${currentUser.name}!`;
    }
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("currentUser");
            window.location.href = "index.html";
        });
    }
    if (!currentUser && welcomeMessage) {
        window.location.href = "index.html";
    }
});

function signUp(event) {
    event.preventDefault();
    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();
    const existMsg = document.getElementById("exist");
    if (!name || !email || !password) {
        existMsg.innerText = "Please fill in all fields!";
        return;
    }
    if (users.some((user) => user.email === email)) {
        existMsg.innerText = "Email is already registered!";
        return;
    }
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    existMsg.innerText = "Sign-up successful!";
    existMsg.style.color = "green";
    document.getElementById("signupForm").reset();
    setTimeout(() => {
        window.location.href = "index.html";
    }, 1500);
}

function login(event) {
    event.preventDefault();
    const email = document.getElementById("signinEmail").value.trim();
    const password = document.getElementById("signinPassword").value.trim();
    const incorrectMsg = document.getElementById("incorrect");
    if (!users || users.length === 0) {
        incorrectMsg.innerText = "No users found. Please register first.";
        return;
    }
    const user = users.find((user) => user.email === email);
    if (user) {
        if (user.password === password) {
            localStorage.setItem("currentUser", JSON.stringify(user));
            window.location.href = "welcome.html";
        } else {
            incorrectMsg.innerText = "Incorrect password!";
        }
    } else {
        incorrectMsg.innerText = "Email not found!";
    }
}
