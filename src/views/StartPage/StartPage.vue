<template lang="">
    <article>
        <h1>Доброго дня, тутова\здеся находится стартовая страница.</h1>
        <ol>
            <li>
                в этой репе не мало недоделок, так как я тороплюсь и адаптивность здесь не так важна. (хотя она есть, но
                это по тому что привычка делать ее сразу)
            </li>
            <li>
                время от вермени она возможно будет допиливаться, если будет не лень этим заниматься и будут веселые
                кейсы в голове
            </li>
            <li>
                время от вермени она возможно будет допиливаться, если будет не лень этим заниматься и будут веселые
                кейсы в голове
            </li>
            <li>
                По хорошему надо было бы добавить I18n, axios\graphQL и т.д., но пока-что итак много времени потратил
            </li>
            <li>
                В данном репозитории специально используются разные подходы\возможности реализации компонентов, что-бы
                показать, как можно сделать (кроме Options Api, с ним давно не работал)
            </li>
            <li>
                Пожалуйста, не обращайте винмания, что Иконки сделаны костыльно через charcode\или вставлены как текст,
                тк кастомные иконки под NDA, а какую-то либу для того, что-бы показать что-то тащить нет желания
            </li>
        </ol>
    </article>
    <article class="mt-16">
        <h2>А пока-что поиграйтесь с нотификациями</h2>
        <div class="notification-buttons">
            <BaseButton v-bind="button" @click="addToast(button.action)" v-for="button of buttons" :key="button.id" />
        </div>
    </article>
</template>
<script>
import { defineComponent } from "vue";
import { useStartPage } from "./useStartPage";
import { useNotificationsStore } from "@/stores";

const StartPage = defineComponent({
    name: "StartPage",
    setup() {
        const notificationStore = useNotificationsStore();

        const { addToast, buttons } = useStartPage(notificationStore);

        return { buttons, addToast };
    },
});
export default StartPage;
</script>
<style lang="scss">
@import "./scss/start-page";
</style>
