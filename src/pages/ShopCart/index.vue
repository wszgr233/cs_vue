<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cartList, index) in cartInfoList"
          :key="cartList.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartList.isChecked == 1"
              @click="changeChecked(index)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartList.imgUrl" />
            <div class="item-msg">
              {{ cartList.skuName }}
            </div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">{{ cartList.createTime }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartList.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="pevskuNum(index)"
              >-</a
            >
            <input
              :value="cartList.skuNum"
              class="itxt"
              @change="changeskuNum(index)"
            />
            <a href="javascript:void(0)" class="plus" @click="addskuNum(index)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartList.skuNum * cartList.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteShopCar(index)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllCheck"
          @click="changesAllChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="JavaScript:;" @click="deleteAllShopCar">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ chickele }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalSum }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="jumpTrade">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  data() {
    return {
      chickele: "",
    };
  },
  mounted() {
    this.getData();
  },

  methods: {
    getNew(index, skuname) {
      this.$store.dispatch("addToCart", {
        skuId: this.cartInfoList[index].skuId,
        skuName: skuname,
      });
    },
    getData() {
      this.$store.dispatch("getShopCartList");
    },
    addskuNum: throttle(async function (index) {
      try {
        await this.getNew(index, "1");
        this.getData();
      } catch (error) {}
    }, 2000),
    pevskuNum: throttle(async function (index) {
      try {
        if (this.cartInfoList[index].skuNum > 1) {
          await this.getNew(index, "-1");
          this.getData();
        }
      } catch (error) {
        alert(error.message);
      }
    }, 2000),
    changeskuNum: throttle(async function (index) {
      let skuNum = event.target.value * 1;
      let oldSkuNum = this.cartInfoList[index].skuNum;
      try {
        if (isNaN(skuNum) || skuNum < 1) {
          skuNum = 0;
          await this.getNew(index, skuNum);
          this.getData();
        } else {
          skuNum = parseInt(skuNum) - oldSkuNum;
          await this.getNew(index, skuNum);
          this.getData();
        }
      } catch (error) {
        alert(error.message);
      }
    }, 2000),
    changeChecked: throttle(async function (index) {
      let isChecked = this.cartInfoList[index].isChecked;
      if (isChecked == 1) {
        isChecked = 0;
      } else {
        isChecked = 1;
      }
      try {
        await this.$store.dispatch("changeGetChecked", {
          skuID: this.cartInfoList[index].skuId,
          isChecked: isChecked,
        });
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    }, 1000),
    async deleteShopCar(index) {
      try {
        if (confirm("确实要删除吗?")) {
          await this.$store.dispatch(
            "deleteShopCart",
            this.cartInfoList[index].skuId
          );
          this.getData;
          this.$forceUpdate;
        }
      } catch (error) {
        alert(error.message);
      }
    },
    async deleteAllShopCar() {
      try {
        if (confirm("确实要删除吗?")) {
          await this.$store.dispatch("deleteAllShopCar");
          this.getData();
        }
      } catch (error) {
        alert(error.message);
      }
    },
    changesAllChecked() {
      this.$store.dispatch("changesAllChecked");
      this.getData();
    },
    jumpTrade() {
      this.$router.push({ name: "trade" });
    },
  },
  computed: {
    ...mapGetters(["cartInfo"]),
    totalSum() {
      let sds = this.cartInfoList.filter((item) => {
        return item.isChecked == 1;
      });
      this.chickele = sds.length;
      let sum = 0;
      sds.forEach((item) => {
        sum += item.skuNum * item.skuPrice;
      });
      return sum;
    },
    isAllCheck() {
      return this.cartInfoList.every((item) => {
        return item.isChecked == 1;
      });
    },
    cartInfoList() {
      return this.cartInfo.cartInfoList || [];
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>