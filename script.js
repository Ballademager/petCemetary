import { getPets, deletePet, addPet, updatePet } from "./utils/petsdb.js";

async function showPets() {
  const pets = await getPets();
  console.log(pets);
  console.log(pets.length, "animals in supabase");
  document.querySelector(".pets").innerHTML = "";
  pets.forEach((pet) => {
    const template = document.querySelector("template").content;
    const copy = template.cloneNode(true);
    const deleteButton = copy.querySelector("button[data-action='delete']");
    deleteButton.dataset.id = pet.id;
    const updateButton = copy.querySelector("button[data-action='update']");
    updateButton.dataset.id = pet.id;

    copy.querySelector("#name").textContent = pet.name;
    copy.querySelector("#species").textContent = pet.species;
    copy.querySelector("#race").textContent = pet.race;
    copy.querySelector("#traits").textContent = pet.traits;
    if (pet.isAlive) {
      copy.querySelector("#activityLevel span").textContent = pet.activityLevel;
    } else {
      copy.querySelector("#activityLevel span").textContent = "0";
      copy.querySelector("#was").textContent = "Was:";
    }

    copy.querySelector("#dob span:first-child").textContent = `${pet.name} is `;
    copy.querySelector("#dob span:last-child").textContent = new Date().getFullYear() - pet.dob.slice(0, 4);
    // copy.querySelector("#dob span").textContent = pet.dob;
    if (!pet.isAlive) {
      console.log(pet.id, "is dead");
      copy.querySelector(".pet-card").dataset.status = "dead";
      copy.querySelector("#isAlive span").textContent = "DEAD";
      updateButton.textContent = "Revive";
    } else {
      copy.querySelector("#isAlive span").textContent = "Alive";
      updateButton.textContent = "Kill";
    }
    if (pet.image) {
      copy.querySelector("img").src = pet.image;
    } else {
      copy.querySelector("img").src = "https://picsum.photos/id/237/300/200";
    }

    deleteButton.addEventListener("click", async (e) => {
      await deletePet(pet.id);
      showPets();
    });

    updateButton.addEventListener("click", async (e) => {
      console.log(pet.id, "skal opdateres");
      await updatePet(pet.id, !pet.isAlive);
      showPets();
    });

    document.querySelector("section").appendChild(copy);
  });
}

showPets();

const form = document.querySelector(".form");

form.addEventListener("submit", async (e) => {
  console.log("submitted");
  e.preventDefault();
  const formData = new FormData(form);

  let alive = true;
  if (formData.get("isAlive") == "Dead") {
    alive = false;
  }

  const newPet = {
    name: formData.get("name"),
    species: formData.get("species"),
    race: formData.get("race"),
    dob: formData.get("dob"),
    // fallback date of birth eller standardinput hvis der ikke skrives noget eller required felt
    activityLevel: formData.get("activityLevel"),
    isAlive: alive,
    traits: formData.get("traits").split("\n"),
    image: formData.get("image"),
  };
  console.log("det nye dyr er", newPet);

  await addPet(newPet);
});
// {
//     name: "Piphans",
//     species: "Swallow",
//     race: "Blue swallow",
//     dob: "2001-04-09",
//     traits: ["injured", "recovering"],
//     isAlive: true,
//     activityLevel: 3,
//     image: "piphans.webp",
//   }
