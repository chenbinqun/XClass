var Class=require('./class');
var Imp1=Class({
   method1:function(){
       console.log('this is Imp1 method1');
   }
});
var Imp2=Class({
    method2:function(){
        console.log('this is Imp2 method2');
    }
});
var A = Class({
    Implements:[Imp1,Imp2],
    constructor : function(a) {
        console.log('class A construct with params:', [].join.call(arguments, ','));
        this.prop_A = a;
        this.prop = 'A';
    },
    funcA       : function() {
        console.log('call funcA:', this.prop_A);
    },
    func        : function() {
        console.log('call func at[class A] with the private prop:', this.prop)
    }
});
var B = Class({
    Extends      : A,
    constructor : function(b) {

        this.Super(2);
        console.log('class B construct with params:', [].join.call(arguments, ','));
        this.prop_B = b;
        this.prop = 'B';

    },
    funcB       : function() {
        console.log('call funcB:', this.prop_B);
        console.log('prop_A:', this.prop_A);
    },
    funcX       : function() {
        this.Super.funcA();
    },
    func        : function() {
        console.log('call func at[class B] with the private prop:', this.prop)
        this.Super.func();
    }
});
B.addAspect({
    'after@funcB':function(){
        console.log('advice:',this);
        return 123;
    }
});
B.mixin({
    init:function(){
        console.log('init mixin',this);
    },
    newFunc:function(){
        this.Super.funcA();
    }
});
console.log('############# new B ############');
var b = new B('haha');
console.log('--------------------------------');
console.log('######### call b.funcX #########');
b.funcX();
console.log('--------------------------------');
console.log('### call b.funcB with aspect ###');
b.funcB();
console.log('--------------------------------');
console.log('#### call b.newFunc (mixin) ####');
b.newFunc();
console.log('--------------------------------');
