
function HTMLParser(){}

HTMLParser.prototype.removeEmptyNodes = function(nodes){
    var that = this;
    return nodes.filter(node => {
        if (node.type === 'element') {
            node.children = that.removeEmptyNodes(node.children);
            return true
        }
        return node.content.length
    });
}

HTMLParser.prototype.stripWhitespace = function(nodes){
    var that = this;
    return nodes.map(node => {
        if (node.type === 'element') {
            node.children = that.stripWhitespace(node.children)
        } else {
            node.content = node.content.trim()
        }
        return node
    })
}

HTMLParser.prototype.removeWhitespace = function(nodes){
    return this.removeEmptyNodes(this.stripWhitespace(nodes))
}

HTMLParser.prototype.$ = function(selector) {
    return document.querySelector(selector)
}

HTMLParser.prototype.wxmlHandle = function(nodes){
    var that = this;
    nodes.map(node => {
        // 设置节点名称
        node.name = node.tagName;
        if(node.name === 'img'){
            if(node.attributes){
                node.attributes.push({"key":"width","value":"100%"});
            }
        }

        // 设置节点类型
        if(node.type === 'element'){
            node.type = 'node';
        }else if(node.type === 'text'){
            node.text = node.content;
            delete node.content;
        }
        delete node.tagName;

        // 设置节点属性
        if(node.attributes){
            var attrs = {};
            node.attributes.map(obj => {
                attrs[obj.key] = obj.value;
            });
            node.attrs = attrs;
            delete node.attributes;
        }
        if(node.children){
            that.wxmlHandle(node.children);
        }
    });
}

HTMLParser.prototype.htmlHandle = function(nodes){
    var that = this;
    nodes.map(node => {
        if(node.tagName === 'img'){
            if(node.attributes){
                node.attributes.push({"key":"width","value":"100%"});
                console.log(node.attributes);
            }
        }

        if(node.children){
            that.htmlHandle(node.children);
        }
    });
}

HTMLParser.prototype.getWXMLNodes = function(html) {
    var codeArray = himalaya.parse(html)
    codeArray = this.removeWhitespace(codeArray)
    this.wxmlHandle(codeArray);
    return codeArray;
}

HTMLParser.prototype.getHandledHTML = function(html){
    var codeArray = himalaya.parse(html);
    codeArray = this.removeWhitespace(codeArray);
    this.htmlHandle(codeArray);
    console.log(codeArray);
    var code = himalaya.stringify(codeArray);
    return code;
}