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
 cyan: null,  
    red: [0.3, 0.01, 0.01, 1],        
    black: [0.02, 0.02, 0.02, 1],      
    white: [0.85, 0.85, 0.88, 1],    
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
    text: "The driving experience has exceeded all my expectations. The car feels incredibly stable on the road, even at high speeds, and the acceleration is smooth without any delay.",
    userImg: "img/user1.png",
    name: "Omar Kareem",
    city: "Cairo"
  },
  {
    quoteIcon: "img/comma.svg",
    text: "I use this car daily for long commutes, and it has been extremely comfortable. The interior is quiet, the suspension handles rough roads well.",
    userImg: "img/user2.png",
    name: "Mona Hassan",
    city: "Giza"
  },
  {
    quoteIcon: "img/comma.svg",
    text: "What I love most is how responsive the steering is. Whether I’m driving in the city or on highways, the control feels precise and confident.",
    userImg: "img/user3.png",
    name: "Ahmed Salah",
    city: "Alexandria"
  },
  {
    quoteIcon: "img/comma.svg",
    text: "Fuel consumption is way better than I expected for a car with this level of performance. It balances power and efficiency perfectly.",
    userImg: "img/user2.png",
    name: "Sara Mahmoud",
    city: "Mansoura"
  },
  {
    quoteIcon: "img/comma.svg",
    text: "The design instantly caught my attention, but the real surprise was how smooth the ride feels. Even after hours of driving, I don’t feel tired.",
    userImg: "img/user1.png",
    name: "Youssef Adel",
    city: "New Cairo"
  },
  {
    quoteIcon: "img/comma.svg",
    text: "Safety features give me real peace of mind. The car feels solid, well-built, and very reliable in different driving conditions.",
    userImg: "img/user3.png",
    name: "Nour ElDin",
    city: "Heliopolis"
  },
  {
    quoteIcon: "img/comma.svg",
    text: "Acceleration is powerful yet smooth, which makes overtaking on highways feel effortless. It’s a very confidence-inspiring car.",
    userImg: "img/user1.png",
    name: "Khaled Mostafa",
    city: "Nasr City"
  },
  {
    quoteIcon: "img/comma.svg",
    text: "After months of use, I can honestly say this car delivers consistent performance and comfort. It feels premium in every detail.",
    userImg: "img/user2.png",
    name: "Laila Samir",
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
