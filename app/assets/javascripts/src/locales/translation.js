$.t = function(key) {
  if (!$.lang) $.lang = "en";
  return $.translations[$.lang][key];
};