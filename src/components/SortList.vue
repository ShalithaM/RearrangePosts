<template>
  <div>
    <div class="flex mb-4">
      <div class="w-1/2">
        <div class="flex">
          <div class="w-1/5"></div>
          <div class="w-3/5">
            <div class="text-left p-3 m-1">
              <h2 class="text-lg">Sortable Post List</h2>
            </div>
          </div>
        </div>
        <div class="w-1/5"></div>

        <div class="flex">
          <div class="w-1/5"></div>
          <div class="w-3/5">
            <div
              v-for="(post, index) in posts"
              :key="post.id"
              class="flex-1 bg-white text-center rounded-lg p-1 m-4"
            >
              <!-- up arrow -->
              <div class="flex justify-end m-1">
                <svg
                  v-if="index != 0"
                  class="fill-current text-gray-500 w-3 h-3 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                  stroke="currentColor"
                  @click="upArrowFn(index, post)"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="{2}"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </div>

              <!-- content -->
              <div class="text-center md:text-left m-1">
                <h2 class="text-sm">Post {{ post.id }}</h2>
                <h2 class="text-lg">{{ post.title }}</h2>
              </div>

              <!-- down arrow -->
              <div class="flex justify-end m-1">
                <svg
                  v-if="index != itemLength"
                  class="fill-current text-gray-500 w-3 h-3 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                  stroke="currentColor"
                  @click="downArrowFn(index, post)"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="{2}"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div class="w-1/5"></div>
        </div>
      </div>

      <div class="w-1/2">
        <div class="w-1/5"></div>

        <div class="flex">
          <div class="w-2/12"></div>
          <div class="w-8/12">
            <div class="flex-1 bg-white text-center rounded-lg p-1 m-4">
              <!-- header -->
              <div class="text-center md:text-left m-1">
                <h2 class="text-lg">List of actions committed</h2>
                <h2 v-if="isError" class="text-sm text-red-400">
                  This is a stack. Please select the first element
                </h2>
              </div>

              <div
                class="flex-1 bg-gray-200 text-center rounded-lg p-2 m-4"
                v-for="(postAction, index) in postActions"
                :key="postAction.id"
              >
                <!-- actions -->
                <div class="flex">
                  <div class="w-3/5 p-2">
                    <h2 class="text-md">
                      Moved post {{ postAction.postId }} from index
                      {{ postAction.previousIndex }} to index
                      {{ postAction.newIndex }}
                    </h2>
                  </div>
                  <div class="w-2/5">
                    <button
                      class="bg-teal-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      @click="timeTravelFn(index, postAction)"
                    >
                      Time Travel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-2/12"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SortList",
  props: ["sort"],

  data() {
    return {
      isError: false,
    };
  },
  computed: {
    ...mapGetters({
      posts: "getPosts",
      postActions: "getPostsActions",
    }),
  },

  mounted() {
    this.$store.dispatch("setPosts");
  },

  methods: {
    /* -----------------------------Up arrow function------------------------------------------------ 
     * Up arrow click event function
     * param: index, post
     */
    upArrowFn(index, post) {
      /*
       * Call swap funtion in store
       * param: index_1, index_2
       */
      let swapPayload = {
        index_1: index,
        index_2: index - 1,
      };
      this.$store.dispatch("swapElements", swapPayload);

      /*
       * Call save post action in the store
       * param: postId, previousIndex, newIndex, id
       * Save timestamp as id
       */
      let date = new Date();

      let actionPayload = {
        postId: post.id,
        previousIndex: index + 1,
        newIndex: index,
        id: date.getTime(),
      };

      this.$store.dispatch("setPostAction", actionPayload);
    },

    /* -----------------------------Down arrow function------------------------------------------------ 
     * Down arrow click event function
     * param: index, post
     */
    downArrowFn(index, post) {
      /*
       * Call swap funtion in store
       * param: index_1, index_2
       */
      let swapPayload = {
        index_1: index,
        index_2: index + 1,
      };
      this.$store.dispatch("swapElements", swapPayload);

      /*
       * Call save post action in the store
       * param: postId, previousIndex, newIndex, id
       * Save timestamp as id
       */
      let date = new Date();

      let actionPayload = {
        postId: post.id,
        previousIndex: index + 1,
        newIndex: index + 2,
        id: date.getTime(),
      };

      this.$store.dispatch("setPostAction", actionPayload);
    },

    /* -----------------------------Time travel function------------------------------------------------ 
     * Time travel button click event function
     * param: index, postAction
     */
    timeTravelFn(index, postAction) {
      if (index == 0) {
        this.$store.dispatch("timeTravel", postAction);
        this.$store.dispatch("removePostAction", index);
        this.isError = false;
      } else {
        this.isError = true;
      }
    },
  },
};
</script>
