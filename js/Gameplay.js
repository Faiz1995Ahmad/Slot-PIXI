import BottomPanel from "./BottomPanel.js";
class Gameplay {
    constructor() {
        console.log("Gameplay");
        this.bottomPanel;
        this.ReelsPanel1;
        this.ReelsPanel2;
        this.ReelsPanel3;
        this.ReelsPanel4;
        this.tweens = [];
        this.reels = [];
        this.value = 0;
        this.box;
        // register the plugin
        gsap.registerPlugin(PixiPlugin);
        // // give the plugin a reference to the PIXI object
        PixiPlugin.registerPIXI(PIXI);
    }
    Create() {
        let symbols ;
        let title = new PIXI.Text("Slot Game", {
            fontSize: 20,
            lineHeight: 20,
            letterSpacing: 0,
            fill: 0x1C2833 ,
            align: "center"
          });
          title.x =  450;
          title.y =  200;
          title.anchor.set(0.5);

       
        let box = PIXI.Sprite.from(   app.loader.resources.box.texture)
        box.x =  450;
        box.y =  275;
        box.anchor.set(0.5);
        box.scale.set(0.8,0.57);
        app.stage.addChild(box);
        app.stage.addChild(title );
      
        // = [
        //         app.loader.resources.symbol_00.spineData,
        //         app.loader.resources.symbol_01.spineData,
        //         app.loader.resources.symbol_02.spineData,
        //         app.loader.resources.symbol_03.spineData,
        //         app.loader.resources.symbol_04.spineData,
        //         app.loader.resources.symbol_05.spineData
        //     ];
        let graphics = new PIXI.Graphics();
        graphics.beginFill();
        graphics.drawRect(250, 225, 400, 100);
        graphics.endFill();
        graphics.alpha = 0.5;

        console.log(this.ReelsPanel1);
        let startX = 300;
        let startY = 80;
        // let reel = new PIXI.Container();
        for (let i = 0; i < 4; i++) 
        {
            let reel = new PIXI.Container();
            reel.y = -300;
            symbols  = this.ShuffleArr();
            for (let j = 0; j < 6; j++) 
            {

                let symbol1 = new PIXI.spine.Spine(symbols.pop());
                symbol1.x = startX;
                symbol1.y = startY;
                symbol1.prevY = startY;
                symbol1.pivot.set(0.5);
                symbol1.scale.set(0.5);
                symbol1.stateData.setMix('static', 'win', 0.2);
                symbol1.stateData.setMix('win', 'static', 0.4);
                startY += 100;
                reel.addChild(symbol1);
            }
            reel.mask = graphics;
            app.stage.addChild(reel);
            this.reels.push(reel);
            startX += 100;
            startY = 80;
            let tween = gsap.to(reel, 
                {
                pixi: { y: 200 },
                duration: 0.2,
                repeat: -1
                }
            ).pause();
            this.tweens.push(
                tween
            );
        }
            //-----Creating Bottom Panel---------------------
        this.bottomPanel = new BottomPanel(this);
        this.bottomPanel.CreatePanel(app.loader.resources.submit.texture, 240, 400);
        app.stage.addChild(graphics);
        console.log(this.reels[0].children);
        }
        OnButtonUp() 
        {
            this.ResetReels();
            console.log("click    ",  this.tweens);
            this.tweens.forEach(element => {
                element.play();
            });
            this.totalAmount -= parseInt(this.betAmount);
            this.bottomPanel.balanceAmountText.text =  parseInt(this.totalAmount);
            this.DisableButtons();
            this.SpinResult();
            // let c =  [
            //             app.loader.resources.symbol_00.spineData,
            //             app.loader.resources.symbol_01.spineData,
            //             app.loader.resources.symbol_02.spineData,
            //             app.loader.resources.symbol_03.spineData,
            //             app.loader.resources.symbol_04.spineData,
            //             app.loader.resources.symbol_05.spineData
            //         ];
            // for (let i = 0; i < this.reels.length; i++) 
            // {
            //     this.reels[i].y = 300;
            //    for (let j = 0; j < this.reels[i].children.length; j++) 
            //    {
            //         if(c[0]==this.reels[i].children[j].spineData)
            //         {
            //            console.log(c[0]);
            //            this.reels[i].children[j].y = this.reels[i].y-335;//Math.floor(window.innerHeight / 4500)
            //            this.reels[i].children[j].state.setAnimation(2, 'win',true );
            //         }
            //    }
                
            // }
        }
        ShuffleArr() 
        {
            let  arra1 = [
                app.loader.resources.symbol_00.spineData,
                app.loader.resources.symbol_01.spineData,
                app.loader.resources.symbol_02.spineData,
                app.loader.resources.symbol_03.spineData,
                app.loader.resources.symbol_04.spineData,
                app.loader.resources.symbol_05.spineData
            ];
            var ctr = arra1.length, temp, index;
        
            // While there are elements in the array
            while (ctr > 0) {
            // Pick a random index
                index = Math.floor(Math.random() * ctr);
            // Decrease ctr by 1
                ctr--;
            // And swap the last element with it
                temp = arra1[ctr];
         
                arra1[ctr] = arra1[index];
                arra1[index] = temp;
            }
            return arra1;
        }
        OnPlusButtonUp()
        {
            this.betAmount += 1;
            this.bottomPanel.stakeAmountText.text =  this.betAmount;
        }
        OnMinusButtonUp()
        {
            console.log("minus");
            this.betAmount -= 1;
            this.bottomPanel.stakeAmountText.text =  this.betAmount;
        }
        DisableButtons()
        {
            this.bottomPanel.spinButton.interactive = false;
            this.bottomPanel.plusButton.interactive = false;
            this.bottomPanel.minusButton.interactive = false;
            this.bottomPanel.spinButton.alpha = 0.5;
            this.bottomPanel.plusButton.alpha = 0.5;
            this.bottomPanel.minusButton.alpha = 0.5;
        }
        EnableButtons()
        {
            this.bottomPanel.spinButton.interactive = true;
            this.bottomPanel.plusButton.interactive = true;
            this.bottomPanel.minusButton.interactive = true;
            this.bottomPanel.spinButton.alpha = 1;
            this.bottomPanel.plusButton.alpha = 1;
            this.bottomPanel.minusButton.alpha = 1;
        }
        ResetReels()
        {
            for (let i = 0; i < this.reels.length; i++) 
            {
                this.reels[i].y = -300;
                for (let j = 0; j < this.reels[i].children.length; j++) 
                {
                    this.reels[i].children[j].y = this.reels[i].children[j].prevY;
                    this.reels[i].children[j].state.clearTracks();
                }
                
            }
         
        }
        SpinResult()
        {
            let  array1 = [
                app.loader.resources.symbol_00.spineData,
                app.loader.resources.symbol_01.spineData,
                app.loader.resources.symbol_02.spineData,
                app.loader.resources.symbol_03.spineData,
                app.loader.resources.symbol_04.spineData,
                app.loader.resources.symbol_05.spineData
            ];
            let result = data[Math.floor(Math.random()*(data.length))]
            console.log(result.response.results.symbolIDs);
            let symbolIDs = result.response.results.symbolIDs;
            let ref = this;
            let bool = false;
            setTimeout(() => {
            for (let i = 0; i < this.reels.length; i++) 
            {
                this.reels[i].y = 300;
               for (let j = 0; j < this.reels[i].children.length; j++) 
               {
                    if
                    (
                        (array1[symbolIDs[i]]==this.reels[i].children[j].spineData)
                    )
                    {
                        console.log("[[[[[[", this.reels[i].children[j].state);
                        this.reels[i].children[j].y = this.reels[i].y-335;
                        if(parseInt(result.response.results.win)>0)
                        {
                            if(!bool)
                            {
                                ref.totalAmount = parseInt(ref.totalAmount)+ parseInt(result.response.results.win);
                                ref.bottomPanel.balanceAmountText.text =  parseInt(ref.totalAmount);
                                bool = true;
                            }
                            ref.bottomPanel.winAmountValueText.text = parseInt(result.response.results.win);
                            ref.bottomPanel.winAmountBase.visible = true;
                            ref.bottomPanel.winAmountValueText.visible = true;
                            ref.bottomPanel.winAmountText.visible = true;
                            this.reels[i].children[j].state.setAnimation(2, 'win',false );
                            this.reels[i].children[j].state.addListener(
                                {
                                    complete:function()
                                    {
                                        console.log(ref);
                                        ref.EnableButtons();
                                        ref.bottomPanel.winAmountBase.visible = false;
                                        ref.bottomPanel.winAmountValueText.visible = false;
                                        ref.bottomPanel.winAmountText.visible = false;
                                    }
                                }
                            );
                        }
                        else
                        {
                            this.reels[i].children[j].state.setAnimation(2, 'static',false );
                            this.reels[i].children[j].state.addListener(
                                {
                                    complete:function()
                                    {
                                        console.log(ref);
                                        ref.EnableButtons();
                                        ref.bottomPanel.winAmountBase.visible = false;
                                        ref.bottomPanel.winAmountValueText.visible = false;
                                        ref.bottomPanel.winAmountText.visible = false;
                                    }
                                }
                            );
                        }                            
                        break;
                    }
               }
                
            }
           
            this.tweens.forEach(element => {
                element.pause();
            });
            }, 1000);
        }
    }
    export default Gameplay;