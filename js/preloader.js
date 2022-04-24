import Gameplay from "./Gameplay.js";
export default class preloader
{
    constructor()
    {
        // this.LoadAssets();
        //https://greensock.com/forums/topic/11441-slotmachine-with-js-and-gsap/
        //http://ikonen.me/examples/slot/
        //https://codepen.io/adelciotto/pen/PGPmVm
    }
    /* Loading assets*/
    LoadAssets()
    {
        app.loader.baseUrl = "assets";
        app.loader
        .add("submit","submit.png")
        .add("box","box.png")
        .add("plus","icon-plus-hover.png")
        .add("minus","icon-minus-hover.png")
        .add("base","base.png")
        .add('symbol_00', 'symbols/symbol_00.json')
        .add('symbol_01', 'symbols/symbol_01.json')
        .add('symbol_02', 'symbols/symbol_02.json')
        .add('symbol_03', 'symbols/symbol_03.json')
        .add('symbol_04', 'symbols/symbol_04.json')
        .add('symbol_05', 'symbols/symbol_05.json');
        app.loader.onComplete.add(this.LoadOnComplete);
        app.loader.load();
    }
    LoadOnComplete(loader, res)
    {
       
        let gameplay = new Gameplay();
        gameplay.Create();
    }
}
// let Preloader = new preloader();

// export { Preloader as Preloader };
