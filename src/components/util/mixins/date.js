import moment from './moment'
import props from '@/components/util/props.js'

let status = {
  select: {
    data() {
      return {
        enumSelectStatus: {
          now: 'now',
          selected: 'selected',
          start: 'start',
          between: 'between',
          end: 'end',
        },
      }
    },
    methods: {
      validator: function(value, now = null, selected = null,  start = null, end = null) {
        return {
          now: (now && this.validNow(value, now)) || false,
          selected: (selected && this.validSelect(value, selected)) || false,
          start: (start && this.validStart(value, start)) || false,
          end: (end && this.validEnd(value, end)) || false,
          between: (start && end && this.validBetween(value, start, end)) || false,
        }
      },
      validNow: function(value, now) {
        return value === now
      },
      validSelect: function(value, selected) {
        return value === selected
      },
      validStart: function(value, start) {
        return value === start
      },
      validEnd: function(value, end) {
        return value === end
      },
      validBetween: function(value, start, end) {
        return value > start && value < end
      },
    },
  },
  type: {
    data() {
      return {
        enumTypeStatus: {
          millisecond: 'millisecond',// 毫秒
          second: 'second',// 秒
          minute: 'minute',// 分钟
          hour: 'hour',// 小时
          date: 'date',// 日期
          day: 'day',// 星期
          weekday: 'weekday',// 根据语言环境的星期
          week: 'week',// 周
          month: 'month', // 月
          quarter: 'quarter',// 季度
          year: 'year',// 年
        },
      }
    },
  },
}

let base = {
  mixins: [ moment.base, status.select, ],
  model: {
    prop: "value",
    event: "selected:changed"
  },
  props: {
    value: {
      type: [String, Number, Date],
    },
    min: Date,
    max: Date,
    hideHeader: props.Boolean,
    disabled: props.Boolean,
  },
  data() {
    return {
      total: 0,
      colCount: 0,
      selected: null,
    }
  },
  computed: {
    rowCount: function() {
      return Math.ceil(this.total / this.colCount);
    },
    nowDisabled: function() {
      return this.now < this.min || this.now > this.max;
    },
    headerText: function() {
      return null
    },
    list: function() {
      return []
    },
  },
  watch: {
    selected: function(value) {
      this.start = this.formatStart(value)
      // 配合 v-model 工作
      this.$emit("selected:changed", value);
    }
  },
}

let year = {
  mixins: [ base, ],
  data() {
    return {
      total: 10,
      colCount: 4,
      start: 0,
    }
  },
  computed: {
    year: function() {
      return this.moment().year()
    },
    headerText: function() {
      return `${this.start} - ${this.start + this.total - 1}`
    },
    list: function() {
      let arr = [];
      for (let i = 0; i < this.total; i++) {
        let value = this.start + i
        arr.push({
          value: value,
          label: value,
          status: this.validator(value, this.year, this.selected),
          disabled: value < this.moment(this.min).year() || value > this.moment(this.max).year()
        });
      }
      return arr
    },
  },
  watch: {
    selected: function(value) {
      this.start = this.formatStart(value)
      this.$emit('year2Month', value)
    }
  },
  mounted() {
    this.selected = this.moment(this.value).year() || this.year
  },
  methods: {
    formatStart: function(val) {
      // return val % this.total == 0
      //   ? Math.floor(val / this.total) * this.total - (this.total - 1)
      //   : Math.floor(val / this.total) * this.total + 1;
      return Math.floor(val / this.total) * this.total
    },
    forward: function() {
      this.start -= this.total;
    },
    checknow: function() {
      this.selected = this.year;
    },
    backward: function() {
      this.start += this.total;
    },
  },
}

export default {
  status,
  base,
  year,
}
