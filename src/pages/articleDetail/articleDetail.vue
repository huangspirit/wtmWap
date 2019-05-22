<template>
    <div id="app" :class="dev">
        <div class="header">
            <h1 class="logocont">微淘米</h1>
            <div class="cont" v-if="dev=='pc'">
                <div class="logo">
                    <div class="logomark" @click="reloadhtml"></div>
                    <a class="modulebtn"  href="/topic.html" target="_blank">帖子</a>
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
        </div>
        <div class="headercontent" v-show="dev=='mobile'">
            <img class="logo" src="../../assets/toplogo.png" alt="">
            <span class="desc">点击下载APP  参与更多互动</span>
            <img class="open" src="../../assets/topopen.png" alt="" @click="openPage()">
        </div>
        <div class="content">
            <div class="wrap">
                <div class="newsItemWrap">
                    <div v-if="itemObj.videoId" class="video">
                        <div class="videoWrap">
                            <video :src="videoUrl" :poster="itemObj.image_url" controls="controls" preload="true"  x5-playsinline="true" webkit-playsinline='true' playsinline='true' width='100%' height='100%'></video>
                            <img :src="itemObj.image_url" alt="" class="blur_bj">
                        </div>
                        <div class="titleWrap">
                            <h2 class="title">{{itemObj.title}}</h2>
                            <div class="detail"><span class="originMark" v-if="itemObj.newsType==1">原创</span>   <span >{{itemObj.html_time | dateForm}}</span><span>  &nbsp; &nbsp;来源：{{itemObj.source}}</span></div>
                            <div class="desc">{{itemObj.videoDesc}}</div>
                        </div>
                    </div>
                    <div v-else class="pic">
                        <div class="titleWrap">
                            <h2 class="title">{{itemObj.title}}</h2>
                            <div class="detail"><span class="originMark" v-if="itemObj.newsType==1">原创</span>   <span>{{itemObj.source}} &nbsp;<span v-show="dev=='pc'">{{itemObj.html_time | dateForm}}</span>&nbsp; {{itemObj.author}}</span></div>
                        </div>
                        <div class="cont_html" v-html="itemObj.html"></div>
                    </div>
                </div>
                <div class="commentlist" v-if="commentList.length">
                    <div class="title" :class="(dev=='pc'? 'border-bottom':'')">评论</div>
                    <ul>
                        <template v-for="item in commentList">
                            <li class="commentone border-bottom" @click="openPage()">
                                <p class="info">
                                    <img v-lazy="item.memberInformation.imageUrl" alt="" class="imageUrl">
                                    <span class="detail">
                                        <span class="memberName">{{item.memberInformation.memberName}}</span>
                                        <span>{{item.memberInformation.memberAddress}}</span>
                                        <span>{{item.createTime | dateForm}}</span>
                                    </span>
                                </p>
                                <p class="comment">{{item.comment}}</p>
                            </li>
                        </template>
                    </ul>
                </div>
                <div class="relateRecommend" v-if="relateRecommend.length">
                    <div class="title " :class="(dev=='pc'? 'border-bottom':'')">相关推荐</div>
                    <ul>
                        <template v-for="item in relateRecommend">
                            <li class="relateListOne border-bottom" @click="openPage()">
                                <p class="imgWrap">
                                    <template v-if="item.image_url.includes('videonews.weitaomi.cn')">
                                        <img v-lazy="item.image_url+'?x-oss-process=image/crop,w_146,h_105,g_center'" alt="" class="img">
                                    </template>
                                    <img v-else v-lazy="item.image_url" alt="" class="img">
                                </p>
                                <div class="detail">
                                    <p class="title">{{item.title}}</p>
                                    <p class="time"><span class="originMark" v-if="item.newsType==1">原创</span><span>{{item.html_time | dateForm}}</span></p>
                                </div>
                            </li>
                        </template>
                    </ul>
                </div>
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
       <!-- <div class="mfooter" v-else>
            <img class="logo" src="../../assets/mlogo.png" alt="">
            <span class="desc">点击下载APP  参与更多互动</span>
            <img class="open" src="../../assets/mopen.png" alt="" @click="openPage()">
        </div>-->
    </div>
</template>
<script>
    import {dateForm} from '../../../src/assets/js/common.js'
    export default {
        name: 'app',
        data(){
            return {
                showDownMenu:false,
                categoryList:[],
                current_index:"0",
                showmore:false,
                aspectRatio:(200/140),
                group_id:'',
                itemObj:{},
                commentList:[],
                relateRecommend:[],
                videoUrl:"",
                dev:this.$dev,
                screenWidth: document.body.clientWidth
            }
        },
        created(){
            this.current_index=this.getUrlStr("cateGoryIndex")
            this.group_id=this.getUrlStr("group_id")
            this.getDetail()
            this.getCategory()
            this.getCommentList()
            this.getRelateRecommend()
        },
        mounted(){
            console.log("mounted")
            var that = this;
            window.onresize = () => {
                return (() => {
                    that.screenWidth = document.body.clientWidth
            })()
            };
            this.makeQrcode();
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
        methods:{
            reloadhtml(){
                window.open("http://www.weitaomi.cn")
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
            getnewslist(index){
                this.current_index=String(index)
                window.open("/index?cateGoryIndex="+this.current_index)
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
            getmore(){
                this.showmore=true
            },
            hidemore(){
                this.showmore=false
            },
            getDetail(){
                var self=this;
                this.$axios({
                    method:"get",
                    url:'/pc/news/ordinary/getNewsDetail?group_id='+this.group_id}).then(function(res){
                    console.log(res)
                    self.itemObj=res.data.data
                    if(self.itemObj.videoId){
                        self.getVideoUrl()
                    }
                }).catch(function(err){
                    console.log(err)
                })
            },
            getCommentList(){
                var self=this;
                var data={
                    itemId:this.group_id,
                    pageSize:4
                }
                this.$axios({
                    method:'post',
                    url:'/pc/comment/ordinary/getMemberComments',
                    data:data}).then(function(res){
                    console.log(res)
                    self.commentList=res.data.data
                }).catch(function(err){
                    console.log(err)
                })
            },
            getRelateRecommend(){
                var self=this;
                var data={
                    groupId:this.group_id,
                    count:4
                }
                this.$axios.get('/pc/news/ordinary/getRelatedNews',{
                    params:data}).then(function(res){
                    console.log(res)
                    self.relateRecommend=res.data.data
                }).catch(function(err){
                    console.log(err)
                })
            },
            getVideoUrl(){
                var self=this;
                console.log(this.dev)
                this.$axios({
                    method:"get",
                    url:'/common/videoData/ordinary/getVideoPlayUrlWithAuthKey?videoId='+this.itemObj.videoId}).then(function(res){
                    console.log(res)
                    self.videoUrl=res.data.data
                }).catch(function(err){
                    console.log(err)
                })
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
.mobile .newsItemWrap .cont_html>>>p
    font-size 0.273rem
.newsItemWrap .cont_html>>>p
    margin-bottom .2rem
    font-size .113rem
    word-wrap break-word
.newsItemWrap .cont_html>>>img
    margin-bottom .2rem
    width 100%
.newsItemWrap .cont_html>>>div
    margin-bottom .2rem
    font-size .113rem
    word-wrap break-word
    h1
        font-size .113rem
        margin-bottom .2rem
        word-wrap break-word
    img
        width 100%
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
#app.mobile
    background #fff
.pc
    .cont
        margin 0 auto
        padding-top 14px
        width 100%
        max-width 1200px
        min-width 750px
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
        width 98%
        margin 9px auto 0
        padding-top 0.80rem
        min-height 77%
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
        .wrap
            font-size 21px
            margin-right 9px
            flex 1
            .newsItemWrap
                padding 37px 60px
                background #fff
                .video
                    .videoWrap
                        height 425px
                        width 100%
                        position relative
                        overflow hidden
                        video
                            width 100%
                            height 100%
                            position relative
                            z-index 1
                        .blur_bj
                            position: absolute;
                            height: 100%;
                            width: 100%;
                            top: 0;
                            left:0;
                            z-index: 0;
                            -webkit-filter: blur(35px);
                            filter: blur(35px);
                            -moz-filter: blur(35px);
                            -ms-filter:  blur(35px);
                            -o-filter:  blur(35px);
                            -webkit-transform: scale(1.2);
                            -moz-transform: scale(1.2);
                            -ms-transform: scale(1.2);
                            -o-transform: scale(1.2);
                            transform: scale(1.2);
                    .titleWrap
                        margin-top 33px
                        .title
                            font-size .187rem
                            font-weight normal
                            line-height 1.4286
                        .detail
                            font-size .093rem
                            color #b8b8b8
                            line-height 1
                            margin 20px 0
                            .originMark
                                color #ffa735
                                font-size 12px
                                padding 0px 5px
                                border 1px solid #ffa735
                                border-radius 12px
                                line-height 1
                                margin-right 5px
                        .desc
                            font-size 0.12rem
                .pic
                    .titleWrap
                        text-align center
                        .title
                            font-size .187rem
                            font-weight normal
                            line-height 1.4286
                        .detail
                            font-size .093rem
                            color #b8b8b8
                            line-height 1
                            margin 20px 0
                            .originMark
                                color #ffa735
                                font-size 12px
                                padding 0px 5px
                                border 1px solid #ffa735
                                border-radius 12px
                                line-height 1
                                margin-right 5px
            .commentlist
                margin-top 20px
                background #fff
                padding 0 60px
                .title
                    font-size 21px
                    padding 17px 0
                ul
                    .commentone
                        padding 20px 0
                        .info
                            font-size 12px
                            color #b8b8b8
                            .memberName
                                font-size 0.093rem
                                color #626262
                            .imageUrl
                                width 0.22rem
                                height 0.22rem
                                border-radius 50%
                                margin-right 3px
                        .comment
                            font-size 0.093rem
                            margin-top 0.0667rem
            .relateRecommend
                margin-top 20px
                background #fff
                padding 0 60px
                .title
                    font-size 21px
                    padding 17px 0
                ul
                    .relateListOne
                        display flex
                        padding 20px 0
                        .imgWrap
                            width 0.9067rem
                            height 0.667rem
                            margin-right 2%
                            overflow hidden
                            img
                                width 100%
                                height 100%
                                &:hover
                                    transform scale(1.1)
                        .detail
                            flex 1
                            .title
                                padding 0
                                margin-top 9px
                                font-size 0.14rem
                                overflow hidden
                                text-overflow ellipsis
                                display -webkit-box
                                -webkit-line-clamp 2
                                -webkit-box-orient vertical
                                cursor pointer
                                &:hover
                                    color #406599
                            .time
                                color #919191
                                font-size 0.0867rem
                                margin-top 9px
                                .originMark
                                    color #ffa735
                                    font-size 12px
                                    padding 0px 5px
                                    border 1px solid #ffa735
                                    border-radius 12px
                                    line-height 1
                                    margin-right 5px
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
    .headercontent
        font-size 0.23rem
        height 0.8rem
        background #212121
        width 100%
        padding 0 0.23rem
        box-sizing border-box
        .desc
            display inline-block
            line-height 0.8rem
            color #fff
        img
            height 100%
            vertical-align middle
        .open
            float right
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
        box-szing border-box
        .wrap
            width 100%
            box-sizing border-box
            background #fff
            .newsItemWrap
                .pic
                    padding 0 0.23rem
                    .titleWrap
                        .title
                            font-size 0.341rem
                            margin 0.2rem 0
                        .detail
                            font-size 0.18773rem
                            color #b8b8b8
                            margin-bottom 0.2rem
                            .originMark
                                color #ffa735
                                font-size 12px
                                padding 0px 5px
                                border 1px solid #ffa735
                                border-radius 12px
                                line-height 1
                                margin-right 5px
                .video
                    .videoWrap
                        position relative
                        width 100%
                        height 4rem
                        overflow hidden
                        video
                            position relative
                            z-index 1
                        .blur_bj
                            position: absolute;
                            height: 100%;
                            width: 100%;
                            top: 0;
                            left:0;
                            z-index: 0;
                            -webkit-filter: blur(35px);
                            filter: blur(35px);
                            -moz-filter: blur(35px);
                            -ms-filter:  blur(35px);
                            -o-filter:  blur(35px);
                            -webkit-transform: scale(1.2);
                            -moz-transform: scale(1.2);
                            -ms-transform: scale(1.2);
                            -o-transform: scale(1.2);
                            transform: scale(1.2);
                    .titleWrap
                        color #303030
                        .title
                            font-size 0.3243rem
                            margin 0.256rem 0
                        .detail
                            font-size 0.1877rem
                            color #b8b8b8
                            margin-bottom 0.256rem
                        .desc
                            font-size 0.2731rem
            .commentlist
                border-bottom 10px solid #f5f5f5
                margin-top 0.46rem
                .title
                    font-size 0.239rem
                    text-align center
                    color #b8b8b8
                    margin-bottom .23rem
                .commentone
                    padding 0.23rem
                    .info
                        display flex
                        width 100%
                        .imageUrl
                            width 0.6rem
                            height 0.6rem
                            border-radius 50%
                        .detail
                            display block
                            flex 1
                            font-size 0.1707rem
                            margin-left 0.1rem
                            color #b8b8b8
                            .memberName
                                margin 3px 0
                                color #626262
                                display block
                                font-size 0.2048rem
                    .comment
                        font-size 0.256rem
                        color #303030
                        margin-left 0.7rem
                        margin-top 0.1rem
            .relateRecommend
                padding-top 0.4rem
                .title
                    font-size 0.239rem
                    text-align center
                    color #b8b8b8
                    margin-bottom .23rem
                    overflow hidden
                    text-overflow ellipsis
                    display -webkit-box
                    -webkit-line-clamp 2
                    -webkit-box-orient vertical
                .relateListOne
                    padding 0.23rem
                    display flex
                    .detail
                        flex 1
                        margin-left 10px
                        min-width 0
                        .title
                            text-align left
                            color #303030
                        .time
                            font-size 0.17067rem
                            color #b8b8b8
                    .imgWrap
                        .img
                            width 2rem
</style>


