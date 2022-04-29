
let innerWidth = 1000;
let innerHeight = 600;

let scene, camera, renderer;



load();
function load() {
    createScene();
    drawPokeball();
    grabHand();
    setupLight();
    orbitControls();
    animate();
}

function createScene() {
    let pokeballCanvas = document.getElementById('pokeball')

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(innerWidth, innerHeight);

    pokeballCanvas.appendChild(renderer.domElement);
}

function drawPokeball() {

    let pokeball_size = 20,
        pokeball_segments = 48;

    pokeball = new THREE.Group();

    /**
     * Upper side
     */
    let ballUpGeom = new THREE.SphereGeometry(pokeball_size, pokeball_segments, pokeball_segments, 0, Math.PI * 2, 0, (Math.PI / 2) * 0.97),
        ballUpClosingGeom = new THREE.CircleGeometry(pokeball_size, pokeball_segments),
        ballUpMat = new THREE.MeshLambertMaterial({ color: 0xff0000 });

    let ballUp = new THREE.Mesh(ballUpGeom, ballUpMat);

    // Closing
    let ballUpClosing = new THREE.Mesh(ballUpClosingGeom, ballUpMat);
    ballUpClosing.rotateX(THREE.Math.degToRad(90));
    ballUpClosing.position.set(0, pokeball_size - pokeball_size * 0.95, 0);

    /**
     * Lower side
     */
    let ballDownGeom = new THREE.SphereGeometry(pokeball_size, pokeball_segments, pokeball_segments, 0, Math.PI * 2, (Math.PI / 2) * 1.03, Math.PI / 2),
        ballDownClosingGeom = new THREE.CircleGeometry(pokeball_size, pokeball_segments),
        ballDownMat = new THREE.MeshLambertMaterial({ color: 0xffffff });

    let ballDown = new THREE.Mesh(ballDownGeom, ballDownMat);

    // Closing
    let ballDownClosing = new THREE.Mesh(ballDownClosingGeom, ballDownMat);
    ballDownClosing.rotateX(THREE.Math.degToRad(90));
    ballDownClosing.position.set(0, -(pokeball_size - pokeball_size * 0.95), 0);

    /**
     * Inner side
     */
    let ballInnerGeom = new THREE.SphereGeometry(pokeball_size * 0.95, pokeball_segments, pokeball_segments),
        ballInnerMat = new THREE.MeshLambertMaterial({ color: 0x000000 });

    let ballInner = new THREE.Mesh(ballInnerGeom, ballInnerMat);

    /**
     * Opening
     */
    let opening = new THREE.Group();

    // Outer geo/mat and meshing
    let openingOuterGeom = new THREE.CylinderGeometry(5, 5, 3, pokeball_segments),
        openingOuterMat = new THREE.MeshLambertMaterial({ color: 0x000000 });

    let openingOuter = new THREE.Mesh(openingOuterGeom, openingOuterMat);

    // Middle geo/mat and meshing
    let openingMiddleGeom = new THREE.CylinderGeometry(3, 3, 3, pokeball_segments),
        openingMiddleMat = new THREE.MeshLambertMaterial({ color: 0xffffff });

    let openingMiddle = new THREE.Mesh(openingMiddleGeom, openingMiddleMat);
    openingMiddle.position.y = 0.7;

    // Inner geo/mat and meshing
    let openingInnerGeom = new THREE.CylinderGeometry(2, 2, 3, pokeball_segments),
        openingInnerMat = new THREE.MeshLambertMaterial({ color: 0xffffff });

    let openingInner = new THREE.Mesh(openingInnerGeom, openingInnerMat);
    openingInner.position.y = 1;

    //position opening group
    opening.rotateX(THREE.Math.degToRad(90));
    opening.position.set(0, 0, pokeball_size * 0.93);

    //add each opening part to group
    opening.add(openingOuter);
    opening.add(openingMiddle);
    opening.add(openingInner);

    // Putting all together
    pokeball.add(ballUp);
    pokeball.add(ballUpClosing);
    pokeball.add(ballDown);
    pokeball.add(ballDownClosing);
    pokeball.add(ballInner);
    pokeball.add(opening);

    //add the ball to scene
    scene.add(pokeball);

    pokeball.position.x = -70
    pokeball.position.y = 50

    camera.position.z = 120;
    camera.lookAt(scene.position);
}

function setupLight() {

    let ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    ambientLight.name = 'Ambient Light';
    scene.add(ambientLight);

    let directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
    directionalLight.name = 'Directional Light';
    directionalLight.position.set(30, 20, 50);
    directionalLight.castShadow = true;
    directionalLight.shadow.darkness = 1;
    directionalLight.shadow.camera.right = 5;
    directionalLight.shadow.camera.left = -5;
    directionalLight.shadow.camera.top = 5;
    directionalLight.shadow.camera.bottom = -5;
    scene.add(directionalLight);

    // let helper = new THREE.CameraHelper( directionalLight.shadow.camera );
    // helper.name = 'DirectionalLight CameraHelper';
    // scene.add( helper );

}
//!

function animate() {
    requestAnimationFrame(animate);

    pokeball.rotation.x += 0.01;
    pokeball.rotation.y += 0.01;
    pokeball.rotation.z += 0.01;

    renderer.render(scene, camera);
};


function grabHand() {
    let canvas = document.querySelector('canvas');

    canvas.addEventListener('mouseup', function () {
        canvas.classList.remove('mouseDown')
    })

    canvas.addEventListener('mousedown', function () {
        canvas.classList.add('mouseDown')
    })
}

function onWindowResize() {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
    window.addEventListener('resize', onWindowResize, false)
}

function orbitControls() {
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.mixDistance = 1;
    controls.maxDistance = 1000;
}


