<template>
  <footer class="footer">
        <div class="content has-text-centered">
          <p>
            <span class="footer-icon">
              <div class="nav-center icon-nav">
                <a class="nav-item">
                  <span class="icon is-large">
                    <a href="https://facebook.com" target="_blank">
                      <i class="fa fa-facebook"></i>
                    </a>
                  </span>
                </a>
                <a class="nav-item">
                  <span class="icon is-large">
                    <a href="https://twitter.com" target="_blank">
                      <i class="fa fa-twitter"></i>
                    </a>
                  </span>
                </a>
                <a class="nav-item">
                  <span class="icon is-large">
                    <a href="https://instagram.com" target="_blank">
                      <i class="fa fa-instagram"></i>
                    </a>
                  </span>
                </a>
              </div>
            </span>
          </p>
        </div>
    </footer>
</template>


<script>
export default {
  name: 'SiteFooter',
  data () {
    return {
      msg: ''
    }
  }
}

</script>

<style>
.footer {
  height: 28px;
}

.footer-icon-item:hover {
  opacity: 1;
  cursor: pointer;
}

</style>