document.addEventListener('DOMContentLoaded', function() {
    // Get all toggle buttons
    const toggles = document.querySelectorAll('.toggle');
    
    toggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            // Get the parent techspec element
            const techspec = this.closest('.techspec');
            const img = this.querySelector('img');
            
            // Check if this techspec is already open
            const isOpen = techspec.style.height === '235px';
            
            // Toggle the clicked techspec
            if (isOpen) {
                // Close it
                techspec.style.height = '104px';
                img.style.transform = 'rotate(0deg)';
            } else {
                // Close all techspecs first
                document.querySelectorAll('.techspec').forEach(spec => {
                    spec.style.height = '104px';
                    const specImg = spec.querySelector('.toggle img');
                    if (specImg) {
                        specImg.style.transform = 'rotate(0deg)';
                    }
                });
                
                // Open the clicked one
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

