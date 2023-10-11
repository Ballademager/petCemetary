import { getPets, deletePet, addPet, updatePet } from "./utils/petsdb.js";

async function showPets() {
  const pets = await getPets();
  console.log(pets);
  console.log(pets.length, "animals in supabase");
  document.querySelector(".pets").innerHTML = "";
  pets.forEach((pet) => {
    const template = document.querySelector("template").content;
    const copy = template.cloneNode(true);

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
    copy.querySelector("#dob span").textContent = pet.dob;
    if (!pet.isAlive) {
      console.log(pet.id, "is dead");
      copy.querySelector(".pet-card").dataset.status = "dead";
      copy.querySelector("#isAlive span").textContent = "NO";
    } else {
      copy.querySelector("#isAlive span").textContent = "Yeps";
    }

    const deleteButton = copy.querySelector("button[data-action='delete']");
    deleteButton.dataset.id = pet.id;
    const updateButton = copy.querySelector("button[data-action='update']");
    updateButton.dataset.id = pet.id;

    deleteButton.addEventListener("click", async (e) => {
      await deletePet(pet.id);
      showPets();
    });

    updateButton.addEventListener("click", async (e) => {
      console.log(pet.id, "skal opdateres");
      await updatePet(pet.id);
      showPets();
    });

    document.querySelector("section").appendChild(copy);
  });
}

showPets();
// addPet();
