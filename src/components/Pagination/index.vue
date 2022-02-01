//分页器全局组件
<template>
  <div class="fr page">
    <div class="sui-pagination clearfix">
      <ul>
        <li class="prev " :class="{disabled:startpage.start==1}" @click="prevPageNo">
          <a href="JavaScript:;">«上一页</a>
        </li>
        <li  v-if="startpage.start!=1"  @click="changPageNo(1)">
          <a href="JavaScript:;">1</a>
        </li>
        <li class="dotted"  v-if="startpage.start>2"><span>...</span></li>
       <li :class="{displayNone:index<startpage.start-1,active:pageNo==index+1}" v-for="(pages,index) in startpage.end" :key="index" @click="changPageNo(index+1)" >
          <a href="JavaScript:;">{{pages}}</a></li>
        <li class="dotted" v-if="startpage.end<=totalPages-2"><span>...</span></li>
         <li v-if="startpage.end!=totalPages"  @click="changPageNo(totalPages)">
          <a href="JavaScript:;" >{{totalPages}}</a>
        </li>
        <li class="next" :class="{disabled:startpage.end==totalPages}" @click="nextPageNo">
          <a href="JavaScript:;">下一页»</a>
        </li>
      </ul>
      <div>
        <span>共{{totalPages}}页&nbsp;</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "totalPages"],
  data() {
    return {
      intervalpage: 5,
    };
  },
  methods:{
    //后退一页
    prevPageNo(){
      this.$emit("prevPageNo")
    },
    //前进一页
    nextPageNo(){
        this.$emit("nextPageNo")
    },
    //点击任意跳转
    changPageNo(index){
      this.$emit("changPageNo",index)
    }
  },
  computed: {
    pageDifference() {
      return (this.intervalpage - 1) / 2;
    },
  //计算分页器的开始与结束页
    startpage() {
      let start = 0,
        end = 0;
      if (this.totalPages < this.intervalpage) {
        start = 1;
        end = this.totalPages;
      } else if (this.pageNo + this.pageDifference > this.totalPages) {
        start = this.totalPages - this.intervalpage +1;
        end = this.totalPages;
      } else if (this.pageNo - this.pageDifference < 1) {
        start = 1;
        end = this.intervalpage;
      } else if (this.totalPages > this.intervalpage) {
        start = this.pageNo - this.pageDifference;
        end = this.pageNo + this.pageDifference;
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.page {
  width: 940px;
  height: 66px;
  // overflow: hidden;
  float: right;
  .sui-pagination {
    margin: 18px 0;
    ul {
      margin-left: 0;
      margin-bottom: 0;
      vertical-align: middle;
      width: 800px;
      float: left;
      li {
        line-height: 18px;
        display: inline-block;
        a {
          position: relative;
          float: left;
          line-height: 18px;
          text-decoration: none;
          background-color: #fff;
          border: 1px solid #e0e9ee;
          margin-left: -1px;
          font-size: 14px;
          padding: 9px 18px;
          color: #333;
        }
        &.active {
          a {
            background-color: #fff;
            color: #e1251b;
            border-color: #fff;
            cursor: default;
          }
        }
        &.prev {
          a {
            background-color: #fafafa;
          }
        }
        &.disabled {
          a {
            color: #999;
            cursor: default;
          }
        }
        &.dotted {
          span {
            margin-left: -1px;
            position: relative;
            float: left;
            line-height: 18px;
            text-decoration: none;
            background-color: #fff;
            font-size: 14px;
            border: 0;
            padding: 9px 18px;
            color: #333;
          }
        }
        &.next {
          a {
            background-color: #fafafa;
          }
        }
      }
    }
    div {
      color: #333;
      font-size: 14px;
      float: right;
      width: 100px;
    }
  }
}
.displayNone{
  display: none!important;
}
</style>