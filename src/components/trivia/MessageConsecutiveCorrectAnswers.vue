<template>
    <XyzTransition
        appear
        mode="in-out"
        duration="auto"
        class="w-full h-full"
        xyz="fade out-delay-5"
    >
        <div
            v-if="showMessage"
            class="fixed inset-0 z-[99998] flex flex-col items-center content-center justify-center w-full h-full mx-auto bg-opacity-95"
            :class="[
                {
                    'bg-green-500': consecutiveCorrectAnswers >= 3,
                    'bg-red-500': consecutiveCorrectAnswers >= 5,
                },
            ]"
            @click.prevent="showMessage = false"
        >
            <div
                class="text-yellow-300 text-7xl xyz-nested font-display"
                xyz="fade flip-right big down in-delay-4"
            >
                {{ message.title }}
            </div>
            <div
                class="w-full p-6 pr-10 text-4xl text-center text-white rounded-lg xyz-nested text-shadow-sm font-display"
                xyz="fade down in-delay-7"
            >
                {{ message.content }}
            </div>
        </div>
    </XyzTransition>
</template>
<script>
export default {
    name: "MessageConsecutiveCorrectAnswers",
    props: {
        consecutiveCorrectAnswers: { type: Number, require: true, default: 0 },
    },
    data() {
        return {
            showMessage: false,
        };
    },
    mounted: function () {
        // const vm = this;
        this.showMessage = true;
        setTimeout(() => (this.showMessage = false), 4500);
        // }
    },
    computed: {
        message: function () {
            const answers = this.consecutiveCorrectAnswers;
            switch (answers) {
                case 3:
                    return {
                        title: 'Wow...',
                        content: '3 respuestas correctas seguidas!'
                        };
                    break;
                case 5:
                default:
                    return {
                        title: '¡Fantástico!',
                        content: 'Una racha de 5 respuestas correctas seguidas!'
                        };
                    break;
            }
        },
    },
};
</script>
