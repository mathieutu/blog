<script>
import SearchBox from '@SearchBox';

const normalize = (str) => str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const formatSuggestion = ({ title, path, key }) => ({ title, path, key });

export default {
  extends: SearchBox,
  computed: {
    hasTrailingSpace() {
      return this.query.endsWith(' ');
    },

    queryWords() {
      return this.query.length > 1 ? this.query.split(' ').filter(Boolean) : [];
    },

    suggestions() {
      return this.$site.pages.filter(this.filterPage).map(formatSuggestion);
    },
  },
  methods: {
    createRegexpPattern(word, index) {
      if (this.queryWords.length === index + 1 && !this.hasTrailingSpace) {
        // The last word - ok with the word being "startswith"-like
        return `\\b${normalize(word)}`;
      }

      // Not the last word - expect the whole word exactly
      return `\\b${normalize(word)}\\b`;
    },
    filterPage({ title, path, frontmatter: { hints = [], tags = [] } }) {
      return this.queryWords.length && this.queryWords.every((word, i) => {

        const regexp = new RegExp(this.createRegexpPattern(word, i), 'ig');
        const isMatching = (str) => normalize(String(str)).match(regexp);

        return (
          isMatching(title) ||
          isMatching(path) ||
          hints.some(isMatching) ||
          tags.some(isMatching)
        );
      });
    },
  },
};
</script>
