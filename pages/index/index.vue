<template>
  <view class="home">
    <view class="bg-photo">
      <view class="popup-box" v-if="this.showPopup" @click.stop="handlePopup">
        <view class="tips">
          <view>请旋转设备至横屏模式以获得最佳使用体验</view>
        </view>
      </view>
    </view>
    <!-- 标题 -->
    <view class="header">
      <view class="sys-title">
        <img src="../../static/images/长城.png" alt="" />
      </view>
      <view class="right-box">
        <view class="picture-box">
          <view class="pic-icon" @click="handlePhoto">
            <span class="iconfont icon-tupian"></span>
          </view>
          <view
            class="dialog-box"
            :class="showPhotoDialog ? 'show-dialog' : 'hide-dialog'"
          >
            <view v-if="showPhotoDialog">
              <!-- 标题 -->
              <view
                class="ht-title"
                :class="showPhotoDialog ? 'show-title' : ''"
              >
                河套规划图
              </view>
              <!-- 关闭图标 -->
              <view class="close" @click="handleClose">
                <view class="iconfont icon-plus"></view>
              </view>
              <view class="project-pic">
                <img src="../../static/bg/河套规划图.png" />
              </view>
            </view>
          </view>
        </view>
        <view class="route-box">
          <view class="route-icon" @click="handleRoute">
            <span class="iconfont icon-a-02_luxian"></span>
          </view>
          <view
            class="dialog-box"
            :class="showRouteDialog ? 'show-dialog' : 'hide-dialog'"
          >
            <view v-if="showRouteDialog">
              <!-- 标题 -->
              <view
                class="ht-title"
                :class="showRouteDialog ? 'show-title' : ''"
              >
                园区公共交通
              </view>
              <!-- 关闭图标 -->
              <view class="close" @click="closeRoute">
                <view class="iconfont icon-plus"></view>
              </view>
              <view class="route-bg">
                <img src="../../static/bg/园区公共交通地图.png" />
                <view class="canvas-box">
                  <!-- <canvas canvas-id="lineCanvas" class="canvas"></canvas> -->
                  <svg width="100%" height="300">
                    <polyline
                      :points="points.map((p) => `${p.x},${p.y}`).join(' ')"
                      fill="none"
                      stroke="#007AFF"
                      stroke-width="2"
                    />
                    <circle
                      v-for="(p, i) in points"
                      :key="i"
                      :cx="p.x"
                      :cy="p.y"
                      r="4"
                      fill="#b795ff"
                    />
                  </svg>
                </view>
              </view>
              <!-- 站点蒙版 -->
              <view
                class="mask-box"
                :class="activeTab === 1 ? '' : 'right-mask'"
              >
                <view class="list-content" v-if="activeTab === 1">
                  <view
                    class="list-item"
                    v-for="item in routeList1"
                    :key="item.id"
                  >
                    <view>
                      <view class="icon-item" v-if="item.icon === 1">
                        <view class="thumbtack">
                          <span class="iconfont icon-map-thumbtack"></span>
                        </view>
                      </view>
                      <view class="icon-item" v-else-if="item.icon === 2">
                        <view class="draw-icon">
                          <view class="circle">
                            <view class="dot"></view>
                          </view>
                        </view>
                      </view>
                      <view class="icon-item" v-else></view>
                    </view>
                    <view>{{ item.name }}</view>
                  </view>
                </view>
                <view class="list-content route2" v-else>
                  <view
                    class="list-item"
                    v-for="item in routeList2"
                    :key="item.id"
                  >
                    <view>
                      <view class="icon-item" v-if="item.icon === 1">
                        <view class="thumbtack">
                          <span class="iconfont icon-map-thumbtack"></span>
                        </view>
                      </view>
                      <view class="icon-item" v-else-if="item.icon === 2">
                        <view class="draw-icon">
                          <view class="circle">
                            <view class="dot"></view>
                          </view>
                        </view>
                      </view>
                      <view class="icon-item" v-else></view>
                    </view>
                    <view>{{ item.name }}</view>
                  </view>
                </view>
              </view>
              <!-- 右下角巴士图标 -->
              <view class="tab-box">
                <view
                  class="bus-box"
                  @click="handleBus(1)"
                  :class="activeTab === 1 ? 'active_tab' : ''"
                >
                  <view class="iconfont icon-coach-full"></view>
                  <view class="bus-name">C22</view>
                </view>
                <view
                  class="bus-box"
                  @click="handleBus(2)"
                  :class="activeTab === 2 ? 'active_tab' : ''"
                >
                  <view class="iconfont icon-coach-full"></view>
                  <view class="bus-name">B962</view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 加号按钮 -->
    <view
      class="plus-box"
      :class="showPhotoDialog || showRouteDialog ? 'hide-plus' : ''"
    >
      <view
        class="plus-icon"
        :class="showMenu ? 'show_menu' : ''"
        @click="handlePlus"
      >
        <span class="iconfont icon-plus"></span>
        <!-- 菜单 -->
        <view
          class="menu-item menu1"
          @click.stop="handleShowSwiper"
          :class="showMenu ? 'show-item' : 'hide-item'"
        >
          <view
            class="iconfont icon-a-keyanjigouscientificresearchinstitution"
          ></view>
          <view :class="showMenu ? 'show-text' : 'hide-text'">
            高品质科研空间
          </view>
        </view>
        <view
          class="menu-item menu2"
          @click.stop="handleShowSwiper"
          :class="showMenu ? 'show-item' : 'hide-item'"
        >
          <view class="iconfont icon-guojihua"></view>
          <view :class="showMenu ? 'show-text' : 'hide-text'">
            国际化服务平台
          </view>
        </view>
        <view
          class="menu-item menu3"
          :class="showMenu ? 'show-item' : 'hide-item'"
        >
          <view class="iconfont icon-zhongyaodengji"></view>
          <view :class="showMenu ? 'show-text' : 'hide-text'">
            高水平创新机构
          </view>
        </view>
        <view
          class="menu-item menu4"
          :class="showMenu ? 'show-item' : 'hide-item'"
        >
          <view class="iconfont icon-shangjia-shangjia"></view>
          <view :class="showMenu ? 'show-text' : 'hide-text'">
            多元化生活配置
          </view>
        </view>
      </view>
    </view>
    <!-- 轮播图 -->
    <view class="swiper-box" :class="showSwiper ? '' : 'hide-swiper'">
      <view class="con-part2-con">
        <swiper
          class="swiper-tall"
          :duration="500"
          circular="true"
          :interval="300000000"
          previous-margin="260rpx"
          :current="currentIndex"
          @change="partSwiperChange"
        >
          <swiper-item
            @click.stop="handleSwiperItem(index)"
            class="con-part2-con-container"
            v-for="(item, index) in partSwiperChangeList"
            :key="index"
          >
            <view>
              <view
                class="card-item"
                :class="[partcurrentIndex === index ? 'active' : '']"
              >
                <view class="item_pic">
                  <img :src="item.pic" alt="" />
                </view>
                <view class="introduction">
                  <view class="item-tit">{{ item.title }}</view>
                  <view class="item-desc">{{ item.desc }}</view>
                </view>
              </view>
            </view>
          </swiper-item>
        </swiper>
      </view>
      <!-- 二级全屏页面 -->
      <view class="full-box" :class="showFullScreen ? 'full_screen' : ''">
        <!-- 返回 -->
        <view
          class="go_back"
          :class="showFullScreen ? 'show-back' : ''"
          @click="goBack"
        >
          <span class="iconfont icon-zuojiantou"></span>
        </view>
        <!-- 右侧内容 -->
        <view class="right-content">
          <view class="company">
            <view class="details">
              <view class="c_name">河套科创中心</view>
              <view class="adress">
                <span class="iconfont icon-daohangdizhi"></span>
                <span>广东省深圳是福田区红花路1号</span>
              </view>
            </view>
            <view class="operate">
              <view class="handle_btn">
                <span class="iconfont icon-daohang"></span>
                <span class="btn-val">立即前往</span>
              </view>
              <view class="handle_btn">
                <span class="iconfont icon-yidaka"></span>
                <span class="btn-val">已打卡</span>
              </view>
            </view>
          </view>
          <view class="main-box">
            <view class="project-tit">项目</view>
            <view class="project-list">
              <view class="sub-item" v-for="item in projectList" :key="item.id">
                <view class="item_img">
                  <img :src="item.img" alt="" />
                </view>
                <view class="item_desc">{{ item.desc }}</view>
              </view>
            </view>
            <view class="view-more">
              <view>查看全部</view>
              <view class="iconfont icon-chakanquanbu"></view>
            </view>
          </view>
          <view class="c-info">
            <view class="c-info-tit">楼宇介绍</view>
            <view class="c-info-text">
              河套科创中心位于福田保税区红花路与瑞香道、紫荆道交叉口东侧，是河
              套深港科技创新合作区重点建设项目，按照“全球视野、国际标准、高点
              定位”建设目标实施。同时规划了多个公共活动区域和绿化休闲空间，将
              在打造符合合作区定位的高品质科技实验研发基地，成为展示深圳先行示
              范区城市建设新地标
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import PhotoDialog from "../../compontents/photo-dialog.vue";
export default {
  components: {
    PhotoDialog,
  },
  data() {
    return {
      isH5: false,
      activeTab: 1,
      showMenu: true,
      currentIndex: 3,
      showState: false,
      showPopup: false,
      showSwiper: false,
      isLandscape: false,
      showRouteDialog: false,
      showPhotoDialog: false,
      routeList1: [
        {
          id: 1,
          icon: 0,
          name: "C22路公交线路",
        },
        {
          id: 2,
          icon: 1,
          name: "福田口岸公交总站",
        },
        {
          id: 3,
          icon: 2,
          name: "长平商务大厦",
        },
        {
          id: 4,
          icon: 2,
          name: "长富金茂大厦",
        },
        {
          id: 5,
          icon: 2,
          name: "华为数字能源",
        },
        {
          id: 6,
          icon: 2,
          name: "国资国企创新中心",
        },
        {
          id: 7,
          icon: 2,
          name: "香港科学院创新分园",
        },
        {
          id: 8,
          icon: 1,
          name: "福田口岸公交总站",
        },
      ],
      routeList2: [
        {
          id: 1,
          icon: 0,
          name: "B962路公交线路",
        },
        {
          id: 2,
          icon: 1,
          name: "长富金茂大厦",
        },
        {
          id: 3,
          icon: 2,
          name: "槟榔道",
        },
        {
          id: 4,
          icon: 2,
          name: "桃花海虹路口",
        },
        {
          id: 5,
          icon: 2,
          name: "赛意法",
        },
        {
          id: 6,
          icon: 2,
          name: "桃花广兰路口",
        },
        {
          id: 7,
          icon: 2,
          name: "华宝一号",
        },
        {
          id: 8,
          icon: 2,
          name: "市花香樟路口",
        },
        {
          id: 9,
          icon: 2,
          name: "深服保",
        },
        {
          id: 10,
          icon: 2,
          name: "仁锐",
        },
        {
          id: 10,
          icon: 1,
          name: "长富金茂大厦",
        },
      ],
      partSwiperChangeList: [
        {
          pic: "/static/images/f171fc5c85bd4564fadfd002ed4891f4.jpg",
          title: "河套科创中心",
          desc: "国际一流生物科技研发基地",
        },
        {
          pic: "/static/images/becb0147638be209ec5e8efb6614d9dc.jpg",
          title: "河套国创中心",
          desc: "河套合作区一体化国资产业创新平台",
        },
        {
          pic: "/static/images/6a37290f535479e9d745503d8a64ecb2.jpg",
          title: "国际生物医药产业园二期",
          desc: "河套合作区首个政企合作改造的专业园区",
        },
        {
          pic: "/static/images/4446f518c15299786df5749b757a7934.jpg",
          title: "深港国际科技园",
          desc: "湾区一流科技技术聚集高地",
        },
      ],
      projectList: [
        {
          id: 1,
          img: "/static/images/54db7f0d952c8743deb58e9438f872d5.png",
          desc: "国家药监局药品审评检查大湾区分中心",
        },
        {
          id: 2,
          img: "/static/images/1cb016bec90ee0976d54903f62b83b02.png",
          desc: "国家药监局医疗器械技术审评检查大湾区分中心",
        },
        {
          id: 3,
          img: "/static/images/88b335cd06591f9076dc834f6e113c24.png",
          desc: "国家红树林中心",
        },
        {
          id: 4,
          img: "/static/images/b12ba330736d3a648df4b331112c4d88.png",
          desc: "香港大学深圳研究院",
        },
        {
          id: 5,
          img: "/static/images/9819e8dd5fe2d59b9687f2ff48214648.png",
          desc: "香港科技大学深港协同创新研究院",
        },
        {
          id: 6,
          img: "/static/images/0bdd8ea2cf8c379d3f2190c951da243b.png",
          desc: "香港君圣泰生物科技有限公司",
        },
      ],
      showFullScreen: false,
      partcurrentIndex: 0,
      points: [
        { x: 50, y: 60 }, // 起点（左上）
        { x: 120, y: 90 },
        { x: 90, y: 130 }, // 折返向下
        { x: 160, y: 160 },
        { x: 130, y: 200 }, // 再次折返
        { x: 200, y: 240 },
        { x: 170, y: 280 }, // 终点（右下）
      ],
    };
  },
  onLoad() {},
  mounted() {
    // 判断是否为H5环境
    this.isH5 = process.env.VUE_APP_PLATFORM === "h5";
    // this.drawLines();
    this.launchFullScreen();
    this.checkOrientation();
  },
  methods: {
    handlePopup() {
      this.showPopup = false;
    },
    checkOrientation() {
      if (this.isH5) {
        this.isLandscape = window.innerWidth > window.innerHeight;
        console.log("isLandscape-----", this.isLandscape);
        if (!this.isLandscape) {
          this.showPopup = true;
        }
      } else {
        // 非H5环境依赖uniapp的横屏配置
        this.isLandscape = true;
      }
    },
    drawLines() {
      const ctx = uni.createCanvasContext("lineCanvas");
      // 清空画布
      ctx.clearRect(0, 0, 1000, 1000);

      // 设置线条样式
      ctx.setStrokeStyle("#007AFF");
      ctx.setLineWidth(20);

      // 开始绘制路径
      ctx.beginPath();
      this.points.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });

      // 描边
      ctx.stroke();

      // 绘制点（可选）
      this.points.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
        ctx.setFillStyle("#FFf800");
        ctx.fill();
      });
      console.log("绘制了----");
      // 提交到画布
      ctx.draw();
    },
    launchFullScreen() {
      let element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        /* Firefox */
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        /* Chrome, Safari & Opera */
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        /* IE/Edge */
        element.msRequestFullscreen();
      }
    },
    goBack() {
      this.showFullScreen = false;
    },
    handleShowSwiper() {
      this.currentIndex = 2;
      this.showMenu = false;
      this.showSwiper = true;
    },
    // clickImg() {},
    // changeImg() {},
    handleSwiperItem(val) {
      console.log("val---", val);
      this.currentIndex = val;
      if (!this.currentIndex) {
        this.showFullScreen = true;
        return;
      }
    },
    partSwiperChange(event) {
      this.partcurrentIndex = event.detail.current;
    },
    handleBus(val) {
      this.activeTab = val;
    },
    handlePlus() {
      this.showMenu = !this.showMenu;
    },
    handlePhoto() {
      this.showMenu = false;
      this.showSwiper = false;
      this.showPhotoDialog = !this.showPhotoDialog;
    },
    handleRoute() {
      this.showMenu = false;
      this.showSwiper = false;
      console.log("34523423");
      this.showRouteDialog = !this.showRouteDialog;
    },
    handleClose() {
      this.showPhotoDialog = false;
    },
    closeRoute() {
      this.showRouteDialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap");
.home {
  overflow: auto;
  width: 100vw;
  height: 100vh;
  .bg-photo {
    width: 150vw;
    height: 130vh;
    background-image: url("../../static/bg/创新合作区地图1.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    overflow: auto;
    img {
      width: 150vw;
      height: 130vh;
      // object-fit: cover;
    }
  }
  .overstory {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 9;
    left: 0;
    top: 0;
  }
}
.header {
  width: 100%;
  left: 0;
  top: 0;
  top: 10px;
  display: flex;
  position: fixed;
  justify-content: center;
  .sys-title {
    height: 40px;
    color: #fff;
    font-size: 38px;
    width: 50%;
    font-weight: bolder;
    text-align-last: center;
    text-shadow: -1px -1px 10px #a2a2a2, 1px 1px 10px #000;
    font-family: "Alfa Slab One", serif;
    img {
      width: 90%;
    }
  }
  .right-box {
    position: absolute;
    right: 30px;
    top: 0px;
    display: flex;
    height: 50px;
    align-items: center;
    .picture-box {
      margin-right: 15px;
    }
    .picture-box,
    .route-box {
      border-radius: 50%;
      position: relative;
      background-image: linear-gradient(135deg, #abdcff 10%, #0396ff 100%);
      // justify-content: center;
      .canvas-box {
        position: absolute;
        right: 60px;
        top: 20px;
        .canvas {
          display: block;
          width: 400px;
          height: 300px;
        }
      }
      .pic-icon,
      .route-icon {
        width: 50px;
        height: 50px;
        display: flex;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
      }
      .iconfont {
        color: #fff;
        font-size: 30px;
      }
      .dialog-box {
        width: 0;
        height: 0;
        opacity: 0;
        z-index: 99999;
        overflow: auto;
        position: fixed;
        transition: all 0.4s;
        .ht-title {
          position: fixed;
          left: 0;
          top: 0;
          height: 50px;
          width: 100vw;
          color: #fff;
          font-size: 22px;
          // font-size: ;
          line-height: 50px;
          text-align: center;
          transition: all 1s;
          text-shadow: -1px -1px 1px #fff, 1px 1px 1px #000;
        }
        .show-title {
          opacity: 1;
        }
        .project-pic {
          img {
            height: 100vh;
            // width: 180vw;
            object-fit: contain;
          }
        }
        .route-bg {
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          position: relative;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        @mixin iconfn {
          width: 25px;
          height: 25px;
          display: flex;
          border-radius: 50%;
          align-items: center;
          background: #d5d7ec;
          justify-content: center;
        }
        .mask-box {
          width: 250px;
          // height: 80vh;
          left: 20px;
          top: 10vh;
          transition: all 0.5s;
          position: absolute;
          border-radius: 15px;
          backdrop-filter: blur(17px);
          background-color: rgba(255, 255, 255, 0.6);
          .list-content {
            padding: 15px;
            .list-item {
              display: flex;
              height: 34px;
              font-size: 16px;
              align-items: center;
              .icon-item {
                width: 40px;
                height: 35px;
                display: flex;
                align-items: center;
                .thumbtack {
                  @include iconfn();
                  width: 23px;
                  height: 23px;
                  .iconfont {
                    font-weight: bold;
                    color: #6938d3;
                    font-size: 13px;
                  }
                }
                .draw-icon {
                  @include iconfn();
                  // padding: 3px;
                  width: 23px;
                  height: 23px;
                  background: #ccb8f8;
                  .circle {
                    padding: 3px;
                    border-radius: 50%;
                    border: solid #6938d3 1px;
                    .dot {
                      width: 4px;
                      height: 4px;
                      border-radius: 50%;
                      background: #6938d3;
                    }
                  }
                }
              }
              &:last-child {
                .thumbtack {
                  transform: rotate(180deg);
                }
              }
            }
          }
          .route2 {
            padding: 8px 15px;
            .list-item {
              font-size: 13px;
              height: 25px;
              .icon-item {
                height: 25px;
                .draw-icon {
                  width: 21px;
                  height: 21px;
                }
              }
            }
          }
        }
        .right-mask {
          width: 200px;
          top: 15px;
          left: 64% !important;
        }
        .tab-box {
          display: flex;
          // height: 0px;
          border-radius: 35px;
          padding: 7px 10px;
          align-items: center;
          position: fixed;
          right: 30px;
          bottom: 10px;
          background: #fff;
          .bus-box {
            height: 37px;
            width: 110px;
            display: flex;
            font-size: 17px;
            color: #4264fb;
            border-radius: 30px;
            align-items: center;
            transition: all 0.8s;
            justify-content: center;
            .iconfont {
              font-size: 35px;
              color: #4264fb;
            }
            .bus-name {
              padding-left: 10px;
            }
            &:first-child {
              margin-right: 15px;
            }
          }
          .active_tab {
            // border-radius: 20px;
            background: #4264fb;
            color: #fff;
            .iconfont {
              color: #fff;
            }
          }
        }
        .close {
          top: 20px;
          right: 30px;
          z-index: 9999;
          position: fixed;
          .iconfont {
            width: 50px;
            height: 50px;
            display: flex;
            font-size: 28px;
            color: #020619;
            border-radius: 50%;
            background: #fff;
            align-items: center;
            justify-content: center;
            transform: rotate(45deg);
          }
        }
      }
      .show-dialog {
        top: 0;
        right: 0;
        opacity: 1;
        width: 100vw;
        height: 100vh;
      }
      .hide-dialog {
        top: 30px;
        right: 100px;
        opacity: 0;
        border-radius: 50%;
        width: 0 !important;
        height: 0 !important;
      }
    }
  }
}
.plus-box {
  top: calc(50vh - 40px);
  left: 15px;
  width: 60px;
  height: 60px;
  display: flex;
  position: absolute;
  align-items: center;
  // transition: all 0.5s;
  box-sizing: border-box;
  justify-content: center;
}
.hide-plus {
  opacity: 0;
  width: 0;
  height: 0;
  overflow: hidden;
}
.plus-icon {
  width: 45px;
  height: 45px;
  display: flex;
  font-weight: bold;
  border-radius: 50%;
  transition: all 0.4s;
  align-items: center;
  position: relative;
  background: #7391ff;
  justify-content: center;
  .icon-plus {
    color: #fff;
    font-size: 19px;
    transition: all 0.4s;
  }
  // .menu-box {
  //   top: -60px;
  //   // width: 200px;
  //   // height: 200px;
  //   background: transparent;
  //   left: 60px;
  //   position: absolute;
  // }
  .menu-item {
    left: 0px;
    top: 0px;
    opacity: 0;
    z-index: 99;
    width: 45px;
    height: 45px;
    color: #fff;
    display: flex;
    align-items: center;
    border-radius: 50%;
    transition: all 0.6s;
    position: absolute;
    box-sizing: border-box;
    background: #7391ff;
    .iconfont {
      color: #fff;
      font-size: 25px;
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      // padding: 0 10px;
      width: 50px;
      height: 50px;
    }
  }
  .menu1 {
    top: -70px !important;
    left: 60px !important;
    background: #8581ff;
  }
  .menu2 {
    top: -10px !important;
    left: 100px !important;
    background: #73a8d2;
  }
  .menu3 {
    top: 50px !important;
    left: 100px !important;
    background: #81c4bf;
  }
  .menu4 {
    top: 110px !important;
    left: 60px !important;
    background: #c589d7;
  }
  .show-item {
    opacity: 1;
    width: 180px;
    border-radius: 30px;
    transition: width 1s ease-in-out 1s, border-radius 1s ease-in-out 0.6s,
      top 0.4s ease-in-out 0s, left 0.4s ease-in-out 0s,
      opacity 0.4s ease-in-out 0s;
    .show-text {
      opacity: 1;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 1px;
      transition: opacity 1s ease-in-out 2s;
    }
  }
  .hide-item {
    top: 0 !important;
    left: 0 !important;
    transition: top 0.4s ease-in-out 1s, left 0.4s ease-in-out 1s,
      opacity 0.4s ease-in-out 0s;
    width: 50px;
    opacity: 0 !important;
    transition: all 1s;
    .hide-text {
      opacity: 0;
      // transition: opacity 1s ease-in-out 0.2s;
    }
  }
}
.show_menu {
  width: 55px;
  height: 55px;
  font-size: 28px;
  background: #fff;
  .icon-plus {
    color: #333;
    transform: rotate(45deg);
  }
}
.swiper-box {
  position: fixed;
  height: 150px;
  width: 100vw;
  right: 0px;
  bottom: 10px;
  overflow: hidden;
  transition: all 0.6s;
  ::v-deep.uni-swiper-slides {
    margin-left: 20vw;
  }
  .con-part2-con-container {
    width: 66% !important;
    height: 140px !important;
    // transform: translate(120%, 0px) translateZ(0px) !important;
  }
  .card-item {
    width: 35vw;
    height: 90px;
    display: flex;
    overflow: hidden;
    // background: #fff;
    border-radius: 20px;
    transform: scale(0.88);
    box-sizing: border-box;
    border: solid #ffecb7 1px;
    backdrop-filter: blur(5px);
    background-color: rgba(255, 255, 255, 0.6);
    .item_pic {
      width: 80px;
      height: 90px;
      flex-shrink: 0;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      img {
        width: 100%;
        height: 100%;
        // border-radius: 20px;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        object-fit: cover;
      }
    }
    .introduction {
      padding: 10px 6px;
      .item-tit {
        color: #040509;
        font-size: 14px;
        margin-bottom: 4px;
        font-weight: bold;
        line-height: 20px;
        font-family: "Alfa Slab One", serif;
        // line-height: 40px;
      }
      .item-desc {
        color: #414245;
        font-size: 13px;
        line-height: 20px;
      }
    }
  }
  .active {
    transform: scale(1.02);
    width: calc(35vw * 1.02);
    height: calc(90 * 1.02);
    transition: all 0.2s ease-in 0s;
    z-index: 20;
    img {
      border-top-left-radius: calc(20px * 1.02) !important;
      border-bottom-left-radius: calc(20px * 1.02) !important;
      width: calc(90 * 1.02) !important;
      height: calc(90 * 1.02) !important;
    }
  }
  .full-box {
    left: 18vw;
    bottom: 15vh;
    width: 0px;
    height: 0px;
    overflow: hidden;
    transition: all 0.5s;
    background: #fff;
    // border-radius: 50%;
    position: fixed;
    background-image: url("../../static/images/1b2f78ae56088cc65e88120dfff7124a.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .go_back {
      left: 20px;
      top: 20px;
      opacity: 0;
      width: 0px;
      height: 0px;
      display: flex;
      align-items: center;
      position: absolute;
      border-radius: 50%;
      justify-content: center;
      backdrop-filter: blur(5px);
      background-color: rgba(157, 169, 181, 0.8);
      .iconfont {
        color: #fff;
        font-size: 35px;
      }
    }
    .right-content {
      top: 0;
      right: 0;
      width: 68%;
      height: 100vh;
      padding: 20px;
      overflow-y: auto;
      position: absolute;
      background: #fff;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      .company {
        display: flex;
        justify-content: space-between;
        .details {
          .c_name {
            color: #171725;
            font-size: 20px;
            font-weight: bold;
            line-height: 35px;
          }
          .adress {
            font-size: 12px;
            color: #adb4b9;
            .icon-daohangdizhi {
              color: #2853af;
              padding-right: 5px;
            }
          }
        }
        .operate {
          display: flex;
          .handle_btn {
            height: 40px;
            display: flex;
            padding: 0 15px;
            align-items: center;
            color: #4f6bfe;
            text-align: center;
            margin-right: 10px;
            border-radius: 20px;
            background: #e8f2ff;
            .iconfont {
              font-size: 23px;
              padding-right: 5px;
            }
            .btn-val {
              font-size: 14px;
              font-weight: bold;
            }
          }
        }
      }
      .main-box {
        margin-top: 15px;
        margin-bottom: 25px;
        .project-tit {
          font-size: 18px;
          margin-top: 20px;
          color: #171725;
          font-weight: bold;
          margin-bottom: 30px;
        }
        .project-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .sub-item {
            width: 33%;
            padding: 5px;
            text-align: center;
            box-sizing: border-box;
            .item_img {
              margin-bottom: 15px;
              img {
                width: 70px;
                height: 70px;
                object-fit: contain;
              }
            }
            .item_desc {
              font-size: 12px;
              line-height: 22px;
            }
          }
        }
        .view-more {
          height: 35px;
          display: flex;
          font-size: 14px;
          color: #7b90fe;
          font-weight: bold;
          align-items: center;
          justify-content: center;
          .icon-chakanquanbu {
            width: 30px;
            margin-top: 5px;
            font-size: 19px;
            color: #7b90fe;
            font-weight: bold;
            text-align: center;
            transform: rotate(180deg);
          }
        }
      }
      .c-info {
        .c-info-tit {
          font-size: 18px;
          color: #171725;
          font-weight: bold;
          margin-bottom: 15px;
        }
        .c-info-text {
          font-size: 13px;
          color: #66707a;
          font-weight: bold;
          line-height: 23px;
          // font-family: "Alfa Slab One", serif;
        }
      }
    }
  }
  .full_screen {
    left: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    border-radius: 0;
    .show-back {
      opacity: 1;
      width: 50px;
      height: 50px;
      transition: width 0.5s ease-in-out 0.3s, height 0.5s ease-in-out 0.3s,
        opacity 0.5s ease-in-out 0.5s;
    }
  }
}
.hide-swiper {
  opacity: 0;
  width: 0;
  height: 0;
}
.con-part2-con {
  width: 100%;
  height: 390rpx;

  .swiper-tall {
    display: flex;
    align-items: center;
    height: 388rpx;

    .con-part2-con-container {
      display: flex;
      align-items: center;
      // width: 50% !important;

      .slide-image {
        z-index: 1;
        // margin: 0 auto;
        padding-top: 12rpx;
      }
    }
  }
}

.popup-box {
  width: 100vw;
  height: 100vh;
  display: flex;
  z-index: 999999;
  position: fixed;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  .tips {
    width: 75%;
    padding: 20px;
    color: #333;
    height: 100px;
    display: flex;
    font-size: 20px;
    line-height: 30px;
    background: #fff;
    align-items: center;
    border-radius: 10px;
    justify-content: center;
    box-sizing: border-box;
  }
}
</style>
