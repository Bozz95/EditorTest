var pippo = (function () {
    var acquisti = [];


    return {
        addItem: function (value) {
            acquisti.push(value)
        },

        getItemCount: function () {
            return acquisti.length
        },

        getTotal: function () {
            var p, x;
            p = 0;
            x = this.getItemCount();
            while (x--) {
                p += acquisti[x].price;
            }
            return p;
        }
    }
})();

function moduloCestino() {
    var acquisti = [];

    return {
        addItem: function (value) {
            acquisti.push(value)
        },

        getItemCount: function () {
            return acquisti.length
        },

        getTotal: function () {
            var p, x;
            p = 0;
            x = this.getItemCount();
            while (x--) {
                p += acquisti[x].price;
            }
            return p;
        }
    }
}

var moduloCesto = new moduloCestino();
var prova = new moduloCestino();

console.log(prova.acquisti);

console.log(prova.getItemCount());

moduloCesto.addItem({
    value: "asus tp500ln",
    price: 899
});

console.log("totale della spesa del cesto: " + moduloCesto.getTotal());

console.log("totale della spesa di prova: " + prova.getTotal());

//  OBSERVERLIST
function ObserverList() {
    this.observerList = [];
}

ObserverList.prototype.add = function (obj) {
    return this.observerList.push(obj);
};

ObserverList.prototype.count = function () {
    return this.observerList.length;
};

ObserverList.prototype.get = function (index) {
    if (index > -1 && index < this.observerList.length) {
        return this.observerList[index];
    }
};

ObserverList.prototype.indexOf = function (obj, startIndex) {
    var i = startIndex;

    while (i < this.observerList.length) {
        if (this.observerList[i] === obj) {
            return i;
        }
        i++;
    }

    return -1;
};

ObserverList.prototype.removeAt = function (index) {
    this.observerList.splice(index, 1);
};


/////////////////////////////////////////////////////////////////////////////////
function Subject() {
    this.observers = new ObserverList();
}

Subject.prototype.addObserver = function (observer) {
    this.observers.add(observer);
};

Subject.prototype.removeObserver = function (observer) {
    this.observers.removeAt(this.observers.indexOf(observer, 0));
};

Subject.prototype.notify = function (context) {
    var observerCount = this.observers.count();
    for (var i = 0; i < observerCount; i++) {
        this.observers.get(i).update(context);
    }
};
////////////////////////////////////////////////////////////////////////////////



// The Observer
function Observer() {
    this.update = function () {
        // ... da overridare qando inizilizzi gli oggetti
    };
}



// Extend an object with an extension
function extend(obj, extension) {
    for (var key in extension) {
        obj[key] = extension[key];
    }
}

// References to our DOM elements

var controlCheckbox = document.getElementById("mainCheckbox"),
    addBtn = document.getElementById("addNewObserver"),
    container = document.getElementById("observersContainer");


// Concrete Subject

// Extend the controlling checkbox with the Subject class
extend(controlCheckbox, new Subject());

// Clicking the checkbox will trigger notifications to its observers
controlCheckbox.onclick = function () {
    controlCheckbox.notify(controlCheckbox.checked);
};

addBtn.onclick = addNewObserver;

// Concrete Observer

function addNewObserver() {

    // Create a new checkbox to be added
    var check = document.createElement("input");
    check.type = "checkbox";

    // Extend the checkbox with the Observer class
    extend(check, new Observer());

    // Override with custom update behaviour
    check.update = function (value) {
        this.checked = value;
    };

    // Add the new observer to our list of observers
    // for our main subject
    controlCheckbox.addObserver(check);

    // Append the item to the container
    container.appendChild(check);
}

var myCar = {

    name: "Ford Escort",

    drive: function () {
        console.log("Weeee. I'm driving!");
    },

    panic: function () {
        console.log("Wait. How do you stop this thing?");
    }

};


var vehicle = {
    getModel: function () {
        return this.model;
    }
};

var MY_GLOBAL = 0;
var car = Object.create(vehicle, {

    "id": {
        value: 5,
        // writable:false, configurable:false by default
        enumerable: true
    },

    "model": {
        value: "Ford",
        enumerable: true
    }

});

var vehiclePrototype = {
    init: function ( specs) {
        this.model = specs.model;
        this.engine = specs.engine;
        this.idcode = specs.idcode;
    },

    getModel: function () { return this.model;},

    getEngine: function () {return this.engine;}
}


//creo il costruttore
function concreteVehicle( specs ) {
    function F() {};

    F.prototype = vehiclePrototype;
    var f = new F();

    f.init( specs );
    return f;

}

var car = concreteVehicle({
    "model": "Subaru Baracca",
    "engine": "V8 alimentato a gatto inburrato",
    "idcode":  101
});

console.log("Modello della macchina: " + car.getModel());
console.log("Motore della suddetta: " + car.getEngine());