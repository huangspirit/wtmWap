<template>
    <transition name="slide">
        <div class="previewImg" ref="swiper" @click="closePreview" >
            <wc-swiper>
                <wc-slide v-for="(item,index) in imgList"
                          :autoplay="false"
                          :key="index"
                          :pagination="false"
                          :therehold="50"
                          style="height:100%">
                    <div  style="height:100%;position: relative;width:100%;">
                        <img :src="item" alt="">
                    </div>
                </wc-slide>
            </wc-swiper>
            <span class="closeBtn" @click="closeBtn" v-if="dev=='pc'">&times;</span>
        </div>
    </transition>
</template>
<script>
    export default {
        props:{
            imgList:{
                type:Array,
                default:[]
            },
            index:{
                type:Number,
                default:0
            }
        },
        data (){
            return {
                dev:this.$dev
            }
        },
        mounted(){
            this.init()
        },
        methods:{
            init(){
                // this.$refs.swiper.slideTo(this.currentIndex)
                // console.log(this.imgList)
                // console.log(this.currentIndex)
            },
            closePreview(){
                if(this.dev!='pc'){
                    this.$emit('closePreview')
                }
            },
            closeBtn(){
                console.log(this.dev)
                this.$emit('closePreview')
            }
        }
    }
</script>
<style scoped rel="stylesheet/stylus" lang="stylus">
.slide-enter-active, .slide-leave-active
    transition all 0.3s
.slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
.wc-swiper-container
    height 100%
.previewImg
    background #000
    height 100%
    width 100%
    position fixed
    z-index 100
    top 0
    left 0
    color #fff
    img
        max-width 90%
        max-height 90%
        position absolute
        top 50%
        left 50%
        transform translate(-50%,-50%)
        -webkit-transform translate(-50%,-50%)
        -moz-transform translate(-50%,-50%)
        -ms-transform translate(-50%,-50%)
        -o-transform translate(-50%,-50%)
    .closeBtn
        position absolute
        top 0
        right 0
        font-size 1rem
        line-height 0.5
        cursor pointer
        z-index 1000
</style>
