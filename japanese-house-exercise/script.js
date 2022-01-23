// Import libraries
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.124.0/build/three.module.js'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.124.0/examples/jsm/controls/OrbitControls.js'
import { Rhino3dmLoader } from 'https://cdn.jsdelivr.net/npm/three@0.124.0/examples/jsm/loaders/3DMLoader.js'
import { HDRCubeTextureLoader } from 'https://cdn.jsdelivr.net/npm/three@0.124.0/examples/jsm/loaders/HDRCubeTextureLoader.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.124.0/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'https://cdn.jsdelivr.net/npm/three@0.124.0/examples/jsm/loaders/RGBELoader.js';
import { FlakesTexture } from 'https://cdn.jsdelivr.net/npm/three@0.124.0/examples/jsm/textures/FlakesTexture.js';

// declare variables to store scene, camera, and renderer
let scene, camera, renderer
const model ='Rhino_Logo.3dm'

// call functions
init()
animate()

// function to setup the scene, camera, renderer, and load 3d model
function init () {

    // Rhino models are z-up, so set this as the default
    THREE.Object3D.DefaultUp = new THREE.Vector3( 0, 0, 1 )

    // create a scene and a camera
    scene = new THREE.Scene()
    //scene.background = new THREE.Color(1,1,1)
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 )
    camera.position.set(30,30,5)

    // create the renderer and add it to the html
    renderer = new THREE.WebGLRenderer( { antialias: true } )
    renderer.setSize( window.innerWidth, window.innerHeight )
    document.body.appendChild( renderer.domElement )

   /* new RGBELoader()
					.setPath( 'textures/hdri/' )
					.load( 'JapanBambooPark.hdr', function ( texture ) {

						texture.mapping = THREE.EquirectangularReflectionMapping;

						scene.background = texture;
						scene.environment = texture;

						render()

                    })*/
// creation of a big sphere geometry
var geometry = new THREE.SphereGeometry( 500, 600, 400 );
geometry.scale( - 1, 1, 1 );

var tempmaterial = new THREE.MeshBasicMaterial( {
    map: new THREE.TextureLoader().load( 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/2294472375_24a3b8ef46_o.jpg' )
} );

var background = new THREE.Mesh( geometry, tempmaterial );

//background.rotation= THREE.Math.degToRad(180);

scene.add( background );

        

          // cubeMap = new THREE.CubeTextureLoader()
           // .setPath('textures/cube/Bridge2/')
           // .load( [ 'px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg' ] )
        
        //scene.background = cubeMap
       // material.envMap = scene.background

       //  create a material
    const material = new THREE.MeshStandardMaterial( {
         color: 0xff0000,
         metalness: 0.0,
         roughness: 0.0,
         side: THREE.DoubleSide
    } )



    // add some controls to orbit the camera
    const controls = new OrbitControls( camera, renderer.domElement )

    // add a directional light
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 2 )
    directionalLight.position.set( 200, 200, 200 );
    directionalLight.intensity = 2
    scene.add( directionalLight );

    // add a ambient light
    const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff,0.5);
    scene.add(ambient);

    // load the model
    const loader = new Rhino3dmLoader()
    loader.setLibraryPath( 'https://cdn.jsdelivr.net/npm/rhino3dm@0.13.0/' )

    loader.load( model, function ( object ) {
        object.traverse( function (child) {         
                child.material = material
        })
        scene.add( object )

    } )


}

// function to continuously render the scene
function animate() {

    requestAnimationFrame( animate )
    renderer.render( scene, camera )

}


