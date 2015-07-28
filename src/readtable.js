var sweet = require('sweet.js')
module.exports = sweet.currentReadtable().extend({
  '#': function(ch, reader) {
    var hashtag = reader.readIdentifier();
    var pun = reader.readToken();
    switch(pun.value){
    case 'mori.hashMap':
      var delim  = reader.readToken();
        return [reader.makeIdentifier('mori.set')].concat(
          reader.makeDelimiter('()', reader.makeDelimiter('[]', delim.inner)))
    case '()':
      return [reader.makeIdentifier('$$')].concat(
        reader.makeDelimiter('()',pun.inner)
      )
    case '[]':
      return [reader.makeIdentifier('mori.vector')].concat(
        reader.makeDelimiter('()',pun.inner)
      );
    case '{}':
      if(pun.inner.filter(function(token){return token.value===','||token.value===':'}).length>0){
        var hash = pun.inner.reduce(function(acc, token){
          if(token.value===':'){
            token.value=',';
            if(acc[acc.length-1].type===reader.Token.Identifier)
              acc[acc.length-1] = reader.makeStringLiteral(acc[acc.length-1].value)
          }
          acc.push(token)
          return acc;
        },[])
        return [reader.makeIdentifier('mori.hashMap')].concat(
          reader.makeDelimiter('()',hash)
        );
      }
      return null
      
    default: reader.throwSyntaxError('ru',
                                     'Expected delimiter after #: {}, [], (), #{}',
                                     hashtag);
    }
  }
})
