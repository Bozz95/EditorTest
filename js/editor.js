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
                                            fill: '#16A085'
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
                                            fill: '#16A085'
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
                canMake: function(elementName) {
                    return (_make[elementName]? true : false);
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
            defaultRouter: {
                name: 'manhattan'
            },
            defaultConnector: {
                name: 'jumpover',
                args: {
                    radius: 20
                }
            }
        });

        // EVENTI PER GRAPH

        myGraph.on('all', function (ev, link) {
            if (ev == 'change:target')
                console.log(ev + ' ' + link.get('target').port);
            else
                console.log('pipputo' + ev);
        });

        // EVENTI PER PAPER

        paper.on('blank:pointerdown', function (evt, x, y) {
            console.log(factory.canMake(objectName) + '---' + objectName);
            if (objectName != undefined && factory.canMake(objectName)) {
                myGraph.addCell(factory.make(objectName, x, y));
            } else return;

        });




        return {

            undo: function () {

            },

            redo: function () {

            },

            /**
             * Setter per objectName per poter farlo interfacciare con la UI
             * @param {String} elementName 
             */
            setObjectName: function(elementName) {
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

})(joint);