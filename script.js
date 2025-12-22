function activateFromButton(event, button) {
    event.stopPropagation();
  
    const clickedCard = button.closest('.modelcard');
    const cards = document.querySelectorAll('.modelcard');
    const list = document.querySelector('.modelslist');
  
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
        } else if (viewer.dataset.model === 'tvr') {
          viewer.setAttribute('field-of-view', '15deg'); 
        }else if (viewer.dataset.model === 'su7' || viewer.dataset.model === 'arri' ){
          viewer.setAttribute('field-of-view', '13deg'); 

        } else if (viewer.dataset.model === 'gre') {
            viewer.setAttribute('field-of-view', '10deg'); 
          }else {
          viewer.setAttribute('field-of-view', '23deg');
        }
  
    
        viewer.jumpCameraToGoal();
  
      } else {
        card.classList.remove('active');
        card.classList.add('inactive');
  
        viewer.setAttribute('camera-orbit', '-278deg 81deg 8.6m');
        viewer.setAttribute('field-of-view', '23deg');
        viewer.jumpCameraToGoal();
      }
    });
  }
  5