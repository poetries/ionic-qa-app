# 环境搭建


##  Ionic初始化构建

> https://ionicframework.com/getting-started#cli

```bash
# 全局安装
npm install -g ionic
```

- `ionic info` (查看当前`ionic`的全部版本信息)

![image.png](https://upload-images.jianshu.io/upload_images/1480597-ddad8ba9108c0116.png)



```bash
ionic start myApp tabs # 建议使用初始化

cd myApp 

ionic serve
```


![image.png](https://upload-images.jianshu.io/upload_images/1480597-514b23b5ea8fd4ac.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- `ionic serve` 运行项目

## Genymotion 安卓模拟器

> 使用方法 https://www.jianshu.com/p/aabc4fd01311

## 在IOS环境下体验

> 需要配备`mac`，安装`xcode`

```bash
# mac下需要添加sudo
sudo ionic cordova platform add ios

# 注意获取目录权限的问题
chmod -R 777 项目文件夹名
```

> 真机调试与发布需要`Apple`开发者账号

**打开xcode选择platform下中ios文件夹，点击运行项目**

![image.png](https://upload-images.jianshu.io/upload_images/1480597-a88aef237eed3ffe.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 在安卓下体验

**1. 添加android**

```bash
ionic cordova platform add android

# 注意获取目录权限的问题
chmod -R 777 项目文件夹名

# 直接使用Android studio 进行调试链接

# 打包成apk拖入Genymotion调试
```

**2. 下载android studio 打开/platform/andriod文件**


![image.png](https://upload-images.jianshu.io/upload_images/1480597-8491b2c583d0cf3f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**3. 然后连接android studio结合geny生成apk调试**

![image.png](https://upload-images.jianshu.io/upload_images/1480597-40771d7cc51e45f2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 在浏览器/微信下体验


**1. 添加browser文件夹**


```bash
ionic cordova platform add browser
```

**2. 打包**

> `ionic cordova build browser`

![image.png](https://upload-images.jianshu.io/upload_images/1480597-bef93f8f07488d6a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](https://upload-images.jianshu.io/upload_images/1480597-28d5f0193d87167e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**3. 运行**

```bash
npm run serve

# 浏览器打开 http://localhost:8100
```

**4. 部署**

> 把`www`目录部署到服务器上即可

> 在微信下体验 注意微信`title`问题


## ionic的常用命令

**1. 基本命令**

- `ionic g page myPage` 创建页面
- `ionic g provider MyData` 创建`provider`
- `ionic serve` 在浏览器中看
- `ionic platform add/remove android/ios` 添加删除平台
- `ionic build android/ios`  打包

**2. 辅助命令**

- `ionic info` 查看关于`ionic`的系统消息
- `ionic emulate android/ios` 模拟器中打开
- `ionic cordova plugin list` 查看插件安装列表

**3. 正式发布需要的命令**

- `ionic cordova platforms add android`
- `ionic cordova build android --release`
