// Поиск по-русски для темы Just the Docs.
// Стандартный поисковый движок (lunr) считает буквами только латиницу
// и выбрасывает из слов кириллицу. Здесь мы заменяем эту «очистку слов»
// на свою, которая знает русские буквы. Файл копируется как есть.
if (!this.ruSearchReady) {
  this.ruSearchReady = true;
  var ruTrimmer = function (token) {
    return token.update(function (s) {
      return s.replace(/^[^0-9A-Za-zА-Яа-яЁё]+/, '').replace(/[^0-9A-Za-zА-Яа-яЁё]+$/, '');
    });
  };
  lunr.Pipeline.registerFunction(ruTrimmer, 'ruTrimmer');
  this.pipeline.after(lunr.trimmer, ruTrimmer);
  this.pipeline.remove(lunr.trimmer);
  this.pipeline.remove(lunr.stemmer);
  this.searchPipeline.remove(lunr.stemmer);
}
