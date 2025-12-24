let burger = document.querySelector(".burger");
let menu = document.querySelector(".burgermenu");
let closeX = document.getElementById("x");

if (burger && menu && closeX) {
    burger.onclick = () => {
        menu.classList.add("active");
    };

    closeX.onclick = () => {
        menu.classList.remove("active");
    };
}

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

const modelViewer = document.querySelector('.taycan');
const colorButtons = document.querySelectorAll('.colors > div');
const viewButtons = document.querySelectorAll('.views > div');

const cameraOrbits = {
    default: '-93.19deg 83.69deg 8.614m',
    top: '-91.04deg 0.79deg 8.736m',
    front: '0deg 90deg 8.614m',
    left: '-90deg 90deg 8.614m',
    right: '90deg 90deg 8.614m',
    back: '180deg 90deg 8.614m'
};

const colors = {
    black: null,  
    red: [1, 0, 0, 1],          
    gold: [1, 0.78, 0, 1]       
};

let originalMaterials = [];

if (modelViewer) {
    console.log('Model viewer found, waiting for load...');
    
    modelViewer.addEventListener('load', async () => {
        console.log('BMW M2 model loaded successfully!');
        
        const materials = modelViewer.model.materials;
        console.log('Number of materials found:', materials.length);
        
        for (let i = 0; i < materials.length; i++) {
            await materials[i].ensureLoaded();
            console.log(`Material ${i}: ${materials[i].name}`);
            originalMaterials.push({
                material: materials[i],
                originalColor: materials[i].pbrMetallicRoughness.baseColorFactor.slice(),
                originalTexture: materials[i].pbrMetallicRoughness.baseColorTexture,
                originalMetallic: materials[i].pbrMetallicRoughness.metallicFactor,
                originalRoughness: materials[i].pbrMetallicRoughness.roughnessFactor
            });
        }
        
        colorButtons.forEach((button, index) => {
            console.log(`Adding click listener to color button ${index}`);
            button.addEventListener('click', async function() {
                console.log('Color button clicked:', this.className);
                
                colorButtons.forEach(btn => btn.classList.remove('selectedcolor'));
                this.classList.add('selectedcolor');
                
                const colorClass = this.className.split(' ')[0];
                console.log('Color class:', colorClass);
                const colorArray = colors[colorClass];
                console.log('Color array:', colorArray);
                
                if (colorArray === null) {
                    console.log('Restoring original colors');
                    for (let item of originalMaterials) {
                        await item.material.ensureLoaded();
                        item.material.pbrMetallicRoughness.setBaseColorFactor(item.originalColor);
                        // Restore original texture
                        if (item.originalTexture) {
                            item.material.pbrMetallicRoughness.baseColorTexture = item.originalTexture;
                        }
                        // Restore original metallic and roughness
                        item.material.pbrMetallicRoughness.setMetallicFactor(item.originalMetallic);
                        item.material.pbrMetallicRoughness.setRoughnessFactor(item.originalRoughness);
                    }
                    return;
                }
                
                const materials = modelViewer.model.materials;
                let changedCount = 0;
                
                for (let i = 0; i < materials.length; i++) {
                    const material = materials[i];
                    await material.ensureLoaded();
                    const materialName = material.name.toLowerCase();
                    
                    if (materialName.includes('painted') && materialName.includes('carbon')) {
                        material.pbrMetallicRoughness.setBaseColorFactor(colorArray);
                        
                        material.pbrMetallicRoughness.baseColorTexture = null;
                        
                        material.pbrMetallicRoughness.setMetallicFactor(0.8);  
                        material.pbrMetallicRoughness.setRoughnessFactor(0.3); 
                        
                        changedCount++;
                    }
                }
                console.log(`Changed ${changedCount} materials to new color`);
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
                console.log('Changed view to:', viewClass);
            }
        });
    });
} else {
    console.error('Model viewer element not found!');
}

const reviewTabs = [
    {
        quoteIcon: "img/comma.svg",
        text: "Driving the I-PACE has completely changed my perception of electric cars. The acceleration is seamless and the ride feels incredibly refined.",
        userImg: "img/user2.png",
        name: "Hana ElShazly",
        city: "Cairo"
    },
    {
        quoteIcon: "img/comma.svg",
        text: "I enjoy my daily commutes more than ever. The cabin is quiet, comfortable, and packed with intuitive technology.",
        userImg: "img/user3.png",
        name: "Tamer Nabil",
        city: "Alexandria"
    },
    {
        quoteIcon: "img/comma.svg",
        text: "The steering and handling are exceptional. Whether in traffic or on the highway, the car feels responsive and controlled.",
        userImg: "img/user1.png",
        name: "Sara Mostafa",
        city: "Giza"
    },
    {
        quoteIcon: "img/comma.svg",
        text: "Battery efficiency and range are impressive. I can drive long distances without worrying about charging frequently.",
        userImg: "img/user2.png",
        name: "Omar Hafez",
        city: "Mansoura"
    },
    {
        quoteIcon: "img/comma.svg",
        text: "The design immediately drew me in. Even after hours on the road, the ride is smooth and comfortable.",
        userImg: "img/user3.png",
        name: "Nour Adel",
        city: "New Cairo"
    },
    {
        quoteIcon: "img/comma.svg",
        text: "I feel completely safe with the I-PACE. The build quality and advanced safety features make it very reliable in any condition.",
        userImg: "img/user1.png",
        name: "Khaled Ibrahim",
        city: "Heliopolis"
    },
    {
        quoteIcon: "img/comma.svg",
        text: "Overtaking is effortless thanks to the smooth and powerful acceleration. It gives me a lot of confidence on the road.",
        userImg: "img/user2.png",
        name: "Mona Samir",
        city: "Nasr City"
    },
    {
        quoteIcon: "img/comma.svg",
        text: "After months of driving, I can confidently say it delivers premium comfort and consistent performance in every drive.",
        userImg: "img/user3.png",
        name: "Youssef Farouk",
        city: "Maadi"
    }
];


document.addEventListener('DOMContentLoaded', function() {
    const reviewsContainer = document.querySelector(".reviewscont");
    
    if (reviewsContainer) {
        reviewsContainer.innerHTML = "";
        
        for (let i = 0; i < reviewTabs.length; i++) {
            reviewsContainer.innerHTML += `
                <div class="reviewtab">
                    <img src="${reviewTabs[i].quoteIcon}" alt="">
                    <div class="reviewmsg">
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
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const reviewsCont = document.querySelector(".reviewscont");
    const nextBtn = document.querySelector(".forward");
    const prevBtn = document.querySelector(".backward");
    
    if (!reviewsCont || !nextBtn || !prevBtn) return;
    

    setTimeout(() => {
        const cards = document.querySelectorAll(".reviewtab");
        
        if (cards.length === 0) return;
        
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
    }, 100);
});