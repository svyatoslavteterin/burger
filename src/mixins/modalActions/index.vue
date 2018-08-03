<script>
export default {
  methods: {
    openedModal() {
      console.log('opened');
      document.body.classList.add("modal-open");
    },
    closedModal: function() {
      console.log('closed');
      document.body.classList.remove("modal-open");
    },
  }
}
</script>