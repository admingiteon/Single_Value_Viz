looker.plugins.visualizations.add({
  options: {
    html_template: {
      type: "string",
      label: "HTML Template",
      default: `<div>{{ value }}</div>`,
      display: "input"
    }
  },
 
  create: function(element, config) {},

  updateAsync: function(data, element, config, queryResponse, details, doneRendering){
    this.clearErrors();
    
    const firstRow = data[0];
    const firstCell = firstRow[queryResponse.fields.dimensions[0].name];
    const htmlForCell = LookerCharts.Utils.htmlForCell(firstCell);
    const htmlTemplate = config && config.html_template || this.options.html_template.default;

    const htmlFormatted = htmlTemplate.replace(/{{.*}}/g, htmlForCell);
    element.innerHTML = htmlFormatted;
    
    doneRendering();
  }
});