<script>
export default {
  methods: {
    openedModal() {
      document.body.classList.add("modal-open");
    },
    closedModal: function() {
      document.body.classList.remove("modal-open");
    },
  }
}
</script>