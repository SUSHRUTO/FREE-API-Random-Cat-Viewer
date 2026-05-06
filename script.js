const API_URL =
  "https://api.freeapi.app/api/v1/public/cats/cat/random";

const catImage =
  document.getElementById("cat-image");

const catTitle =
  document.getElementById("cat-title");

const catDescription =
  document.getElementById("cat-description");

const loading =
  document.getElementById("loading");

const gallery =
  document.getElementById("gallery");

const catFact =
  document.getElementById("cat-fact");

let currentImage = "";

// LOAD RANDOM CAT
async function loadRandomCat() {

  try {

    loading.classList.remove("hidden");

    const res =
      await fetch(API_URL);

    if (!res.ok) {
      throw new Error(
        "Failed to fetch cat"
      );
    }

    const result =
      await res.json();

    loading.classList.add("hidden");

    const data =
      result?.data;

    const imageUrl =
      data?.url ||
      data?.image ||
      data?.file ||
      "";

    currentImage = imageUrl;

    // UPDATE IMAGE
    catImage.src = imageUrl;

    // RANDOM TITLES
    const titles = [

      "Sleepy Cat 😴",
      "Curious Cat 🐾",
      "Tiny Explorer 🐱",
      "Fluffy Friend 💖",
      "Mischief Master 😼",
      "Cute Companion 🐈"

    ];

    const descriptions = [

      "Cats are naturally curious and playful animals.",

      "Every cat has a unique personality and charm.",

      "Cats spend most of their day sleeping and relaxing.",

      "Domestic cats can run up to 30 miles per hour.",

      "Cats use whiskers to detect nearby objects.",

      "A cat’s purr can reduce stress and anxiety."

    ];

    catTitle.innerText =
      titles[
        Math.floor(
          Math.random() * titles.length
        )
      ];

    catDescription.innerText =
      descriptions[
        Math.floor(
          Math.random() * descriptions.length
        )
      ];

    // ADD TO GALLERY
    addToGallery(imageUrl);

  } catch (error) {

    console.error(error);

    loading.innerText =
      "⚠️ Failed to load cat image";

    // FALLBACK IMAGE
    catImage.src =
      "https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg";
  }
}

// DOWNLOAD IMAGE
function downloadImage() {

  if (!currentImage) return;

  const link =
    document.createElement("a");

  link.href =
    currentImage;

  link.download =
    "cat-image.jpg";

  link.click();
}

// ADD TO GALLERY
function addToGallery(imageUrl) {

  const card =
    document.createElement("div");

  card.className =
    "bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-lg hover:-translate-y-2 transition duration-300";

  card.innerHTML = `
    <img
      src="${imageUrl}"
      class="w-full h-64 object-cover"
    />

    <div class="p-4">

      <p class="text-pink-400 font-semibold">
        🐾 Viewed Cat
      </p>

    </div>
  `;

  gallery.prepend(card);

  // LIMIT GALLERY
  if (gallery.children.length > 6) {
    gallery.removeChild(
      gallery.lastChild
    );
  }
}

// CLEAR GALLERY
function clearGallery() {

  gallery.innerHTML = "";
}

// RANDOM FACTS
function generateFact() {

  const facts = [

    "Cats sleep for around 13 to 16 hours a day.",

    "Cats can rotate their ears 180 degrees.",

    "A group of cats is called a clowder.",

    "Cats have over 20 muscles that control their ears.",

    "The oldest known cat lived to be 38 years old.",

    "Cats can jump nearly six times their body length.",

    "A cat’s nose print is unique like a human fingerprint.",

    "Cats communicate through meows, purrs, and body language."

  ];

  catFact.innerText =
    facts[
      Math.floor(
        Math.random() * facts.length
      )
    ];
}

// INITIAL LOAD
loadRandomCat();