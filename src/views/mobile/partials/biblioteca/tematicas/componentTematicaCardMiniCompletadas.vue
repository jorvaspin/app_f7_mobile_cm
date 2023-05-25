<template>
    <div>
        <div class="cm-card-tematica cm-card-tematica-mini">
          <div v-if="tematica.valido_tematica" class="absolute inline-flex gap-2 -top-4 right-1">
              <badge-warning>{{ $filters.formatNumber(tematica.valido_tematica.puntaje_obtenido) }} XP</badge-warning>
              <badge-success>Completada</badge-success>
          </div>
            <span class="label-gradient label-warning label-points">{{ $filters.formatNumber(tematica.tematica.valido_tematica.puntaje_obtenido)}} XP</span>
            <div class="image-tematica" :style="'background-image: url('+tematica.tematica.imagen_portada+');'">
                <span class="number-tematica">
                    {{tematica.tematica.order}}
                </span>
                <span class="label-gradient label-success label-completada">Completada</span>
            </div>
            <div class="content-tematica">
                    <h5 class="text-2xl title-tematica font-display">{{tematica.tematica.value}}</h5>
                    <div class="description-tematica font-sm">
                        <span v-html="tematica.tematica.breve_descripcion.substring(0,45)+'...'"></span>
                        <button class="ml-3 btn btn-default btn-sm btn-ver" v-on:click="showLesson(tematica.tematica.slug, page, sectionName), buttonClick()">
                            Ver
                        </button>
                    </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name: 'cardTematica',
    props: [
        'tematica',
        'page',
        'sectionName'
    ],
}

</script>
