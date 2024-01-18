export default {
    state: {
        posts: [],
    },
    getters: {
        validPosts(state) {
            return state.posts.filter((p) => {
                return p.id && p.todo;
            });
        },
        allPosts(state) {
            return state.posts;
        },
        postsCount(state, getters) {
            return getters.validPosts.length;
        },
    },
    mutations: {
        updatePosts(state, post) {
            state.posts = post;
        },
        createPost(state, newPost) {
            const data = JSON.parse(localStorage.getItem("localAdd")) ?? [];
            state.posts.push(newPost);
            const arrSave = [...data, newPost];
            localStorage.setItem("localAdd", JSON.stringify(arrSave));
        },
        deletePost(state, id) {
            localStorage.setItem(
                "localAdd",
                JSON.stringify(
                    JSON.parse(localStorage.getItem("localAdd") ?? "[]").filter(
                        (item) => item.id !== id
                    )
                )
            );
            // очистка массива в localstorage, но с сервера все равно придут те же элементы списка
            localStorage.setItem(
                "posts",
                JSON.stringify(
                    JSON.parse(localStorage.getItem("posts") ?? "[]").filter(
                        (item) => item.id !== id
                    )
                )
            );
            state.posts = state.posts.filter((p) => {
                return p.id != id;
            });
            return state.posts;
        },
        updateMessage(state, post) {
            let index = state.posts.findIndex((p) => p.id == post.id);
            if (index != -1) {
                state.posts[index] = post;
            }
        },
    },
    actions: {
        async fetchPosts(ctx, limit = 3) {
            const res = await fetch(
                "https://dummyjson.com/todos?limit=" + limit
            );
            const posts = await res.json();
            localStorage.setItem("posts", JSON.stringify(posts.todos));
            const localArr = JSON.parse(localStorage.getItem("localAdd")) ?? [];
            const saveArr = [...posts.todos, ...localArr];
            localStorage.setItem("saveArr", JSON.stringify(saveArr));
            ctx.commit("updatePosts", saveArr);
        },
        updatePosts(ctx, post) {
            ctx.commit("updatePosts", post);
        },
        deletePost: (ctx, id) => {
            ctx.commit("deletePost", id);
        },
        updateMessage(ctx, post) {
            ctx.commit("updateMessage", post.todo);
        },
    },
};
