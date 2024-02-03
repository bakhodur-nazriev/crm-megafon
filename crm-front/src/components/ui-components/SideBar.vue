<template>
  <nav>
    <button
        class="burger-button"
        @click="toggleSidebar"
        type="button"
    >
      <font-awesome-icon icon="bars" size="lg"/>
    </button>
  </nav>

  <div @click="closeSideBar()" class="background-cover" v-if="isSideBarShow"></div>

  <aside class="sidebar" :class="{ 'show-sidebar': isSideBarShow }">

    <div class="bg-info-subtle p-3 rounded-3 d-flex align-items-center gap-2">
      <font-awesome-icon icon='user' size="lg"/>
      <h5 class="m-0">{{ userName }}</h5>
    </div>
    <hr class="divider">
    <template v-for="(group, groupKey) in items" :key="groupKey">
      <router-link class="sidebar-items" :to="{ name: group.route, params: { myParam: group.type } }" @click="closeSideBar()">
        <font-awesome-icon :icon="group.icon"/>
        {{ group.title }}
      </router-link>
    </template>
    <div class="mb-3 sidebar-items">
      <font-awesome-icon icon="running"/>
      <button class="" @click="exit()">Выход</button>
    </div>
  </aside>

  <main class="main content">
    <router-view></router-view>
  </main>
</template>

<script>

import {library} from "@fortawesome/fontawesome-svg-core";
import {
  faCoffee,
  faHouse,
  faWarehouse,
  faBoxes,
  faBuilding,
  faFileInvoice,
  faExpand,
  faHome,
  faProjectDiagram,
  faDollar,
  faPerson,
  faCoins,
  faAdjust,
  faRunning,
  faCubes,
  faBook,
  faBattery,
  faTruckLoading,
  faShippingFast,
  faUser, faUsers, faArrowLeft, faBars,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

library.add(
    faCoffee,
    faHouse,
    faWarehouse,
    faBoxes,
    faBuilding,
    faFileInvoice,
    faExpand,
    faHome,
    faProjectDiagram,
    faDollar,
    faPerson,
    faCoins,
    faAdjust,
    faRunning,
    faCubes,
    faBook,
    faBattery,
    faTruckLoading,
    faShippingFast,
    faUser,
    faUsers,
    faArrowLeft,
    faBars
);

export default {
  components: {FontAwesomeIcon},
  data() {
    return {
      userName: '',
      selectedOption: null,
      isSideBarShow: true,
      items: [
          {
            route: 'applications',
            title: 'applications',
            icon: 'cubes',
            type: ''
          },
          {
            route: 'users',
            title: 'Пользователи',
            icon: 'users',
            type: ''
          },
        {
          route: 'clients',
          title: 'clients',
          icon: 'person',
          type: ''
        },

        ],
      sideBarItems: [],
    };
  },
  methods: {
    closeSideBar() {
      this.isSideBarShow = false;
    },
    toggleSidebar() {
      this.isSideBarShow = !this.isSideBarShow;

    },
    exit() {
      this.$store.commit('isLoading', true);
      localStorage.clear();
      this.$router.push({name: 'login'});
      this.$store.commit('isLoading', false);
    },
  },
  mounted() {
    this.userName = localStorage.getItem('userName');
  }
};
</script>

<style scoped>
.divider {
  margin: 10px 0;
}

.button-inactive {
  margin: 0 20px 20px;
  padding: 10px 15px;
  outline: none;
  border: none;
  border-radius: 10px;
  height: max-content;
  width: max-content;
  background-color: #fff;

  svg {
    color: grey;
  }
}

.burger-button {
  display: none;
}

body {
  margin: 0;
  font-family: 'Arial', sans-serif;
  overflow: hidden;
}

.sidebar {
  overflow-y: auto;
  overflow-x: hidden;
  position: fixed;
  height: 100%;
  background-color: #8ec3e5;
  color: #016f20;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-right: 2px solid #a9c8d8;
  font-size: 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

  a {
    text-decoration: none;
    color: white;
    line-height: 1;
  }

  .sidebar-items {
    display: flex;
    align-content: center;
    padding: 10px 20px;
    gap: 10px;
    margin: 0;
    border-radius: 10px;

    button {
      all: unset;
      color: white;
      cursor: pointer;
    }

    &.router-link-active {
      background-color: grey;
    }

    &:hover {
      background-color: grey;
    }

    svg {
      width: 18px;
      height: 18px;
      color: white;
    }
  }
}

.main {
  margin-left: 240px;
}

@media (max-width: 600px) {
  .sidebar {
    display: none;
    overflow-y: auto;
    position: fixed;
    width: max-content;
    height: 100%;
    background-color: #8ec3e5;
    flex-direction: column;
    border-right: 2px solid #a9c8d8;
    font-size: 14px;
    z-index: 6;
    margin-top: 0;
    top: 0;
  }

  .background-cover {
    position: fixed;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    inset: 0;
    -webkit-tap-highlight-color: transparent;
    background-color: rgba(22, 28, 36, 0.8);
    z-index: 5;
  }

  .show-sidebar {
    display: flex;
  }

  .main {
    margin-left: 4px;
  }

  .burger-button {
    display: flex;
    padding: 0;
    margin: 25px 30px 0;
    outline: none;
    background: none;
    border: none;
    height: max-content;
  }

  .content {
    flex-grow: 1;
    padding: 20px;
  }
}

.content {
  flex-grow: 1;
  padding: 20px;
}

h1 {
  margin: 0;
  color: #333;
}
</style>
