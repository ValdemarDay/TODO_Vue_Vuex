<template>
    <div>
        <h1>{{ postsCount }}</h1>
        <div class="post" v-for="post in validPosts" :key="post.id">
            <PostItem :post="post"/>
        </div>
    </div>
</template>

<script>
import PostItem from "./PostItem.vue";
import { mapGetters, mapActions } from "vuex";
        
export default {
    name: "PostList",
    props: [],
    methods: mapActions(["fetchPosts"]),
    components: { PostItem },
    computed: mapGetters(["validPosts", "postsCount"]),
    async mounted() {
        this.fetchPosts();
    },
};
</script>

<style>
.post {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 20px;
}
</style>
