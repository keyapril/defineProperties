## 综述

defineProperties是一个兼容ie6+的Object.defineProperties的实现，只支持getter，setter。

* 版本：1.0
* 作者：左莫
* demo：[http://gallery.kissyui.com/defineProperties/1.0/demo/index.html](http://gallery.kissyui.com/defineProperties/1.0/demo/index.html)

## 初始化组件

    S.use('gallery/defineProperties/1.0/index', function (S, defineProperties) {
         var data = {
            str:'str',
            b:true,
            arr:[],
            num:1,
            obj:{a:1}
        }

        var props = {}

        for(var prop in data){
            (function(k){
                props[k] = {
                    get:function(){
                        return data[k]
                    },
                    set:function(v){
                        //做你需要做的set
                        alert(k+' has set '+v);
                        data[k] = v
                    }
                }
            })(prop)
        }

        //拥有getter setter的新对象
        var newData = defineProperties({},props)

        newData.str= '1';
        alert(newData.str)


        newData.arr = [1,2]
        alert(newData.arr)

        newData.obj = {a:2}

        alert(newData.obj.a)
    })

## API说明

	静态方法，和Object.defineProperties的参数一致。
