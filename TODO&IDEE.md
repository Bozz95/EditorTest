# EditorTest

- TODO Si possono aggiungere dei parametri custom agli elementi e creare classi nuove( per esempio creare un array con i parametri aggiunti e i loro valori), e associare a tali parametri dei Listener sempre custom ad esempio:
  
  // Using the option parameter and a custom attribute
  graph.on('change:custom', function(element, custom, opt) {
    if (opt.consoleOutput) {
      console.log('Custom attribute value changed to "' + custom + '"');
    }
  });
  element2.prop('custom', 'myValue', { consoleOutput: true });
