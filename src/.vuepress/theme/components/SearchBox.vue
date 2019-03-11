<script>
import SearchBox from '@SearchBox';

const ucFirst = string => string/*.charAt(0).toUpperCase() + string.slice(1)*/;
const sanitize = (string = '') => string.trim().toLowerCase();

export default {
  extends: SearchBox,
  computed: {
    suggestions() {

      const query = sanitize(this.query);

      if (!query || query.length < 3) {
        return;
      }

      const max = 10;

      const suggestions = [];
      this.$site.pages.forEach(({ title, path, key }) => {
        if (suggestions.length <= max && sanitize(title).includes(query)) {
          return suggestions.push({ title, path, key });
        }
      });

      const shouldPush = key => suggestions.length <= max && suggestions.every(suggestion => suggestion.key !== key);

      this.$tags.list.forEach(({ name, posts }) => {
        if (sanitize(name).includes(query)) {
          posts.forEach(({ title, key, path }) => {
            if (shouldPush(key)) {
              suggestions.push({
                title: '[' + ucFirst(name) + ']',
                path,
                header: { title },
                key,
              });
            }
          });
        }
      });

      this.$site.pages.forEach(({ title, path, key, frontmatter: { hints } }) => {
        if (shouldPush(key)) {
          const hint = hints && hints.find(hint => sanitize(hint).startsWith(query));
          if (hint) {
            return suggestions.push({
              title: '/' + ucFirst(hint) + '/',
              path,
              header: { title },
              key
            });
          }
        }
      });

      return suggestions;
    },
  }
};

</script>
