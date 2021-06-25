<template>
  <v-container fluid fill-heigh>
    <v-row align="center" justify="center">
      <v-col align="center" justify="center">
        <v-card width="40vw" height="30vh" class="pa-2">
          <v-col align="center" justify="center">
            <v-row align="center" justify="center">
              <v-col>
                <v-form ref="form">
                  <span class="text-h4 indigo--text">ค่า ON TOP</span>
                  <v-text-field
                    ref="onTop"
                    id="onTop"
                    suffix="เมตร"
                    v-model="onTop"
                    class="text-h4"
                    placeholder="กรอกค่า"
                    style="margin-top:10%;"
                    counter
                    maxlength="8"
                    :rules="onTopRules"
                    @click="textFieldFocusHandler('onTop')"
                    @focus="textFieldFocusHandler('onTop')"
                    @keydown="(event) => updateValue(event, 'onTop')"
                    @keyup="(event) => enterHandler(event, 'onTop')"
                  >
                  </v-text-field>
                </v-form>
              </v-col>
            </v-row>
          </v-col>
        </v-card>
      </v-col>
      <v-col class="pt-0"
        ><TouchKeyboard @keyboard-event="keyboardEventHandler"></TouchKeyboard
      ></v-col>
    </v-row>
    <v-overlay :value="overlay"
      ><v-progress-circular
        :size="50"
        color="indigo"
        indeterminate
      ></v-progress-circular
    ></v-overlay>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import TouchKeyboard from "./TouchKeyboard.vue";
export default {
  components: {
    TouchKeyboard,
  },
  props: {
    oldOnTop: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      currentInput: "",
      onTopRules: [(v) => !!v || "กรุณากรอกค่า ON TOP"],
      overlay: false,
      onTop: "",
    };
  },
  methods: {
    async keyboardEventHandler(event) {
      var element;
      if (event.type == "letter") {
        if (this.currentInput == "onTop") {
          element = this.$refs.onTop.$el.querySelector("input");
          if (
            (this.onTop.length < 8 ||
              element.selectionStart != element.selectionEnd) &&
            (event.value != "0" || element.selectionStart != 0)
          ) {
            var newSelectionStart = element.selectionStart + 1;
            this.onTop =
              this.onTop.substring(0, element.selectionStart) +
              event.value +
              this.onTop.substring(element.selectionEnd);
            this.$nextTick(() => {
              element.focus();
              element.setSelectionRange(newSelectionStart, newSelectionStart);
            });
          }
        }
      } else if (event.type == "action") {
        if (event.value == "delete") {
          if (this.currentInput == "onTop") {
            element = this.$refs.onTop.$el.querySelector("input");
            var newSelectionStart;
            if (element.selectionStart == element.selectionEnd) {
              newSelectionStart = element.selectionStart - 1;
              this.onTop =
                this.onTop.substring(0, element.selectionStart - 1) +
                this.onTop.substring(element.selectionEnd);
            } else {
              newSelectionStart = element.selectionStart;
              this.onTop =
                this.onTop.substring(0, element.selectionStart) +
                this.onTop.substring(element.selectionEnd);
            }
            this.$nextTick(() => {
              element.focus();
              element.setSelectionRange(newSelectionStart, newSelectionStart);
            });
          }
        } else if (event.value == "save") {
          if (this.$refs.form.validate()) {
            this.overlay = true;
            await this.changeOnTopWork({
              on_top: this.onTop,
            });
            this.overlay = false;
            this.$emit("popup-edit-on-top-event", {
              type: event.type,
              value: "saveOntop",
              extraValue: {
                value: this.onTop,
              },
            });
          }
        } else if (event.value == "clear") {
          if (this.currentInput == "onTop") {
            this.onTop = "";
          }
        } else {
          this.onTop = this.oldOnTop;
          this.$emit("popup-edit-on-top-event", {
            type: event.type,
            value: event.value,
          });
        }
      }
    },
    textFieldFocusHandler(type) {
      this.currentInput = type;
    },
    updateValue(event, type) {
      var letters;
      if (type == "onTop") {
        letters = /^[0-9]$/;
        if (
          !event.key.match(letters) &&
          event.key != "Backspace" &&
          event.key != "ArrowUp" &&
          event.key != "ArrowDown" &&
          event.key != "ArrowLeft" &&
          event.key != "ArrowRight" &&
          !event.ctrlKey
        ) {
          event.preventDefault();
        } else if (event.key == "0" && event.target.selectionStart == 0) {
          event.preventDefault();
        }
      }
    },
    ...mapActions(["changeOnTopWork"]),
    enterHandler(event, type) {
      if (event.keyCode == 13) {
        var element;
        if (event.target.id == "onTop") {
          if (this.onTop != "") {
            console.log("save");
          } else {
            element = this.$refs.onTop.$el.querySelector("input");
            element.blur();
            this.$nextTick(() => {
              element.focus();
            });
          }
        }
      }
    },
  },
  mounted() {
    this.onTop = this.oldOnTop;
  },
};
</script>

<style></style>
