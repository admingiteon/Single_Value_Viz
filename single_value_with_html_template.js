looker.plugins.visualizations.add({
  options: {
    html_template: {
      type: "string",
      label: "HTML Template",
      default: `<div style="text-align: center; color: #5A2FC2; font-family: 'Open Sans'; font-size: 5rem; font-weight: 700;">{{ value }}</div>`
    }
  },
 
  create: function(element, config) {},

  updateAsync: function(data, element, config, queryResponse, details, doneRendering){
    this.clearErrors();
    
    const firstRow = data[0];
    const qFields = queryResponse.fields;

    const firstCell = firstRow[qFields.dimension_like.length > 0 ? qFields.dimension_like[0].name : qFields.measure_like[0].name];

    const htmlForCell = LookerCharts.Utils.htmlForCell(firstCell);
    const htmlTemplate = config && config.html_template || this.options.html_template.default;
    const htmlFormatted = htmlTemplate.replace(/{{.*}}/g, htmlForCell);

    element.innerHTML = htmlFormatted;
    
    doneRendering();
  }
});