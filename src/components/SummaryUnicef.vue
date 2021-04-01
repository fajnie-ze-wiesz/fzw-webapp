<template>
  <div
    id="unicef"
    class="app-container content-container"
  >
    <div>
      <h1>
        Podpisz apel UNICEF Polska do Ministra Zdrowia
        i pomóż chronić dzieci przed groźnymi chorobami zakaźnymi!
      </h1>

      <p>
        <b>
          UNICEF Polska apeluje o:
        </b>
      </p>

      <ol>
        <li>
          wspieranie rodziców w dostępie do wiarygodnych informacji na temat szczepień,
        </li>
        <li>
          walkę z dezinformacją w mediach i przekłamywaniem informacji na temat szczepień,
        </li>
        <li>
          aktywną promocję Programu Szczepień Ochronnych.
        </li>
      </ol>
    </div>
    <div class="buttons-row">
      <a
        targt="_blank"
        href="https://unicef.pl/chce-pomoc/podpisz-apel/spadek-liczby-szczepien"
      >
        <button
          type="button"
          name="button"
          class="opaque-blue"
        >Podpisz apel</button>
      </a>
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
  name: 'SummaryUnicef',
};
</script>

<style scoped>
#unicef {
  color: var(--color-blue);
  background: #EBF1F4;
  position: relative;
}
.buttons-row {
    display: flex;
    justify-content: space-between
}
.buttons {
  display: flex;
  width: 100%;
  z-index: 10;
}

.buttons-row > a {
    border:0;
}
.buttons-row > a, .buttons-row > button {
    width:calc(50% - 0.5em);
    font-size:0.875em;
    line-height: 1em;
    border:0;
}
.buttons a {
  margin-top: 1em;
}
</style>
