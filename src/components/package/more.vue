<template>
  <div>
    <div class="more" :style="{height:baseHeight}">
      <div>
        <slot></slot>
      </div>
    </div>
    <div class="show-more" v-if="show">
      <span class="toggle"
            :class="{bottom:this.showMore}"
            @click="toggleShowMore"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "more",
  props: {
    height: {
      type: String,
      default: '5.4rem'
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      showMore: true,
      baseHeight: ''
    }
  },
  mounted () {
    this.baseHeight = this.height
  },
  methods: {
    toggleShowMore () {
      this.showMore = !this.showMore
      this.baseHeight = this.baseHeight === 'auto' ? this.height : 'auto'
    }
  }
}
</script>

<style scoped lang="less">
.more {
  overflow: hidden;
  transition: height 500ms linear;
}
.show-more {
  text-align: center;
  padding-bottom: 0.2rem;

  span.toggle {
    width: 0.18rem;
    height: 0.18rem;
    border-style: solid;
    border-color: #a1a5b2;
    border-width: 0 2px 2px 0;
    transform: rotate(225deg);
    margin: 0.1rem 0 0 0.05rem;
    display: inline-block;
    &.bottom {
      transform: rotate(44deg);
    }
  }
}
</style>