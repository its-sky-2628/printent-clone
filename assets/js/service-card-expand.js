(() => {

  const showcase =
    document.querySelector(".moving-services-showcase");

  if(!showcase) return;

  const cards =
    [...showcase.querySelectorAll(".moving-service-card")];

  if(!cards.length) return;


  function closeAll(){

    cards.forEach(card => {
      card.classList.remove("is-active");
      card.setAttribute("aria-expanded","false");
    });

  }


  function openCard(card){

    closeAll();

    card.classList.add("is-active");
    card.setAttribute("aria-expanded","true");

  }


  cards.forEach(card => {

    card.setAttribute("tabindex","0");
    card.setAttribute("role","button");
    card.setAttribute("aria-expanded","false");


    /* Desktop — mouse touches card = OPEN */

    card.addEventListener("mouseenter", () => {
      openCard(card);
    });


    /* Desktop — mouse leaves = CLOSE */

    card.addEventListener("mouseleave", () => {

      card.classList.remove("is-active");

      card.setAttribute(
        "aria-expanded",
        "false"
      );

    });


    /* Mobile / touch */

    card.addEventListener("click", () => {

      const active =
        card.classList.contains("is-active");

      closeAll();

      if(!active){
        openCard(card);
      }

    });


    card.addEventListener("keydown", event => {

      if(
        event.key === "Enter" ||
        event.key === " "
      ){
        event.preventDefault();
        openCard(card);
      }

    });

  });

})();
