class GameModel {
    businessObj = {
        "name": [],
        "level": [],
        "levelThreshold": [],
        "duration": [],
        "profit": [],
        "profitUnit": [],
        "cost": [],
        "costUnit": [],
        "active": [],
        "canRun": [],
        "runTime": [],
        "manager": [],
        "managerCost": [],
        "balance": 0
    };
    primatyTextSize = 20;
    secondaryTextSize = 17;
    constructor() {
        if (localStorage.getItem('businessModel') !== null) {
            this.businessObj = JSON.parse(localStorage.getItem('businessModel'));
        } else {
            this.businessObj.name = ["Lemonade Stand", "NewsPaper Delivery", "Car Wash", "Pizza Delivery", "Donut Shop"]
            this.businessObj.level = [0, 0, 0, 0, 0];
            this.businessObj.levelThreshold = [10, 25, 50, 100, 200, 300, 400, 500];
            this.businessObj.duration = [2, 5, 10, 25, 50];
            this.businessObj.profit = [100, 1000, 10000, 100000, 1000000];
            this.businessObj.profitUnit = [100, 1000, 10000, 100000, 1000000];
            this.businessObj.cost = [500, 5000, 50000, 1000000, 20000000];
            this.businessObj.costUnit = [500, 5000, 50000, 1000000, 20000000];
            this.businessObj.active = [false, false, false, false, false];
            this.businessObj.canRun = [true, true, true, true, true];
            this.businessObj.runTime = [5000, 10000, 25000, 300000, 900000];
            this.businessObj.manager = [false, false, false, false, false];
            this.businessObj.managerCost = [10000, 1000000, 10000000, 25000000000, 5000000000000];
            this.businessObj.balance = 1000;
        }
    }
}