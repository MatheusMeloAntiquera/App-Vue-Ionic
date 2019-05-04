<template>
  <ion-content>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tarefas</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-list>
      <ion-item v-for="tarefa in tarefas" :key="tarefa.id" v-show="!tarefa.done">
        <!-- <ion-icon id="icon-done"  size="large" name="checkmark"></ion-icon> -->
        <ion-row>
          <ion-col>
            <ion-checkbox :checked="tarefa.done" @ionChange="done(tarefa.id, !tarefa.done)"></ion-checkbox>
          </ion-col>
          <ion-col align-self-center @click="edit(tarefa.id)" >
            <ion-label>
              <h1 :class="{ done: tarefa.done }">{{ tarefa.title }}</h1>
            </ion-label>
          </ion-col>
        </ion-row>
      </ion-item>
    </ion-list>
    <ion-list>
      <ion-item-divider>
        <ion-label>Concluidos</ion-label>
        <ion-button slot="end" color="primary" @click="showDones = !showDones">
          <ion-icon :name="iconButtonListDones"></ion-icon>
        </ion-button>
      </ion-item-divider>
      <ion-item v-for="tarefa in tarefas" :key="tarefa.id" v-show="tarefa.done && showDones">
        <!-- <ion-icon id="icon-done"  size="large" name="checkmark"></ion-icon> -->
        <ion-row>
          <ion-col>
            <ion-checkbox :checked="tarefa.done" @ionChange="done(tarefa.id, !tarefa.done)"></ion-checkbox>
          </ion-col>
          <ion-col align-self-center>
            <ion-label>
              <h1 :class="{ done: tarefa.done }">{{ tarefa.title }}</h1>
            </ion-label>
          </ion-col>
        </ion-row>
      </ion-item>
    </ion-list>

    <router-link to="/tarefas/form" tag="ion-fab" vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button>
        <ion-icon name="add"></ion-icon>
      </ion-fab-button>
    </router-link>
  </ion-content>
</template>

<script>

export default {
  computed: {
    iconButtonListDones() {
      if (this.showDones) {
        return "arrow-up";
      }
      return "arrow-down";
    }
  },
  data() {
    return {
      tarefas: [],
      showDones: false
    };
  },
  methods: {
    loadTasks() {
      this.$tasks
        .get("/")
        .then(res => {
          this.tarefas = res.data;
        })
        .catch(err => {
          console.error(err);
        });
    },
    done(id, status) {
      this.$tasks
        .put("/" + id, { done: status })
        .then(res => {
          this.loadTasks();
        })
        .catch(err => {
          console.error(err);
        });
    },
    edit(id) {
      this.$router.push({ name: 'form', params: { id } })
    }
  },
  created() {
    this.loadTasks();
  }
};
</script>

<style>
.done {
  text-decoration: line-through;
}

#icon-done {
  color: blue;
}
</style>
