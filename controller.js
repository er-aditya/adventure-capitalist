const canvas = document.getElementById('game');

const app = new PIXI.Application({
    view: canvas,
    width: window.innerWidth,
    height: window.innerHeight
});

class Game {
    view;
    constructor(app) {
        this.balance = 100;
        this.initView();
        this.initModel();
        this.createView();
    }

    initView() {
        this.view = new GameView(app);
    }

    initModel() {
        this.gameModel = new GameModel();
    }

    createView() {
        this.createBalanceView();
        this.createBusinessView();
    }

    createBusinessView() {
        for (let i = 0; i < this.gameModel.businessObj.name.length; i++) {
            if (this.gameModel.businessObj.name[i]) {
                this.createBuyBtn(i);
                this.createBusinessBlockView(i);
                this.createRunBtn(i);
                this.createUpgradeBtn(i);
                this.createManagerBtn(i);
                this.checkForButtonStates(i);
            }
        }

        for (let i = 0; i < this.gameModel.businessObj.name.length; i++) {
            if (this.gameModel.businessObj.manager[i]) {
                this.assignManager(i, this.view.managerBtn[i]);
            }
        }
    }

    createBuyBtn(i) {
        let button;
        button = this.view.buyBtn[i] = this.view.createRoundedRect(400, 70, 16);
        button.x = 100;
        button.y = 100 * i;
        button.index = i;
        button.type = "buy";

        var text = this.getBuyBtnText(i);
        text && button.addChild(text);

        // button.interactive = true;
        button.buttonMode = true;
        button
            // Mouse & touch events are normalized into
            // the pointer* events for handling different
            // button events.
            .on('pointerdown', this.onButtonDown, this)
            .on('pointerup', this.onButtonUp, this)
            .on('pointerupoutside', this.onButtonUp, this)
            .on('pointerover', this.onButtonOver, this)
            .on('pointerout', this.onButtonOut, this);

        app.stage.addChild(button);
    }

    createManagerBtn(i) {
        let button;
        this.view.managerBtn[i] = this.view.createRoundedRect(200, 70, 16);
        button = this.view.managerBtn[i];
        button.x = 700;
        button.y = 100 * i;
        button.index = i;
        button.type = "manager";

        var text1 = this.getHireBtnText(i);
        text1 && button.addChild(text1);
        var text2 = this.getHiredBtnText(i);
        text2.visible = false;
        text2 && button.addChild(text2);

        // button.interactive = true;
        button.buttonMode = true;
        button
            // Mouse & touch events are normalized into
            // the pointer* events for handling different
            // button events.
            .on('pointerdown', this.onButtonDown, this)
            .on('pointerup', this.onButtonUp, this)
            .on('pointerupoutside', this.onButtonUp, this)
            .on('pointerover', this.onButtonOver, this)
            .on('pointerout', this.onButtonOut, this);

        app.stage.addChild(button);
    }

    getHireBtnText(i) {
        this.view.managerHire[i] = this.view.getText("Hire Manager");
        this.view.managerHire[i].x = 84;
        this.view.managerHire[i].y = 71;
        return this.view.managerHire[i];
    }

    getHiredBtnText(i) {
        this.view.managerHired[i] = this.view.getText("Hired!");
        this.view.managerHired[i].x = 84;
        this.view.managerHired[i].y = 71;
        return this.view.managerHired[i];
    }

    getBuyBtnText(i) {
        this.view.buyBtnText[i] = this.view.getText("Buy " + this.gameModel.businessObj.name[i]);
        this.view.buyBtnText[i].x = 84;
        this.view.buyBtnText[i].y = 71;
        return this.view.buyBtnText[i];
    }

    createBusinessBlockView(i) {
        this.createBusinessBlockContainer(i);
        this.CreateTitleSection(i);
        this.createLevelSection(i);
        this.createProfitSection(i);
        this.createCostSection(i);
    }

    createBusinessBlockContainer(i) {
        this.view.businessBlock[i] = this.view.createRoundedRect(400, 70, 16);
        this.view.businessBlock[i].x = 100;
        this.view.businessBlock[i].y = 100 * i;
        this.view.businessBlock[i] && app.stage.addChild(this.view.businessBlock[i]);
        if (!this.gameModel.businessObj.active[i]) {
            this.view.businessBlock[i].visible = false;
        }
    }

    CreateTitleSection(i) {
        this.view.businessName[i] = this.view.getText(this.gameModel.businessObj.name[i], this.gameModel.primaryTextSize);
        this.view.businessName[i].x = 70;
        this.view.businessName[i].y = 55;
        this.view.businessName[i] && this.view.businessBlock[i].addChild(this.view.businessName[i]);
    }

    createLevelSection(i) {
        this.createLevelTitle(i);
        this.createLevelMeter(i);
    }

    createLevelTitle(i) {
        this.view.levelTitle[i] = this.view.getText("Level: ", this.gameModel.secondaryTextSize);
        this.view.levelTitle[i].x = 70;
        this.view.levelTitle[i].y = 88;
        this.view.levelTitle[i] && this.view.businessBlock[i].addChild(this.view.levelTitle[i]);
    }

    createLevelMeter(i) {
        this.view.levelMeter[i] = this.view.getText(this.gameModel.businessObj.level[i], this.gameModel.secondaryTextSize);
        this.view.levelMeter[i].x = 130;
        this.view.levelMeter[i].y = 88;
        this.view.levelMeter[i] && this.view.businessBlock[i].addChild(this.view.levelMeter[i]);
    }

    updateLevelMeter(i) {
        this.view.levelMeter[i].text = this.gameModel.businessObj.level[i];
    }

    createProfitSection(i) {
        this.createProfitTitle(i);
        this.createProfitMeter(i);
    }

    createProfitTitle(i) {
        this.view.profitTitle[i] = this.view.getText("Profit: ", this.gameModel.secondaryTextSize);
        this.view.profitTitle[i].x = 270;
        this.view.profitTitle[i].y = 58;
        this.view.profitTitle[i] && this.view.businessBlock[i].addChild(this.view.profitTitle[i]);
    }

    createProfitMeter(i) {
        this.view.profitMeter[i] = this.view.getText(this.gameModel.businessObj.profit[i], this.gameModel.secondaryTextSize);
        this.view.profitMeter[i].x = 330;
        this.view.profitMeter[i].y = 58;
        this.view.profitMeter[i] && this.view.businessBlock[i].addChild(this.view.profitMeter[i]);
    }

    updateProfitMeter(i) {
        this.gameModel.businessObj.profit[i].toFixed(2);
        this.view.profitMeter[i].text = this.gameModel.businessObj.profit[i];
    }

    createCostSection(i) {
        this.createCostTitle(i);
        this.createCostMeter(i);
    }

    createCostTitle(i) {
        this.view.costTitle[i] = this.view.getText("Cost: ", this.gameModel.secondaryTextSize);
        this.view.costTitle[i].x = 275;
        this.view.costTitle[i].y = 88;
        this.view.costTitle[i] && this.view.businessBlock[i].addChild(this.view.costTitle[i]);
    }

    createCostMeter(i) {
        this.view.costMeter[i] = this.view.getText(this.gameModel.businessObj.cost[i], this.gameModel.secondaryTextSize);
        this.view.costMeter[i].x = 330;
        this.view.costMeter[i].y = 88;
        this.view.costMeter[i] && this.view.businessBlock[i].addChild(this.view.costMeter[i]);
    }

    updateCostMeter(i) {
        this.gameModel.businessObj.cost[i].toFixed(2);
        this.view.costMeter[i].text = this.gameModel.businessObj.cost[i];
    }

    createRunBtn(i) {
        var btn = this.view.runBtn[i] = this.view.createRoundedRect(100, 33, 8);
        btn.x = 520;
        btn.y = 100 * i;
        btn.index = i;
        btn.type = "run";

        var btnText = this.getRunBtnText(i);
        btnText && this.view.runBtn[i].addChild(btnText);
        var meterText = this.getRunMeterText(i);
        meterText.visible = false;
        meterText && this.view.runBtn[i].addChild(meterText);

        // btn.interactive = true;
        btn.buttonMode = true;
        btn.on('pointerdown', this.onButtonDown, this)
            .on('pointerup', this.onButtonUp, this)
            .on('pointerupoutside', this.onButtonUp, this)
            .on('pointerover', this.onButtonOver, this)
            .on('pointerout', this.onButtonOut, this);

        this.view.runBtn[i] && app.stage.addChild(this.view.runBtn[i]);
    }

    getRunBtnText(i) {
        this.view.runBtnTitle[i] = this.view.getText("Run", this.gameModel.secondaryTextSize);
        this.view.runBtnTitle[i].x = 80;
        this.view.runBtnTitle[i].y = 55;
        return this.view.runBtnTitle[i];
    }

    getRunMeterText(i) {
        this.view.runMeter[i] = this.view.getText(0, this.gameModel.secondaryTextSize);
        this.view.runMeter[i].x = 80;
        this.view.runMeter[i].y = 55;
        return this.view.runMeter[i];
    }

    updateRunMeter(i, value) {
        value = value.toFixed(0);
        this.view.runMeter[i].text = value;
    }

    createUpgradeBtn(i) {
        var btn = this.view.upgradeBtn[i] = this.view.createRoundedRect(100, 33, 8);
        btn.x = 520;
        btn.y = this.view.runBtn[i].y + 39;
        btn.index = i;
        btn.type = "upgrade";

        var btnText = this.getUpgradeBtnText(i);
        btnText && btn.addChild(btnText);

        // btn.interactive = true;
        btn.buttonMode = true;
        btn.on('pointerdown', this.onButtonDown, this)
            .on('pointerup', this.onButtonUp, this)
            .on('pointerupoutside', this.onButtonUp, this)
            .on('pointerover', this.onButtonOver, this)
            .on('pointerout', this.onButtonOut, this);

        this.view.upgradeBtn[i] && app.stage.addChild(this.view.upgradeBtn[i]);
    }

    getUpgradeBtnText(i) {
        this.view.upgradeBtnTitle[i] = this.view.getText("Upgrade", this.gameModel.secondaryTextSize);
        this.view.upgradeBtnTitle[i].x = 60;
        this.view.upgradeBtnTitle[i].y = 55;
        return this.view.upgradeBtnTitle[i];
    }

    createBalanceView() {
        this.balanceBlock = this.view.createRoundedRect(400, 40, 10);
        this.balanceBlock.x = 100;
        this.balanceBlock.y = 500;
        this.balanceBlock && app.stage.addChild(this.balanceBlock);
        this.createBalanceTitle();
        this.createBalanceMeter();
    }

    createBalanceTitle() {
        this.balanceTitle = this.view.getText("Balance: ");
        this.balanceTitle.x = 70;
        this.balanceTitle.y = 57;
        this.balanceTitle && this.balanceBlock.addChild(this.balanceTitle);
    }

    createBalanceMeter() {
        this.view.balanceMeter = this.view.getText(this.gameModel.businessObj.balance);
        this.view.balanceMeter.x = 160;
        this.view.balanceMeter.y = 57;
        this.view.balanceMeter && this.balanceBlock.addChild(this.view.balanceMeter);
    }

    updateBalanceMeter() {
        this.gameModel.businessObj.balance.toFixed(2);
        this.view.balanceMeter.text = this.gameModel.businessObj.balance;
        this.onBalanceUpdate();
    }

    onBalanceUpdate() {
        for (let i = 0; i < this.gameModel.businessObj.name.length; i++) {
            this.checkForButtonStates(i);
        }
        localStorage.setItem("businessModel", JSON.stringify(this.gameModel.businessObj));
    }

    checkForButtonStates(i) {
        this.checkForBuyBtn(i);
        this.checkForRunBtn(i);
        this.checkForUpgradeBtn(i);
        this.checkForManagerBtn(i);
    }

    checkForBuyBtn(i) {
        if (this.gameModel.businessObj.active[i]) {
            this.view.buyBtn[i].visible = false;
        }
        if (!this.gameModel.businessObj.active[i] && this.gameModel.businessObj.balance >= this.gameModel.businessObj.cost[i]) {
            this.enableBtn(this.view.buyBtn[i]);
        } else {
            this.disableBtn(this.view.buyBtn[i]);
        }
    }

    checkForRunBtn(i) {
        if (this.gameModel.businessObj.active[i] && this.gameModel.businessObj.canRun[i]) {
            this.enableBtn(this.view.runBtn[i]);
        } else {
            this.disableBtn(this.view.runBtn[i]);
        }
    }

    checkForUpgradeBtn(i) {
        if (this.gameModel.businessObj.active[i] && this.gameModel.businessObj.balance >= this.gameModel.businessObj.cost[i]) {
            this.enableBtn(this.view.upgradeBtn[i]);
        } else {
            this.disableBtn(this.view.upgradeBtn[i]);
        }
    }

    checkForManagerBtn(i) {
        if (this.gameModel.businessObj.active[i] && !this.gameModel.businessObj.manager[i] && this.gameModel.businessObj.balance >= this.gameModel.businessObj.managerCost[i]) {
            this.enableBtn(this.view.managerBtn[i]);
        } else {
            this.disableBtn(this.view.managerBtn[i]);
        }
    }

    onBuyingBusiness(i) {
        this.gameModel.businessObj.balance -= this.gameModel.businessObj.cost[i];
        this.gameModel.businessObj.active[i] = true;
        this.updateBalanceMeter();
        this.view.showBusinessBlock(i);
    }

    onRunningBusiness(i, btn) {
        this.disableBtn(btn);
        this.gameModel.businessObj.canRun[i] = false;
        this.startBusinessRunProcess(i);
    }

    startBusinessRunProcess(i) {
        var timer;
        var timerValue;
        var profit = this.gameModel.businessObj.profit[i];
        if (this.gameModel.businessObj.manager[i]) {
            setInterval(() => {
                this.gameModel.businessObj.balance += profit;
                this.hideRunMeter(i);
                clearInterval(timer);
                this.updateBalanceMeter();
            }, this.gameModel.businessObj.runTime[i]);

        } else {
            setTimeout(() => {
                this.gameModel.businessObj.balance += profit;
                !this.gameModel.businessObj.manager[i] && (this.gameModel.businessObj.canRun[i] = true);
                this.hideRunMeter(i);
                clearInterval(timer);
                this.updateBalanceMeter();
            }, this.gameModel.businessObj.runTime[i]);
        }

        /**
         * Run timer during business run manually
         */
        this.showRunMeter(i);
        timerValue = this.gameModel.businessObj.runTime[i];
        timer = setInterval(() => {
            this.updateRunMeter(i, timerValue);
            timerValue -= 100;
        }, 100);
    }

    hideRunMeter(i) {
        this.view.runBtnTitle[i].visible = true;
        this.view.runMeter[i].visible = false;
    }

    showRunMeter(i) {
        if (this.gameModel.businessObj.runTime[i] > 100) {
            this.view.runBtnTitle[i].visible = false;
            this.view.runMeter[i].visible = true;
        } else if (this.gameModel.businessObj.manager[i]) {
            this.view.runBtnTitle[i].text = "Running";
            this.view.runBtnTitle[i].x = 67;
        }
    }

    onUpgradeBusiness(i, btn) {
        var cost = this.gameModel.businessObj.cost[i];
        this.disableBtn(btn);
        this.gameModel.businessObj.balance -= cost;
        this.gameModel.businessObj.level[i]++;
        var threshold = this.gameModel.businessObj.levelThreshold
        if (threshold.indexOf(this.gameModel.businessObj.level[i]) && this.gameModel.businessObj.runTime[i] > 2) {
            this.gameModel.businessObj.runTime[i] /= 2;
            this.gameModel.businessObj.runTime[i] = Math.round(this.gameModel.businessObj.runTime[i]);
        }
        this.gameModel.businessObj.profit[i] += this.gameModel.businessObj.profitUnit[i];
        this.gameModel.businessObj.cost[i] += this.gameModel.businessObj.costUnit[i]*(105/100);
        this.updateProfitMeter(i);
        this.updateLevelMeter(i);
        this.updateCostMeter(i)
        this.updateBalanceMeter();
    }

    assignManager(i, btn) {
        this.gameModel.businessObj.manager[i] = true;
        this.disableBtn(btn);
        this.view.managerHire[i].visible = false;
        this.view.managerHired[i].visible = true;
        this.gameModel.businessObj.canRun[i] = false;
        this.updateBalanceMeter();
        this.startManagerJob(i);
    }

    startManagerJob(i) {
        this.startBusinessRunProcess(i);
    }

    onButtonUp(evt) {
        var btn = evt.currentTarget;
        var i = btn.index;
        var cost = this.gameModel.businessObj.cost[i];
        var balance = this.gameModel.businessObj.balance;
        var managerCost = this.gameModel.businessObj.managerCost[i];
        var isActive = this.gameModel.businessObj.active[i];
        var managerHired = this.gameModel.businessObj.manager[i];
        if (btn.type === "buy" && balance >= cost) {
            this.onBuyingBusiness(i, btn);
        }
        if (btn.type === "run" && isActive && !managerHired) {
            this.onRunningBusiness(i, btn);
        }
        if (btn.type === "upgrade" && isActive && balance >= cost) {
            this.onUpgradeBusiness(i, btn);
        }
        if (btn.type === "manager" && balance >= managerCost) {
            this.gameModel.businessObj.balance -= managerCost;
            this.assignManager(i, btn);
        }
    }

    onButtonOver(evt) {
        var btn = evt.currentTarget;
    }

    onButtonDown(evt) {
        this.activateBtn(evt.currentTarget);
    }

    onButtonOut(evt) {
        var btn = evt.currentTarget;
    }

    disableBtn(btn) {
        const color = new PIXI.filters.ColorMatrixFilter();
        color.desaturate();
        btn.filters = [color];
        btn.interactive = false;
    }

    enableBtn(btn) {
        const color = new PIXI.filters.ColorMatrixFilter();
        color.saturate();
        btn.filters = [color];
        btn.interactive = true;
    }

    activateBtn(btn) {
        const color = new PIXI.filters.ColorMatrixFilter();
        color.sepia();
        btn.filters = [color];
    }
}

new Game(app);