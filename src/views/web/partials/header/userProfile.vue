<template>
  <div class="relative" x-data="{userMenu: false}" x-on:keydown.escape="userMenu = false" x-on:close-popover-group.window="userMenu = false">
    <button type="button" x-state:on="Item active" x-state:off="Item inactive" class="flex items-center text-base font-medium text-gray-900 bg-transparent rounded-md group hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75" x-bind:class="{ 'text-gray-900': userMenu, 'text-gray-500': !(userMenu) }" x-on:click="userMenu = true" x-on:mousedown="if (userMenu) $event.preventDefault()" aria-expanded="true" x-bind:aria-expanded="userMenu.toString()">
      <span class="bg-white border-2 border-white rounded-full w-9"><user-avatar :showCountry="false"></user-avatar></span>
        <svg class="w-4 h-4 ml-2 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
    </button>
      <div x-show="userMenu" x-transition:enter="transition ease-out duration-200" x-transition:enter-start="opacity-0 translate-y-1" x-transition:enter-end="opacity-100 translate-y-0" x-transition:leave="transition ease-in duration-150" x-transition:leave-start="opacity-100 translate-y-0" x-transition:leave-end="opacity-0 translate-y-1" class="absolute right-0 z-10 w-screen max-w-xs px-2 mt-1 transform translate-x-4 sm:px-0" x-ref="panel" x-on:click.away="userMenu = false">
        <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          <div class="relative grid px-3 py-4 bg-white gap-y-6 sm:gap-y-3 sm:p-4">

              <button @click="$f7router.navigate({ name: 'cm.perfil' }), buttonClick()" class="flex items-start p-3 ml-0 text-left transition duration-150 ease-in-out rounded-lg hover:bg-indigo-50">
                <span class="w-12 bg-white border-2 border-white rounded-full"><user-avatar :showCountry="false"></user-avatar></span>
                <div class="ml-4">
                  <p class="text-base text-gray-800 font-display">
                    Editar mi perfil
                  </p>
                  <p class="mt-1 text-xs text-gray-600">
                   Accede a toda la información de tu perfil y/o actualiza los datos.
                  </p>
                </div>
              </button>

                <div class="ml-4">
                  <p class="text-base text-gray-800 font-display">
                    Centro de ayuda
                  </p>
                  <p class="mt-1 text-xs text-gray-600">
                    Incluimos toda la información para que aprendas a usar tu perfil de estudiante.
                  </p>
                </div>
              </a>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>
