class GameView {
    buyBtn = [];
    buyBtnText = [];
    businessBlock = [];
    businessName = [];
    levelTitle = [];
    levelMeter = [];
    profitTitle = [];
    profitMeter = [];
    costTitle = [];
    costMeter = [];
    runBtn = [];
    runBtnTitle = [];
    runMeter = [];
    upgradeBtn = [];
    upgradeBtnTitle = [];
    managerBtn = [];
    managerHire = [];
    managerHired = [];
    balanceMeter;
    constructor(app) {
        // this.business = this.createBusinessView();
        // app.stage.addChild(this.business);
    }

    createRoundedRect(width, height, radius) {
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0xFF00FF, 1);
        graphics.beginFill(0x650A5A, 0.25);
        graphics.drawRoundedRect(50, 50, width? width :400, height? height: 35, radius? radius: 16);
        graphics.endFill();
        return graphics;
    }

    getBasicBlock() {
        return this.createRoundedRect();
    }

    createBasicText() {
        const basicText = new PIXI.Text('Basic text in pixi');
        return basicText;
    }

    createRichText(name, size) {
        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: size? size: 20,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff'], // gradient
            stroke: '#4a1850',
            strokeThickness: 2,
            // dropShadow: true,
            // dropShadowColor: '#000000',
            // dropShadowBlur: 4,
            // dropShadowAngle: Math.PI / 6,
            // dropShadowDistance: 6,
            // wordWrap: true,
            // wordWrapWidth: 440,
        });

        const richText = new PIXI.Text(name, style);
        return richText;
    }

    getText(name, size) {
        return this.createRichText(name, size);
    }

    hideBuyBtn(i) {
        this.buyBtn[i].visible = false;
    }

    showBusinessBlock(i) {
        this.businessBlock[i].visible = true;
    }
}