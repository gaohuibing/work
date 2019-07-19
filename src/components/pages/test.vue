<template>
  <div>
    <h3>span标签模拟input设置父子级选中组件</h3>
    <div v-for="(item,index) in option" class="block" :key="index">
      <div class="parent">
        <span
          class="checkbox"
          @click="checkedParent(item)"
          :class="{'check_inner':item.isSelected == '1','check_checked':item.isSelected == '2'}"
        ></span>
        <em v-text="item.name"></em>
        <i v-text="'说明：' + item.explain"></i>
      </div>
      <div class="children">
        <ul>
          <li v-for="(info,key) in item.option" :key="key">
            <span
              class="checkbox"
              :class="{'check_checked':info.isSelected}"
              @click="checkedSonItem(info)"
            ></span>
            <em v-text="info.childName"></em>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      option: [
        {
          name: "父级名称1",
          explain: "默认全不选中",
          option: [
            {
              childName: "子元素名称",
              isSelected: false
            },
            {
              childName: "子元素名称",
              isSelected: false
            },
            {
              childName: "子元素名称",
              isSelected: false
            }
          ]
        },
        {
          name: "父级名称2",
          explain: "默认都选中",
          option: [
            {
              childName: "子元素名称",
              isSelected: true
            },
            {
              childName: "子元素名称",
              isSelected: true
            },
            {
              childName: "子元素名称",
              isSelected: true
            }
          ]
        },
        {
          name: "父级名称3",
          explain: "默认部分选中",
          option: [
            {
              childName: "子元素名称",
              isSelected: true
            },
            {
              childName: "子元素名称",
              isSelected: false
            },
            {
              childName: "子元素名称",
              isSelected: false
            }
          ]
        }
      ]
    };
  },
  methods: {
    checkedParent: function(item) {
      //切换父级选中 同时改变子集状态
      switch (item.isSelected) {
        case 1:
          item.isSelected = 2;
          item.option.forEach(function(info) {
            info.isSelected = true;
          });
          break;
        case 2:
          item.isSelected = 0;
          item.option.forEach(function(info) {
            info.isSelected = false;
          });
          break;
        case 0:
          item.isSelected = 2;
          item.option.forEach(function(info) {
            info.isSelected = true;
          });
          break;
      }
    },
    checkedSonItem: function(info) {
      //切换子集选中 同时改变父级
      info.isSelected = !info.isSelected;
      this.addParentChecked();
    },
    addParentChecked: function() {
      //根据子集的选中状态初始化父级
      var arr = this.option;

      var newArr = arr.map(function(item) {
        item["isSelected"] = "1";
        var flag; //0 未选中  1部分选中  2选中
        var result1, result2; //result1 判断子集元素是否全部选中，result2判断是否部分选中
        result1 = item.option.every(function(i) {
          return i.isSelected == true;
        });
        item["isSelected"] = result1 ? 2 : 0;
        item["checked"] = result1;

        if (result1 === false) {
          result2 = item.option.some(function(j) {
            return j.isSelected == true;
          });
          item["isSelected"] = result2 ? 1 : 0;
        }
        return item;
      });

      this.option = JSON.parse(JSON.stringify(newArr));
      console.log(this.option);
    }
  },
  mounted() {
    this.addParentChecked();
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

div {
  margin-left: 30px;
  margin-top: 10px;
}

div span {
  width: 16px;
  height: 16px;
  border: 1px solid #d9d9d9;
}

div.parent {
  display: flex;
}

div.block {
  border-bottom: 1px solid #d9e2e8;
  padding-bottom: 10px;
}

div span.checkbox {
  position: relative;
  top: 0;
  left: 0;
  display: block;
  width: 16px;
  height: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  background-color: #fff;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}

div span.checkbox:hover {
  border: 1px solid #1890ff;
  cursor: pointer;
}

div span.check_inner {
  position: relative;
  top: 0;
  left: 0;
  display: block;
  width: 16px;
  height: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  background-color: #1890ff;
  border-color: #1890ff;
}

div span.check_inner:after {
  transform: rotate(90deg) scale(1);
  position: absolute;
  left: 7px;
  top: 3px;
  display: table;
  /* width: 5.71428571px; */
  height: 9.14285714px;
  border: 2px solid #fff;
  border-top: 0;
  border-left: 0;
  content: " ";
  -webkit-transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6);
  transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6);
}

div span.checkColor {
  background-color: #1890ff;
  border-color: #1890ff;
}

div span.check_checked {
  position: relative;
  top: 0;
  left: 0;
  display: block;
  width: 16px;
  height: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  background-color: #1890ff;
  border-color: #1890ff;
}

div span.check_checked:after {
  transform: rotate(45deg) scale(1);
  position: absolute;
  left: 3.57142857px;
  top: 1px;
  display: table;
  width: 5.71428571px;
  height: 9.14285714px;
  border: 2px solid #fff;
  border-top: 0;
  border-left: 0;
  content: " ";
  -webkit-transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6);
  transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6);
}

.children {
}

.children ul li {
  display: flex;
  flex-flow: row nowrap;
}

.children ul li span {
  margin-right: 10px;
}
</style>
