/** TODO's 
 *  @todo   Creare bottoni che creano degli oggetti
 *  @todo   Consentire la creazione di link cliccando sugli oggetti
 *  @todo   Gestione di un UNDO-REDO
 *  @todo   ...
 */
(function (joint) {


    /**
     * Aggregazione dei vari oggetti che si possono creare
     *  x = constructorManager['stringMethodName'](args)
     */
    var constructorManager = {

        rectType1: function (x, y) {

            return new joint.shapes.devs.Model({
                position: {
                    x: x,
                    y: y
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

        rectType2: function (x, y) {
            return new joint.shapes.devs.Model({
                position: {
                    x: x,
                    y: y
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
    var objectPath;

    /*var commandManager = (function () {
        // Pile per gestire do e undo
        var undoStack = [];
        var redoStack = [];
        var lastModified;



    })();*/

    var commandManager = joint.dia.Graph.extend({
        undoStack: new Array(),
        redoStack: new Array(),

        unDo:  function() {

        },
        reDo:  function() {

        },


    });


    /**
     * Oggetto che contiene tutte gli element e link
     */
    var graph = new joint.dia.Graph;

    var paper = new joint.dia.Paper({
        el: $('#paperContainer'),
        width: 4000,
        height: 4000,
        model: graph,
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

    /**
     *  Associazione degli eventi ai bottoni della pagina html
     */

    $('#btnType1').on("mouseup", function () {
        objectPath = "rectType1";
    });

    $('#btnType2').on("mouseup", function () {
        objectPath = "rectType2";
    });

    /*********************************************************
     * EVENTS
     */

    paper.on('blank:pointerdown', function (evt, x, y) {

        if (objectPath != undefined && constructorManager[objectPath]) {
            graph.addCell(constructorManager[objectPath](x, y));
        } else return;
    });


    // adjust vertices when a cell is removed or its source/target was changed
    //graph.on('add remove change:source change:target', myAdjustVertices);

    // also when an user stops interacting with an element.
    //paper.on('cell:pointerup', myAdjustVertices);
    graph.on('change:source change:target', function (link) {
        var sourcePort = link.get('source').port;
        var sourceId = link.get('source').id;
        var targetPort = link.get('target').port;
        var targetId = link.get('target').id;

        // Qui posso gestire il cambiamento di target e source dei link
    });


})(joint);