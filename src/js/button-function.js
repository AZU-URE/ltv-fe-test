function printHii() {
  const btn = document.getElementById("email-btn");
  console.log(btn);
  btn.addEventListener("click", () => {
    console.log("hii");
  });
}
export { printHii };
