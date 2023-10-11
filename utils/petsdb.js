const myApiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6b3B2cmJ2ZmpiZG9nZnpramFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE0NjE5ODUsImV4cCI6MTk5NzAzNzk4NX0.eef1JPo1YGr6hfPQ5NkiYTnT0Kon50GcJ2n1WSLNw-0";

const myUrl = "https://vzopvrbvfjbdogfzkjaa.supabase.co/rest/v1/";

export async function getPets() {
  let headersList = {
    apikey: myApiKey,
  };

  let response = await fetch(myUrl + "pets", {
    method: "GET",
    headers: headersList,
  });

  let data = await response.json();
  //   console.log(data);
  return data;
}

export async function addPet() {
  let headersList = {
    Accept: "*/*",
    apikey: myApiKey,
    Prefer: "return=representation",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    name: "Piphans",
    species: "Swallow",
    race: "Blue swallow",
    dob: "2001-04-09",
    traits: ["injured", "recovering"],
    isAlive: true,
    activityLevel: 3,
    image: "piphans.webp",
  });

  let response = await fetch(myUrl + "pets", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();
  console.log(data);
  return data;
}

export async function deletePet(id) {
  let headersList = {
    apikey: myApiKey,
    Prefer: "return=representation",
  };

  let response = await fetch(myUrl + "pets?id=eq." + id, {
    method: "DELETE",
    headers: headersList,
  });

  let data = await response.json();
  //   console.log(data);
  return data;
}

export async function updatePet(id) {
  let headersList = {
    apikey: myApiKey,
    Prefer: "return=representation",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    isAlive: false,
  });

  let response = await fetch(myUrl + "pets?id=eq." + id, {
    method: "PATCH",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();
  //   console.log(data);
  return data;
}
