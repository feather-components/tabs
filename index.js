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
    initialize: function(options){
        var self = this;
        options = self.options = $.extend({
            dom: null,
            selector: '> *',
            target: function(index){
                return $($(this).data('target'));
            },
            currentClassName: '',
            current: 0,
            event: 'click'
        }, options || {});

        self.$dom = $(options.dom);
        self.initEvent();
        self.to(options.current);
    },

    initEvent: function(){
        var self = this, options = self.options;

        self.o2s(self.$dom, options.event, options.selector, function(){
            self.to(this);
        });
    },
    
    to: function(index){
        var self = this, $elements = self.$(), options = self.options;

        $elements.each(function(index){ 
            options.currentClassName && $(this).removeClass(options.currentClassName);
            $(self.target(index)).hide();
        });

        if(index && typeof index == 'object'){
            $elements.each(function(i){
                this === index && (index = i);
            }).get(0);
        }

        if(typeof index != 'number'){
            index = 0;
        }

        options.currentClassName && $elements.eq(index).addClass(options.currentClassName);
        $(self.target(index)).show();

        setTimeout(function(){
            self.trigger('switch', index);
        }, 0);
    },

    $: function(){
        return this.$dom.find(this.options.selector);
    },

    target: function(index){
        return this.options.target.call(this.$().get(index), index);
    },

    destroy: function(){
        this.ofs(this.$dom, this.options.event);
    }
});
});
