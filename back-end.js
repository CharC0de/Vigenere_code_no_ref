function test() {
  console.log("welp");
}

console.log("test");
const submitData = async (formData) => {
  key = document.querySelector("#key").value;
  console.log(formData);
  if (formData.confPass != formData.pass) {
    document.querySelector("#error").innerHTML = "passwords do not match ";
    return "";
  }
  formData["pass"] = vigenere(formData.pass, key, false);
  formData["username"] = vigenere(formData.username, key, false);
  formData["email"] = vigenere(formData.email, key, false);
  formData["confPass"] = "";

  try {
    response = await axios.post("http://127.0.0.1:8000/api/insert-data", {
      name: formData.username,
      email: formData.email,
      password: formData.pass,
    });
    document.querySelector("#success").innerHTML = "Register Success!!";
  } catch (e) {
    console.error(e);
  }
};
const authUser = async (formData) => {
  console.log(formData);
  passKey = document.querySelector("#key").value;
  formData["password"] = vigenere(formData.password, passKey, false);
  formData["user"] = vigenere(formData.user, passKey, false);
  try {
    response = await axios.post("http://127.0.0.1:8000/api/auth-data", {
      user: formData.user,
      password: formData.password,
    });
    console.log(response);
    if (response.data.Authenticated) {
      userData = response.data.userData;
      Object.keys(userData).forEach(function (key, index) {
        key == "name" || key == "email" || key == "password"
          ? (userData[key] = vigenere(userData[key], passKey, true))
          : (userData[key] = userData[key]);
      });
      console.log(userData);
    }
  } catch (e) {
    console.error(e);
  }
};
