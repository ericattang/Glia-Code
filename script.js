const colorBackground = document.getElementById('colorBackground');
const spotlight = document.getElementById('spotlight');
const flowerContainer = document.getElementById('flowerContainer');
const seedContainer = document.getElementById('seedContainer');
const aboutPage = document.getElementById('aboutPage');
let isAboutPageVisible = false;

// Color animation
const gradients = document.querySelectorAll('.gradient');
const initialColors = ['#FFA551', '#FFA6E6', '#FFF27A', '#41FFC6', '#FFA6E6'];
const targetColors = ['#FFE0B2', '#41FFC6', '#FFA6E6', '#FFF27A', '#FFA551'];

function animateColors() {
    gradients.forEach((gradient, index) => {
        gradient.style.background = `radial-gradient(circle at ${getPosition(index)}, ${targetColors[index]}, transparent 70%)`;
    });

    setTimeout(() => {
        gradients.forEach((gradient, index) => {
            gradient.style.background = `radial-gradient(circle at ${getPosition(index)}, ${initialColors[index]}, transparent 70%)`;
        });
        setTimeout(animateColors, 120000);
    }, 120000);
}

function getPosition(index) {
    switch(index) {
        case 0: return 'top left';
        case 1: return 'top right';
        case 2: return 'bottom left';
        case 3: return 'bottom right';
        case 4: return 'center';
    }
}

animateColors();

// Spotlight effect
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    spotlight.style.left = `${x - 100}px`;
    spotlight.style.top = `${y - 100}px`;
});

// Flower animation
function createFlower() {
    for (let i = 0; i < 8; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        flowerContainer.appendChild(petal);
    }
}

function animateFlower() {
    const petals = document.querySelectorAll('.petal');
    petals.forEach((petal, index) => {
        const angle = (index / petals.length) * Math.PI * 2;
        const radius = 30 + Math.sin(Date.now() / 1000) * 10;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        petal.style.transform = `translate(${x}px, ${y}px)`;
        petal.style.backgroundColor = initialColors[index % initialColors.length];
        petal.style.opacity = '1';
    });
    requestAnimationFrame(animateFlower);
}

createFlower();
animateFlower();

// Sparkle and seed animation
document.addEventListener('click', (e) => {
    if (!isAboutPageVisible) {
        createSparkle(e.clientX, e.clientY);
        createSeed(e.clientX, e.clientY);
    }
    toggleAboutPage();
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'seed';
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.backgroundColor = initialColors[Math.floor(Math.random() * initialColors.length)];
    seedContainer.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

function createSeed(x, y) {
    const seed = document.createElement('div');
    seed.className = 'seed';
    seed.style.left = `${x}px`;
    seed.style.top = `${y}px`;
    seedContainer.appendChild(seed);

    let posY = y;
    function dropSeed() {
        posY += 2;
        seed.style.top = `${posY}px`;
        if (posY < window.innerHeight) {
            requestAnimationFrame(dropSeed);
        } else {
            growPlant(seed);
        }
    }
    dropSeed();
}

function growPlant(seed) {
    let height = 5;
    function animate() {
        height += 0.5;
        seed.style.height = `${height}px`;
        seed.style.backgroundColor = initialColors[Math.floor(Math.random() * initialColors.length)];
        if (height < 50) {
            requestAnimationFrame(animate);
        }
    }
    animate();
}

// About page toggle
function toggleAboutPage() {
    isAboutPageVisible = !isAboutPageVisible;
    aboutPage.style.opacity = isAboutPageVisible ? '1' : '0';
    aboutPage.style.pointerEvents = isAboutPageVisible ? 'auto' : 'none';
}