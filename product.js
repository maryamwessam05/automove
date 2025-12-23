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
        default: '-49.57deg 81.12deg 8.116m',
        top: '-91.04deg 0.79deg 8.736m',
        front: '0deg 90deg 8.116m',
        left: '-90deg 90deg 8.116m',
        right: '90deg 90deg 8.116m',
        back: '180deg 90deg 8.116m'
    };
    

        
const colors = {
 grey: null,  
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