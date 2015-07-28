var sweet = require('sweet.js');
sweet.loadMacro('./macro/lambda')
sweet.setReadtable('./src/readtable.js')
describe('readtable for mori datastructure', function() {

  it('should create vector via #[]',function() {
    var reads = sweet.compile('#[ bar, he]')
    expect(reads.code).toBe('mori.vector(bar, he);')
  })

  it('should be error when #',function() {
    expect(function() {
      sweet.compile('#asdf')
    }).toThrowError(SyntaxError)
  })

  it('should create hashmap via #{a:b}',function() {
    var reads = sweet.compile('#{bar:"foo"}')
    expect(reads.code).toBe("mori.hashMap('bar', 'foo');")
  })

  
  it('should create hashmap via #{}',function() {
    var reads = sweet.compile('#{"bar":"foo"}')
    expect(reads.code).toBe("mori.hashMap('bar', 'foo');")
  })

  it('should create hashmap via #{Vector: String}',function() {
    var reads = sweet.compile('#{#[1,2,3]:"foo"}')
    expect(reads.code).toBe("mori.hashMap(mori.vector(1, 2, 3), 'foo');")
  })

  it('should create set via ##{}',function() {
    var reads = sweet.expand('##{a,b}')
    expect(reads[0].token.value).toEqual('mori.set')
  })
  
  it('should create lambda via #()',function() {
    var reads = sweet.compile('#($ + $1)')
    expect(reads.code).toBe('(function () {\n\
    return arguments[0] + arguments[0];\n\
});')
  })
})
