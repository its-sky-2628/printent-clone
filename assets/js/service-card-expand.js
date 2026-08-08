document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".moving-service-card");

  cards.forEach(function (card) {
    card.addEventListener("click", function (e) {
      e.preventDefault();

      const isAlreadyActive = card.classList.contains("is-active");

      // pehle sab cards se is-active hata do (ek time pe sirf ek open)
      cards.forEach(function (c) {
        c.classList.remove("is-active");
      });

      // agar ye pehle se open nahi tha, to ise open karo
      if (!isAlreadyActive) {
        card.classList.add("is-active");
      }
    });
  });
});
