export default class BottomPanel {
    constructor(scene) {
        // this.spinButton;
        this.scene = scene;
        this.scene.totalAmount = 10000;
        this.scene.betAmount = 10;
        this.scene.winAmount = 0;
    }
    CreatePanel(spineData, _x, _y) {
        //-------
        let background = new PIXI.Graphics();
        background.beginFill(0xF39C12);
        background.drawRect(_x, _y, 420, 70);
        background.endFill();
        background.pivot.set(0.5);
      //------------WIN AMOUNT TEXT-------------------------
      this.winAmountBase = PIXI.Sprite.from(app.loader.resources.base.texture)
      this.winAmountBase.x = _x + 220;
      this.winAmountBase.y = _y - 33;
      this.winAmountBase.anchor.set(0.5);
      this.winAmountBase.scale.set(2.5,0.5);
      this.winAmountBase.alpha = 0.5;
      this.winAmountBase.visible = false;
      this.winAmountValueText = new PIXI.Text(   this.scene.winAmount, {
            fontSize: 15,
            lineHeight: 20,
            letterSpacing: 0,
            fill: 0xffffff ,
            align: "center"
          });
      this.winAmountValueText.x =  _x+280;
      this.winAmountValueText.y =  _y-33;
      this.winAmountValueText.anchor.set(0.5);
      this.winAmountValueText.visible = false;
      this.winAmountText = new PIXI.Text("Win Amount", {
            fontSize: 15,
            lineHeight: 20,
            letterSpacing: 0,
            fill: 0x000000 ,
            align: "center"
          });
      this.winAmountText.x =  _x+170;
      this.winAmountText.y =  _y-32;
      this.winAmountText.anchor.set(0.5);
      this.winAmountText.visible = false;
      //-------------------------------------------------------------
        let stakeAmount = new PIXI.Text("Stake Amount", {
            fontSize: 15,
            lineHeight: 20,
            letterSpacing: 0,
            fill: 0x000000 ,
            align: "center"
          });
          stakeAmount.x =  _x+80;
          stakeAmount.y =  _y+20;
          stakeAmount.anchor.set(0.5);

          let betAmountBase = PIXI.Sprite.from(app.loader.resources.base.texture)
          betAmountBase.x = _x + 80;
          betAmountBase.y = _y + 44;
          betAmountBase.anchor.set(0.5);
          betAmountBase.scale.set(1,0.5);
          betAmountBase.alpha = 0.5;
          this.stakeAmountText = new PIXI.Text( this.scene.betAmount, {
            fontSize: 15,
            lineHeight: 20,
            letterSpacing: 0,
            fill: 0xffffff ,
            align: "center"
          });
          this.stakeAmountText.x =  _x+80;
          this.stakeAmountText.y =  _y+46;
          this.stakeAmountText.anchor.set(0.5);

          let balanceAmount = new PIXI.Text("Balance", {
            fontSize: 15,
            lineHeight: 20,
            letterSpacing: 0,
            fill: 0x000000 ,
            align: "center"
          });
          balanceAmount.x =  _x+210;
          balanceAmount.y =  _y+20;
          balanceAmount.anchor.set(0.5);
          

          let balanceAmountBase = PIXI.Sprite.from(app.loader.resources.base.texture)
          balanceAmountBase.x = _x + 210;
          balanceAmountBase.y = _y + 44;
          balanceAmountBase.anchor.set(0.5);
          balanceAmountBase.scale.set(1,0.5);
          balanceAmountBase.alpha = 0.5;

          this.balanceAmountText = new PIXI.Text(this.scene.totalAmount, {
            fontSize: 15,
            lineHeight: 20,
            letterSpacing: 0,
            fill: 0xffffff ,
            align: "center"
          });
          this.balanceAmountText.x =  _x+210;
          this.balanceAmountText.y =  _y+45;
          this.balanceAmountText.anchor.set(0.5);
        //--------PLUS MINUS
        this.plusButton = PIXI.Sprite.from(app.loader.resources.plus.texture)
        this.plusButton.x = _x + 45;
        this.plusButton.y = _y + 44;
        this.plusButton.anchor.set(0.5);
        this.plusButton.scale.set(0.5,0.5);
        this.plusButton.interactive = true;

        this.minusButton = PIXI.Sprite.from(app.loader.resources.minus.texture)
        this.minusButton.x = _x + 115;
        this.minusButton.y = _y + 44;
        this.minusButton.anchor.set(0.5);
        this.minusButton.scale.set(0.5,0.5);
        this.minusButton.interactive = true;
        this.plusButton
            .on('mouseup', this.scene.OnPlusButtonUp.bind(this.scene))
            .on('mouseupoutside', this.scene.OnPlusButtonUp.bind(this.scene))
            .on('touchend', this.scene.OnPlusButtonUp.bind(this.scene))
            .on('touchendoutside', this.scene.OnPlusButtonUp.bind(this.scene));
        this.minusButton
            .on('mouseup', this.scene.OnMinusButtonUp.bind(this.scene))
            .on('mouseupoutside', this.scene.OnMinusButtonUp.bind(this.scene))
            .on('touchend', this.scene.OnMinusButtonUp.bind(this.scene))
            .on('touchendoutside', this.scene.OnMinusButtonUp.bind(this.scene));
        //   plusButton.alpha = 0.5;
        // background.alpha = 0.5;
        //---
        this.spinButton = PIXI.Sprite.from(spineData)
        this.spinButton.x = _x + 350;
        this.spinButton.y = _y + 37;
        this.spinButton.anchor.set(0.5);
        this.spinButton.scale.set(0.2);
        this.spinButton.interactive = true;

        this.spinButton
            .on('mouseup', this.scene.OnButtonUp.bind(this.scene))
            .on('mouseupoutside', this.scene.OnButtonUp.bind(this.scene))
            .on('touchend', this.scene.OnButtonUp.bind(this.scene))
            .on('touchendoutside', this.scene.OnButtonUp.bind(this.scene));
        // .on('mousedown', onButtonDown)
        // .on('touchstart', onButtonDown)

        app.stage.addChild(background);
        app.stage.addChild(this.spinButton);
        app.stage.addChild(stakeAmount );
        app.stage.addChild(balanceAmount );
        app.stage.addChild(balanceAmountBase );
        app.stage.addChild(this.balanceAmountText );
        app.stage.addChild(betAmountBase );
        app.stage.addChild(this.stakeAmountText );
        app.stage.addChild(this.plusButton );
        app.stage.addChild(this.minusButton );
        app.stage.addChild(this.winAmountBase );
        app.stage.addChild(this.winAmountText );
        app.stage.addChild(this.winAmountValueText );
    }
}