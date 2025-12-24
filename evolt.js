document.addEventListener('DOMContentLoaded', function() {

    const toggles = document.querySelectorAll('.toggle');
    
    toggles.forEach(toggle => {
        toggle.addEventListener('click', function() {

            const techspec = this.closest('.techspec');
            const img = this.querySelector('img');
            
            const isOpen = techspec.style.height === '235px';
            

            if (isOpen) {

                techspec.style.height = '104px';
                img.style.transform = 'rotate(0deg)';
            } else {

                document.querySelectorAll('.techspec').forEach(spec => {
                    spec.style.height = '104px';
                    const specImg = spec.querySelector('.toggle img');
                    if (specImg) {
                        specImg.style.transform = 'rotate(0deg)';
                    }
                });
                
                techspec.style.height = '235px';
                img.style.transform = 'rotate(180deg)';
            }
        });
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

document.addEventListener('DOMContentLoaded', function() {
    const modelViewer = document.querySelector('.taycan');
    const colorButtons = document.querySelectorAll('.colors > div');
    const viewButtons = document.querySelectorAll('.views > div');
    
    
    const cameraOrbits = {
    default: '-49.57deg 81.12deg 0.1036m',
    top: '-91.04deg 0.79deg 0.1036m',
    front: '0deg 90deg 0.1036m',
    left: '-90deg 90deg 0.1036m',
    right: '90deg 90deg 0.1036m',
    back: '180deg 90deg 0.1036m'
};
    

        
const colors = {
 white: null,  
    red: [0.3, 0.01, 0.01, 1],        
    black: [0.02, 0.02, 0.02, 1],      
    blue: [0, 0.02, 0.15, 1]   
};


let originalMaterials = [];

modelViewer.addEventListener('load', () => {
    console.log('Model loaded');
    
    const materials = modelViewer.model.materials;
    materials.forEach(material => {
        originalMaterials.push({
            material: material,
            originalColor: material.pbrMetallicRoughness.baseColorFactor.slice()
        });
    });
    

    colorButtons.forEach(button => {
        button.addEventListener('click', function() {

            colorButtons.forEach(btn => btn.classList.remove('selectedcolor'));
            
            this.classList.add('selectedcolor');
            
            const colorClass = this.className.split(' ')[0];
            const colorArray = colors[colorClass];
            
            if (colorArray === null) {
                originalMaterials.forEach(item => {
                    item.material.pbrMetallicRoughness.setBaseColorFactor(item.originalColor);
                });
                return;
            }
            
            const materials = modelViewer.model.materials;
            
            for (let i = 0; i < materials.length; i++) {
                const material = materials[i];
                
                const materialName = material.name.toLowerCase();
                
                if (!materialName.includes('glass') && 
                    !materialName.includes('chrome') && 
                    !materialName.includes('light') &&
                    !materialName.includes('window') &&
                    !materialName.includes('transparent')) {
                    
                    material.pbrMetallicRoughness.setBaseColorFactor(colorArray);
                }
            }
        });
    });
});

viewButtons.forEach(button => {
        button.addEventListener('click', function() {

            viewButtons.forEach(btn => btn.classList.remove('selectedview'));
            
            this.classList.add('selectedview');
            
            const viewClass = this.className.split(' ')[0];
            const orbit = cameraOrbits[viewClass];
            
            if (orbit) {
                modelViewer.cameraOrbit = orbit;
            }
        });
    });
});


const reviewTabs = [
  {
    quoteIcon: "img/comma.svg",
    text: "The Evolt’s handling is smooth and precise, even at high speeds. I feel completely in control and confident on every road.",
    userImg: "img/user3.png",
    name: "Tamer Fathy",
    city: "Cairo"
  },
  {
    quoteIcon: "img/comma.svg",
    text: "I drive the Evolt every day and it’s incredibly comfortable. The cabin is quiet, and the suspension absorbs bumps perfectly.",
    userImg: "img/user1.png",
    name: "Sara Youssef",
    city: "Giza"
  },
  {
    quoteIcon: "img/comma.svg",
    text: "The steering response is amazing. City traffic or highways, the car feels agile and precise at all times.",
    userImg: "img/user2.png",
    name: "Karim Adel",
    city: "Alexandria"
  },
  {
    quoteIcon: "img/comma.svg",
    text: "I was impressed by the battery efficiency. Evolt balances power and range perfectly for daily and long-distance driving.",
    userImg: "img/user3.png",
    name: "Mona Khaled",
    city: "Mansoura"
  },
  {
    quoteIcon: "img/comma.svg",
    text: "The design caught my eye immediately, but the ride quality is what really surprised me — smooth and effortless even after hours on the road.",
    userImg: "img/user2.png",
    name: "Hany Samir",
    city: "New Cairo"
  },
  {
    quoteIcon: "img/comma.svg",
    text: "I feel safe and reassured in the Evolt. It’s solid, reliable, and packed with features that give peace of mind on every drive.",
    userImg: "img/user1.png",
    name: "Nourhan Magdy",
    city: "Heliopolis"
  },
  {
    quoteIcon: "img/comma.svg",
    text: "Acceleration is smooth but strong. Overtaking on highways is effortless and inspiring confidence at all times.",
    userImg: "img/user3.png",
    name: "Khaled Tarek",
    city: "Nasr City"
  },
  {
    quoteIcon: "img/comma.svg",
    text: "After months of driving, the Evolt consistently delivers performance, comfort, and a premium feel that never gets old.",
    userImg: "img/user2.png",
    name: "Laila Nabil",
    city: "Maadi"
  }
];


const reviewsContainer = document.querySelector(".reviewscont");

reviewsContainer.innerHTML = "";

for (let i = 0; i < reviewTabs.length; i++) {
  reviewsContainer.innerHTML += `
    <div class="reviewtab">
      <img src="${reviewTabs[i].quoteIcon}" alt="">
      <div class = "reviewmsg">
      <p>${reviewTabs[i].text}</p>
      </div>
      <div class="user">
        <img src="${reviewTabs[i].userImg}" alt="">
        <div class="username">
          <h5>${reviewTabs[i].name}</h5>
          <span>${reviewTabs[i].city}</span>
        </div>
      </div>
    </div>
  `;
}


document.addEventListener("DOMContentLoaded", () => {
  const reviewsCont = document.querySelector(".reviewscont");
  const nextBtn = document.querySelector(".forward");
  const prevBtn = document.querySelector(".backward");
  const cards = document.querySelectorAll(".reviewtab");

  const gap = 25;
  let currentIndex = 0;

  function getCardWidth() {
    if (window.innerWidth >= 300 && window.innerWidth <= 600) {
      return 300;
    } else if (window.innerWidth >= 600 && window.innerWidth <= 1070) {
      return 335;
    }
    return 465;
  }

  function updateSlider() {
    const step = getCardWidth() + gap;
    reviewsCont.style.transform = `translateX(-${currentIndex * step}px)`;
  }

  nextBtn.addEventListener("click", () => {
    if (currentIndex < cards.length - 1) {
      currentIndex++;
      updateSlider();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  window.addEventListener("resize", updateSlider);
});
