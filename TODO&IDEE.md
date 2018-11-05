# EditorTest

- **TODOS** 
	
	- [x] Aggiungere elementi cliccando sul foglio bianco a piacimento;
	- [x] Collegare gli elementi con dei link tra di loro;
	- [x] Creare un gestore di DO e UNDO implementato nell'editor;
  - [ ] Creare un metodo di multiselect per multigragging e altro;
  - [ ] Migliorare la gestione del command manager per gli eventi del view, quelli del model non andrebbero toccati;
  - [ ] Aggiungere toolbar per creare, aprire, chiudere o salvare uno script;
  - [ ] Aggiungere toolbar per selezionare gli elementi **N.B** non necessario in quanto ogni elemento può diventare interattivo e avere bottoni di cancellazione, opzioni di cancellazione da tastera etc etc... chiedere preferenze;
  - [ ] 
  - [ ] Creare schede con i parametri da aggiungere ai componenti (**non so quali tipi di parametri ci vadano**);

- **TODO** Gestire i seguenti eventi su grafico per DO e UNDO:

  - [x]  'change:position'
  - [x]  'change:target' 
  - [x]  'change:source'
  - [x]  'remove'
  - [x]  'add'
  - [ ]  'altri'


- **IDEA BRUTTA** Si possono aggiungere dei parametri custom agli elementi e creare classi nuove( per esempio creare un array con i parametri aggiunti e i loro valori), e associare a tali parametri dei Listener sempre custom ad esempio:

  ```javascript
  // Using the option parameter and a custom attribute
  graph.on('change:custom', function(element, custom, opt) {
    if (opt.consoleOutput) {
      console.log('Custom attribute value changed to "' + custom + '"');
    }
  });
  element2.prop('custom', 'myValue', { consoleOutput: true });
  ```

- **IDEA** ~~Per creare la "HALO" intorno a un elemento seguire i suggerimenti [su google groups](https://groups.google.com/forum/#!topic/jointjs/v1Ntouy5pXU).~~ **Trovata soluzione con esempio dentro il file htmlInsideElements**.

	
	
