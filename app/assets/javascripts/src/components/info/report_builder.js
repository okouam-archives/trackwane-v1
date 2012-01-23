Gowane.Components.Info.ReportBuilder =
{
  xtype: 'form',
  collapsible: false,
  title: "Report Parameters",
  bodyStyle: 'padding: 5px',
  align: 'stretchmax',
  height: 235,
  defaultType: 'datefield',
  items: [
    {xtype: 'spacer', height: 10},
    {fieldLabel: 'Start Date', width: 110, anchor: '-4'},
    {xtype: 'spacer', height: 10},
    {fieldLabel: 'Start Time', width: 110, anchor: '-4', xtype: 'timefield'},
    {xtype: 'spacer', height: 10},
    {fieldLabel: 'End Date', width: 110, anchor: '-4'},
    {xtype: 'spacer', height: 10},
    {fieldLabel: 'End Time', width: 110, anchor: '-4', xtype: 'timefield'}
  ],
  buttons: [{
    text: 'Run Report',
    handler: function() {
      alert("hello");
    }
  }]
};