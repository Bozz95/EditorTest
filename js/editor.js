/** TODO's 
 *  @todo   Creare bottoni che creano degli oggetti
 *  @todo   Consentire la creazione di link cliccando sugli oggetti
 *  @todo   Gestione di un UNDO-REDO
 *  @todo   Classi per le diverse porte per codice più modulare
 */
(function (joint) {

    var commandManager = (function (graph) {

        // String per gestire la factory usando i bottoni dell'editor
        var objectName;

        // FACTORY che ritorna gli oggetti creati da aggiungere al grafo
        var factory = (function () {
            var _make = {

                /**
                 * @param {Array} args  array composto da: args[0] coordinata x, args [1] coordinata y
                 *  @return {ModelView} nuovo oggetto di Tipo 1 
                 * 
                 */
                rectType1: function (args) {

                    return new joint.shapes.devs.Model({
                        position: {
                            x: args[0],
                            y: args[1]
                        },
                        size: {
                            width: 90,
                            height: 90
                        },
                        inPorts: ['in'],
                        outPorts: ['out'],
                        ports: {
                            groups: {
                                'in': {
                                    attrs: {
                                        '.port-body': {
                                            fill: '#16A085',
                                            magnet: 'passive'
                                        }
                                    }
                                },
                                'out': {
                                    attrs: {
                                        '.port-body': {
                                            fill: '#E74C3C'
                                        }
                                    }
                                }
                            }
                        },
                        attrs: {
                            '.label': {
                                text: 'Model 1',
                                'ref-x': .5,
                                'ref-y': .2
                            },
                            rect: {
                                'stroke-width': '5',
                                'stroke-opacity': .7,
                                stroke: 'black',
                                rx: 3,
                                ry: 3,
                                fill: 'lightgray',
                                'fill-opacity': .5
                            }
                        }
                    });
                },

                /**
                 * @param {Array} args  array composto da: args[0] coordinata x, args [1] coordinata y
                 *  @return {ModelView} nuovo oggetto di Tipo 2 
                 * 
                 */
                rectType2: function (args) {
                    return new joint.shapes.devs.Model({
                        position: {
                            x: args[0],
                            y: args[1]
                        },
                        size: {
                            width: 90,
                            height: 50
                        },
                        inPorts: ['in1', 'in2'],
                        outPorts: ['out'],
                        ports: {
                            groups: {
                                'in': {
                                    attrs: {
                                        '.port-body': {
                                            fill: '#16A085',
                                            magnet: 'passive'
                                        }
                                    }
                                },
                                'out': {
                                    attrs: {
                                        '.port-body': {
                                            fill: '#E74C3C'
                                        }
                                    }
                                }
                            }
                        },
                        attrs: {
                            '.label': {
                                text: 'Model 2',
                                'ref-x': .5,
                                'ref-y': .2
                            },
                            rect: {
                                'stroke-width': '5',
                                'stroke-opacity': .7,
                                stroke: 'black',
                                rx: 3,
                                ry: 3,
                                fill: 'lightgray',
                                'fill-opacity': .5
                            }
                        }
                    });
                }
            }

            return {

                /**
                 * @param {String} elementName Stringa obbligatoria associata a un metodo presente in _make
                 * @param args I parametri successivi a elementName gli argomenti necessari alla costruzione dell'oggetto
                 * @returns Un elemento della libreria joint.js costruito in base ai metodi implementati in _make
                 */
                make: function (elementName) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    return _make[elementName](args);
                },

                /**
                 * @param {String} elementName String associata al metodo di cui si deve verificare l'esistenza nel _make
                 * @returns {boolean} true se il metodo in _make esiste, false altrimenti
                 */
                canMake: function (elementName) {
                    return (_make[elementName] ? true : false);
                }
            }
        })()

        // Array per memorizzare i comandi e gli oggetti da annullare o rifare
        var toUndo = [];
        var toRedo = [];

        var myGraph = graph;

        var paper = new joint.dia.Paper({
            el: $('#paperContainer'),
            width: 4000,
            height: 4000,
            model: myGraph,
            gridSize: 10,
            drawGrid: true,
            defaultLink: new joint.dia.Link({
                attrs: {
                    '.marker-target': {
                        d: 'M 10 0 L 0 5 L 10 10 z'
                    }
                }
            }),
            defaultRouter: {
                name: 'manhattan'
            },
            defaultConnector: {
                name: 'jumpover',
                args: {
                    radius: 20
                }
            },
            validateConnection: function (cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
                // Prevent linking from input ports.
                if (magnetS && magnetS.getAttribute('port-group') === 'in') return false;
                // Prevent linking from output ports to input ports within one element.
                //if (cellViewS === cellViewT) return false;
                // Prevent linking to input ports.
                return magnetT && magnetT.getAttribute('port-group') === 'in';
            },
        });

        // variabile che indica lo stato di quando si sta annullando o riattuando un'azione
        var reverting;

        // METODI PRIVATI 

        /**
         * Metodo per attuare l'opzione inversa di un comando.
         * @param {Object} action Oggetto composto da vari attributi in base al tipo di azione da invertire
         * @param {String} action.command  Attributo necessario per identificare il tipo di comando
         * @param {String} action.cell Elemento del grafico da modificare
         */
        var reverse = function (action) {

            reverting = true;
            switch (action.command) {

                case 'add':

                    // TODO da gestire target e source di un link nel quale non sono ancora stati ancorati a un oggetto 
                    if (action.cell.isLink())
                        console.log("ho provato a rimuovere un link");
                    else if (action.cell.isElement())
                        console.log("ho provato a rimuovere un elemento");

                    action.cell.remove();

                    action.command = "remove";

                    break;

                case 'remove':

                    if (action.cell.isLink())
                        console.log("ho provato a riaggiungere un link");
                    else if (action.cell.isElement())
                        console.log("ho provato a riaggiugnere un elemento");

                    action.cell.addTo(myGraph);
                    action.command = "add";

                    break;

                case 'translate':

                    if (action.cell.isElement) {

                        action.cell.position(action.oldPosition.x, action.oldPosition.y);
                        var app = action.oldPosition.clone();

                        //inverto le coordinate vecchie e nuove di action per poterlo mettere in toRedo
                        action.oldPosition = action.newPosition;
                        action.newPosition = app;

                    }
                    break;

                case 'change:target':

                    //prendo primo elemento(vecchio target) dell'array targetOldNew
                    var targetOld = action.targetOldNew.shift();
                    action.cell.source(targetOld);
                    //riordino array targetOldNew al contrario
                    action.targetOldNew.push(targetOld);

                    break;

            }

            reverting = false;
        }

        
        function whatisthis(cell) {
            if(cell.isElement()) {
                return "this is an element";
            }
            else if(cell.isLink()) {
                return "this is a link";
            }
            else return "DUNNO";
        }
        // trovare gli eventi sul grafico, ovvero sui model

        myGraph.on('all', function (ev, link) {
            /*if (ev == 'change:target')
                console.log(ev + ' ' + link.get('target').x + '@' + link.get('target').y);
            else
                console.log('pipputo: ' + ev);*/
        });

        myGraph.on('batch:start', function (obj) {
            console.log("dentro batch start" );// whatisthis(obj.cell));
            //debugger;
            if (!reverting) {
                // debugger;
                if (obj.cell.isElement()) {

                } else if (obj.cell.isLink()) {
                    var pre = toUndo.pop();
                    var guardia1 =  pre.command != 'add', guardia2 = pre.cell != obj.cell; 
                    //verifico di non aver appena ggiunto il link
                    if (pre.command != 'add' || pre.cell != obj.cell) {
                        //ripristino il comando precedente da annullare nell'ordine corretto
                        toUndo.push(pre);
                        //pusho un comando change:target nella pila con il valore del target iniziale
                        toUndo.push({
                            command: "change:target",
                            cell: obj.cell,
                            targetOldNew: [obj.cell.target()]
                        });
                    } else toUndo.push(pre);

                }

            }


        });

        myGraph.on('batch:stop', function (obj) {
            console.log("dentro batch stop");
            
            if (!reverting) {
                //console.log(obj);
                //debugger;
                if (obj.cell.isElement()) {
                    //TODO
                } else if (obj.cell.isLink()) {

                    var pre = toUndo.pop();
                    console.log(pre);
                    //controllo se il comando precedente è il comando creato dalla start:batch
                    if (pre.command == 'change:target') {
                        //controllo che l'ultima azione nella pila sia relativa alla stessa cella
                        //if(obj.cell == pre.cell)

                        //pusho nell'array del targetOldNew il nuovo valore del target dopo lo spostamento
                        pre.command.targetOldNew.push(obj.cell.target());
                        //rimetto il comando nella pila
                        toUndo.push(pre);
                        console.log("dentro batch stop");
                        console.log(pre);
                    } else
                        //rimetto in ordine il comando non relativo alla change:target 
                        toUndo.push(pre);

                }
            }

        });

        myGraph.on('add', function (cell, evt) {

            if (!reverting) {

                toUndo.push({
                    command: 'add',
                    cell: cell
                })
                // nuovo elemnto, la pila dei redo viene svuotata
                toRedo = [];
            }

            console.log(toUndo);
        });

        // EVENTI PER PAPER

        /*  catturo tutti gli eventi sui modelView
            per accedere al model uso modelView.model
        */
        paper.on('all', function (evt) {
            //console.log('paper: ' + evt);
        })

        paper.on('blank:pointerdown', function (evt, x, y) {
            console.log(factory.canMake(objectName) + '---' + objectName);
            if (objectName != undefined && factory.canMake(objectName)) {
                myGraph.addCell(factory.make(objectName, x, y));
            } else return;

        });

        // oggetti di tipo g.Point per memorizzare le posizioni degli elementi nel grafico
        var oldPosition, newPosition;

        paper.on('element:pointerdown', function (cellView, evt) {

            var cell = cellView.model;
            // cell.position() ritorna un oggetto punto
            cell.isElement() ? oldPosition = cell.position() : null;

        });

        paper.on('element:pointerup', function (cellView, evt) {

            var cell = cellView.model;
            // cell.position() ritorna un oggetto punto
            newPosition = cell.position();
            if (newPosition != oldPosition) {

                toUndo.push({
                    command: "translate",
                    cell: cell,
                    oldPosition: oldPosition,
                    newPosition: newPosition
                });

            }

        });


        return {

            undo: function () {
                if (toUndo.length) {
                    console.log('lunghezza toUndo: ' + toUndo.length);
                    console.log('lunghezza toRedo: ' + toRedo.length);
                    var cmd = toUndo.pop();
                    console.log(cmd);
                    //myGraph.removeCells(cmd.cell);
                    reverse(cmd);
                    toRedo.push(cmd);
                    console.log('lunghezza toUndo: ' + toUndo.length);
                    console.log('lunghezza toRedo: ' + toRedo.length);
                }
            },

            redo: function () {
                if (toRedo.length) {
                    console.log('lunghezza toRedo: ' + toRedo.length);
                    console.log('lunghezza toUndo: ' + toUndo.length);
                    var cmd = toRedo.pop();
                    console.log(cmd);
                    // addCell scatena già l'evento add, percui l'elemento viene automaticamente aggiunto alla undo
                    //myGraph.addCell(cmd.cell);
                    reverse(cmd);
                    toUndo.push(cmd);
                    console.log('lunghezza toRedo: ' + toRedo.length);
                    console.log('lunghezza toUndo: ' + toUndo.length);
                }
            },

            /**
             * Setter per objectName per poter farlo interfacciare con la UI
             * @param {String} elementName 
             */
            setObjectName: function (elementName) {
                objectName = elementName;
            }
        }

    })(new joint.dia.Graph);

    /**
     *  Associazione degli eventi ai bottoni della pagina html
     */

    $('#btnType1').on("mouseup", function () {

        commandManager.setObjectName('rectType1');

    });

    $('#btnType2').on("mouseup", function () {

        commandManager.setObjectName('rectType2');

    });

    $('#btnUndo').on("mouseup", function () {

        commandManager.undo();

    })

    $('#btnRedo').on("mouseup", function () {

        commandManager.redo();

    })
})(joint);