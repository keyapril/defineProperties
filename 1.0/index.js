/**
 * @fileoverview 
 * @author 左莫<zuomo.xb@alibaba-inc.com>
 * @module defineProperties
 **/
KISSY.add(function (S) {
        var defineProperty = Object.defineProperty
    var defineProperties = Object.defineProperties
    try {
        defineProperty({}, '_', {
            value: 'zuomo'
        })
    } catch (e) {
        if ('__defineGetter__' in {}) {
            defineProperty = function(obj, prop, desc) {
                if ('get' in desc) {
                    obj.__defineGetter__(prop, desc.get)
                }
                if ('set' in desc) {
                    obj.__defineSetter__(prop, desc.set)
                }
            }
            defineProperties = function(obj, props) {
                for (var prop in props) {
                    defineProperty(obj, prop, props[prop])
                }
                return obj
            }
        }
        else if (!defineProperties && window.VBArray) {
            window.execScript([
                'Function vb_global_eval(code)',
                    '\tExecuteGlobal(code)',
                'End Function'
            ].join('\n'), 'VBScript')

            defineProperties = function(obj, props) {
                var className = 'VBClass' + setTimeout('1')
                var buffer = []
                buffer.push(
                        'Class ' + className,
                        '\tPrivate [__data__], [__proxy__]',
                        '\tPublic Default Function [__const__](d, p)',
                        '\t\tSet [__data__] = d: set [__proxy__] = p',
                        '\t\tSet [__const__] = Me',
                        '\tEnd Function')
                for (var name in props) {
                    buffer.push(
                            '\tPublic Property Let [' + name + '](val)',
                            '\t\tCall [__proxy__]([__data__], "' + name + '", val)',
                            '\tEnd Property',
                            '\tPublic Property Set [' + name + '](val)',
                            '\t\tCall [__proxy__]([__data__], "' + name + '", val)',
                            '\tEnd Property',
                            '\tPublic Property Get [' + name + ']',
                            '\tOn Error Resume Next', 
                            '\t\tSet[' + name + '] = [__proxy__]([__data__],"' + name + '")',
                            '\tIf Err.Number <> 0 Then',
                            '\t\t[' + name + '] = [__proxy__]([__data__],"' + name + '")',
                            '\tEnd If',
                            '\tOn Error Goto 0',
                            '\tEnd Property')
                }
                buffer.push('End Class')
                buffer.push(
                        'Function ' + className + 'Factory(a, b)',
                        '\tDim o',
                        '\tSet o = (New ' + className + ')(a, b)',
                        '\tSet ' + className + 'Factory = o',
                        'End Function')
                window.vb_global_eval(buffer.join('\r\n'))

                return window[className + 'Factory'](props, function(props,name,value){
                    var fn = props[name]
                    if (arguments.length === 3) {
                        fn.set(value)
                    } else {
                        return fn.get()
                    }
                })
            }
        }
    }
    return defineProperties;
});



