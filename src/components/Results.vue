<template>
<div id="results">
  <div>
    <h1>{{this.username}}</h1>
    <h5>Twoja ochrona jest na poziomie:</h5>

    <svg id="armor" viewBox="0 0 100 100" preserveAspectRatio version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <clipPath id="cut-off-bottom">
          <rect x="0" y="0" width="100" :height="100 - percentTemp" />
        </clipPath>
      </defs>

      <image xlink:href="static/img/tarcza_02.svg" x="0" y="0" width="100" height="100"/>
      <image xlink:href="static/img/tarcza_01.svg" x="0" y="0" width="100" height="100" clip-path="url(#cut-off-bottom)"/>
      <text x="50" y="50" font-size="25">{{ percentTemp }}%</text>

    </svg>

  </div>
  <p>Twoja odporność na:</p>
  <div class="results">
    <div @click="bait=true" class="vulnerability">
      <pie-chart :textPercent="true" :numerator="numOfCorrectClickbaitAnswers" :denominator="numOfClickbaitQuestions" />
      <h5>Clickbait</h5>
    </div>
    <modal :show="bait" @close="bait=false">
      <div slot="0">
        <h2>Clickbait</h2>
        <p>To takie sformułowanie tytułu, które sztucznie wzbudza ciekawość czytelnika poprzez ukrycie przed nim kluczowych informacji. Nadrzędnym celem clickbaitów jest nakłonienie czytelnika do kliknięcia w informację i zwiększenia ruchu na stronie.</p>
      </div>
      <div slot="1">
        <p>PORADA:
          <ul>
            <li>
              Zwróć uwagę na słowa kluczowe, takie jak “szok”, “niesamowite”, “skandal”.
            </li>
            <li>
              Tytuły wiarygodnych artykułów zazwyczaj nie są pisane WIELKIMI literami.
            </li>
            <li>
              Zastanów się, czy autor celowo nie ukrył przed Tobą informacji, nie uwzględniając jej w tytule.
            </li>
          </ul>
        </p>
      </div>
    </modal>

    <div @click="manipulation=true" class="vulnerability">
      <pie-chart :textPercent="true" :numerator="numOfCorrectImageManipulationAnswers" :denominator="numOfImageManipulationQuestions" />
      <h5>Manipulacja obrazem</h5>
    </div>
    <modal :show="manipulation" @close="manipulation=false">
      <div slot="0">
        <h2>Manipulacja obrazem</h2>
        <p>Sytuacja, w której:
          <ul>
            <li>
              zdjęcie publikowane w internecie funkcjonuje poza swoim pierwotnym kontekstem
            </li>
            <li>
              zdjęcie/obraz jest przerobiony w programie graficznym (fotomontaż)
            </li>
            <li>prezentowana na zdjęciu postać wypada szczególnie korzystnie lub niekorzystnie w kontekście treści artykułu</li>
          </ul>
        </p>
      </div>
      <div slot="1">
        <p>PORADA:
          <ul>
              <li>
                Zastanów się, czy jest podany autor i data publikacji zdjęcia.
              </li>
              <li>
                Sprawdź, czy obraz nie jest celowo przerobiony w programie graficznym lub prezentuje kogoś w wyjątkowo niekorzystny sposób
              </li>
              <li>
                Do uzyskania tych informacji przydatne może być odwrócone wyszukiwanie obrazu przez images.google.com.
              </li>
          </ul>
        </p>
      </div>
    </modal>

    <div @click="emo=true" class="vulnerability">
      <pie-chart :textPercent="true" :numerator="numOfCorrectEmotionalLanguageAnswers" :denominator="numOfEmotionalLanguageQuestions" />
      <h5>Emocjonalny język</h5>
    </div>
    <modal :show="emo" @close="emo=false">
      <div slot="0">
        <h2>Emocjonalny język</h2>
        <p>W tekstach informacyjnych granica między faktem a opinią powinna być wyraźnie zaznaczona. Jednak autorzy artykułów sięgają niekiedy po emocjonalny język (zwłaszcza w tytułach), by czytelnik w z góry określony sposób zinterpretował daną informację.</p>
      </div>
      <div slot="1">
        <p>PORADA:
          <ul>
            <li>Sprawdź, czy w tytule pojawiają się silnie emocjonalne sformułowania, typu: “Masakra lewaków”, “Ostateczne uporanie się”, “Furia aktora”.</li>
            <li>Uważaj na wyraźne oceny zachowań bądź postaci w tekście np. “Skandaliczne zachowanie”, “Niegodna postawa”, “Haniebne wystąpienie”.</li>
            <li>Zwróć uwagę, czy autor tekstu odróżnił wyraźnie relacjonowanie faktów od opinii. </li>
          </ul>
        </p>
      </div>
    </modal>

    <div @click="lie=true" class="vulnerability">
      <pie-chart :textPercent="true" :numerator="numOfCorrectFakeNewsAnswers" :denominator="numOfFakeNewsQuestions" />
      <h5>Fake news</h5>
    </div>
    <modal :show="lie" @close="lie=false">
      <div slot="0">
        <h2>Fake news</h2>
        <p>Terminem tym określa się całkowicie wymyślone lub zmanipulowane informacje przypominające wiarygodne dziennikarstwo. Twórcy fake newsów chcą przyciągnąć uwagę odbiorców, by zrealizować z góry założony cel, np. wygenerować zysk lub przekonać do swoich poglądów</p>
      </div>
      <div slot="1">
        <p>PORADA:
          <ul>
            <li>
              Zwróć uwagę na adres strony www, logotyp oraz szatę graficzną.
            </li>
            <li>
              Przeczytaj sekcję o “nas” oraz zweryfikuj profil osoby publikującej.
            </li>
            <li>
              Sprawdź czy, w artykule są podane źródła i czy występują cytaty.
            </li>
          </ul>
        </p>
      </div>
    </modal>

  </div>
  <!-- <button class="main-cta check" type="button" name="button">sprawdź swoje odpowiedzi</button> -->
  <button class="main-cta" type="button" name="button" v-on:click="goToShareResults()">Podziel się wynikiem</button>
</div>
</template>

<script>
  import PieChart from '@/components/PieChart'
  import Modal from '@/components/Modal'

  import ResultStats from '../data/result_stats';
  import ManipulationCategory from '../data/manipulation_category';

  export default {
    name: 'results',
    components: {
      PieChart,
      Modal,
    },
    data () {
      return {
        emo: false,
        bait: false,
        lie: false,
        manipulation: false
      }
    },
    computed: {
      resultStats () {
        const routeResultStatsPayload = this.$route.params.results;
        if (routeResultStatsPayload) {
          // load results from url
          return ResultStats.decode(routeResultStatsPayload);
        } else {
          return this.$store.getters.resultStats;
        }
      },
      resultStatsEmoLang () {
        return this.getManipulationCategoryResultStats('emotional-language');
      },
      resultStatsClickbait () {
        return this.getManipulationCategoryResultStats('clickbait');
      },
      resultStatsFakeNews () {
        return this.getManipulationCategoryResultStats('fake-news');
      },
      resultStatsImgManip () {
        return this.getManipulationCategoryResultStats('image-manipulation');
      },
      percentTemp () {
        return Math.floor(this.numOfCorrectAnswers / this.numOfQuestions * 100)
      },
      numOfQuestions () {
        return ResultStats.getNumOfAnswers(this.resultStats);
      },
      numOfCorrectAnswers () {
        return ResultStats.getNumOfCorrectAnswers(this.resultStats);
      },

      numOfEmotionalLanguageQuestions () {
        return ResultStats.getNumOfAnswers(this.resultStatsEmoLang);
      },
      numOfCorrectEmotionalLanguageAnswers () {
        return ResultStats.getNumOfCorrectAnswers(this.resultStatsEmoLang);
      },

      numOfClickbaitQuestions () {
        return ResultStats.getNumOfAnswers(this.resultStatsClickbait);
      },
      numOfCorrectClickbaitAnswers () {
        return ResultStats.getNumOfCorrectAnswers(this.resultStatsClickbait);
      },

      numOfFakeNewsQuestions () {
        return ResultStats.getNumOfAnswers(this.resultStatsFakeNews);
      },
      numOfCorrectFakeNewsAnswers () {
        return ResultStats.getNumOfCorrectAnswers(this.resultStatsFakeNews);
      },

      numOfImageManipulationQuestions () {
        return this.resultStatsImgManip.total;
      },
      numOfCorrectImageManipulationAnswers () {
        return this.resultStatsImgManip.correct;
      },

      username () {
        return this.resultStats.username;
      }
    },
    methods: {
      goToShareResults () {
        this.$router.push('/share-results');
      },
      getManipulationCategoryResultStats (categoryName) {
        return ResultStats.getByManipulationCategory(
          this.resultStats,
          ManipulationCategory.fromName(categoryName),
        );
      },
    }
  }
</script>

<!-- Scoped component css -->
<!-- It only affect current component -->
<style scoped>
  #results {
    display: block;
    overflow: auto;
  }
  .check {
    font-size: 40%;
  }
  .results {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .vulnerability {
    width: 50%;
    cursor: pointer;
  }
  text {
    fill: white;
    dominant-baseline: central;
    text-anchor: middle;
    font-weight: bold;
  }
  image {
    width: 100%;
    height: 100%;
  }
  svg#armor {
    width: 75%;
  }
</style>
