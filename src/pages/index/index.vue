<template>
  <div id="app" :class="dev">
    <div class="header">
      <h1 class="logocont">微淘米</h1>
        <div class="cont" v-if="dev=='pc'">
          <div class="logo">
            <div class="logomark" @click="reloadhtml"></div>
            <a class="modulebtn" href="/topic.html" target="_blank">帖子</a>
            <a class="homebtn" href="https://www.weitaomi.com" target="_blank">微淘米首页</a>
          </div>
          <div class="item clearfix">
            <div class="itemone" :class="(index==current_index?'active':'')" v-for="(item,index) in categoryList" :key="item.cateId" v-if="categoryList.length && index<14" @click="getnewslist(index)">{{item.tagDesc}}</div>
            <div class="itemone more" v-if="categoryList.length > 14" @mouseenter="getmore"  @mouseleave="hidemore">
              <span>更多</span>
              <div ref="showmore " v-show="showmore" class="showmore">
                <p class="itemone" :class="(index==current_index?'active':'')" v-for="(item,index) in categoryList" :key="item.cateId" v-if="categoryList.length && index>13" @click="getnewslist(index)">{{item.tagDesc}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="headercont" v-else>
          <img src="../../assets/menu.png" alt=""  class="btn" @click="showDownMenu=!showDownMenu">微淘米文章
        </div>
        <div class="mcateGory border-top" v-if="dev=='mobile'">
          <ul class="listwrap">
            <li v-for="(item,index) in categoryList" :key="item.cateId" v-if="categoryList.length" class="listitem" :class="(index==current_index?'active':'')" @click="getnewslist(index)">
              {{item.tagDesc}}
            </li>
          </ul>
        </div>
        <transition name="slide" >
          <div class="downMenu" v-if="showDownMenu">
            <div class="downMenuWrap">
              <p @click="showDownMenu=!showDownMenu"><a href="//www.weitaomi.com" target="_blank">微淘米首页</a></p>
              <p @click="showDownMenu=!showDownMenu"><a href="/topic.html" target="_blank">帖子</a></p>
            </div>
          </div>
        </transition>
    </div>
    <div class="content">
      <div class="newslistWrap">
        <ul v-if="newsList.length" class="newsList">
          <template v-for="(item,index) in newsList" >
            <li v-if="item.tag2.includes('img')" class="img border-bottom">
              <p class="title" @click="openDetail(index)">{{item.title}}</p>
              <div class="imgwrap" @click="openDetail(index)">
                <div class="imgitem" v-for="item1 in item.image_list"><img v-lazy="item1" alt="" ></div>
              </div>
              <p class="detail"><span class="originMark" v-if="item.newsType==1">原创</span><span class="time">{{item.html_time | dateForm}}</span></p>
            </li>
            <li v-else-if="item.tag2.includes('video')" class="video border-bottom">
              <p class="imgwrap" @click="openDetail(index)">
                <img src="//cdn.weitaomi.cn/wap/index/videoMark1545187751810.jpg" alt="" class="videoMark">
                <img v-if="item.image_url.includes('videonews.weitaomi.cn')" v-lazy="item.image_url+'?x-oss-process=image/crop,w_146,h_105,g_center'" alt="" class="coverUrl">
                <img v-if="item.image_url.includes('cdn.weitaomi.cn')" v-lazy="item.image_url+'/both/200x140/gifto/true'" alt="">
              </p>
              <div class="title">
                <p @click="openDetail(index)">{{item.title}}</p>
                <p class="detail"><span class="originMark" v-if="item.newsType==1">原创</span><span class="time">{{item.html_time | dateForm}}</span></p>
              </div>
            </li>
            <li v-else class="pic border-bottom" >
              <p class="imgwrap" @click="openDetail(index)"><img v-lazy="item.image_url" alt=""></p>
              <div class="title">
                <p @click="openDetail(index)">{{item.title}}</p>
                <p class="detail"><span class="originMark" v-if="item.newsType==1">原创</span><span class="time">{{item.html_time | dateForm}}</span></p>
              </div>
            </li>
          </template>
        </ul>
        <div v-else style="margin-top:20%;text-align: center;">
          此分类还没有发布文章呢!
        </div>
        <div class="clickbtn" v-if="getMoreBtn" @click="getMoreNewslist">查看更多新闻</div>
      </div>
      <div class="square" v-show="dev=='pc'">
        <p class="title"><span>扫描二维码</span>  <span>参与更多互动</span> </p>
        <div class="qrcodewrap">
          <p id="qrcode" class="qrcode"></p>
          <img src="../../assets/bg_qr_article.png" alt="" class="qrlogo">
        </div>
      </div>
    </div>
    <div class="footer" v-if="dev=='pc'">
      <div class="line">
        <p>青岛微淘米信息技术有限公司</p>
        <p>官方网站：<a href="http://www.weitaomi.com" target="_blank">www.weitaomi.com</a></p>
      </div>
      <div class="line">
        <p>公司地址：山东省青岛市城阳区广博路腾讯众创空间二楼</p>
        <p>联系方式：400-606-3040</p>
      </div>
    </div>
    <div class="mfooter" v-else>
      <img class="logo" src="../../assets/mlogo.png" alt="">
      <span class="desc">点击下载APP  参与更多互动</span>
      <img class="open" src="../../assets/mopen.png" alt="" @click="openPage()">
    </div>
  </div>
</template>
<script>
import {dateForm} from '../../../src/assets/js/common.js'
export default {
  name: 'app',
  data(){
    return {
      showDownMenu:false,
      dev:this.$dev,
      categoryList:[],
      showmore:false,
      sendData:{
        pageSize:20
      },
      newsList:[],
      current_index:"0",
      getMoreBtn:false,
      aspectRatio: (200/140),
      screenWidth: document.body.clientWidth
    }
  },
  created(){
    if(this.getUrlStr("cateGoryIndex")){
      this.current_index=String(this.getUrlStr("cateGoryIndex"))
    }else{
      this.current_index=0
    }
    this.getCategory()
  },
  mounted(){
    var that = this;
    window.onresize = () => {
      return (() => {
        that.screenWidth = document.body.clientWidth
    })()
    };
    window.onscroll = ()=> {
      return(()=>{
        var a = document.documentElement.scrollTop || document.body.scrollTop;//滚动条y轴上的距离
        var b = document.documentElement.clientHeight || document.body.clientHeight;//可视区域的高度
        var c = document.documentElement.scrollHeight || document.body.scrollHeight;//可视化的高度与溢出的距离（总高度）
        if(a + b == c && that.dev=='mobile'){
          console.log('已滚动到底部!')
          that.getMoreNewslist()
        }
      })()
    }
    this.makeQrcode()
  },
  active(){
    console.log("active")
  },
  watch:{
    categoryList(val){
      this.getnewslist(this.current_index)
    },
    screenWidth (val) {
      if(val>=750){
        //pc
        this.dev='pc'
      }else if(val>=414){
        //ipad
        this.dev='mobile'
      }else {
        //iphone
        this.dev='mobile'
      }
      this.screenWidth = val
    }
  },
  methods:{
    reloadhtml(){
      window.location.reload()
    },
    openPage(){
      window.open("https://www.weitaomi.com","blank")
    },
    getUrlStr(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if(r != null) return unescape(r[2]);
      return null;
    },
    makeQrcode(){
      var qrcode = new QRCode(document.getElementById("qrcode"), {
        width : 194,
        height : 194,
        typeNumber:-1,
        correctLevel:3
      });
      qrcode.makeCode("https://www.weitaomi.com/");
    },
    getCategory(){
      var self=this;
      this.$axios({
        method:"get",
        url:'/pc/news/ordinary/getNewsCategory'}).then(function(res){
        console.log(res)
        self.categoryList=res.data.data.map(function(item){
          if(item.isOnline==1){
            return item
          }else{
            return false
          }
        });

      }).catch(function(err){
        console.log(err)
      })
    },
    getnewslist(index){
      var self=this;
      this.current_index=String(index);
      this.sendData.category=self.categoryList[Number(index)].category
      this.sendData.tag=self.categoryList[Number(index)].tag;
      this.sendData.searchOrder=0
      this.sendData.isOnline=1
      this.$axios({
        method:'post',
        url:'/pc/news/ordinary/getCategoryNewsDtoList',
        data:self.sendData}).then(function(res){
        console.log(res)
        if(res.data.data.newsList){
          self.newsList=res.data.data.newsList
          if(res.data.data.newsList.length >= self.sendData.pageSize){
            self.getMoreBtn=true
          }else{
            self.getMoreBtn=false
          }
        }else{
          self.newsList=[]
          self.getMoreBtn=false
        }
      }).catch(function(err){
        console.log(err)
      })
    },
    getMoreNewslist(){
      var self=this;
      var html_time=this.newsList[this.newsList.length-1].html_time
      this.sendData.category=this.categoryList[this.current_index].category
      this.sendData.tag=this.categoryList[this.current_index].tag;
      this.sendData.searchOrder=2
      this.sendData.isOnline=1
      this.sendData.freshTime=html_time
      console.log(this.sendData)
      this.$axios({
        method:'post',
        url:'/pc/news/ordinary/getCategoryNewsDtoList',
        data:this.sendData}).then(function(res){
        if(res.data.data.newsList){
          var newsList=res.data.data.newsList.map(function(item){
            if(item.tag2 && item.tag2.includes('video')){
              var imgObj = new Image();
              imgObj.src = item.image_url;
              if(imgObj.width/imgObj.height<self.aspectRatio){
                item.isHeightImg=true
              }else{
                item.isHeightImg=false
              }
            }
            return item
          })
          self.newsList=self.newsList.concat(newsList)
          if(res.data.data.newsList.length >= self.sendData.pageSize){
            self.getMoreBtn=true
          }else{
            self.getMoreBtn=false
          }
        }else{
          self.getMoreBtn=false
        }
      }).catch(function(err){
        console.log(err)
      })
    },
    getmore(){
      this.showmore=true
    },
    hidemore(){
      this.showmore=false
    },
    openDetail(index){
      console.log(this.newsList[index])
      window.open("/articleDetail.html?group_id="+this.newsList[index].group_id+"&cateGoryIndex="+this.current_index+"&title="+encodeURIComponent(encodeURIComponent(this.newsList[index].title.substring(0,10))))
    }
  },
  filters:{
    dateForm
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../assets/css/reset.css'
  @import '../../assets/css/border.css'
  .qrcode>>> img
    margin 0 auto
  .slide-enter-active, .slide-leave-active
    transition all 0.4s
  .slide-enter, .slide-leave-to
    transform translate3D( 0,-100%,0)
  #app
    width 100%
    background #f5f5f5
    height 100%
    .header
      width 100%
      background #fff
      border-bottom 1px solid #e9e9e9
      position fixed
      top 0
      left 0
      z-index 2
      .logocont
        width 0
        height 0
        overflow hidden
  .pc
    .cont
      max-width 1200px
      min-width 750px
      width 98%
      margin 0 auto
      padding-top 14px
      .logo
        height 0.29rem
        background url(/static/logoarticle.jpg) left top no-repeat
        background-size auto 100%
        .logomark
          width 200px
          height 0.29rem
          cursor pointer
          float left
        .homebtn
          color #474747
          font-size 0.106rem
          float right
          margin-right 0.2rem
          padding-left .206rem
          margin-top .092rem
          background url(../../assets/btn_homepage.jpg) left top no-repeat
          background-size auto 100%
        .modulebtn
          color #474747
          font-size 0.106rem
          float right
          margin-top .092rem
          padding-left .206rem
          background url(../../assets/btn_article.jpg) left top no-repeat
          background-size auto 100%
      .item
        margin-top 9px
        font-size 0.12rem
        color #919191
        display flex
        position relative
        .itemone
          text-align center
          flex 1
          white-space nowrap
          cursor pointer
          float left
          position relative
          z-index 1
          bottom -1px
          padding 10px .1rem
          box-sizing border-box
          border-bottom 2px solid transparent
          &.more
            padding-right 0
            text-align right
          &.active
            color #58bd54
            border-bottom 2px solid #58bd54
          &:hover
           color #58bd54
           border-bottom 2px solid #58bd54
          .showmore
            padding .1rem
            border 2px solid #f0f0f0
            color #919191
            position absolute
            top 100%
            right 0
            width 220%
            background #fff
            box-sizing border-box
            .itemone
              float left
              max-width 50%
              text-align center
    .content
      display flex
      max-width 1200px
      min-width 750px
      min-height 77%
      width 98%
      margin 9px auto 0
      padding-top 0.80rem
      .square
        width 27.17%
        text-align center
        height auto
        &:after
          content ""
          display block
          width 100%
          height .33rem
          background #fff
        .title
          color #474747
          font-size .12rem
          background #fff
          padding 0.356rem 0.296rem 0.178rem
          font-family "Microsoft YaHei,WenQuanYi Micro Hei,PingFang SC,Hiragino Sans GB,Helvetica Neue,Arial,sans-serif"
        .qrcodewrap
          background #fff
          position relative
          .qrlogo
            position absolute
            left 50%
            top 50%
            transform translate(-50%,-50%)
            width 44px
            height 44px
            padding 2px
            background #fff
            border-radius 5px
          .qrcode
            img
              margin 0 auto
      .newslistWrap
        flex 1
        font-size 0.14rem
        margin-right 9px
        .clickbtn
          font-size 16px
          background #fff
          margin-top 11px
          padding 22px 0
          text-align center
          cursor pointer
        .newsList
          padding-right 102px
          padding-left 20px
          background #fff
          li
            padding 18.5px 0 20px
            &:hover .title
              color #406599
              cursor pointer
          .img
            .imgwrap
              width 100%
              display flex
              .imgitem
                width 150px
                height 105px
                margin-right 1.5%
                overflow hidden
              img
                width 100%
                height 100%
                &:hover
                  transform: scale(1.1)
            .detail
              margin-top 12px
              line-height 1
              .originMark
                color #ffa735
                font-size 12px
                padding 0px 5px
                border 1px solid #ffa735
                border-radius 12px
                line-height 1
                margin-right 5px
              .time
                color #919191
                font-size 13px
            .title
              margin-bottom 18.5px
              overflow hidden
              text-overflow ellipsis
              display -webkit-box
              -webkit-line-clamp 2
              /* autoprefixer: off */
              -webkit-box-orient vertical
              /* autoprefixer: on */
          .video
              display flex
              .imgwrap
                width 146px
                height 105px
                overflow hidden
                margin-right 1.5%
                text-align center
                position relative
                .videoMark
                  position absolute
                  top 50%
                  left 50%
                  width 30%
                  transform translate(-50%,-50%)
                  z-index 1
                .coverUrl
                  width 100%
                  height 100%
                  &:hover
                    transform: scale(1.1)
              .title
                .detail
                  margin-top 12px
                  line-height 1
                  .originMark
                    color #ffa735
                    font-size 12px
                    padding 0px 5px
                    border 1px solid #ffa735
                    border-radius 12px
                    line-height 1
                    margin-right 5px
                  .time
                    color #919191
                    font-size 13px
          .pic
            display flex
            .imgwrap
              width 146px
              height 105px
              overflow hidden
              img
                width 100%
                height 100%
                &:hover
                  transform: scale(1.1)
            .title
              flex 1
              margin-left 20px
              p:first-of-type
                padding-top 9px
                overflow hidden
                text-overflow ellipsis
                display -webkit-box
                -webkit-line-clamp 2
                /* autoprefixer: off */
                -webkit-box-orient vertical
                /* autoprefixer: on */
              .detail
                margin-top 12px
                line-height 1
                .originMark
                  color #ffa735
                  font-size 12px
                  padding 0px 5px
                  border 1px solid #ffa735
                  border-radius 12px
                  line-height 1
                  margin-right 5px
                .time
                  color #919191
                  font-size 13px
    .footer
      display flex
      padding 14px 32%
      background #fff
      margin-top 9px
      width 100%
      box-sizing border-box
      .line
        flex 1
        font-size 0.093rem
        color #8f8f8f
        p
          margin 4.5px 0
          white-space nowrap
          a
            color #8f8f8f
.mobile
  padding-top 0.8rem
  box-sizing border-box
  .downMenu
    position fixed
    top 0.8rem
    left 0
    width 100%
    height 100%
    background #fff
    font-size 0.23rem
    z-index 1
    .downMenuWrap
      margin-top 45%
      p
        padding 0.4rem 0
        text-align center
        font-size 0.25rem
  .mcateGory
    width 100%
    font-size 0.29rem
    line-height 0.8rem
    padding-top 0.8rem
    .listwrap
      width 100%
      overflow-x scroll
      white-space nowrap
      .listitem
        display inline-block
        vertical-align middle
        padding 0 0.23rem
        &.active
          color #58bd54
  .headercont
    width 100%
    height 0.8rem
    position absolute
    font-size 0.29rem
    text-align center
    line-height 0.8rem
    background #fff
    z-index 3
  .btn
    height 100%
    position absolute
    left 0.23rem
    top 0
    z-index 2
  .mfooter
    font-size 0.23rem
    position fixed
    height 0.8rem
    bottom -1px
    left 0
    background #fff
    width 100%
    padding 0 0.23rem
    box-sizing border-box
    -webkit-box-shadow: 0 -0.02667rem 0.18667rem rgba(0,0,0,.1)
    box-shadow: 0 -0.02667rem 0.18667rem rgba(0,0,0,.1)
    z-index 2
    .desc
      display inline-block
      line-height 0.8rem
    img
      height 100%
      vertical-align middle
    .open
      float right
  .content
    width 100%
    padding-top 0.8rem
    margin 0 auto
    background #fff
    padding-bottom 0.8rem
    .newslistWrap
      flex 1
      font-size 0.29rem
      margin-right 9px
      .newsList
        li
          padding 0.299rem 0.23rem 
        .img
          .imgwrap
            width 100%
            display flex
            .imgitem
              width 32.33%
              margin-right 1.5%
              &:last-of-type
                margin-right 0
              img
                width 100%
          .detail
            .originMark
              color #ffa735
              font-size 12px
              padding 0px 5px
              border 1px solid #ffa735
              border-radius 12px
              line-height 1
              margin-right 5px
            .time
              color #919191
              font-size 0.1877rem
          .title
            margin-bottom 9px
            overflow hidden
            text-overflow ellipsis
            display -webkit-box
            -webkit-line-clamp 2
            /* autoprefixer: off */
            -webkit-box-orient vertical
            /* autoprefixer: on */
        .video
          display flex
          .imgwrap
            width 32.33%
            overflow hidden
            margin-right 1.5%
            position relative
          .videoMark
            position absolute
            top 50%
            left 50%
            width 30%
            transform translate(-50%,-50%)
            z-index 1
          .coverUrl
            width 100%
            height 100%
          .title
            flex  1
            overflow hidden
            text-overflow ellipsis
            display -webkit-box
            -webkit-line-clamp 2
            /* autoprefixer: off */
            -webkit-box-orient vertical
              /* autoprefixer: on */
          .detail
            margin-top 7px
            line-height 1
            .originMark
              color #ffa735
              font-size 12px
              padding 0px 5px
              border 1px solid #ffa735
              border-radius 12px
              line-height 1
              margin-right 5px
            .time
              color #919191
              font-size 0.1877rem
        .pic
          display flex
          .imgwrap
            width 32.33%
            overflow hidden
            margin-right 1.5%
            img
              width 100%
          .title
            flex 1
            p:first-of-type
              overflow hidden
              text-overflow ellipsis
              display -webkit-box
              -webkit-line-clamp 2
              /* autoprefixer: off */
              -webkit-box-orient vertical
              /* autoprefixer: on */
          .detail
            margin-top 7px
            line-height 1
            .originMark
              color #ffa735
              font-size 12px
              padding 0px 5px
              border 1px solid #ffa735
              border-radius 12px
              line-height 1
              margin-right 5px
            .time
              color #919191
              font-size 0.1877rem
</style>

