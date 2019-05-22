<template>
    <div id="app" >
        <h1 class="logocont">微淘米</h1>
        <div class="headercontent">
            <img class="logo" src="../../assets/toplogo.png" alt="">
            <span class="desc">点击下载APP  参与更多互动</span>
            <img class="open" src="../../assets/topopen.png" alt="" @click="openPage()">
        </div>
        <div class="wrap">
            <div class="topicItemWrap">
                <div class="topicInfo">
                    <div class="imgWrap">
                        <img :src="itemObj.memberInformation.imageUrl" alt="" v-if="itemObj.memberInformation" >
                    </div>
                    <div class="detail">
                        <p class="memberName" v-if="itemObj.memberInformation">{{itemObj.memberInformation.memberName}}</p>
                        <p class="address" v-if="itemObj.memberInformation">{{itemObj.memberInformation.memberAddress}}{{itemObj.createTime | dateForm}}</p>
                    </div>
                </div>
                <div class="topiccont">
                    <div class="title">{{itemObj.topicTitle}}</div>
                    <div class="imgwrap" v-if="itemObj.mediaType=='pic' || itemObj.mediaType=='video'">
                        <template v-if="itemObj.mediaType=='pic'" v-for="(item1,index) in itemObj.mediaMixed">
                            <div v-if="(isHeightImg(item1.length,item1.width,itemObj.mediaMixed.length))=='heightImg'" class="itemImg heightImg" @click="previewImg(index,'topic')" :class="(item1.fileName.includes('gif') || item1.fileName.includes('GIF'))?'gifMark':''"><img v-lazy="itemObj.picPrefix+'/'+item1.fileName+'!/both/205x275/gifto/true'" alt=""></div>
                            <div v-else-if="(isHeightImg(item1.length,item1.width,itemObj.mediaMixed.length))=='widthImg' && itemObj.mediaMixed.length!=1" class="itemImg widthImg" :class="[(item1.fileName.includes('gif') || item1.fileName.includes('GIF'))?'gifMark':'','imgNum'+itemObj.mediaMixed.length]" @click="previewImg(index,'topic')"><img v-lazy="itemObj.picPrefix+'/'+item1.fileName+'!/both/116x116/gifto/true'" alt=""></div>
                            <div v-else-if="(isHeightImg(item1.length,item1.width,itemObj.mediaMixed.length))=='widthImg' && itemObj.mediaMixed.length==1" class="itemImg widthImg" :class="[(item1.fileName.includes('gif') || item1.fileName.includes('GIF'))?'gifMark':'','imgNum'+itemObj.mediaMixed.length]" @click="previewImg(index,'topic')"><img v-lazy="itemObj.picPrefix+'/'+item1.fileName+'!/both/380x210/gifto/true'" alt=""></div>
                        </template>
                        <template v-else-if="itemObj.mediaType=='video'">
                            <div class="videoWrap heightVideo">
                                <img src="../../assets/openvideo.png" alt="" @click="getVideoUrl($event)" class="openvideo">
                                <video src="" :poster="itemObj.coverUrl" class="video1" preload="true" autoplay="true" x5-playsinline="true" webkit-playsinline="true" playsinline="true" width="100%" height="100%"></video>
                                <img :src="itemObj.coverUrl" alt="" class="blur_bj">
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div class="hotcommitlist comm" v-if="itemObj.memberComments && itemObj.memberComments.memberHotCommentList.length">
                <div class="module_title">热门评论</div>
                <div class="commentlist">
                    <ul v-if="itemObj.memberComments && itemObj.memberComments.memberHotCommentList.length">
                        <li v-for="(item,index) in itemObj.memberComments.memberHotCommentList" class="border-bottom list">
                            <div class="memberInfo">
                                <div class="imgwrap">
                                    <div class="image"><img :src="item.memberInformation.imageUrl" alt=""></div>
                                    <span class="floor" v-if="item.fatherRank">{{item.fatherRank}}楼{{item.rank}}#</span>
                                    <span class="floor" v-else>{{item.rank}}楼</span>
                                </div>
                                <div class="detail">
                                    <div class="memberName">{{item.memberInformation.memberName}}</div>
                                    <div class="address">{{item.memberInformation.memberAddress}} {{item.createTime | dateForm}}</div>
                                </div>
                            </div>
                            <div class="cont">
                                <div class="txt">{{item.comment}}</div>
                                <div class="imgwrap">
                                    <div class="imglist" v-for="list in item.mediaMixed">
                                        <img v-lazy="item.picPrefix+'/'+list.fileName+'!/both/186x186/gifto/true'" @click="previewImg(index,'hotcomment')" alt="" >
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="orcommitlist comm" >
                <div class="module_title">全部评论</div>
                <div class="commentlist">
                    <ul v-if="itemObj.memberComments && itemObj.memberComments.memberCommentDtoList.length">
                        <li v-for="(item,index) in itemObj.memberComments.memberCommentDtoList" class="border-bottom list">
                            <div class="memberInfo">
                                <div class="imgwrap">
                                    <div class="image"><img :src="item.memberInformation.imageUrl" alt=""></div>
                                    <span class="floor" v-if="item.fatherRank">{{item.fatherRank}}楼{{item.rank}}#</span>
                                    <span class="floor" v-else>{{item.rank}}楼</span>
                                </div>
                                <div class="detail">
                                    <div class="memberName">{{item.memberInformation.memberName}}</div>
                                    <div class="address">{{item.memberInformation.memberAddress}} {{item.createTime | dateForm}}</div>
                                </div>
                            </div>
                            <div class="cont">
                                <div class="txt">{{item.comment}}</div>
                                <div class="imgwrap">
                                    <div class="imglist" v-for="list in item.mediaMixed" :class="(list.fileName.includes('gif')||list.fileName.includes('GIF'))?'gifMark':''">
                                        <img v-lazy="item.picPrefix+'/'+list.fileName+'!/both/186x186/gifto/true'" @click="previewImg(index,'orcomment')" alt="" >
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div v-if="itemObj.memberComments && itemObj.memberComments.memberCommentDtoList.length==0" class="nocomment" @click="openPage()">
                    <img src="../../assets/shafa.png" alt=""><br>
                    有空沙发，快坐下
                </div>
            </div>
        </div>
        <preview-img :imgList="imgList" v-if="showPreviewImg" @closePreview="showPreviewImg=!showPreviewImg"></preview-img>
    </div>
</template>
<script>
    import PreviewImg from '../topic/previewImg'
    import {dateForm} from '../../../src/assets/js/common.js'
    export default {
        name: 'app',
        data(){
            return {
                showPreviewImg:false,
                commentPageSize:20,
                itemObj:{},
                aspectRatio:(200/140),
                heightImg:(270/205),
                imgList:[],
                showPreviewImg:false
            }
        },
        created(){

        },
        mounted(){
            this.getDetail()
        },
        methods:{
            getVideoUrl(event){
                var self=this;
                this.$axios({
                    method:"get",
                    url:'/common/videoData/ordinary/getVideoPlayUrlWithToken?videoUrl='+self.itemObj.mediaMixed[0].videoUrl+"&source=topic"}).
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
            },
            previewImg(index,mark){
                if(mark=='orcomment'){
                    this.imgList=this.itemObj.memberComments.memberCommentDtoList[index].mediaMixed.map((item)=>{
                                return this.itemObj.memberComments.memberHotCommentList[index]+"/"+item.fileName
                            })
                }else if(mark=='hotcomment'){
                    this.imgList=this.itemObj.memberComments.memberHotCommentList[index].mediaMixed.map((item)=>{
                                return this.itemObj.memberComments.memberHotCommentList[index].picPrefix+"/"+item.fileName
                            })
                }else if(mark=='topic'){
                    this.imgList=this.itemObj.mediaMixed.map((item)=>{
                                return this.itemObj.picPrefix+"/"+item.fileName
                            })
                }
                if(this.imgList.length){
                    this.showPreviewImg=true
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
            getUrlStr(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if(r != null) return unescape(r[2]);
                return null;
            },
            getDetail(){
                var self=this;
                var data= this.$qs.stringify({
                    itemId:this.getUrlStr("uuid"),
                    pageSize:this.commentPageSize
                })
                console.log(data)
                this.$axios({
                    method:"get",
                    url:'/pc/topic/ordinary/getTopicDetail?'+data}).then(function(res){
                    console.log(res)
                    if(res.data.data.mediaMixed){
                        res.data.data.mediaMixed=JSON.parse(res.data.data.mediaMixed)
                    }
                    self.itemObj=res.data.data
                    if(self.itemObj.mediaType=="video"){
                        self.getVideoUrl()
                    }
                }).catch(function(err){
                    console.log(err)
                })
            },
            openPage(){
                window.open("https://www.weitaomi.com","blank")
            },
        },
        components:{
            PreviewImg
        },
        filters:{
            dateForm
        }
    }
</script>
<style lang="stylus" scoped>
    @import '../../assets/css/reset.css'
    @import '../../assets/css/border.css'
#app
    background #fff
    color #303030
    .logocont
        width 0
        height 0
        overflow hidden
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
.wrap
    .topicItemWrap
        .topicInfo
            display flex
            padding 0.23rem
            padding-bottom 0
            .imgWrap
                width 0.6rem
                height 0.6rem
                border-radius 50%
                overflow hidden
                img
                    width 100%
                    height 100%
                    display block
            .detail
                margin-left 15px
                flex 1
                .memberName
                    font-size 0.21rem
                    color #626262
                .address
                    font-size 0.17rem
                    color #b8b8b8
        .topiccont
            padding 0 0.23rem
            .title
                font-size 0.256rem
                padding 0.21rem 0
            .imgwrap
                width 100%
                display flex
                padding-bottom 0.23rem
                .video1
                    position relative
                    z-index 1
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
                    width 31.3%
                    float left
                    margin-right 2%
                    box-sizing border-box
                    position relative
                    img
                        width 100%
                    &.imgNum1
                        width 100%
                        margin-right 0
                        img
                            border 1px solid #dcdcdc
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
    .orcommitlist.comm
        padding-bottom 0.8rem
    .comm
        padding 0.213rem 0
        border-top 0.085rem solid #f5f5f5
        .module_title
            font-size 0.256rem
            font-weight bold
            height 0.554rem
            line-height 0.554rem
            padding 0 0.23rem
        .nocomment
            font-size 0.24rem
            color #999
            text-align center
            margin-top 1rem
            line-height 1rem
            img
                width 20%
        .commentlist
            .list
                padding 0.213rem 0.23rem
                box-sizing border-box
                .memberInfo
                    display flex
                    .imgwrap
                        font-size 0.1365rem
                        color #58bd53
                        text-align center
                        .image
                            width 0.563rem
                            height 0.563rem
                            border-radius 50%
                            overflow hidden
                            margin-bottom 2px
                            img
                                width 100%
                                display block
                                height 100%
                    .detail
                        margin-left 0.14rem
                        .memberName
                            font-size 0.205rem
                            color #626262
                            margin 3px 0
                        .address
                            font-size 0.171rem
                            color #b8b8b8
                .cont
                    font-size 0.256rem
                    padding-left  0.703rem
                    .txt
                        padding-bottom 0.213rem
                    .imgwrap
                        display flex
                        flex-wrap wrap
                        .imglist
                            max-width 33.3%
                            padding-right 0.15rem
                            box-sizing border-box
                            margin-bottom 0.15rem
                            img
                                width 100%

</style>


