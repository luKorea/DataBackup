# crypto加密

```javascript
const crypto=require('crypto');

module.exports={
  md5(buffer){
    let obj=crypto.createHash('md5');
    obj.update(buffer);

    return obj.digest('hex');
  }
};

```

