<script lang="ts">
import { defineComponent, h, CSSProperties } from 'vue'

export default defineComponent({
  props: {
    size: {
      type: String,
      default: undefined
    },
    color: {
      type: String,
      default: undefined
    },
    name: {
      type: String,
      default: undefined
    }
  },
  render() {
    if (!this.name) {
      return
    }
    let style: CSSProperties = {}
    if (this.size) {
      style.fontSize = this.size
    }
    if (this.color) {
      style.color = this.color
    }
    return h(
      'ion-icon',
      { style, name: this.name }
    )
  }
})
</script>
