document.querySelectorAll(".nav-item").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
  });
});

const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendButton = document.getElementById("sendButton");
const typingIndicator = document.getElementById("typingIndicator");

function createMessageElement(text, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);
  const bubble = document.createElement("div");
  bubble.classList.add("message-bubble");
  bubble.textContent = text;
  messageDiv.appendChild(bubble);
  return messageDiv;
}

function appendMessage(text, sender) {
  const message = createMessageElement(text, sender);
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(userInput) {
  const lower = userInput.toLowerCase();

  if (lower.includes("hello") || lower.includes("hi")) {
    return "Hello! How can I help you with CampusSoko today?";
  }
  if (lower.includes("list") || lower.includes("products")) {
    return "You can browse or post items like books, appliances, clothes, and electronics in the Campus Listings.";
  }
  if (lower.includes("services") || lower.includes("skill")) {
    return "Check out our Skill Zone to find students offering tutoring, repairs, photography, and more.";
  }
  if (lower.includes("lost")) {
    return "We have a Lost & Found Board where you can report or claim lost items on campus.";
  }
  if (lower.includes("team")) {
    return "Our team includes George (Developer), Faith (Operations), Brian (Marketing), and Grace (Content Lead).";
  }
  if (lower.includes("mission")) {
    return "Our mission is to empower students across Kenya to buy, sell, and hustle smarter through a trusted campus marketplace.";
  }
  if (lower.includes("goals")) {
    return "Our goals: launch in 5 universities in 6 months, 1,000 active listings in 3 months, help students earn over KES 500,000 in year one.";
  }
  if (lower.includes("thanks") || lower.includes("thank you")) {
    return "You’re welcome! Feel free to ask me anything else about CampusSoko.";
  }

  return "Sorry, I didn’t quite get that. Ask me about Campus Listings, Skill Zone, Lost & Found, or our team!";
}

function botReply(userInput) {
  typingIndicator.style.display = "flex";
  setTimeout(() => {
    typingIndicator.style.display = "none";
    const response = getBotResponse(userInput);
    appendMessage(response, "bot");
  }, 1200);
}

function sendMessage() {
  const userInput = chatInput.value.trim();
  if (userInput === "") return;
  appendMessage(userInput, "user");
  chatInput.value = "";
  botReply(userInput);
}

sendButton.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

let visitCount = localStorage.getItem("visitCount")
  ? parseInt(localStorage.getItem("visitCount"))
  : 0;
visitCount += 1;
localStorage.setItem("visitCount", visitCount);
document.getElementById("visitCount").textContent = visitCount;
