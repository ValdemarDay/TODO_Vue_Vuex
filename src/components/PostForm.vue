<template>
    <form @submit.prevent="submit">
        <input type="text" placeholder="title" v-model="title" />
        <input type="text" placeholder="body" v-model="body" />
        <button type="submit">Create post</button>
        <hr />
    </form>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    name: "PostForm",
    data() {
        return {
            title: "",
            body: "",
        };
    },
    methods: {
        ...mapMutations(["createPost"]),
        submit() {
            this.createPost({
                id: Date.now(),
                todo: this.body,
                title: this.title,
            });
            this.title = this.body = "";
        },
    },
};
</script>

<style scoped>
input {
    display: block;
    width: 100%;
    border: 1px solid gray;
    border-radius: 2px;
    padding: 10px;
    margin-bottom: 10px;
}
</style>
