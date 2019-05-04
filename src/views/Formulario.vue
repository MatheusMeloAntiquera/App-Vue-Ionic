<template>
  <ion-content>
    <ion-header>
      <ion-toolbar>
        <ion-title>Hello World {{ id }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-item>
      <ion-label position="floating">Titulo</ion-label>
      <ion-input :value="data.title" @input="data.title = $event.target.value"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="floating">Descrição</ion-label>
      <ion-input :value="data.description" @input="data.description = $event.target.value"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label>Feito?</ion-label>
      <ion-checkbox :checked="data.done" @ionChange="data.done = !data.done"></ion-checkbox>
    </ion-item>

    <ion-button
      v-if="this.id"
      @click="del()"
      shape="round"
      color="danger"
      style="margin-top: 20px;"
    >Deletar</ion-button>
    <ion-fab vertical="top" horizontal="end" slot="fixed">
      <ion-fab-button>
        <ion-icon name="arrow-down"></ion-icon>
      </ion-fab-button>
      <ion-fab-list side="bottom">
        <ion-fab-button color="success" @click="salvar()">
          <ion-icon name="checkmark"></ion-icon>
        </ion-fab-button>
        <ion-fab-button color="danger" @click="$router.push('/')">
          <ion-icon name="close"></ion-icon>
        </ion-fab-button>
      </ion-fab-list>
    </ion-fab>
  </ion-content>
</template>

<script lang="ts">
import axios from "axios";

export default {
  created() {
    if (this.id) {
      axios
        .get("http://localhost:3000/tasks/" + this.id)
        .then(res => {
          this.data = res.data;
          this.method = "put";
          this.complementUrl = "/" + this.id;
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  props: ["id"],
  data() {
    return {
      data: { title: "", description: "", done: false },
      method: "post",
      complementUrl: ""
    };
  },
  methods: {
    salvar() {
      axios({
        method: this.method,
        url: "http://localhost:3000/tasks" + this.complementUrl,
        data: JSON.stringify(this.data),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => {
          this.$router.push("/");
        })
        .catch(err => {
          console.error(err);
        });
    },
    del() {
      axios
        .delete("http://localhost:3000/tasks/" + this.id)
        .then(res => {
          this.$router.push("/");
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>
