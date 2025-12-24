function activateFromButton(event, button) {
  event.stopPropagation();

  const clickedCard = button.closest('.modelcard');
  const cards = document.querySelectorAll('.modelcard');
  const list = document.querySelector('.modelslist');
  const isTablet = window.innerWidth >= 600 && window.innerWidth <= 1070;
  const isPhone = window.innerWidth >= 300 && window.innerWidth <= 600;


  list.classList.add('has-active');

  cards.forEach(card => {
    const viewer = card.querySelector('model-viewer');
    if (!viewer) return;

    if (card === clickedCard) {
      card.classList.add('active');
      card.classList.remove('inactive');

      viewer.setAttribute('camera-orbit', '0deg 90deg 7m');

      if (viewer.dataset.model === 'revani') {
        viewer.setAttribute('field-of-view', '16deg');
      } else if (viewer.dataset.model === 'tvr' || viewer.dataset.model === 'merc') {
        viewer.setAttribute('field-of-view', '15deg'); 
      } else if (viewer.dataset.model === 'su7' || viewer.dataset.model === 'arri') {
        viewer.setAttribute('field-of-view', '13deg'); 
      } else if (viewer.dataset.model === 'gre') {
        viewer.setAttribute('field-of-view', '10deg'); 
      } else {
        viewer.setAttribute('field-of-view', '23deg');
      }

      viewer.jumpCameraToGoal();

    } else {
      card.classList.remove('active');
      card.classList.add('inactive');

      viewer.setAttribute('camera-orbit', '-278deg 81deg 8.6m');
      
      // Apply tablet-specific field-of-view for inactive cards
      if (isTablet) {
        if (viewer.dataset.model === 'revani') {
          viewer.setAttribute('field-of-view', '18deg');
        } else if (viewer.dataset.model === 'tvr') {
          viewer.setAttribute('field-of-view', '20deg');
        } else if (viewer.dataset.model === 'gre') {
          viewer.setAttribute('field-of-view', '18deg');
        } else if (viewer.dataset.model === 'su7') {
          viewer.setAttribute('field-of-view', '15deg');
        } else {
          viewer.setAttribute('field-of-view', '23deg');
        }
      } else {
        viewer.setAttribute('field-of-view', '26deg');
      }
      
viewer.updateComplete.then(() => viewer.jumpCameraToGoal());
    }
  });
      if (isPhone) {
        if (viewer.dataset.model === 'revani') {
          viewer.setAttribute('field-of-view', '15deg');
        } else if (viewer.dataset.model === 'tvr') {
          viewer.setAttribute('field-of-view', '20deg');
        } else if (viewer.dataset.model === 'gre') {
          viewer.setAttribute('field-of-view', '18deg');
        } else if (viewer.dataset.model === 'su7') {
          viewer.setAttribute('field-of-view', '15deg');
        } else {
          viewer.setAttribute('field-of-view', '23deg');
        }
      } else {
        viewer.setAttribute('field-of-view', '26deg');
      }
  
  
}

  const list = document.querySelector('.brandslist');
  const speed = 1; 

  const items = Array.from(list.children);
  items.forEach(item => {
    const clone = item.cloneNode(true);
    list.appendChild(clone);
  });
  
  let x = 0;
  
  function animate() {
    x -= speed;
    if (x <= -list.scrollWidth / 2) {
      x = 0; 
    }
    list.style.transform = `translateX(${x}px)`;
    requestAnimationFrame(animate);
  }
  
  animate();
  

  

  document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.carcard');
    const arrowGo = document.querySelector('.arrowgo');
    const arrowBack = document.querySelector('.arrowback');
    const wheel = document.querySelector('.wheelrota');

    let currentIndex = 2;
    let rotation = 0; 

    cards[currentIndex].classList.add('active');

    function showCard(index) {
        cards.forEach(card => card.classList.remove('active'));
        cards[index].classList.add('active');
    }

    arrowGo.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cards.length;
        showCard(currentIndex);

        rotation += 30;
        wheel.style.transform = `rotate(${rotation}deg)`;
    });

    arrowBack.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        showCard(currentIndex);


        rotation -= 30;
        wheel.style.transform = `rotate(${rotation}deg)`;
    });
});


        let burger = document.querySelector(".burger");
        let menu = document.querySelector(".burgermenu");
        let closeX = document.getElementById("x");
burger.onclick = () => {
    menu.classList.add("active");
  };
  
  closeX.onclick = () => {
    menu.classList.remove("active");
  };


  