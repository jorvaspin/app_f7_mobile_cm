<template>
  <div class="row" v-if="$store.state.settings.ACTIVAR_TORNEO_NACIONAL">
      <div class="col">
          <div class="card rankingCurso">
              <div class="card-body" v-if="this.$store.state.rankingTorneoCincoMejoresData.length > 0">
                  <h3>Torneo Nacional de Educación <br> Cívica</h3>
                  <p>De acuerdo a todos los {{this.$store.state.user.curso.nivel.value}} a nivel nacional.</p>
                  <div class="scrol-ranking-nacional">
                      <div v-for="(miranking, index) in this.$store.state.rankingTorneoCincoMejoresData" class="row alumnoRanking" :id="'alumno'+miranking.user_id" v-bind:class="miranking.user_id == $store.state.user.id ? 'active alumnoActivo' : ''" v-bind:key="index">
                          <div class="col d-flex align-items-center">
                              <div class="posicion">
                                  {{index+1}}
                              </div>
                              <div class="avatar">
                                  <img :src="miranking.avatar" alt="" class="img-fluid">
                              </div>
                              <div class="nombre">
                                  {{miranking.nick}}
                                  <span class="label label-default">
                                      {{miranking.comuna}}
                                  </span>
                              </div>
                              <div class="puntaje">
                                  {{$filsters.formatNumber(miranking.puntaje)}} XP
                              </div>
                          </div>
                      </div>
                      <div class="botonVerMas" v-show="this.$store.state.rankingTorneoCincoMejoresData.length >= 5">
                          <button class="btn btn-secondary" v-on:click="goToRankingTorneoNacional()">
                              Ver ranking
                          </button>
                      </div>
                  </div>
                  <i class="fad fa-chess-rook"></i>
              </div>
              <div class="card-body" v-else>
                  <div class="row">
                      <div class="col">
                          <h5 class="card-title">
                              Torneo Nacional de Educación <br> Cívica
                          </h5>
                          <p>
                              De acuerdo a todos los {{this.$store.state.user.curso.nivel.value}} a nivel nacional.
                          </p>
                      </div>
                  </div>
                  <div class="row alumnoRanking">
                      <div class="col d-flex align-items-center">
                          <h6>Aún no tenemos información recopilada<br>sobre el torneo nacional de Cívicamente para mostrar :(</h6>
                      </div>
                  </div>
                  <i class="fad fa-chess-rook"></i>
              </div>
          </div>
       </div>
    </div>
</template>
