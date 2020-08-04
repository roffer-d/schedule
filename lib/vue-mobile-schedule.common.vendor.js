((typeof self !== 'undefined' ? self : this)["webpackJsonpvue_mobile_schedule"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpvue_mobile_schedule"] || []).push([[0],{

/***/ "d399":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__("c31d");

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// CONCATENATED MODULE: ./node_modules/vant/es/utils/create/bem.js
/**
 * bem helper
 * b() // 'button'
 * b('text') // 'button__text'
 * b({ disabled }) // 'button button--disabled'
 * b('text', { disabled }) // 'button__text button__text--disabled'
 * b(['disabled', 'primary']) // 'button button--disabled button--primary'
 */
function gen(name, mods) {
  if (!mods) {
    return '';
  }

  if (typeof mods === 'string') {
    return " " + name + "--" + mods;
  }

  if (Array.isArray(mods)) {
    return mods.reduce(function (ret, item) {
      return ret + gen(name, item);
    }, '');
  }

  return Object.keys(mods).reduce(function (ret, key) {
    return ret + (mods[key] ? gen(name, key) : '');
  }, '');
}

function createBEM(name) {
  return function (el, mods) {
    if (el && typeof el !== 'string') {
      mods = el;
      el = '';
    }

    el = el ? name + "__" + el : name;
    return "" + el + gen(el, mods);
  };
}
// CONCATENATED MODULE: ./node_modules/vant/es/utils/index.js



var inBrowser = typeof window !== 'undefined';
var isServer = external_commonjs_vue_commonjs2_vue_root_Vue_default.a.prototype.$isServer; // eslint-disable-next-line @typescript-eslint/no-empty-function

function noop() {}
function isDef(val) {
  return val !== undefined && val !== null;
}
function isFunction(val) {
  return typeof val === 'function';
}
function isObject(val) {
  return val !== null && typeof val === 'object';
}
function isPromise(val) {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
}
function get(object, path) {
  var keys = path.split('.');
  var result = object;
  keys.forEach(function (key) {
    result = isDef(result[key]) ? result[key] : '';
  });
  return result;
}
// CONCATENATED MODULE: ./node_modules/vant/es/utils/format/string.js
var camelizeRE = /-(\w)/g;
function camelize(str) {
  return str.replace(camelizeRE, function (_, c) {
    return c.toUpperCase();
  });
}
function padZero(num, targetLength) {
  if (targetLength === void 0) {
    targetLength = 2;
  }

  var str = num + '';

  while (str.length < targetLength) {
    str = '0' + str;
  }

  return str;
}
// CONCATENATED MODULE: ./node_modules/vant/es/mixins/slots.js
/**
 * Use scopedSlots in Vue 2.6+
 * downgrade to slots in lower version
 */
var SlotsMixin = {
  methods: {
    slots: function slots(name, props) {
      if (name === void 0) {
        name = 'default';
      }

      var $slots = this.$slots,
          $scopedSlots = this.$scopedSlots;
      var scopedSlot = $scopedSlots[name];

      if (scopedSlot) {
        return scopedSlot(props);
      }

      return $slots[name];
    }
  }
};
// CONCATENATED MODULE: ./node_modules/vant/es/utils/create/component.js
/**
 * Create a basic component with common options
 */






function install(Vue) {
  var name = this.name;
  Vue.component(name, this);
  Vue.component(camelize("-" + name), this);
} // unify slots & scopedSlots


function unifySlots(context) {
  // use data.scopedSlots in lower Vue version
  var scopedSlots = context.scopedSlots || context.data.scopedSlots || {};
  var slots = context.slots();
  Object.keys(slots).forEach(function (key) {
    if (!scopedSlots[key]) {
      scopedSlots[key] = function () {
        return slots[key];
      };
    }
  });
  return scopedSlots;
} // should be removed after Vue 3

function transformFunctionComponent(pure) {
  return {
    functional: true,
    props: pure.props,
    model: pure.model,
    render: function render(h, context) {
      return pure(h, context.props, unifySlots(context), context);
    }
  };
}

function createComponent(name) {
  return function (sfc) {
    if (isFunction(sfc)) {
      sfc = transformFunctionComponent(sfc);
    }

    if (!sfc.functional) {
      sfc.mixins = sfc.mixins || [];
      sfc.mixins.push(SlotsMixin);
    }

    sfc.name = name;
    sfc.install = install;
    return sfc;
  };
}
// CONCATENATED MODULE: ./node_modules/vant/es/utils/deep-assign.js

var deep_assign_hasOwnProperty = Object.prototype.hasOwnProperty;

function assignKey(to, from, key) {
  var val = from[key];

  if (!isDef(val)) {
    return;
  }

  if (!deep_assign_hasOwnProperty.call(to, key) || !isObject(val)) {
    to[key] = val;
  } else {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    to[key] = deepAssign(Object(to[key]), from[key]);
  }
}

function deepAssign(to, from) {
  Object.keys(from).forEach(function (key) {
    assignKey(to, from, key);
  });
  return to;
}
// CONCATENATED MODULE: ./node_modules/vant/es/locale/lang/zh-CN.js
/* harmony default export */ var zh_CN = ({
  name: '姓名',
  tel: '电话',
  save: '保存',
  confirm: '确认',
  cancel: '取消',
  delete: '删除',
  complete: '完成',
  loading: '加载中...',
  telEmpty: '请填写电话',
  nameEmpty: '请填写姓名',
  nameInvalid: '请输入正确的姓名',
  confirmDelete: '确定要删除吗',
  telInvalid: '请输入正确的手机号',
  vanCalendar: {
    end: '结束',
    start: '开始',
    title: '日期选择',
    confirm: '确定',
    startEnd: '开始/结束',
    weekdays: ['日', '一', '二', '三', '四', '五', '六'],
    monthTitle: function monthTitle(year, month) {
      return year + "\u5E74" + month + "\u6708";
    },
    rangePrompt: function rangePrompt(maxRange) {
      return "\u9009\u62E9\u5929\u6570\u4E0D\u80FD\u8D85\u8FC7 " + maxRange + " \u5929";
    }
  },
  vanContactCard: {
    addText: '添加联系人'
  },
  vanContactList: {
    addText: '新建联系人'
  },
  vanPagination: {
    prev: '上一页',
    next: '下一页'
  },
  vanPullRefresh: {
    pulling: '下拉即可刷新...',
    loosing: '释放即可刷新...'
  },
  vanSubmitBar: {
    label: '合计：'
  },
  vanCoupon: {
    unlimited: '无使用门槛',
    discount: function discount(_discount) {
      return _discount + "\u6298";
    },
    condition: function condition(_condition) {
      return "\u6EE1" + _condition + "\u5143\u53EF\u7528";
    }
  },
  vanCouponCell: {
    title: '优惠券',
    tips: '暂无可用',
    count: function count(_count) {
      return _count + "\u5F20\u53EF\u7528";
    }
  },
  vanCouponList: {
    empty: '暂无优惠券',
    exchange: '兑换',
    close: '不使用优惠券',
    enable: '可用',
    disabled: '不可用',
    placeholder: '请输入优惠码'
  },
  vanAddressEdit: {
    area: '地区',
    postal: '邮政编码',
    areaEmpty: '请选择地区',
    addressEmpty: '请填写详细地址',
    postalEmpty: '邮政编码格式不正确',
    defaultAddress: '设为默认收货地址',
    telPlaceholder: '收货人手机号',
    namePlaceholder: '收货人姓名',
    areaPlaceholder: '选择省 / 市 / 区'
  },
  vanAddressEditDetail: {
    label: '详细地址',
    placeholder: '街道门牌、楼层房间号等信息'
  },
  vanAddressList: {
    add: '新增地址'
  }
});
// CONCATENATED MODULE: ./node_modules/vant/es/locale/index.js



var proto = external_commonjs_vue_commonjs2_vue_root_Vue_default.a.prototype;
var defineReactive = external_commonjs_vue_commonjs2_vue_root_Vue_default.a.util.defineReactive;
defineReactive(proto, '$vantLang', 'zh-CN');
defineReactive(proto, '$vantMessages', {
  'zh-CN': zh_CN
});
/* harmony default export */ var locale = ({
  messages: function messages() {
    return proto.$vantMessages[proto.$vantLang];
  },
  use: function use(lang, messages) {
    var _this$add;

    proto.$vantLang = lang;
    this.add((_this$add = {}, _this$add[lang] = messages, _this$add));
  },
  add: function add(messages) {
    if (messages === void 0) {
      messages = {};
    }

    deepAssign(proto.$vantMessages, messages);
  }
});
// CONCATENATED MODULE: ./node_modules/vant/es/utils/create/i18n.js



function createI18N(name) {
  var prefix = camelize(name) + '.';
  return function (path) {
    var messages = locale.messages();
    var message = get(messages, prefix + path) || get(messages, path);

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return isFunction(message) ? message.apply(void 0, args) : message;
  };
}
// CONCATENATED MODULE: ./node_modules/vant/es/utils/create/index.js



function createNamespace(name) {
  name = 'van-' + name;
  return [createComponent(name), createBEM(name), createI18N(name)];
}
// CONCATENATED MODULE: ./node_modules/vant/es/toast/lock-click.js
var lockCount = 0;
function lockClick(lock) {
  if (lock) {
    if (!lockCount) {
      document.body.classList.add('van-toast--unclickable');
    }

    lockCount++;
  } else {
    lockCount--;

    if (!lockCount) {
      document.body.classList.remove('van-toast--unclickable');
    }
  }
}
// CONCATENATED MODULE: ./node_modules/vant/es/mixins/popup/context.js
var context_context = {
  zIndex: 2000,
  lockCount: 0,
  stack: [],
  find: function find(vm) {
    return this.stack.filter(function (item) {
      return item.vm === vm;
    })[0];
  }
};
// EXTERNAL MODULE: ./node_modules/@vue/babel-helper-vue-jsx-merge-props/dist/helper.js
var helper = __webpack_require__("2638");
var helper_default = /*#__PURE__*/__webpack_require__.n(helper);

// CONCATENATED MODULE: ./node_modules/vant/es/utils/functional.js


var inheritKey = ['ref', 'style', 'class', 'attrs', 'nativeOn', 'directives', 'staticClass', 'staticStyle'];
var mapInheritKey = {
  nativeOn: 'on'
}; // inherit partial context, map nativeOn to on

function inherit(context, inheritListeners) {
  var result = inheritKey.reduce(function (obj, key) {
    if (context.data[key]) {
      obj[mapInheritKey[key] || key] = context.data[key];
    }

    return obj;
  }, {});

  if (inheritListeners) {
    result.on = result.on || {};

    Object(esm_extends["a" /* default */])(result.on, context.data.on);
  }

  return result;
} // emit event

function emit(context, eventName) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var listeners = context.listeners[eventName];

  if (listeners) {
    if (Array.isArray(listeners)) {
      listeners.forEach(function (listener) {
        listener.apply(void 0, args);
      });
    } else {
      listeners.apply(void 0, args);
    }
  }
} // mount functional component

function mount(Component, data) {
  var instance = new external_commonjs_vue_commonjs2_vue_root_Vue_default.a({
    el: document.createElement('div'),
    props: Component.props,
    render: function render(h) {
      return h(Component, Object(esm_extends["a" /* default */])({
        props: this.$props
      }, data));
    }
  });
  document.body.appendChild(instance.$el);
  return instance;
}
// CONCATENATED MODULE: ./node_modules/vant/es/utils/dom/event.js

// eslint-disable-next-line import/no-mutable-exports
var supportsPassive = false;

if (!isServer) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      // eslint-disable-next-line getter-return
      get: function get() {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    });
    window.addEventListener('test-passive', null, opts); // eslint-disable-next-line no-empty
  } catch (e) {}
}

function on(target, event, handler, passive) {
  if (passive === void 0) {
    passive = false;
  }

  if (!isServer) {
    target.addEventListener(event, handler, supportsPassive ? {
      capture: false,
      passive: passive
    } : false);
  }
}
function off(target, event, handler) {
  if (!isServer) {
    target.removeEventListener(event, handler);
  }
}
function stopPropagation(event) {
  event.stopPropagation();
}
function preventDefault(event, isStopPropagation) {
  /* istanbul ignore else */
  if (typeof event.cancelable !== 'boolean' || event.cancelable) {
    event.preventDefault();
  }

  if (isStopPropagation) {
    stopPropagation(event);
  }
}
// CONCATENATED MODULE: ./node_modules/vant/es/overlay/index.js


// Utils


 // Types

var _createNamespace = createNamespace('overlay'),
    overlay_createComponent = _createNamespace[0],
    bem = _createNamespace[1];

function preventTouchMove(event) {
  preventDefault(event, true);
}

function Overlay(h, props, slots, ctx) {
  var style = Object(esm_extends["a" /* default */])({
    zIndex: props.zIndex
  }, props.customStyle);

  if (isDef(props.duration)) {
    style.animationDuration = props.duration + "s";
  }

  return h("transition", {
    "attrs": {
      "name": "van-fade"
    }
  }, [h("div", helper_default()([{
    "directives": [{
      name: "show",
      value: props.show
    }],
    "style": style,
    "class": [bem(), props.className],
    "on": {
      "touchmove": props.lockScroll ? preventTouchMove : noop
    }
  }, inherit(ctx, true)]), [slots.default == null ? void 0 : slots.default()])]);
}

Overlay.props = {
  show: Boolean,
  zIndex: [Number, String],
  duration: [Number, String],
  className: null,
  customStyle: Object,
  lockScroll: {
    type: Boolean,
    default: true
  }
};
/* harmony default export */ var es_overlay = (overlay_createComponent(Overlay));
// CONCATENATED MODULE: ./node_modules/vant/es/utils/dom/node.js
function removeNode(el) {
  var parent = el.parentNode;

  if (parent) {
    parent.removeChild(el);
  }
}
// CONCATENATED MODULE: ./node_modules/vant/es/mixins/popup/overlay.js





var defaultConfig = {
  className: '',
  customStyle: {}
};

function mountOverlay(vm) {
  return mount(es_overlay, {
    on: {
      // close popup when overlay clicked & closeOnClickOverlay is true
      click: function click() {
        vm.$emit('click-overlay');

        if (vm.closeOnClickOverlay) {
          if (vm.onClickOverlay) {
            vm.onClickOverlay();
          } else {
            vm.close();
          }
        }
      }
    }
  });
}

function updateOverlay(vm) {
  var item = context_context.find(vm);

  if (item) {
    var el = vm.$el;
    var config = item.config,
        overlay = item.overlay;

    if (el && el.parentNode) {
      el.parentNode.insertBefore(overlay.$el, el);
    }

    Object(esm_extends["a" /* default */])(overlay, defaultConfig, config, {
      show: true
    });
  }
}
function openOverlay(vm, config) {
  var item = context_context.find(vm);

  if (item) {
    item.config = config;
  } else {
    var overlay = mountOverlay(vm);
    context_context.stack.push({
      vm: vm,
      config: config,
      overlay: overlay
    });
  }

  updateOverlay(vm);
}
function closeOverlay(vm) {
  var item = context_context.find(vm);

  if (item) {
    item.overlay.show = false;
  }
}
function removeOverlay(vm) {
  var item = context_context.find(vm);

  if (item) {
    removeNode(item.overlay.$el);
  }
}
// CONCATENATED MODULE: ./node_modules/vant/es/utils/dom/scroll.js
function isWindow(val) {
  return val === window;
} // get nearest scroll element
// http://w3help.org/zh-cn/causes/SD9013
// http://stackoverflow.com/questions/17016740/onscroll-function-is-not-working-for-chrome


var overflowScrollReg = /scroll|auto/i;
function getScroller(el, root) {
  if (root === void 0) {
    root = window;
  }

  var node = el;

  while (node && node.tagName !== 'HTML' && node.nodeType === 1 && node !== root) {
    var _window$getComputedSt = window.getComputedStyle(node),
        overflowY = _window$getComputedSt.overflowY;

    if (overflowScrollReg.test(overflowY)) {
      if (node.tagName !== 'BODY') {
        return node;
      } // see: https://github.com/youzan/vant/issues/3823


      var _window$getComputedSt2 = window.getComputedStyle(node.parentNode),
          htmlOverflowY = _window$getComputedSt2.overflowY;

      if (overflowScrollReg.test(htmlOverflowY)) {
        return node;
      }
    }

    node = node.parentNode;
  }

  return root;
}
function getScrollTop(el) {
  var top = 'scrollTop' in el ? el.scrollTop : el.pageYOffset; // iOS scroll bounce cause minus scrollTop

  return Math.max(top, 0);
}
function setScrollTop(el, value) {
  if ('scrollTop' in el) {
    el.scrollTop = value;
  } else {
    el.scrollTo(el.scrollX, value);
  }
}
function getRootScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}
function setRootScrollTop(value) {
  setScrollTop(window, value);
  setScrollTop(document.body, value);
} // get distance from element top to page top or scroller top

function getElementTop(el, scroller) {
  if (isWindow(el)) {
    return 0;
  }

  var scrollTop = scroller ? getScrollTop(scroller) : getRootScrollTop();
  return el.getBoundingClientRect().top + scrollTop;
}
function getVisibleHeight(el) {
  if (isWindow(el)) {
    return el.innerHeight;
  }

  return el.getBoundingClientRect().height;
}
function getVisibleTop(el) {
  if (isWindow(el)) {
    return 0;
  }

  return el.getBoundingClientRect().top;
}
// CONCATENATED MODULE: ./node_modules/vant/es/mixins/touch.js

var MIN_DISTANCE = 10;

function getDirection(x, y) {
  if (x > y && x > MIN_DISTANCE) {
    return 'horizontal';
  }

  if (y > x && y > MIN_DISTANCE) {
    return 'vertical';
  }

  return '';
}

var TouchMixin = {
  data: function data() {
    return {
      direction: ''
    };
  },
  methods: {
    touchStart: function touchStart(event) {
      this.resetTouchStatus();
      this.startX = event.touches[0].clientX;
      this.startY = event.touches[0].clientY;
    },
    touchMove: function touchMove(event) {
      var touch = event.touches[0];
      this.deltaX = touch.clientX - this.startX;
      this.deltaY = touch.clientY - this.startY;
      this.offsetX = Math.abs(this.deltaX);
      this.offsetY = Math.abs(this.deltaY);
      this.direction = this.direction || getDirection(this.offsetX, this.offsetY);
    },
    resetTouchStatus: function resetTouchStatus() {
      this.direction = '';
      this.deltaX = 0;
      this.deltaY = 0;
      this.offsetX = 0;
      this.offsetY = 0;
    },
    // avoid Vue 2.6 event bubble issues by manually binding events
    // https://github.com/youzan/vant/issues/3015
    bindTouchEvent: function bindTouchEvent(el) {
      var onTouchStart = this.onTouchStart,
          onTouchMove = this.onTouchMove,
          onTouchEnd = this.onTouchEnd;
      on(el, 'touchstart', onTouchStart);
      on(el, 'touchmove', onTouchMove);

      if (onTouchEnd) {
        on(el, 'touchend', onTouchEnd);
        on(el, 'touchcancel', onTouchEnd);
      }
    }
  }
};
// CONCATENATED MODULE: ./node_modules/vant/es/mixins/portal.js
function getElement(selector) {
  if (typeof selector === 'string') {
    return document.querySelector(selector);
  }

  return selector();
}

function PortalMixin(_ref) {
  var ref = _ref.ref,
      afterPortal = _ref.afterPortal;
  return {
    props: {
      getContainer: [String, Function]
    },
    watch: {
      getContainer: 'portal'
    },
    mounted: function mounted() {
      if (this.getContainer) {
        this.portal();
      }
    },
    methods: {
      portal: function portal() {
        var getContainer = this.getContainer;
        var el = ref ? this.$refs[ref] : this.$el;
        var container;

        if (getContainer) {
          container = getElement(getContainer);
        } else if (this.$parent) {
          container = this.$parent.$el;
        }

        if (container && container !== el.parentNode) {
          container.appendChild(el);
        }

        if (afterPortal) {
          afterPortal.call(this);
        }
      }
    }
  };
}
// CONCATENATED MODULE: ./node_modules/vant/es/mixins/bind-event.js
/**
 * Bind event when mounted or activated
 */

var uid = 0;
function BindEventMixin(handler) {
  var key = "binded_" + uid++;

  function bind() {
    if (!this[key]) {
      handler.call(this, on, true);
      this[key] = true;
    }
  }

  function unbind() {
    if (this[key]) {
      handler.call(this, off, false);
      this[key] = false;
    }
  }

  return {
    mounted: bind,
    activated: bind,
    deactivated: unbind,
    beforeDestroy: unbind
  };
}
// CONCATENATED MODULE: ./node_modules/vant/es/mixins/close-on-popstate.js


var CloseOnPopstateMixin = {
  mixins: [BindEventMixin(function (bind, isBind) {
    this.handlePopstate(isBind && this.closeOnPopstate);
  })],
  props: {
    closeOnPopstate: Boolean
  },
  data: function data() {
    return {
      bindStatus: false
    };
  },
  watch: {
    closeOnPopstate: function closeOnPopstate(val) {
      this.handlePopstate(val);
    }
  },
  methods: {
    handlePopstate: function handlePopstate(bind) {
      var _this = this;

      /* istanbul ignore if */
      if (this.$isServer) {
        return;
      }

      if (this.bindStatus !== bind) {
        this.bindStatus = bind;
        var action = bind ? on : off;
        action(window, 'popstate', function () {
          _this.close();

          _this.shouldReopen = false;
        });
      }
    }
  }
};
// CONCATENATED MODULE: ./node_modules/vant/es/mixins/popup/index.js
// Context

 // Utils



 // Mixins




var popupMixinProps = {
  // whether to show popup
  value: Boolean,
  // whether to show overlay
  overlay: Boolean,
  // overlay custom style
  overlayStyle: Object,
  // overlay custom class name
  overlayClass: String,
  // whether to close popup when click overlay
  closeOnClickOverlay: Boolean,
  // z-index
  zIndex: [Number, String],
  // prevent body scroll
  lockScroll: {
    type: Boolean,
    default: true
  },
  // whether to lazy render
  lazyRender: {
    type: Boolean,
    default: true
  }
};
function PopupMixin(options) {
  if (options === void 0) {
    options = {};
  }

  return {
    mixins: [TouchMixin, CloseOnPopstateMixin, PortalMixin({
      afterPortal: function afterPortal() {
        if (this.overlay) {
          updateOverlay();
        }
      }
    })],
    props: popupMixinProps,
    data: function data() {
      return {
        inited: this.value
      };
    },
    computed: {
      shouldRender: function shouldRender() {
        return this.inited || !this.lazyRender;
      }
    },
    watch: {
      value: function value(val) {
        var type = val ? 'open' : 'close';
        this.inited = this.inited || this.value;
        this[type]();

        if (!options.skipToggleEvent) {
          this.$emit(type);
        }
      },
      overlay: 'renderOverlay'
    },
    mounted: function mounted() {
      if (this.value) {
        this.open();
      }
    },

    /* istanbul ignore next */
    activated: function activated() {
      if (this.shouldReopen) {
        this.$emit('input', true);
        this.shouldReopen = false;
      }
    },
    beforeDestroy: function beforeDestroy() {
      removeOverlay(this);

      if (this.opened) {
        this.removeLock();
      }

      if (this.getContainer) {
        removeNode(this.$el);
      }
    },

    /* istanbul ignore next */
    deactivated: function deactivated() {
      if (this.value) {
        this.close();
        this.shouldReopen = true;
      }
    },
    methods: {
      open: function open() {
        /* istanbul ignore next */
        if (this.$isServer || this.opened) {
          return;
        } // cover default zIndex


        if (this.zIndex !== undefined) {
          context_context.zIndex = this.zIndex;
        }

        this.opened = true;
        this.renderOverlay();
        this.addLock();
      },
      addLock: function addLock() {
        if (this.lockScroll) {
          on(document, 'touchstart', this.touchStart);
          on(document, 'touchmove', this.onTouchMove);

          if (!context_context.lockCount) {
            document.body.classList.add('van-overflow-hidden');
          }

          context_context.lockCount++;
        }
      },
      removeLock: function removeLock() {
        if (this.lockScroll && context_context.lockCount) {
          context_context.lockCount--;
          off(document, 'touchstart', this.touchStart);
          off(document, 'touchmove', this.onTouchMove);

          if (!context_context.lockCount) {
            document.body.classList.remove('van-overflow-hidden');
          }
        }
      },
      close: function close() {
        if (!this.opened) {
          return;
        }

        closeOverlay(this);
        this.opened = false;
        this.removeLock();
        this.$emit('input', false);
      },
      onTouchMove: function onTouchMove(event) {
        this.touchMove(event);
        var direction = this.deltaY > 0 ? '10' : '01';
        var el = getScroller(event.target, this.$el);
        var scrollHeight = el.scrollHeight,
            offsetHeight = el.offsetHeight,
            scrollTop = el.scrollTop;
        var status = '11';
        /* istanbul ignore next */

        if (scrollTop === 0) {
          status = offsetHeight >= scrollHeight ? '00' : '01';
        } else if (scrollTop + offsetHeight >= scrollHeight) {
          status = '10';
        }
        /* istanbul ignore next */


        if (status !== '11' && this.direction === 'vertical' && !(parseInt(status, 2) & parseInt(direction, 2))) {
          preventDefault(event, true);
        }
      },
      renderOverlay: function renderOverlay() {
        var _this = this;

        if (this.$isServer || !this.value) {
          return;
        }

        this.$nextTick(function () {
          _this.updateZIndex(_this.overlay ? 1 : 0);

          if (_this.overlay) {
            openOverlay(_this, {
              zIndex: context_context.zIndex++,
              duration: _this.duration,
              className: _this.overlayClass,
              customStyle: _this.overlayStyle
            });
          } else {
            closeOverlay(_this);
          }
        });
      },
      updateZIndex: function updateZIndex(value) {
        if (value === void 0) {
          value = 0;
        }

        this.$el.style.zIndex = ++context_context.zIndex + value;
      }
    }
  };
}
// CONCATENATED MODULE: ./node_modules/vant/es/utils/validate/number.js
function isNumeric(val) {
  return /^\d+(\.\d+)?$/.test(val);
}
function number_isNaN(val) {
  if (Number.isNaN) {
    return Number.isNaN(val);
  } // eslint-disable-next-line no-self-compare


  return val !== val;
}
// CONCATENATED MODULE: ./node_modules/vant/es/utils/format/unit.js


function addUnit(value) {
  if (!isDef(value)) {
    return undefined;
  }

  value = String(value);
  return isNumeric(value) ? value + "px" : value;
} // cache

var rootFontSize;

function getRootFontSize() {
  if (!rootFontSize) {
    var doc = document.documentElement;
    var fontSize = doc.style.fontSize || window.getComputedStyle(doc).fontSize;
    rootFontSize = parseFloat(fontSize);
  }

  return rootFontSize;
}

function convertRem(value) {
  value = value.replace(/rem/g, '');
  return +value * getRootFontSize();
}

function convertVw(value) {
  value = value.replace(/vw/g, '');
  return +value * window.innerWidth / 100;
}

function unitToPx(value) {
  if (typeof value === 'number') {
    return value;
  }

  if (inBrowser) {
    if (value.indexOf('rem') !== -1) {
      return convertRem(value);
    }

    if (value.indexOf('vw') !== -1) {
      return convertVw(value);
    }
  }

  return parseFloat(value);
}
// CONCATENATED MODULE: ./node_modules/vant/es/info/index.js

// Utils

 // Types

var info_createNamespace = createNamespace('info'),
    info_createComponent = info_createNamespace[0],
    info_bem = info_createNamespace[1];

function Info(h, props, slots, ctx) {
  var dot = props.dot,
      info = props.info;
  var showInfo = isDef(info) && info !== '';

  if (!dot && !showInfo) {
    return;
  }

  return h("div", helper_default()([{
    "class": info_bem({
      dot: dot
    })
  }, inherit(ctx, true)]), [dot ? '' : props.info]);
}

Info.props = {
  dot: Boolean,
  info: [Number, String]
};
/* harmony default export */ var es_info = (info_createComponent(Info));
// CONCATENATED MODULE: ./node_modules/vant/es/icon/index.js

// Utils

 // Components

 // Types

var icon_createNamespace = createNamespace('icon'),
    icon_createComponent = icon_createNamespace[0],
    icon_bem = icon_createNamespace[1];

function isImage(name) {
  return name ? name.indexOf('/') !== -1 : false;
} // compatible with legacy usage, should be removed in next major version


var LEGACY_MAP = {
  medel: 'medal',
  'medel-o': 'medal-o'
};

function correctName(name) {
  return name && LEGACY_MAP[name] || name;
}

function Icon(h, props, slots, ctx) {
  var name = correctName(props.name);
  var imageIcon = isImage(name);
  return h(props.tag, helper_default()([{
    "class": [props.classPrefix, imageIcon ? '' : props.classPrefix + "-" + name],
    "style": {
      color: props.color,
      fontSize: addUnit(props.size)
    }
  }, inherit(ctx, true)]), [slots.default && slots.default(), imageIcon && h("img", {
    "class": icon_bem('image'),
    "attrs": {
      "src": name
    }
  }), h(es_info, {
    "attrs": {
      "dot": props.dot,
      "info": isDef(props.badge) ? props.badge : props.info
    }
  })]);
}

Icon.props = {
  dot: Boolean,
  name: String,
  size: [Number, String],
  // @deprecated
  // should be removed in next major version
  info: [Number, String],
  badge: [Number, String],
  color: String,
  tag: {
    type: String,
    default: 'i'
  },
  classPrefix: {
    type: String,
    default: icon_bem()
  }
};
/* harmony default export */ var es_icon = (icon_createComponent(Icon));
// CONCATENATED MODULE: ./node_modules/vant/es/loading/index.js

// Utils

 // Types

var loading_createNamespace = createNamespace('loading'),
    loading_createComponent = loading_createNamespace[0],
    loading_bem = loading_createNamespace[1];

function LoadingIcon(h, props) {
  if (props.type === 'spinner') {
    var Spin = [];

    for (var i = 0; i < 12; i++) {
      Spin.push(h("i"));
    }

    return Spin;
  }

  return h("svg", {
    "class": loading_bem('circular'),
    "attrs": {
      "viewBox": "25 25 50 50"
    }
  }, [h("circle", {
    "attrs": {
      "cx": "50",
      "cy": "50",
      "r": "20",
      "fill": "none"
    }
  })]);
}

function LoadingText(h, props, slots) {
  if (slots.default) {
    var style = props.textSize && {
      fontSize: addUnit(props.textSize)
    };
    return h("span", {
      "class": loading_bem('text'),
      "style": style
    }, [slots.default()]);
  }
}

function Loading(h, props, slots, ctx) {
  var color = props.color,
      size = props.size,
      type = props.type;
  var style = {
    color: color
  };

  if (size) {
    var iconSize = addUnit(size);
    style.width = iconSize;
    style.height = iconSize;
  }

  return h("div", helper_default()([{
    "class": loading_bem([type, {
      vertical: props.vertical
    }])
  }, inherit(ctx, true)]), [h("span", {
    "class": loading_bem('spinner', type),
    "style": style
  }, [LoadingIcon(h, props)]), LoadingText(h, props, slots)]);
}

Loading.props = {
  color: String,
  size: [Number, String],
  vertical: Boolean,
  textSize: [Number, String],
  type: {
    type: String,
    default: 'circular'
  }
};
/* harmony default export */ var loading = (loading_createComponent(Loading));
// CONCATENATED MODULE: ./node_modules/vant/es/toast/Toast.js
// Utils

 // Mixins

 // Components




var Toast_createNamespace = createNamespace('toast'),
    Toast_createComponent = Toast_createNamespace[0],
    Toast_bem = Toast_createNamespace[1];

/* harmony default export */ var Toast = (Toast_createComponent({
  mixins: [PopupMixin()],
  props: {
    icon: String,
    className: null,
    iconPrefix: String,
    loadingType: String,
    forbidClick: Boolean,
    closeOnClick: Boolean,
    message: [Number, String],
    type: {
      type: String,
      default: 'text'
    },
    position: {
      type: String,
      default: 'middle'
    },
    transition: {
      type: String,
      default: 'van-fade'
    },
    lockScroll: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      clickable: false
    };
  },
  mounted: function mounted() {
    this.toggleClickable();
  },
  destroyed: function destroyed() {
    this.toggleClickable();
  },
  watch: {
    value: 'toggleClickable',
    forbidClick: 'toggleClickable'
  },
  methods: {
    onClick: function onClick() {
      if (this.closeOnClick) {
        this.close();
      }
    },
    toggleClickable: function toggleClickable() {
      var clickable = this.value && this.forbidClick;

      if (this.clickable !== clickable) {
        this.clickable = clickable;
        lockClick(clickable);
      }
    },

    /* istanbul ignore next */
    onAfterEnter: function onAfterEnter() {
      this.$emit('opened');

      if (this.onOpened) {
        this.onOpened();
      }
    },
    onAfterLeave: function onAfterLeave() {
      this.$emit('closed');
    },
    genIcon: function genIcon() {
      var h = this.$createElement;
      var icon = this.icon,
          type = this.type,
          iconPrefix = this.iconPrefix,
          loadingType = this.loadingType;
      var hasIcon = icon || type === 'success' || type === 'fail';

      if (hasIcon) {
        return h(es_icon, {
          "class": Toast_bem('icon'),
          "attrs": {
            "classPrefix": iconPrefix,
            "name": icon || type
          }
        });
      }

      if (type === 'loading') {
        return h(loading, {
          "class": Toast_bem('loading'),
          "attrs": {
            "type": loadingType
          }
        });
      }
    },
    genMessage: function genMessage() {
      var h = this.$createElement;
      var type = this.type,
          message = this.message;

      if (!isDef(message) || message === '') {
        return;
      }

      if (type === 'html') {
        return h("div", {
          "class": Toast_bem('text'),
          "domProps": {
            "innerHTML": message
          }
        });
      }

      return h("div", {
        "class": Toast_bem('text')
      }, [message]);
    }
  },
  render: function render() {
    var _ref;

    var h = arguments[0];
    return h("transition", {
      "attrs": {
        "name": this.transition
      },
      "on": {
        "afterEnter": this.onAfterEnter,
        "afterLeave": this.onAfterLeave
      }
    }, [h("div", {
      "directives": [{
        name: "show",
        value: this.value
      }],
      "class": [Toast_bem([this.position, (_ref = {}, _ref[this.type] = !this.icon, _ref)]), this.className],
      "on": {
        "click": this.onClick
      }
    }, [this.genIcon(), this.genMessage()])]);
  }
}));
// CONCATENATED MODULE: ./node_modules/vant/es/toast/index.js





var defaultOptions = {
  icon: '',
  type: 'text',
  // @deprecated
  mask: false,
  value: true,
  message: '',
  className: '',
  overlay: false,
  onClose: null,
  onOpened: null,
  duration: 2000,
  iconPrefix: undefined,
  position: 'middle',
  transition: 'van-fade',
  forbidClick: false,
  loadingType: undefined,
  getContainer: 'body',
  overlayStyle: null,
  closeOnClick: false,
  closeOnClickOverlay: false
}; // default options of specific type

var defaultOptionsMap = {};
var queue = [];
var multiple = false;

var currentOptions = Object(esm_extends["a" /* default */])({}, defaultOptions);

function parseOptions(message) {
  if (isObject(message)) {
    return message;
  }

  return {
    message: message
  };
}

function createInstance() {
  /* istanbul ignore if */
  if (isServer) {
    return {};
  }

  if (!queue.length || multiple) {
    var toast = new (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend(Toast))({
      el: document.createElement('div')
    });
    toast.$on('input', function (value) {
      toast.value = value;
    });
    queue.push(toast);
  }

  return queue[queue.length - 1];
} // transform toast options to popup props


function transformOptions(options) {
  return Object(esm_extends["a" /* default */])({}, options, {
    overlay: options.mask || options.overlay,
    mask: undefined,
    duration: undefined
  });
}

function toast_Toast(options) {
  if (options === void 0) {
    options = {};
  }

  var toast = createInstance(); // should add z-index if previous toast has not disappeared

  if (toast.value) {
    toast.updateZIndex();
  }

  options = parseOptions(options);
  options = Object(esm_extends["a" /* default */])({}, currentOptions, defaultOptionsMap[options.type || currentOptions.type], options);

  options.clear = function () {
    toast.value = false;

    if (options.onClose) {
      options.onClose();
    }

    if (multiple && !isServer) {
      toast.$on('closed', function () {
        clearTimeout(toast.timer);
        queue = queue.filter(function (item) {
          return item !== toast;
        });
        removeNode(toast.$el);
        toast.$destroy();
      });
    }
  };

  Object(esm_extends["a" /* default */])(toast, transformOptions(options));

  clearTimeout(toast.timer);

  if (options.duration > 0) {
    toast.timer = setTimeout(function () {
      toast.clear();
    }, options.duration);
  }

  return toast;
}

var toast_createMethod = function createMethod(type) {
  return function (options) {
    return toast_Toast(Object(esm_extends["a" /* default */])({
      type: type
    }, parseOptions(options)));
  };
};

['loading', 'success', 'fail'].forEach(function (method) {
  toast_Toast[method] = toast_createMethod(method);
});

toast_Toast.clear = function (all) {
  if (queue.length) {
    if (all) {
      queue.forEach(function (toast) {
        toast.clear();
      });
      queue = [];
    } else if (!multiple) {
      queue[0].clear();
    } else {
      queue.shift().clear();
    }
  }
};

toast_Toast.setDefaultOptions = function (type, options) {
  if (typeof type === 'string') {
    defaultOptionsMap[type] = options;
  } else {
    Object(esm_extends["a" /* default */])(currentOptions, type);
  }
};

toast_Toast.resetDefaultOptions = function (type) {
  if (typeof type === 'string') {
    defaultOptionsMap[type] = null;
  } else {
    currentOptions = Object(esm_extends["a" /* default */])({}, defaultOptions);
    defaultOptionsMap = {};
  }
};

toast_Toast.allowMultiple = function (value) {
  if (value === void 0) {
    value = true;
  }

  multiple = value;
};

toast_Toast.install = function () {
  external_commonjs_vue_commonjs2_vue_root_Vue_default.a.use(Toast);
};

external_commonjs_vue_commonjs2_vue_root_Vue_default.a.prototype.$toast = toast_Toast;
/* harmony default export */ var es_toast = __webpack_exports__["a"] = (toast_Toast);

/***/ })

}]);