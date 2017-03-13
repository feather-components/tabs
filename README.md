Tabs
=================================

###Options:

* dom：指定tabs的父级元素
* selector: 指定一个选择表达式，dom下所有符合该表达式的元素将会被收集,默认为 '> *'
* target: 指定一个查找target的函数
* currentClassName: 当前被选中的tab的className
* current: 指定一个当前索引
* event: 指定一个触发切换的事件，默认为click，可以指定mouseover等

###Event:

* switch(event, index)：切换时触发

###Api

* to(index)：切换至某一项


###Example

```html
<div id="tab-btns">
    <a href="#tab1" data-target="tab1">tab1</a>
    <a href="#tab2" data-target="tab2">tab2</a>
    <a href="#tab3" data-target="tab3">tab3</a>
</div>

<div id="tab1"></div>
<div id="tab2"></div>
<div id="tab3"></div>
```

```js
$('#tab-btns').tabs({
    selector: '> a',
    event: 'mouseover'
});

$('#tab-btns').on('tabs:switch', function(index){
    console.log(index);
});

$('#tabs-btns').tabs('to', 2);
```js