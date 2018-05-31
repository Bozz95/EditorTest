# EditorTest

- **TODOS** 
	
	- [x] Aggiungere elementi cliccando sul foglio bianco a piacimento;
	- [ ] Collegare gli elementi con dei link tra di loro (con uso delle ports in estremis);
	- [ ] Creare un gestore di DO e UNDO implementato nell'editor;
	- [ ] Creare un metodo di multiselect per multigragging e altro;
	- [ ] Ritocchi di Beauty CSS;
	- [ ] IDEE..

- **IDEA** Si possono aggiungere dei parametri custom agli elementi e creare classi nuove( per esempio creare un array con i parametri aggiunti e i loro valori), e associare a tali parametri dei Listener sempre custom ad esempio:

  ```javascript
  // Using the option parameter and a custom attribute
  graph.on('change:custom', function(element, custom, opt) {
    if (opt.consoleOutput) {
      console.log('Custom attribute value changed to "' + custom + '"');
    }
  });
  element2.prop('custom', 'myValue', { consoleOutput: true });
  ```

- **IDEA** Per creare la "HALO" intorno a un elemento seguire i suggerimenti [su google groups](https://groups.google.com/forum/#!topic/jointjs/v1Ntouy5pXU).

	
	
