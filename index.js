;(function(factory){
if(typeof define == 'function' && define.amd){
    //seajs or requirejs environment
    define(['jquery', 'class'], factory);
}else if(typeof module === 'object' && typeof module.exports == 'object'){
    module.exports = factory(
        require('jquery'),
        require('class')
    );
}else{
    factory(window.jQuery, window.jQuery.klass);
}
})(function($, Class){
return Class.$factory('tabs', {
    initialize: function(opt){
        this.options = $.extend({
            dom: null,
            selector: '> *',
            targetAttr: 'data-target',
            currentClassNameName: '',
            currentIndex: 0,
            event: 'click'
        }, opt || {});

        this.init();
    },

    init: function(){
        var self = this, opts = self.options;

        self.doms = $(opts.selecter, opts.dom);
        self.initTargets();
        self.initEvent();
        self.to(opts.currentIndex);
    },

    refresh: function(){
        this.releaseDoms();
        this.init();
    },

    releaseDoms: function(){
        var self = this;

        self.doms && self.ofs(self.doms, self.options.event);
        self.targets.length = 0;
    },

    initTargets: function(){
        var self = this, attr = self.options.targetAttr;

        self.targets = [];

        self.doms.each(function(){
            self.targets.push(document.getElementById($(this).attr(attr)));
        });
    },
    
    initEvent: function(){
        var self = this, opts = self.options, currentClassName = opts.currentClassName;

        self.doms.each(function(index, item){
            self.o2s(this, opts.event, function(){
                $.each(self.targets, function(){
                    $(this).hide();
                });

                self.targets[index] && $(self.targets[index]).show();

                if(currentClassName){
                    self.doms.removeClass(currentClassName);
                    $(this).addClass(currentClassName);
                }

                self.trigger('switch', index);
                return false;
            });
        });
    },
    
    to: function(index){
        var self = this, index = index || 0;

        if(index > self.doms.length - 1) return false;
        
        self.t2s(self.doms.eq(index), self.options.event);
    },

    destroy: function(){
        this.releaseDoms();
        this.doms = null;
    }
});
});
