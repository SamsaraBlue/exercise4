var should = require('should');
describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          //这里使用了箭头函数，箭头函数会继承外层函数调用的this绑定，外层调用的是obj
          this.should.equal(obj);
          done()
        }, 0)
      }
    }
    obj.say()
  })

  it('global', function () {
    function test() {
      // this 是什么？想想为什么？
      //this是全局作用域，调用函数的上下文默认为全局作用域
      this.should.equal(global)
    }
    test()
  })

  describe('bind', function () {
    it('bind undefined', function () {
      var obj = {
        say: function () {
          function _say() {
            // this 是什么？想想为什么？
            //say在创建时立即执行，硬绑定到obj，然而此时obj尚未定义完全，所以是根据外层的this绑定obj
            this.should.equal(global)
          }
          return _say.bind(obj)
        }()
      }
      obj.say()
    })

    it('bind normal', function () {
      var obj = {}
      obj.say = function () {
        function _say() {
          // this 是什么？想想为什么？
          //obj已经完成创建，再创建_say()时将This绑定obj成立，故为obj
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})
