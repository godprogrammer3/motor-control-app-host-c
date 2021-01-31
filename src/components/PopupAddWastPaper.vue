<template>
  <v-col align="center" justify="center" class="text-h3 pa-5">
    <v-row align="center" justify="center"
      > 
      <v-col>
         <v-card width="40vw" height="30vh" class="pa-2">
          <v-col align="center" justify="center">
            <v-row align="center" justify="center">
              <v-form ref="form">
                <v-col>
                  <span class="text-h4 indigo--text">เพิ่มกระดาษเสีย</span>
                  <v-text-field
                ref="wast"
                id="wast"
                suffix="เมตร"
                v-model="wast"
                class="text-h4"
                placeholder="กรอกค่า"
                @click="textFieldFocusHandler('wast')"
                @focus="textFieldFocusHandler('wast')"
                @keydown="(event)=>updateValue(event,'wast')"
                  @keyup="(event)=>enterHandler(event,'jobId')"
                counter
                maxlength="8"
                :rules="wastRules"
              >
              </v-text-field
            >
                </v-col>
                
              </v-form>
              </v-row>
          </v-col>
        </v-card>
      </v-col>
      <v-col>
        <TouchKeyboard @keyboard-event="keyboardEventHandler" ></TouchKeyboard>
      </v-col>
    </v-row>
    <v-dialog v-model="isDialogShow" elevation="0" :persistent="true">
        <PopupConfirmAddWastPaper
        v-if=" dialogType == 'confirmAddWastPaper'"
        @popup-comfirm-add-wast-paper-event="
        (event) => confirmAddWastPaperEventHandler(event)
      "
        ></PopupConfirmAddWastPaper>
        <PopupConfirmAddWastPaperComplete
        v-else-if=" dialogType == 'confirmAddWastPaperComplete'"
        @popup-comfirm-add-wast-paper-complete-event="
        (event) => confirmAddWastPaperCompleteEventHandler(event)
      "
        ></PopupConfirmAddWastPaperComplete>
      </v-dialog>
  </v-col>
</template>

<script>
import TouchKeyboard from './TouchKeyboard';
import PopupConfirmAddWastPaper from "./PopupConfirmAddWastPaper";
import PopupConfirmAddWastPaperComplete from "./PopupAddWastPaperComplete";
import API from "@/store/api";
export default {
  components: {
    TouchKeyboard,
    PopupConfirmAddWastPaper,
    PopupConfirmAddWastPaperComplete
  },
  props: {
  },
  data() {
    return {
      wastRules: [(v) => !!v || "กรุณากรอกความยาวกระดาษ"],
      wast:'',
      currentInput:'',
      isDialogShow:false,
      dialogType:'',
      api:new API()
    }
  },
  methods: {
    async keyboardEventHandler(event) {
      if (event.type == "letter" && event.value != ".") {
          if (this.currentInput == "wast") {
            element = this.$refs.wast.$el.querySelector("input");
            if( (this.wast.length < 8 || element.selectionStart != element.selectionEnd) && (event.value != '0' || element.selectionStart != 0)){
              var newSelectionStart = element.selectionStart + 1;
              this.wast = this.wast.substring(0,element.selectionStart)+event.value+this.wast.substring(element.selectionEnd);
              this.$nextTick(() => {
                element.focus();
                element.setSelectionRange(newSelectionStart, newSelectionStart);
              });
            }
          }
      }else if(event.type == "action"){
        var element;
        if (event.value == "delete") {
          if (this.currentInput == "wast") {
            element = this.$refs.wast.$el.querySelector("input");
            var newSelectionStart;
              if( element.selectionStart == element.selectionEnd){
                newSelectionStart = element.selectionStart - 1;
                this.wast = this.wast.substring(0,element.selectionStart-1)+this.wast.substring(element.selectionEnd);
              }else{
                newSelectionStart = element.selectionStart;
                this.wast = this.wast.substring(0,element.selectionStart)+this.wast.substring(element.selectionEnd);
              }
              this.$nextTick(() => {
                element.focus();
                element.setSelectionRange(newSelectionStart, newSelectionStart);
              });
          }
        }else if(event.value == "clear" ){
          if (this.currentInput == "wast") {
            this.wast = '';
          }
        }else if (event.value == "save") {
          if (this.$refs.form.validate()) {
            this.dialogType = 'confirmAddWastPaper';
            this.isDialogShow = true;
          }
        }
      }
    },
    textFieldFocusHandler(type) {
      this.currentInput = type;
    },
    updateValue(event,type){
      var letters;
      if(type == 'wast'){
        letters = /^[0-9]$/;
        if( !event.key.match(letters) && event.key != 'Backspace' && event.key!= 'ArrowUp' && event.key!= 'ArrowDown'  && event.key!= 'ArrowLeft' && event.key!= 'ArrowRight' && !event.ctrlKey){
          event.preventDefault();
        }else if(event.key == '0' && event.target.selectionStart == 0){
          event.preventDefault();
        }
      }
    },
    enterHandler(event,type){
      if( event.keyCode == 13){
        var element;
        if(event.target.id == 'wast'){
          if(this.wast != ''){
            if (this.$refs.form.validate()) {
              this.dialogType = 'confirmAddWastPaper';
              this.isDialogShow = true;
          }
          }else{
              element = this.$refs.wast.$el.querySelector("input");
              element.blur();
              this.$nextTick(() => {
              element.focus();
              });
          }
        }
      }
  },
  async confirmAddWastPaperEventHandler(event){
    if( event == 'confirm'){
      this.isDialogShow = false;
      this.api.addWasteInitial(this.wast);
      this.dialogType = 'confirmAddWastPaperComplete';
      this.isDialogShow = true;
    }else{
      this.isDialogShow =false;
    }
  },
  confirmAddWastPaperCompleteEventHandler(event){
    if(event == 'ok'){
      this.wast = '';
      this.$refs.form.resetValidation();
      this.isDialogShow = false;
    }
  }
},
sockets: {
    connect: function() {
      console.log("socket connected in Popup add wast paper");
    },
    START_WORK: function(data) {
      console.log('start work from socket io server.');
      console.log(data);
      this.$emit('popup-add-wast-paper-event',{type: 'action',value:'cancel' , extraValue: data});
    },
  },
};
</script>

<style></style>
