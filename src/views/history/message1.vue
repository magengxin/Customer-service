<template>
<div>
  <a-list
          itemLayout="horizontal"
          :dataSource="data"
  >
    <a-list-item
            slot="renderItem"
            slot-scope="item, index"
            :class="{active: item.check}"
            @click="getInfo(item,index)">
      <a-list-item-meta
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
      >
        <a slot="title" href="https://vue.ant.design/">{{item.title}}</a>
      </a-list-item-meta>
    </a-list-item>
  </a-list>
  <button @click="getCheck"> 移出 </button>
</div>
</template>
<script>
  const data = [
    {
      title: 'Ant Design Title 1',
      check: false,
    },
    {
      title: 'Ant Design Title 2',
      check: false,
    },
    {
      title: 'Ant Design Title 3',
      check: false,
    },
    {
      title: 'Ant Design Title 4',
      check: false,
    },
  ]
  export default {
    data() {
      return {
        data,
        dataTemp:[],
        indexTemp:[],
      }
    },
    methods: {
      getInfo(item, index) {
        let check = this.data[index].check

        if(check){
          this.indexTemp.forEach(item => {
            if(item!==index){
              this.indexTemp.push(index)
            }
          })
          this.data[index].check = false
        }else{
          this.data[index].check = true

          this.indexTemp.splice(index,1);
        }
      },
      getCheck() {
        console.log("this.data", this.data);
        this.data.forEach(item => {
          if(item.check){
            this.dataTemp.push(item)
          }
        })
        this.indexTemp.forEach(item => {
          this.data.splice(item,1);
        })

        console.log("this.dataTemp", this.dataTemp);
      }
    }
  }
</script>
<style>
  .active {
    background: teal;
  }
</style>
