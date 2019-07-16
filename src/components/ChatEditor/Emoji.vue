<template>
  <div>
    <a-tabs defaultActiveKey="1" size="small" :tabBarStyle="{margin: '0px'}">
      <a-tab-pane tab="QQ表情" key="1">
        <div class="qq_face">
          <a
            v-for="(item,index) in $store.getters.qq"
            type="qq"
            :key="index"
            :title="item.title"
            :class="'face qqface'+item.class"
            @click="qqOnClick(item)"
          >{{item.title}}</a>
        </div>
      </a-tab-pane>
      <a-tab-pane tab="符号表情" key="2">
        <div class="emoji_face">
          <a title="笑脸" type="emoji" class="face emoji0">笑脸</a>
          <a title="生病" type="emoji" class="face emoji1">生病</a>
          <a title="破涕为笑" type="emoji" class="face emoji2">破涕为笑</a>
          <a title="吐舌" type="emoji" class="face emoji3">吐舌</a>
          <a title="脸红" type="emoji" class="face emoji4">脸红</a>
          <a title="恐惧" type="emoji" class="face emoji5">恐惧</a>
          <a title="失望" type="emoji" class="face emoji6">失望</a>
          <a title="无语" type="emoji" class="face emoji7">无语</a>
          <a title="嘿哈" type="qq" class="face emoji8">嘿哈</a>
          <a title="捂脸" type="qq" class="face emoji9">捂脸</a>
          <a title="奸笑" type="qq" class="face emoji10">奸笑</a>
          <a title="机智" type="qq" class="face emoji11">机智</a>
          <a title="皱眉" type="qq" class="face emoji12">皱眉</a>
          <a title="耶" type="qq" class="face emoji13">耶</a>
          <a title="鬼魂" type="emoji" class="face emoji14">鬼魂</a>
          <a title="合十" type="emoji" class="face emoji15">合十</a>
          <a title="强壮" type="emoji" class="face emoji16">强壮</a>
          <a title="庆祝" type="emoji" class="face emoji17">庆祝</a>
          <a title="礼物" type="emoji" class="face emoji18">礼物</a>
          <a title="红包" type="qq" class="face emoji19">红包</a>
          <a title="鸡" type="qq" class="face emoji20">鸡</a>
          <a title="开心" type="emoji" class="face emoji21">开心</a>
          <a title="大笑" type="emoji" class="face emoji22">大笑</a>
          <a title="热情" type="emoji" class="face emoji23">热情</a>
          <a title="眨眼" type="emoji" class="face emoji24">眨眼</a>
          <a title="色" type="emoji" class="face emoji25">色</a>
          <a title="接吻" type="emoji" class="face emoji26">接吻</a>
          <a title="亲吻" type="emoji" class="face emoji27">亲吻</a>
          <a title="露齿笑" type="emoji" class="face emoji28">露齿笑</a>
          <a title="满意" type="emoji" class="face emoji29">满意</a>
          <a title="戏弄" type="emoji" class="face emoji30">戏弄</a>
          <a title="得意" type="emoji" class="face emoji31">得意</a>
          <a title="汗" type="emoji" class="face emoji32">汗</a>
          <a title="低落" type="emoji" class="face emoji33">低落</a>
          <a title="呸" type="emoji" class="face emoji34">呸</a>
          <a title="焦虑" type="emoji" class="face emoji35">焦虑</a>
          <a title="担心" type="emoji" class="face emoji36">担心</a>
          <a title="震惊" type="emoji" class="face emoji37">震惊</a>
          <a title="悔恨" type="emoji" class="face emoji38">悔恨</a>
          <a title="眼泪" type="emoji" class="face emoji39">眼泪</a>
          <a title="哭" type="emoji" class="face emoji40">哭</a>
          <a title="晕" type="emoji" class="face emoji41">晕</a>
          <a title="心烦" type="emoji" class="face emoji42">心烦</a>
          <a title="生气" type="emoji" class="face emoji43">生气</a>
          <a title="睡觉" type="emoji" class="face emoji44">睡觉</a>
          <a title="恶魔" type="emoji" class="face emoji45">恶魔</a>
          <a title="外星人" type="emoji" class="face emoji46">外星人</a>
          <a title="心" type="emoji" class="face emoji47">心</a>
          <a title="心碎" type="emoji" class="face emoji48">心碎</a>
          <a title="丘比特" type="emoji" class="face emoji49">丘比特</a>
          <a title="闪烁" type="emoji" class="face emoji50">闪烁</a>
          <a title="星星" type="emoji" class="face emoji51">星星</a>
          <a title="叹号" type="emoji" class="face emoji52">叹号</a>
          <a title="问号" type="emoji" class="face emoji53">问号</a>
          <a title="睡着" type="emoji" class="face emoji54">睡着</a>
          <a title="水滴" type="emoji" class="face emoji55">水滴</a>
          <a title="音乐" type="emoji" class="face emoji56">音乐</a>
          <a title="火" type="emoji" class="face emoji57">火</a>
          <a title="便便" type="emoji" class="face emoji58">便便</a>
          <a title="强" type="emoji" class="face emoji59">强</a>
          <a title="弱" type="emoji" class="face emoji60">弱</a>
          <a title="拳头" type="emoji" class="face emoji61">拳头</a>
          <a title="胜利" type="emoji" class="face emoji62">胜利</a>
          <a title="上" type="emoji" class="face emoji63">上</a>
          <a title="下" type="emoji" class="face emoji64">下</a>
          <a title="右" type="emoji" class="face emoji65">右</a>
          <a title="左" type="emoji" class="face emoji66">左</a>
          <a title="第一" type="emoji" class="face emoji67">第一</a>
          <a title="吻" type="emoji" class="face emoji68">吻</a>
          <a title="热恋" type="emoji" class="face emoji69">热恋</a>
          <a title="男孩" type="emoji" class="face emoji70">男孩</a>
          <a title="女孩" type="emoji" class="face emoji71">女孩</a>
          <a title="女士" type="emoji" class="face emoji72">女士</a>
          <a title="男士" type="emoji" class="face emoji73">男士</a>
          <a title="天使" type="emoji" class="face emoji74">天使</a>
          <a title="骷髅" type="emoji" class="face emoji75">骷髅</a>
          <a title="红唇" type="emoji" class="face emoji76">红唇</a>
          <a title="太阳" type="emoji" class="face emoji77">太阳</a>
          <a title="下雨" type="emoji" class="face emoji78">下雨</a>
          <a title="多云" type="emoji" class="face emoji79">多云</a>
          <a title="雪人" type="emoji" class="face emoji80">雪人</a>
          <a title="月亮" type="emoji" class="face emoji81">月亮</a>
          <a title="闪电" type="emoji" class="face emoji82">闪电</a>
          <a title="海浪" type="emoji" class="face emoji83">海浪</a>
          <a title="猫" type="emoji" class="face emoji84">猫</a>
          <a title="小狗" type="emoji" class="face emoji85">小狗</a>
          <a title="老鼠" type="emoji" class="face emoji86">老鼠</a>
          <a title="仓鼠" type="emoji" class="face emoji87">仓鼠</a>
          <a title="兔子" type="emoji" class="face emoji88">兔子</a>
          <a title="狗" type="emoji" class="face emoji89">狗</a>
          <a title="青蛙" type="emoji" class="face emoji90">青蛙</a>
          <a title="老虎" type="emoji" class="face emoji91">老虎</a>
          <a title="考拉" type="emoji" class="face emoji92">考拉</a>
          <a title="熊" type="emoji" class="face emoji93">熊</a>
          <a title="猪" type="emoji" class="face emoji94">猪</a>
          <a title="牛" type="emoji" class="face emoji95">牛</a>
          <a title="野猪" type="emoji" class="face emoji96">野猪</a>
          <a title="猴子" type="emoji" class="face emoji97">猴子</a>
          <a title="马" type="emoji" class="face emoji98">马</a>
          <a title="蛇" type="emoji" class="face emoji99">蛇</a>
          <a title="鸽子" type="emoji" class="face emoji100">鸽子</a>
          <a title="鸡" type="emoji" class="face emoji101">鸡</a>
          <a title="企鹅" type="emoji" class="face emoji102">企鹅</a>
          <a title="毛虫" type="emoji" class="face emoji103">毛虫</a>
          <a title="章鱼" type="emoji" class="face emoji104">章鱼</a>
          <a title="鱼" type="emoji" class="face emoji105">鱼</a>
          <a title="鲸鱼" type="emoji" class="face emoji106">鲸鱼</a>
          <a title="海豚" type="emoji" class="face emoji107">海豚</a>
          <a title="玫瑰" type="emoji" class="face emoji108">玫瑰</a>
          <a title="花" type="emoji" class="face emoji109">花</a>
          <a title="棕榈树" type="emoji" class="face emoji110">棕榈树</a>
          <a title="仙人掌" type="emoji" class="face emoji111">仙人掌</a>
          <a title="礼盒" type="emoji" class="face emoji112">礼盒</a>
          <a title="南瓜灯" type="emoji" class="face emoji113">南瓜灯</a>
          <a title="圣诞老人" type="emoji" class="face emoji114">圣诞老人</a>
          <a title="圣诞树" type="emoji" class="face emoji115">圣诞树</a>
          <a title="铃" type="emoji" class="face emoji116">铃</a>
          <a title="气球" type="emoji" class="face emoji117">气球</a>
          <a title="CD" type="emoji" class="face emoji118">CD</a>
          <a title="相机" type="emoji" class="face emoji119">相机</a>
          <a title="录像机" type="emoji" class="face emoji120">录像机</a>
          <a title="电脑" type="emoji" class="face emoji121">电脑</a>
          <a title="电视" type="emoji" class="face emoji122">电视</a>
          <a title="电话" type="emoji" class="face emoji123">电话</a>
          <a title="解锁" type="emoji" class="face emoji124">解锁</a>
          <a title="锁" type="emoji" class="face emoji125">锁</a>
          <a title="钥匙" type="emoji" class="face emoji126">钥匙</a>
          <a title="成交" type="emoji" class="face emoji127">成交</a>
          <a title="灯泡" type="emoji" class="face emoji128">灯泡</a>
          <a title="邮箱" type="emoji" class="face emoji129">邮箱</a>
          <a title="浴缸" type="emoji" class="face emoji130">浴缸</a>
          <a title="钱" type="emoji" class="face emoji131">钱</a>
          <a title="炸弹" type="emoji" class="face emoji132">炸弹</a>
          <a title="手枪" type="emoji" class="face emoji133">手枪</a>
          <a title="药丸" type="emoji" class="face emoji134">药丸</a>
          <a title="橄榄球" type="emoji" class="face emoji135">橄榄球</a>
          <a title="篮球" type="emoji" class="face emoji136">篮球</a>
          <a title="足球" type="emoji" class="face emoji137">足球</a>
          <a title="棒球" type="emoji" class="face emoji138">棒球</a>
          <a title="高尔夫" type="emoji" class="face emoji139">高尔夫</a>
          <a title="奖杯" type="emoji" class="face emoji140">奖杯</a>
          <a title="入侵者" type="emoji" class="face emoji141">入侵者</a>
          <a title="唱歌" type="emoji" class="face emoji142">唱歌</a>
          <a title="吉他" type="emoji" class="face emoji143">吉他</a>
          <a title="比基尼" type="emoji" class="face emoji144">比基尼</a>
          <a title="皇冠" type="emoji" class="face emoji145">皇冠</a>
          <a title="雨伞" type="emoji" class="face emoji146">雨伞</a>
          <a title="手提包" type="emoji" class="face emoji147">手提包</a>
          <a title="口红" type="emoji" class="face emoji148">口红</a>
          <a title="戒指" type="emoji" class="face emoji149">戒指</a>
          <a title="钻石" type="emoji" class="face emoji150">钻石</a>
          <a title="咖啡" type="emoji" class="face emoji151">咖啡</a>
          <a title="啤酒" type="emoji" class="face emoji152">啤酒</a>
          <a title="干杯" type="emoji" class="face emoji153">干杯</a>
          <a title="鸡尾酒" type="emoji" class="face emoji154">鸡尾酒</a>
          <a title="汉堡" type="emoji" class="face emoji155">汉堡</a>
          <a title="薯条" type="emoji" class="face emoji156">薯条</a>
          <a title="意面" type="emoji" class="face emoji157">意面</a>
          <a title="寿司" type="emoji" class="face emoji158">寿司</a>
          <a title="面条" type="emoji" class="face emoji159">面条</a>
          <a title="煎蛋" type="emoji" class="face emoji160">煎蛋</a>
          <a title="冰激凌" type="emoji" class="face emoji161">冰激凌</a>
          <a title="蛋糕" type="emoji" class="face emoji162">蛋糕</a>
          <a title="苹果" type="emoji" class="face emoji163">苹果</a>
          <a title="飞机" type="emoji" class="face emoji164">飞机</a>
          <a title="火箭" type="emoji" class="face emoji165">火箭</a>
          <a title="自行车" type="emoji" class="face emoji166">自行车</a>
          <a title="高铁" type="emoji" class="face emoji167">高铁</a>
          <a title="警告" type="emoji" class="face emoji168">警告</a>
          <a title="旗" type="emoji" class="face emoji169">旗</a>
          <a title="男人" type="emoji" class="face emoji170">男人</a>
          <a title="女人" type="emoji" class="face emoji171">女人</a>
          <a title="O" type="emoji" class="face emoji172">O</a>
          <a title="X" type="emoji" class="face emoji173">X</a>
          <a title="版权" type="emoji" class="face emoji174">版权</a>
          <a title="注册商标" type="emoji" class="face emoji175">注册商标</a>
          <a title="商标" type="emoji" class="face emoji176">商标</a>
        </div>
      </a-tab-pane>
      <a-tab-pane key="3">
        <span slot="tab">
          自定义表情
          <a-button
            shape="circle"
            icon="setting"
            size="small"
            class="setting"
            @click="isShowModel = true;$parent.$emit('emit-close')"
          />
        </span>
        <div class="hp_face">
          <img
            v-for="(item,index) in $store.getters.customizeList"
            :key="index"
            :src="item.url"
            @click="$parent.$emit('emit-handlerClick', item)"
          />
        </div>
      </a-tab-pane>
    </a-tabs>
    <a-modal v-model="isShowModel" :maskClosable="false" title="自定义表情" width="840px" :footer="null">
      <emoji-form />
    </a-modal>
  </div>
</template>
<script>
import EmojiForm from "./EmojiForm";
export default {
  components: {
    EmojiForm
  },
  data() {
    return {
      isShowModel: false
    };
  },
  methods: {
    qqOnClick(item) {
      this.$parent.$emit(
        "emit-emoji",
        `<img
            title="${item.title}"
            type="qq"
            src="/tinymce/spacer.gif"
            class="qqemoji qqemoji${item.class}"
          />`
      );
    }
  }
};
</script>
<style lang="less" scoped>
.setting {
  margin-left: 5px;
  border: 0;
}

.hp_face {
  overflow: hidden;
  height: 220px;
  overflow-y: scroll;
  padding-left: 10px;
  img {
    width: 50px;
    height: 50px;
    border-bottom: 1px solid #f0f0f0;
    border-right: 1px solid #f0f0f0;
    cursor: pointer;
  }
}
</style>

