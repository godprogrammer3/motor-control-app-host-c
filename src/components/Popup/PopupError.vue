<template>
  <v-container fluid fill-heigh>
    <v-row align="center" justify="center">
      <v-col align="center" justify="center">
           <v-card width="50vw" >
        <v-row align="center" justify="center"> 
          <v-col align="center" justify="center" class="text-h4">
              <span class="red--text">เกิดข้อผิดพลาดในการดำเนินการ!</span>
          </v-col>
        </v-row>
        <v-row align="center" justify="center"> 
          <v-col align="center" justify="center" class="text-h3">
              <span>{{value.errorMessage}}</span>
          </v-col>
        </v-row>
        <v-row align="center" justify="center"> 
          <v-col align="center" justify="center">
               <v-btn
        class="text-h4 white--text px-10"
        style="height:auto;width:auto;"
        color="indigo"
        @click="$emit('popup-error-event',{type:'action',value:'error'})"
      >
        ย้อนกลับ
      </v-btn>
          </v-col>
        </v-row>
      </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
    props: {
        value: {
            type: Object,
            default: ()=>{},
        },
    },
}


</script>
