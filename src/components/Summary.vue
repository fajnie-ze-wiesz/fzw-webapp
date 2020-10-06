<template>
  <div
    id="summary"
    class="app-container content-container"
  >
    <div>
      <h1>Fajnie że wiesz!</h1>

      <p>
        <b>
          Mamy nadzieję, że nauczyłeś/aś się czegoś wartościowego! no i nie zapomnij
          o najważniejszych zasadach rozpoznawania fake newsów!
        </b>
      </p>

      <ol>
        <li>
          Zwracaj uwagę na podejrzane i nieznane źródło informacji.
        </li>
        <li>
          Pamiętaj, że zdjęcie umieszczone w artykule lub mem również mogą być fake newsem.
        </li>
        <li>
          Zwracaj uwagę na wpisy skrajnie emocjonalne, liczne wykrzykniki, pytajniki czy duże litery
        </li>
      </ol>
    </div>
    <div class="buttons">
      <router-link
        tag="button"
        type="button"
        name="button"
        class="opaque-blue"
        to="/share-results"
      >
        Dalej
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Summary',
};
</script>

<style scoped>
#summary {
  color: var(--color-blue);
  background: #EBF1F4;
  position: relative;
}
.buttons {
  display: flex;
  width: 100%;
  z-index: 10;
}
.buttons a {
  margin-top: 1em;
}
</style>
