/** TODO's 
 *  @todo   Creare bottoni che creano degli oggetti
 *  @todo   Consentire la creazione di link cliccando sugli oggetti
 *  @todo   Gestione di un UNDO-REDO
 *  @todo   ...
 */
(function (joint) {


    /**
     * Aggregazione dei vari oggetti che si possono creare
     *  x = constructorManager['stringMethodName'](params)
     */
    var constructorManager = {

        rectType1: function (x, y) {

            return new joint.shapes.basic.Rect({
                position: {
                    x: x,
                    y: y
                },
                size: {
                    width: 100,
                    height: 30
                },
                attrs: {
                    rect: {
                        'stroke-width': '5',
                        'stroke-opacity': .7,
                        stroke: 'black',
                        rx: 3,
                        ry: 3,
                        fill: 'lightgray',
                        'fill-opacity': .5
                    },
                    text: {
                        text: 'TYPE 1',
                        'font-size': 10,
                        style: {
                            'text-shadow': '1px 1px 1px lightgray'
                        }
                    }
                }
            });
        },

        rectType2: function (x, y) {
            return new joint.shapes.basic.Rect({
                position: {
                    x: x,
                    y: y
                },
                size: {
                    width: 100,
                    height: 30
                },
                attrs: {
                    rect: {
                        'stroke-width': '5',
                        'stroke-opacity': .7,
                        stroke: 'black',
                        rx: 3,
                        ry: 3,
                        fill: 'lightgray',
                        'fill-opacity': .5
                    },
                    text: {
                        text: 'tYPE 2',
                        'font-size': 10,
                        style: {
                            'text-shadow': '1px 1px 1px lightgray'
                        }
                    }
                }
            });
        }
    }
    var objectPath;

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
        drawGrid: true
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

    /**
     * Evento che controlla quali elementi disegnare quando l'utente clicca su una parte di foglio vuota
     */
    paper.on('blank:pointerdown', function(evt, x, y) { 
        
        if(objectPath != undefined && constructorManager[objectPath]){
            graph.addCell(constructorManager[objectPath](x,y));   
        }
        
        else return;
    });


    // adjust vertices when a cell is removed or its source/target was changed
    //graph.on('add remove change:source change:target', myAdjustVertices);

    // also when an user stops interacting with an element.
    //paper.on('cell:pointerup', myAdjustVertices);



})(joint);