
import preloader from "./preloader.js";
 
// wait for DOM before creating application
window.addEventListener('load', function() {
    //Create a Pixi Application
    app = new PIXI.Application(config);
    window.PIXI = PIXI;
    //Add the canvas that Pixi automatically created for you to the HTML document
    document.body.appendChild(app.view);
    let preloadScene = new preloader();
    preloadScene.LoadAssets();
    app.renderer.resize(window.innerWidth, window.innerHeight);
})
window.onresize = function()
{
    app.renderer.resize(window.innerWidth, window.innerHeight);
}