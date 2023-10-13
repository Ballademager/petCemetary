const myApiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6b3B2cmJ2ZmpiZG9nZnpramFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE0NjE5ODUsImV4cCI6MTk5NzAzNzk4NX0.eef1JPo1YGr6hfPQ5NkiYTnT0Kon50GcJ2n1WSLNw-0";

const myUrl = "https://vzopvrbvfjbdogfzkjaa.supabase.co/rest/v1/";

export async function getPets() {
  let headersList = {
    apikey: myApiKey,
  };

  let response = await fetch(myUrl + "pets?order=created_at", {
    method: "GET",
    headers: headersList,
  });

  let data = await response.json();
  //   console.log(data);
  return data;
}

export async function addPet(data) {
  let headersList = {
    Accept: "application/json",
    apikey: myApiKey,
    Prefer: "return=representation",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify(data);

  let response = await fetch(myUrl + "pets", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let answer = await response.json();
  //   console.log(answer);
  return answer;
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

export async function updatePet(id, nextState) {
  let headersList = {
    apikey: myApiKey,
    Prefer: "return=representation",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    //isAlive: false,
    isAlive: nextState,
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
