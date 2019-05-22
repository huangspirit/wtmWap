<template>
  <div id="app" :class="dev">
    <div class="header">
        <h1 class="logocont">微淘米</h1>
        <div class="cont" v-if="dev=='pc'">
          <div class="logo">
            <div class="logomark" @click="reloadhtml"></div>
            <a class="modulebtn" href="/index">文章</a>
            <a class="homebtn" href="//www.weitaomi.com" target="_blank">微淘米首页</a>
          </div>
          <div class="item clearfix">
            <div class="itemone" :class="(index==current_index?'active':'')" v-for="(item,index) in categoryList" :key="item.cateId" v-if="categoryList.length && index<14" @click="gettopiclist(index)">{{item.topicCateName}}</div>
            <div class="itemone more" v-if="categoryList.length > 14" @mouseenter="getmore"  @mouseleave="hidemore">
              <span>更多</span>
              <div ref="showmore " v-show="showmore" class="showmore">
                <p class="itemone" :class="(index==current_index?'active':'')" v-for="(item,index) in categoryList" :key="item.cateId" v-if="categoryList.length && index>13" @click="gettopiclist(index)">{{item.tagDesc}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="headercont" v-else>
          <img src="../../assets/menu.png" alt=""  class="btn" @click="showDownMenu=!showDownMenu">微淘米帖子
        </div>
        <div class="mcateGory border-top" v-if="dev=='mobile'">
          <ul class="listwrap">
            <li v-for="(item,index) in categoryList" :key="item.cateId" v-if="categoryList.length" class="listitem" :class="(index==current_index?'active':'')" @click="gettopiclist(index)">
              {{item.topicCateName}}
            </li>
          </ul>
        </div>
        <transition name="slide" >
          <div class="downMenu" v-if="showDownMenu">
            <div class="downMenuWrap">
              <p @click="showDownMenu=!showDownMenu"><a href="//www.weitaomi.com" target="_blank">微淘米首页</a></p>
              <p @click="showDownMenu=!showDownMenu"><a href="/index" target="_blank">文章</a></p>
            </div>
          </div>
        </transition>
    </div>
    <div class="content" ref="scrollWrap">
      <div class="topiclistwrap">
        <ul v-if="topicList.length" class="topicList">
          <template v-for="(item,index) in topicList" >
            <li class="topicListItem border-bottom" @click="openDetail(index)">
              <span v-if="item.topicType==2" class="superTopic"><img src="../../assets/you.png" alt=""></span>
              <div class="topicContent">
                <div class="titleWrap">
                  <div class="imgWrap"><img v-lazy="item.memberInformation.imageUrl" alt=""></div>
                  <div class="memdetail">
                    <p class="memberName">{{item.memberInformation.memberName}}</p>
                    <p class="address">{{item.memberInformation.memberAddress}}&nbsp; {{item.createTime | dateForm}}</p>
                  </div>
                </div>
                <div class="title">{{item.topicTitle}}</div>
                <div class="imgwrap">
                  <template v-if="item.mediaType=='pic'" v-for="item1 in item.mediaMixed">
                    <div v-if="(isHeightImg(item1.length,item1.width,item.mediaMixed.length))=='heightImg'" class="itemImg heightImg" @click="previewImg(index)" :class="(item1.fileName.includes('gif') || item1.fileName.includes('GIF'))?'gifMark':''"><img v-lazy="item.picPrefix+'/'+item1.fileName+'!/both/205x275/gifto/true'" alt=""></div>
                    <div v-else-if="(isHeightImg(item1.length,item1.width,item.mediaMixed.length))=='widthImg' && item.mediaMixed.length!=1" class="itemImg widthImg" :class="[(item1.fileName.includes('gif') || item1.fileName.includes('GIF'))?'gifMark':'','imgNum'+item.mediaMixed.length]" @click="previewImg(index)"><img v-lazy="item.picPrefix+'/'+item1.fileName+'!/both/116x116/gifto/true'" alt=""></div>
                    <div v-else-if="(isHeightImg(item1.length,item1.width,item.mediaMixed.length))=='widthImg' && item.mediaMixed.length==1" class="itemImg widthImg" :class="[(item1.fileName.includes('gif') || item1.fileName.includes('GIF'))?'gifMark':'','imgNum'+item.mediaMixed.length]" @click="previewImg(index)"><img v-lazy="item.picPrefix+'/'+item1.fileName+'!/both/380x210/gifto/true'" alt=""></div>
                  </template>
                  <template v-else-if="item.mediaType=='video'">
                    <div class="videoWrap heightVideo"  v-if="(isHeightImg(item.mediaMixed[0].length,item.mediaMixed[0].width,item.mediaMixed.length))=='heightImg'">
                      <img src="../../assets/openvideo.png" alt="" @click="getVideoUrl(index,$event)" class="openvideo">
                      <video src="" :poster="item.coverUrl" class="video1" preload="true" autoplay="true" x5-playsinline="true" webkit-playsinline="true" playsinline="true" width="100%" height="100%"></video>
                      <img :src="item.coverUrl" alt="" class="blur_bj">
                    </div>
                    <div class="videoWrap widthVideo"  v-else-if="(isHeightImg(item.mediaMixed[0].length,item.mediaMixed[0].width,item.mediaMixed.length))=='widthImg'">
                      <img src="../../assets/openvideo.png" alt="" @click.stop="getVideoUrl(index,$event)" class="openvideo">
                      <video src="" :poster="item.coverUrl" class="video1" preload="true" autoplay="true" webkit-playsinline="true" playsinline="true" width="100%" height="100%"  x-webkit-airplay="true"></video>
                      <img :src="item.coverUrl" alt="" class="blur_bj">
                    </div>
                  </template>
                </div>
                <div v-if="item.amaze" class="superComment">
                    <span class="mark">神评</span><span v-show="dev=='mobile'">:</span>
                    <h6>{{item.amaze}}</h6>
                    <div class="commentImgWrap" v-show="false">
                        <div v-for="" class="imgItem"><img src="" alt=""></div>
                    </div>
                </div>
              </div>
            </li>
          </template>
        </ul>
        <div class="clickbtn" v-if="(getMoreBtn && dev=='pc')" @click="getMoreTopiclist">查看更多帖子</div>
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
        <p>青岛微淘米信息技术有限公司 </p>
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
    <preview-img :imgList="imgList" v-if="showPreviewImg && dev=='pc'" @closePreview="showPreviewImg=!showPreviewImg"></preview-img>
  </div>
</template>
<script>
import PreviewImg from './previewImg'
import {dateForm} from '../../../src/assets/js/common.js'
export default {
  name: 'app',
  data(){
    return {
      showDownMenu:false,
      categoryList:[
        {id:0, topicCateName:"最新"},
        {id:-1, topicCateName:"优帖"},
        {id:-2, topicCateName:"推荐"},
      ],
      showmore:false,
      sendData:{
        pageSize:10,
      },
      topicList:[],
      current_index:"0",
      getMoreBtn:false,
      aspectRatio:(200/140),
      heightImg:(270/205),
      showPreviewImg:false,
      imgList:[],
      dev:this.$dev,
      screenWidth: document.body.clientWidth
    }
  },
  created(){
    this.gettopiclist(this.current_index)
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
               // var b = document.documentElement.clientHeight || document.body.clientHeight;//可视区域的高度
                var b = window.screen.height //屏幕高度
                var c = document.documentElement.scrollHeight || document.body.scrollHeight;//可视化的高度与溢出的距离（总高度）
                if(a + b>= c  && that.dev=='mobile'){
                                      console.log('已滚动到底部!')
                                      that.getMoreTopiclist()
                }
          })()
    }
    this.makeQrcode()
  },
  watch:{
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
  components:{
    PreviewImg
  },
  methods:{
    reloadhtml(){
      window.location.reload()
    },
    openPage(){
      window.open("https://www.weitaomi.com","blank")
    },
    previewImg(index){
     this.imgList=this.topicList[index].mediaMixed.map((item)=>{
                return this.topicList[index].picPrefix+"/"+item.fileName
              })
      if(this.imgList.length){
        this.showPreviewImg=true
      }
    },
    getVideoUrl(index,event){
      var self=this;
      if(this.dev=="pc"){
        this.$axios({
          method:"get",
          url:'/common/videoData/ordinary/getVideoPlayUrlWithToken?videoUrl='+self.topicList[index].mediaMixed[0].videoUrl+"&source=topic"}).
        then(function(res){
          console.log(res.data.data)
          var videoEle=document.getElementsByTagName("video")
          console.log(videoEle)
          for(var i=0;i<videoEle.length;i++){
            videoEle[i].pause()
          }
          event.target.style.display='none'
          event.target.nextElementSibling.setAttribute("src",res.data.data)
          event.target.nextElementSibling.setAttribute("controls",true)
          event.target.nextElementSibling.setAttribute("poster",self.topicList[index].coverUrl)
          event.target.nextElementSibling.play()
        }).catch(function(err){
          console.log(err)
        })
      }else if(this.dev=="mobile"){
        window.open("/topicdetail.html?uuid="+this.topicList[index].uuid+"&topicTitle="+encodeURIComponent(this.topicList[index].topicTitle.substring(0,10)))
      }
    },
    isHeightImg(height,width,length){
      if((height/width)>=this.heightImg ){
        if(length==1){
          return 'heightImg'
        }else{
          return 'heightImg widthImg'
        }
      }else{
        return 'widthImg'
      }
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
        url:'/pc/topicCategory/ordinary/getTopicCategory?cateStatus=1'}).then(function(res){
        console.log(res)
        self.categoryList=self.categoryList.concat(res.data.data);
      }).catch(function(err){
        console.log(err)
      })
    },
    gettopiclist(index){
      this.current_index=String(index)
      var self=this;
      this.sendData.categoryId=this.categoryList[index].id
      this.sendData.isFresh=false
      this.sendData.pageIndex=1
      var data0=self.$qs.stringify(self.sendData)
      this.$axios({
        method:'get',
        url:'/pc/topicGroup/ordinary/getIndexTopicGroup?'+data0,
       }).then(function(res){
        console.log(res)
        if(res.data.data.topicList && res.data.data.topicList){
          res.data.data.topicList.map(function(item){
            if(item.mediaMixed){
              item.mediaMixed=JSON.parse(item.mediaMixed)
            }
          })
          self.topicList=res.data.data.topicList
          if(res.data.data.topicList.length >= self.sendData.pageSize){
            self.getMoreBtn=true;
            self.sendData.pageIndex++;
          }else{
            self.getMoreBtn=false
          }
        }else{
          self.topicList=[]
          self.getMoreBtn=false
        }
        document.documentElement.scrollTo(0,0)
      }).catch(function(err){
        console.log(err)
      })
    },
    getMoreTopiclist(){
      var self=this;
      var data0=self.$qs.stringify(self.sendData)
      this.$axios({
        method:'get',
        url:'/pc/topicGroup/ordinary/getIndexTopicGroup?'+data0,
      }).then(function(res){
        console.log(res)
        if(res.data.data.topicList){
          res.data.data.topicList.map(function(item){
            if(item.mediaMixed){
              item.mediaMixed=JSON.parse(item.mediaMixed)
            }
          })
          self.topicList=self.topicList.concat(res.data.data.topicList)
          if(res.data.data.topicList.length >= self.sendData.pageSize){
            self.getMoreBtn=true;
            self.sendData.pageIndex++;
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
      console.log(this.dev)
      if(this.dev=="mobile"){
        window.open("/topicdetail.html?uuid="+this.topicList[index].uuid+"&topicTitle="+encodeURIComponent(this.topicList[index].topicTitle.substring(0,10)))
      }
    }
  },
  filters:{
    dateForm,
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
  .bg
    width 100%
    height 100%
    background #fff
    position fixed
    z-index 3
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
      z-index 4
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
        background url(../../assets/bg_topic.png) left top no-repeat
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
        font-size 18px
        color #919191
        display flex
        position relative
        .itemone
          max-width 8%
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
      width 98%
      max-width 1200px
      min-width 750px
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
          padding 60px 50px 30px
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
      .topiclistwrap
        flex 1
        font-size 0.14rem
        margin-right 9px
        .clickbtn
          font-size 16px
          background #fff
          margin-top 11px
          padding 9px 0
          text-align center
          cursor pointer
        .topicList
          padding-right 11%
          background #fff
          .topicListItem
            padding 27px 0px 17px 20px
            position relative
            display flex
            .superTopic
              position absolute
              top 0
              left 0
              width 0.15rem
              img
                width 100%
                display block
            .imgWrap
              width 45px
              height 45px
              border-radius 50%
              overflow hidden
              margin-right 15px
              position relative
              img
                height 100%
                width 100%
              &:after
                content ""
                display block
                height 100%
                width 100%
                background rgba(0,0,0,0.05)
                position absolute
                z-index 1
                top 0
                left 0
            .topicContent
              flex 1
              .title
                margin 0 0 15px 60px
                font-size 14px
              .imgwrap
                margin-left 60px
                width 63%
                .heightImg
                  width 1.367rem
                  position relative
                  img
                    width 100%
                  &.gifMark:after
                    content ""
                    position absolute
                    top 0
                    left 0
                    width 100%
                    height 100%
                    background url(../../assets/gifMarkHeight.png) 0 0 no-repeat
                    background-size 100% 100%
                    z-index 1
                .widthImg
                  width 33.3%
                  float left
                  padding-right 10px
                  padding-bottom 10px
                  box-sizing border-box
                  position relative
                  img
                    border 1px solid #dcdcdc
                    width 100%
                    box-sizing border-box
                  &.imgNum1
                    width 100%
                  &.imgNum4
                    width 33.4%
                  &.gifMark:after
                    content ""
                    position absolute
                    top 0
                    left 0
                    width 100%
                    height 100%
                    background url(../../assets/gif.png) center center no-repeat
                    background-size  auto 100%
                    z-index 1
                .videoWrap
                  position relative
                  overflow hidden
                  &.heightVideo
                    width 208px
                    height 275px
                    .openvideo
                      width 21.5%
                  &.widthVideo
                    width 100%
                    height 210px
                  .blur_bj
                    position absolute
                    height 100%
                    width 100%
                    top 0
                    left 0
                    z-index 0
                    -webkit-filter blur(35px)
                    filter blur(35px)
                    -moz-filter blur(35px)
                    -ms-filter  blur(35px)
                    -o-filter  blur(35px)
                    -webkit-transform scale(1.2)
                    -moz-transform scale(1.2)
                    -ms-transform scale(1.2)
                    -o-transform scale(1.2)
                    transform scale(1.2)
                  .openvideo
                    position absolute
                    top 50%
                    left 50%
                    transform translate(-50%,-50%)
                    z-index 2
                    width 11.5%
                  .video1
                    width 100%
                    height 100%
                    position relative
                    z-index 1
            .titleWrap
              display flex
              margin-top 0.05rem
              .memberName
                font-size 14px
                color #727272
              .address
                font-size 12px
                color #b8b8b8
            .superComment
              background #f5f5f5
              border-radius 4px
              padding 2px 8px 8px
              margin-left 60px
              color #303030
              .mark
                background #ff76a0
                color #fff
                font-size 12px
                line-height 0
                padding 0px 6px
                border-radius 14px
              h6
                font-size 14px
                font-weight normal
                line-height 1.7
              .commentImgWrap
                width 2rem
                .imgItem
                  width 33.3%
                  padding-right 8px
                  padding-bottom 8px
                  box-sizing border-box
                  float left
    .footer
      display flex
      padding 14px 32%
      background #fff
      margin-top 9px
      width 100%
      box-sizing border-box
      z-index 2
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
      bottom 0
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
      .topiclistwrap
        margin 0
        padding-bottom 0.8rem
        .clickbtn
          font-size 0.23rem
        .topicList
          padding 0
          background #f5f5f5
          .topicListItem
            margin-bottom 10px
            background #fff
            padding 0.23rem
            .superTopic
              position absolute
              top 0
              left 0
              width 0.3rem
              img
                width 100%
                display block
            .topicContent
              .titleWrap
                display flex
                .imgWrap
                  width 0.556rem
                  height 0.556rem
                  border-radius 50%
                  overflow hidden
                  margin-right 0.128rem
                  img
                    height 100%
                    width 100%
                    display block
                .memdetail
                  .memberName
                    font-size 0.2048rem
                    line-height 1.7
                    color #727272
                  .address
                    font-size 0.1707rem
                    color #b8b8b8
              .superComment
                font-size 0.222rem
                background #f5f5f5
                padding 0.1rem 0.2rem
                border-radius 5px
                h6
                  display inline-block
                  font-weight normal
                  font-size 0.222rem
              .title
                margin 0.1707rem 0
                font-size 0.256rem
              .imgwrap
                width 100%
                overflow hidden
                .heightImg
                  width 2.389rem
                  position relative
                  img
                    width 100%
                  &.gifMark:after
                    content ""
                    position absolute
                    top 0
                    left 0
                    width 100%
                    height 100%
                    background url(../../assets/gifMarkHeight.png) 0 0 no-repeat
                    background-size 100% 100%
                    z-index 1
                .widthImg
                  width 33.3%
                  float left
                  padding-right 10px
                  padding-bottom 10px
                  box-sizing border-box
                  position relative
                  img
                    border 1px solid #dcdcdc
                    width 100%
                    box-sizing border-box
                  &.imgNum1
                    width 100%
                    padding-right 0
                    padding-bottom 0

                  &.imgNum4
                    width 33.4%
                  &.gifMark:after
                    content ""
                    position absolute
                    top 0
                    left 0
                    width 100%
                    height 100%
                    background url(../../assets/gif.png) center center no-repeat
                    background-size  auto 100%
                    z-index 1
                .videoWrap
                  position relative
                  overflow hidden
                  text-align center
                  &.heightVideo
                      overflow hidden
                      height 3.285rem
                      width 100%
                  &.widthVideo
                      width 100%
                      height 3.285rem
                  .blur_bj
                    position absolute
                    height 100%
                    width 100%
                    top 0
                    left 0
                    z-index 0
                    -webkit-filter blur(35px)
                    filter blur(35px)
                    -moz-filter blur(35px)
                    -ms-filter  blur(35px)
                    -o-filter  blur(35px)
                    -webkit-transform scale(1.2)
                    -moz-transform scale(1.2)
                    -ms-transform scale(1.2)
                    -o-transform scale(1.2)
                    transform scale(1.2)
                  .openvideo
                    position absolute
                    top 50%
                    left 50%
                    transform translate(-50%,-50%)
                    z-index 2
                    width 11.5%
                  .video1
                    position relative
                    z-index 1
                    vertical-align middle
                    display block
                    margin 0 auto
</style>
