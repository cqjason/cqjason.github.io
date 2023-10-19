

#  Web概念

+ 软件架构
  + C/S： 客户端/服务器端 ‐‐‐‐‐‐‐> QQ,360
  + B/S： 浏览器/服务器端 ‐‐‐‐‐‐‐> 京东、淘宝

+ 资源分类

  + 静态资源：所有用户访问得到的结果都一样，可以直接被浏览器解析（eg：html、css、JavaScript、jpg）
  + 动态资源：每个用户访问得到的结果可能不一样，需要先转换为静态资源，再返回给浏览器（eg：servlet/jsp、php、asp）

+ 网络通讯

  + IP：网卡在网络的唯一标识
  + 端口：应用程序在硬件系统中的唯一标识
  + 传输协议
    + tcp：安全协议、三次握手、速度慢
    + udp：不安全协议、速度快

  

#  常见web服务器

## 概念

+ 服务器：底层硬件主机
+ 服务器软件：接收用户网络数据，做出响应处理
+ Web服务器软件：接受用户的web请求，处理后返回请求

##  常见web服务器软件

+ weblogic：Oracle公司，大型JavaEE服务器，支持所有的JavaEE规范，收费
+ webSphere：IBM公司，大型JavaEE服务器，支持所有的JavaEE规范，收费
+ JBOSS：JBOSS公司，大型JavaEE服务器，支持所有的JavaEE规范，收费
+ Tomcat：Apache基金组织，<font color='orange'>中小型</font>JavaEE服务器，支持<font color='orange'>少量的</font>JavaEE规范（```servlet/jsp```），开源<font color='orange'>免费</font>

# Tomcat安装

+ 下载

  https://tomcat.apache.org/download-80.cgi

+ 安装

  解压压缩包到系统目录（建议不含有中文）下

# Tomcat目录结构

| 目录    | 目录下文件                 | 说明                                                         |
| ------- | -------------------------- | ------------------------------------------------------------ |
| bin     | /                          | 存放Tomcat的启动、停止等批处理脚本文件                       |
|         | startup.bat , startup.sh   | 用于在windows和linux下的启动脚本                             |
|         | shutdown.bat , shutdown.sh | 用于在windows和linux下的停止脚本                             |
| conf    | /                          | 用于存放Tomcat的相关配置文件                                 |
|         | logging.properties         | Tomcat 的日志配置文件， 可以通过该文件修 改Tomcat 的日志级别及日志路径等 |
|         | context.xml                | 用于定义所有web应用均需加载的Context配 置，如果web应用指定了自己的context.xml ，该文件将被覆盖 |
|         | server.xml                 | Tomcat 服务器的核心配置文件                                  |
|         | web.xml                    | Tomcat 中所有应用默认的部署描述文件， 主 要定义了基础Servlet和MIME映射。 |
| lib     | /                          | Tomcat 服务器的依赖包                                        |
| logs    | /                          | Tomcat 默认的日志存放目录                                    |
| webapps | /                          | Tomcat 默认的Web应用部署目录                                 |
| work    | /                          | Web 应用JSP代码生成和编译的临时目录                          |

# Tomcat源码

+ 下载

  https://tomcat.apache.org/download-80.cgi

+ 运行

  +  解压zip压缩包

  + 进入解压根目录，并创建一个目录，命名为home ， 并将conf、webapps目录移入 home 目录中

  + 在当前根目录下创建一个 pom.xml 文件，引入tomcat的依赖包

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <project xmlns="http://maven.apache.org/POM/4.0.0"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
    http://maven.apache.org/xsd/maven-4.0.0.xsd">
        <modelVersion>4.0.0</modelVersion>
        <groupId>org.apache.tomcat</groupId>
        <artifactId>apache-tomcat-8.5.42-src</artifactId>
        <name>Tomcat8.5</name>
        <version>8.5</version>
        <build>
            <finalName>Tomcat8.5</finalName>
            <sourceDirectory>java</sourceDirectory>
            <!-- <testSourceDirectory>test</testSourceDirectory> -->
            <resources>
                <resource>
                    <directory>java</directory>
                </resource>
            </resources>
            <!--
            <testResources>
                <testResource>
                    <directory>test</directory>
                </testResource>
            </testResources>
            -->
            <plugins>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-compiler-plugin</artifactId>
                    <version>2.3</version>
                    <configuration>
                        <encoding>UTF-8</encoding>
                        <source>1.8</source>
                        <target>1.8</target>
                    </configuration>
                </plugin>
            </plugins>
        </build>
        <dependencies>
            <dependency>
                <groupId>junit</groupId>
                <artifactId>junit</artifactId>
                <version>4.12</version>
                <scope>test</scope>
            </dependency>
            <dependency>
                <groupId>org.easymock</groupId>
                <artifactId>easymock</artifactId>
                <version>3.4</version>
            </dependency>
            <dependency>
                <groupId>ant</groupId>
                <artifactId>ant</artifactId>
                <version>1.7.0</version>
            </dependency>
            <dependency>
                <groupId>wsdl4j</groupId>
                <artifactId>wsdl4j</artifactId>
                <version>1.6.2</version>
            </dependency>
            <dependency>
                <groupId>javax.xml</groupId>
                <artifactId>jaxrpc</artifactId>
                <version>1.1</version>
            </dependency>
            <dependency>
                <groupId>org.eclipse.jdt.core.compiler</groupId>
                <artifactId>ecj</artifactId>
                <version>4.5.1</version>
            </dependency>
        </dependencies>
    </project>
    ```

  + 在idea中通过maven方式导入该工程

  +  配置idea的Application， 配置 MainClass为org.apache.catalina.startup.Bootstrap ， 并配置 VM 参数

    ```shell
    -Dfile.encoding=UTF-8
    -Dcatalina.home=E:\IdeaProjects\apache-tomcat-8.5.42-src\home
    -Dcatalina.base=E:\IdeaProjects\apache-tomcat-8.5.42-src\home
    -Djava.util.logging.manager=org.apache.juli.ClassLoaderLogManager
    -Djava.util.logging.config.file=E:\IdeaProjects\apache-tomcat-8.5.42-src\home\conf\logging.properties
    ```

  + 在ContextConfig类 的configureStart函数中，手动在webConfig()这一行后面添加JSP解析器

    ```java
    context.addServletContainerInitializer(new JasperInitializer(), null);
    ```

  + 启动Application