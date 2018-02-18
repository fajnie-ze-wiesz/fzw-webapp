<template>
<div id="results">
  <h1>{{this.userInfo.name}}...</h1>
  <h2>jesteś chroniony na poziomie:</h2>
  <pie-chart2 :score="numOfCorrectAnswers" :total="numOfAnswers"></pie-chart2>
  <p>
    Udzielono {{ numOfCorrectAnswers }} poprawnych odpowiedzi na {{ numOfAnswers }} pytań. Na {{ numOfOmmitedQuestions }} nie udzielono odpowiedzi.
  </p>
  <div class="results">
    <h1>Twoja odporność na:</h1>
    <div @click="emo=!emo" class="vulnerability">
      <pie-chart2 :score="numOfCorrectEmotionalLanguageAnswers" :total="numOfEmotionalLanguageAnswers" />
      <h5>Emocjonalny język</h5>
      <modal v-show="emo">
        <h2>Emocjonalny język</h2>
        <p>W tekstach informacyjnych granica między faktem a opinią powinna być wyraźnie zaznaczona. Jednak autorzy artykułów sięgają niekiedy po emocjonalny język (zwłaszcza w tytułach), by czytelnik w z góry określony sposób zinterpretował daną informację.</p>
        <p>PORADA:
          <ul>
            <li>Sprawdź, czy w tytule pojawiają się silnie emocjonalne sformułowania, typu: “Masakra lewaków”, “Ostateczne uporanie się”, “Furia aktora”.</li>
            <li>Uważaj na wyraźne oceny zachowań bądź postaci w tekście np. “Skandaliczne zachowanie”, “Niegodna postawa”, “Haniebne wystąpienie”.</li>
            <li>Zwróć uwagę, czy autor tekstu odróżnił wyraźnie relacjonowanie faktów od opinii. </li>
          </ul>
        </p>
      </modal>
    </div>

    <div @click="bait=!bait" class="vulnerability">
      <pie-chart2 :score="numOfCorrectClickbaitAnswers" :total="numOfClickbaitAnswers" />
      <h5>Clickbait</h5>
      <transition name="fade">
        <modal v-show="bait" @close="bait=false">
          <h2>Clickbait</h2>
          <p>To takie sformułowanie tytułu, które sztucznie wzbudza ciekawość czytelnika poprzez ukrycie przed nim kluczowych informacji. Nadrzędnym celem clickbaitów jest nakłonienie czytelnika do kliknięcia w informację i zwiększenia ruchu na stronie.</p>
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
        </modal>
      </transition>
    </div>

    <div @click="lie=!lie" class="vulnerability">
      <pie-chart2 :score="numOfCorrectFakeNewsAnswers" :total="numOfFakeNewsAnswers" />
      <h5>Fałszywe treści</h5>
      <modal v-show="lie" @close="lie=false">
        <h2>Fałszywe treści</h2>
        <p>Terminem tym określa się całkowicie wymyślone lub zmanipulowane informacje przypominające wiarygodne dziennikarstwo. Twórcy fake newsów chcą przyciągnąć uwagę odbiorców, by zrealizować z góry założony cel, np. wygenerować zysk lub przekonać do swoich poglądów</p>
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
      </modal>
    </div>

    <div @click="manipulation=!manipulation" class="vulnerability">
      <pie-chart2 :score="numOfCorrectImageManipulationAnswers" :total="numOfImageManipulationAnswers" />
      <h5>Manipulację obrazem</h5>
      <modal v-show="manipulation" @close="manipulation=false">
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
      </modal>
    </div>
  </div>
  <button type="button" name="button">sprawdź swoje odpowiedzi</button>
</div>
</template>

<script>
  import PieChart2 from '@/components/PieChart2'
  import Modal from '@/components/Modal'

  export default {
    name: 'results',
    components: {
      PieChart2,
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
      numOfAnswers () {
        return this.$store.getters.numOfQuizAnswers;
      },
      numOfCorrectAnswers () {
        return this.$store.getters.numOfCorrectQuizAnswers;
      },
      numOfOmmitedQuestions () {
        return this.$store.getters.numOfOmmitedQuizQuestions;
      },

      numOfEmotionalLanguageAnswers () {
        return this.$store.getters.numOfQuizAnswersByType('emotional-language');
      },
      numOfCorrectEmotionalLanguageAnswers () {
        return this.$store.getters.numOfCorrectQuizAnswersByType('emotional-language');
      },

      numOfClickbaitAnswers () {
        return this.$store.getters.numOfQuizAnswersByType('clickbait');
      },
      numOfCorrectClickbaitAnswers () {
        return this.$store.getters.numOfCorrectQuizAnswersByType('clickbait');
      },

      numOfFakeNewsAnswers () {
        return this.$store.getters.numOfQuizAnswersByType('fake-news');
      },
      numOfCorrectFakeNewsAnswers () {
        return this.$store.getters.numOfCorrectQuizAnswersByType('fake-news');
      },

      numOfImageManipulationAnswers () {
        return this.$store.getters.numOfQuizAnswersByType('image-manipulation');
      },
      numOfCorrectImageManipulationAnswers () {
        return this.$store.getters.numOfCorrectQuizAnswersByType('image-manipulation');
      },

      userInfo () {
        return this.$store.state.userInfo
      }
    },
    methods: {
    }
  }
</script>

<!-- Scoped component css -->
<!-- It only affect current component -->
<style scoped>
  #results {
    /* text-align: center; */
  }

  #results h1 {
    color: #2c3e50;
    font-weight: 300;
  }

  .results {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .results > div {
    width: 50%;

  }
  .results svg{

  }
</style>
