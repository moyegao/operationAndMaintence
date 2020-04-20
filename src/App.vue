<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = '100px';
      // if(clientWidth>=1024){
      //   docEl.style.fontSize = '100px';
      // }else{
      //   docEl.style.fontSize = 100 * (clientWidth / 1024) + 'px';
      // }
    }

  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

(function () {
  function getViewPortHeight() {
    return document.documentElement.clientHeight || document.body.clientHeight;
  }
  function setHeight() {
    document.body.style.height = getViewPortHeight() + 'px';
    // document.body.style.overflow = 'hidden'
  }
  setHeight();
  $(window).resize(function () {//动态监听监听网页窗口变化
    setHeight();
  });
})();
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import "assets/styles/resert.scss";
@import "assets/styles/scss/base/fn";
#app{
  height: 100%;
  width: 100%;
}

  // 表格列居左
  .el-table__row .is-left {
    text-align: left;
  }
  // 表格列居右
  .el-table__row .is-right {
    text-align: right;
  }
.el-dialog {
  width: 80%;
  height: 80%;
  margin-top: 9vh !important;
  .el-dialog__body {
    height: calc(100% - 136px);
    overflow: auto;
    padding:0px;
    width: 100%;
    .el-form-item {
      // margin-bottom: 10px;
      // margin-top: 6px;
      .el-form-item__error {
        padding-top: 2px;
      }
    }
    .el-input__inner {
      height: 28px;
      line-height: 28px;
      font-size: 12px;
    }
  }
  .el-dialog__footer {
    text-align: center;
    border-top: 1px solid #efefef;
    padding: 20px;
  }
  .el-dialog__header {
    border-bottom: 1px solid #efefef;
    .el-dialog__title {
      font-size: 14px;
      font-weight: bold;
    }
  }
}
</style>
