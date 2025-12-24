// Burger menu functionality
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

// Tech specs accordion
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

// Model viewer customization
const modelViewer = document.querySelector('.taycan');
const colorButtons = document.querySelectorAll('.colors > div');
const viewButtons = document.querySelectorAll('.views > div');

// Camera orbit positions for different views
const cameraOrbits = {
    default: '-93.19deg 83.69deg 8.614m',
    top: '-91.04deg 0.79deg 8.736m',
    front: '0deg 90deg 8.614m',
    left: '-90deg 90deg 8.614m',
    right: '90deg 90deg 8.614m',
    back: '180deg 90deg 8.614m'
};

// Color definitions in RGBA format (normalized 0-1)
const colors = {
    black: null,  
    red: [1, 0, 0, 1],          // Pure bright red
    gold: [1, 0.78, 0, 1]       // Bright gold (#FFC700)
};

let originalMaterials = [];

if (modelViewer) {
    console.log('Model viewer found, waiting for load...');
    
    // Wait for model to load before enabling color customization
    modelViewer.addEventListener('load', async () => {
        console.log('BMW M2 model loaded successfully!');
        
        const materials = modelViewer.model.materials;
        console.log('Number of materials found:', materials.length);
        
        // Ensure all materials are loaded first
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
        
        // Color customization
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
                    
                    // Only change the "painted carbon" material
                    if (materialName.includes('painted') && materialName.includes('carbon')) {
                        // Set the base color
                        material.pbrMetallicRoughness.setBaseColorFactor(colorArray);
                        
                        // Remove texture to show solid color
                        material.pbrMetallicRoughness.baseColorTexture = null;
                        
                        // Adjust metallic and roughness for better color visibility
                        material.pbrMetallicRoughness.setMetallicFactor(0.8);  // More metallic shine
                        material.pbrMetallicRoughness.setRoughnessFactor(0.3); // Less rough, more reflective
                        
                        changedCount++;
                    }
                }
                console.log(`Changed ${changedCount} materials to new color`);
            });
        });
    });

    // View angle buttons
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

// Reviews data and carousel
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
        text: "What I love most is how responsive the steering is. Whether I'm driving in the city or on highways, the control feels precise and confident.",
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
        text: "The design instantly caught my attention, but the real surprise was how smooth the ride feels. Even after hours of driving, I don't feel tired.",
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
        text: "Acceleration is powerful yet smooth, which makes overtaking on highways feel effortless. It's a very confidence-inspiring car.",
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

// Populate reviews on page load
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

// Reviews carousel functionality
document.addEventListener("DOMContentLoaded", () => {
    const reviewsCont = document.querySelector(".reviewscont");
    const nextBtn = document.querySelector(".forward");
    const prevBtn = document.querySelector(".backward");
    
    if (!reviewsCont || !nextBtn || !prevBtn) return;
    
    // Wait a bit for reviews to be populated
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