let pokeballCanvas = document.getElementById('pokeball')
let main = document.querySelector('#resultContainer')

let innerWidth = window.innerWidth;
let innerHeight = window.innerHeight;


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(innerWidth, innerHeight);

pokeballCanvas.appendChild(renderer.domElement);
// document.body.appendChild(renderer.domElement);


// camera.position.z = 100;
// camera.lookAt(scene.position);


//!
drawPokeball();
function drawPokeball() {

    let pokeball_size = 20,
        pokeball_segments = 48;

    pokeball = new THREE.Group();
    pokeball.name = 'Pokeball';

    /**
     * Upper side
     */
    let ballUpGeom = new THREE.SphereGeometry(pokeball_size, pokeball_segments, pokeball_segments, 0, Math.PI * 2, 0, (Math.PI / 2) * 0.97),
        ballUpClosingGeom = new THREE.CircleGeometry(pokeball_size, pokeball_segments),
        // ballUpMat = new THREE.MeshLambertMaterial({ color: '0xff0000' });
        ballUpMat = new THREE.MeshBasicMaterial({ color: 'red' });


    ballUpMat.side = THREE.DoubleSide;

    let ballUp = new THREE.Mesh(ballUpGeom, ballUpMat);
    ballUp.name = 'Pokeball upper side';

    // Closing
    let ballUpClosing = new THREE.Mesh(ballUpClosingGeom, ballUpMat);
    ballUpClosing.rotateX(THREE.Math.degToRad(90));
    ballUpClosing.position.set(0, pokeball_size - pokeball_size * 0.95, 0);
    ballUpClosing.name = 'Pokeball upper closing';


    /**
     * Lower side
     */
    let ballDownGeom = new THREE.SphereGeometry(pokeball_size, pokeball_segments, pokeball_segments, 0, Math.PI * 2, (Math.PI / 2) * 1.03, Math.PI / 2),
        ballDownClosingGeom = new THREE.CircleGeometry(pokeball_size, pokeball_segments),
        ballDownMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    // ballDownMat = new THREE.MeshBasicMaterial({ color: 'white' });

    ballDownMat.side = THREE.DoubleSide;

    let ballDown = new THREE.Mesh(ballDownGeom, ballDownMat);
    ballDown.name = 'Pokeball Lower side';

    // Closing
    let ballDownClosing = new THREE.Mesh(ballDownClosingGeom, ballDownMat);
    ballDownClosing.rotateX(THREE.Math.degToRad(90));
    ballDownClosing.position.set(0, -(pokeball_size - pokeball_size * 0.95), 0);
    ballDownClosing.name = 'Pokeball lower closing';


    /**
     * Inner side
     */
    let ballInnerGeom = new THREE.SphereGeometry(pokeball_size * 0.95, pokeball_segments, pokeball_segments),
        ballInnerMat = new THREE.MeshLambertMaterial({ color: 0x000000 });
    // ballInnerMat = new THREE.MeshBasicMaterial({ color: 'black' });

    let ballInner = new THREE.Mesh(ballInnerGeom, ballInnerMat);
    ballInner.name = 'Pokeball inner side';


    /**
     * Opening
     */
    let opening = new THREE.Group();
    opening.name = 'Opening';

    // Outer
    let openingOuterGeom = new THREE.CylinderGeometry(5, 5, 3, pokeball_segments),
        openingOuterMat = new THREE.MeshLambertMaterial({ color: 0x000000 });
    // openingOuterMat = new THREE.MeshBasicMaterial({ color: 'white' });

    let openingOuter = new THREE.Mesh(openingOuterGeom, openingOuterMat);
    openingOuter.name = 'Outer';

    // Middle
    let openingMiddleGeom = new THREE.CylinderGeometry(3, 3, 3, pokeball_segments),
        openingMiddleMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    // openingMiddleMat = new THREE.MeshBasicMaterial({ color: 'lightgray' });


    let openingMiddle = new THREE.Mesh(openingMiddleGeom, openingMiddleMat);
    openingMiddle.name = 'Middle';
    openingMiddle.position.y = 0.7;

    // Inner
    let openingInnerGeom = new THREE.CylinderGeometry(2, 2, 3, pokeball_segments),
        openingInnerMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    // openingInnerMat = new THREE.MeshBasicMaterial({ color: 'white' });


    let openingInner = new THREE.Mesh(openingInnerGeom, openingInnerMat);
    openingInner.name = 'Inner';
    openingInner.position.y = 1;


    opening.rotateX(THREE.Math.degToRad(90));
    opening.position.set(0, 0, pokeball_size * 0.93);

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

    scene.add(pokeball);

    pokeball.position.x = -50
    pokeball.position.y = 40

    camera.position.z = 100;
    camera.lookAt(scene.position);



}

setupLight();
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

animate();



let canvas = document.querySelector('canvas');
grabHand();
function grabHand() {

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

}

window.addEventListener('resize', onWindowResize, false)

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.mixDistance = 1;
controls.maxDistance = 1000;


