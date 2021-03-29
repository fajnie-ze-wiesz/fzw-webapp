<template>
  <p
    v-if="linkNameText"
    class="foot-link-note"
  >
    {{ name }}:
    <span v-if="linkUrl">
      <a
        :href="linkUrl"
        target="_blank"
      >{{ linkNameText }}</a>
    </span>
    <span v-else>
      {{ linkNameText }}
    </span>
  </p>
</template>

<script>
export default {
  name: 'FootLinkNote',
  props: {
    name: {
      type: String,
      required: true,
    },
    linkName: {
      type: String,
      required: true,
      default: '',
    },
    linkUrl: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    linkNameText() {
      if (!this.linkName && this.linkUrl) {
        return 'link';
      }
      return this.linkName;
    },
  },
};
</script>

<style scoped>
.foot-link-note {
  font-size: 80%;
  margin: 0;
}

.foot-link-note,
.foot-link-note a,
.foot-link-note a:visited {
  color: var(--color-gray-text);
}
</style>
