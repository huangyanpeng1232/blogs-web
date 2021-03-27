<template>
<div id="BlogList">
  <ul class="blogs-ul">
    <li v-for="item in list" :key="item.id">
      <div class="title">
        <span>{{ item.title }}</span>
      </div>
      <hr class="title-hr">
      <div class="content">
        <span>{{ item.description }}</span>
      </div>
      <hr class="content-hr">
      <div class="info">
              <span class="iconfont icon-icon-time">
                <span>{{ item.time | dateTimeFormat }}</span>
              </span>
        <span class="iconfont icon-tag">
                <span>{{ item.tag }}</span>
              </span>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: "BlogList",
  data() {
    return {
      list: [
        {
          id: '10',
          title: 'Spring Boot',
          description: 'Spring Boot是由Pivotal团队提供的全新框架，其设计目的是用来简化新Spring应用的初始搭建以及开发过程。该框架使用了特定的方式来进行配置',
          time: new Date('2020-03-27 10:54:15'),
          tag: '后端框架'
        }, {
          id: '11',
          title: 'Mysql',
          description: 'MySQL是一个关系型数据库管理系统，由瑞典MySQL AB 公司开发，属于 Oracle 旗下产品。MySQL 是最流行的关系型数据库管理系统之一',
          time: new Date('2020-01-23 10:24:15'),
          tag: '数据库'
        }, {
          id: '12',
          title: 'Redis',
          description: 'Redis（Remote Dictionary Server )，即远程字典服务，是一个开源的使用ANSI C语言编写、支持网络、可基于内存亦可持久化的日志型、Key-Value数据库',
          time: new Date('2021-01-17 3:53:15'),
          tag: '缓存'
        },
        {
          id: '13',
          title: 'Mybatis',
          description: 'MyBatis 本是apache的一个开源项目iBatis, 2010年这个项目由apache software foundation 迁移到了google code，并且改名为MyBatis ',
          time: new Date('2019-01-27 10:52:15'),
          tag: '持久层框架'
        }, {
          id: '14',
          title: 'JDK 与JRE 的区别',
          description: 'JRE主要包含：java类库的class文件(都在lib目录下打包成了jar)和虚拟机(jvm.dll)；JDK主要包含：java类库的 class文件(都在lib目录下打包成了jar)并自带一个JRE',
          time: new Date('2020-2-5 17:24:05'),
          tag: 'Java 基础'
        }
      ]
    }
  }
}
</script>

<style scoped>

.blogs-ul {
  padding: 0px;
}

.blogs-ul > li {
  list-style: none;
  margin-top: 20px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 8px;
  background-color: white;
  border: 1px solid rgba(0,0,0,0);
}

.blogs-ul > li:hover {
  animation-name: mouse-in-blog;
  animation-duration: 0.6s;
  animation-fill-mode: forwards
}

@keyframes mouse-in-blog {
  from {
    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(0,0,0,0);
  }
  to {
    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(10,10,10,0.2);
  }
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin: 5px;
  color: #666;
  cursor: pointer;
}

.content {
  font-size: 17px;
  color: #777;
  text-indent: 25px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.info {
  color: #888;
  cursor: pointer;
}

.info > span {
  margin-left: 15px;
  margin-right: 15px;
}

.info > span > span {
  margin-left: 5px;
  font-size: 12px;
}

.content-hr {
  margin-top: 15px;
  margin-bottom: 10px;
}

.title-hr {
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>