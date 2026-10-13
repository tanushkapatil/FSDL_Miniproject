// Step 1: Get inputs
let nameInput = document.getElementById("nameInput");
let roleInput = document.getElementById("roleInput");
let bioInput = document.getElementById("bioInput");
let imgInput = document.getElementById("imgInput");

// Step 2: Get profile elements
let profileName = document.getElementById("profileName");
let profileRole = document.getElementById("profileRole");
let profileBio = document.getElementById("profileBio");
let profileImg = document.getElementById("profileImg");

// Step 3: Update function
function updateProfile() {
  profileName.innerText = nameInput.value;
  profileRole.innerText = roleInput.value;
  profileBio.innerText = bioInput.value;
  profileImg.src = imgInput.value;
}

// Step 4: Add event listeners (REAL-TIME update)
nameInput.oninput = updateProfile;
roleInput.oninput = updateProfile;
bioInput.oninput = updateProfile;
imgInput.oninput = updateProfile;
