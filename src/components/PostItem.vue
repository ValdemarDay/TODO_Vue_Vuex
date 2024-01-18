<template>
    <div id="mainCont">
        <h2>{{ post.title }}</h2>
        <h4 v-if="!editing">{{ post.todo }}</h4>
        <input v-else type="text" :value="postText" @change="PostTextChange" />
        <div class="WrapperButton">
            <button @click="updateTextChange(post)" class="buttonEdit">
                {{ editing ? "Update" : "Edit" }}
            </button>
            <button @click="deletePost(post.id)" class="buttonDelete">
                Delete
            </button>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    data() {
        return {
            postText: "",
            editing: false,
        };
    },
    props: ["post"],
    name: "PostItem",
    methods: {
        ...mapActions(["deletePost", "updateMessage"]),
        PostTextChange(e) {
            this.postText = e.target.value;
        },
        updateTextChange(post) {
            this.editing = this.editing == true ? false : true;
            if (this.editing) {
                this.postText = post.todo;
                this.updateMessage(post);
            } else {
                localStorage.setItem(
                    "localAdd",
                    JSON.stringify(
                        JSON.parse(
                            localStorage.getItem("localAdd") ?? "[]"
                        ).map((item) => {
                            item.todo = this.postText;
                            console.log(item.todo);
                            return item;
                        })
                    )
                );
                post.todo = this.postText;
            }
        },
    },
};
</script>

<style>
#mainCont {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 60px auto;
    width: 400px;
}

.WrapperButton {
    width: 250px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px auto;
}

.buttonEdit {
    background-color: #44c767;
    border-radius: 18px;
    border: 1px solid #18ab29;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
    font-family: Arial;
    padding: 15px;
    text-decoration: none;
    text-shadow: 0px 1px 0px #2f6627;
}

.buttonDelete {
    box-shadow: inset 0px 39px 0px -24px #e67a73;
    background-color: #e4685d;
    border-radius: 4px;
    border: 1px solid #ffffff;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
    font-family: Arial;
    padding: 15px;
    text-decoration: none;
    text-shadow: 0px 1px 0px #b23e35;
}
</style>
