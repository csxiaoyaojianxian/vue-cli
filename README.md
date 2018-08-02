# vue-cli
csxiaoyao自己用的vue-cli脚手架
```
$ vue create vue-start
$ vue ui
$ yarn serve
$ yarn build
```

安装vue-cli   vue create XXX
配置vue.config.js  直接复制
配置host   w.qq.com
安装axios并配置  yarn add axios
配置main.js、index.html、login.html的QQ登录态  直接复制
安装element-ui  yarn add element-ui
配置route 
安装echarts

跨域，服务器端的设置
header('Access-Control-Max-Age:86400');  
header('Access-Control-Allow-Origin:'.$_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Credentials:true');
header('Access-Control-Allow-Methods:GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers:x-requested-with,content-type');
header('Access-Control-Allow-Headers:Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With');


$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';  
$allow_origin = array(  
    'http://w.qq.com',
    'http://w.qq.com:8080'
);  
if(in_array($origin, $allow_origin)){  
    header('Access-Control-Allow-Origin:'.$origin);
    header('Access-Control-Allow-Methods:*'); 
    header('Access-Control-Allow-Headers:Origin, X-Requested-With, Content-Type');
    header('Access-Control-Allow-Credentials:true');
}