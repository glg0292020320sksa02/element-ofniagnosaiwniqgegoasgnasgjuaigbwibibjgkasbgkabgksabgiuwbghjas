<template>
  <div class="market-trending bg-white p-10 rounded">
    <div class="flex justify-between items-center p-5 border-b">
      <h1 class="font-bold text-headline text-xl">
        {{ $t('marketTrending') }}
      </h1>
      <div class="space-x-2">
        <button
          :class="{
            'text-primary': isGrid,
            'opacity-50 cursor-not-allowed': isPending,
          }"
          aria-label="Show type grid"
          @click="type = 'grid'"
        >
          <svg-icon name="menu-grid" size="18"></svg-icon>
        </button>
        <button
          :class="{
            'text-primary': isList,
            'opacity-50 cursor-not-allowed': isPending,
          }"
          aria-label="Show type list"
          @click="type = 'list'"
        >
          <svg-icon name="menu-list" size="18"></svg-icon>
        </button>
      </div>
    </div>

    <div v-if="isList" class="px-6 border-b">
      <div class="list-container text-xs font-semibold uppercase">
        <div class="coin">
          <div>{{ $t('assets') }}</div>
        </div>
        <div class="price">
          <div>{{ $t('price') }}</div>
        </div>
        <div class="change">
          <div>{{ $t('change') }}</div>
        </div>
        <div class="marketCap">
          <div>{{ $t('marketCap') }}</div>
        </div>
        <div class="trending text-center">
          <div>{{ $t('trending') }}</div>
        </div>
      </div>
    </div>

    <template v-if="isPending">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <item-loader v-for="market in 6" :key="market"></item-loader>
      </div>
    </template>

    <template v-else>
      <transition-group
        name="transform-type"
        class="grid"
        :class="{
          'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4': isGrid,
          'grid-cols-1 divide-y': isList,
        }"
      >
        <market-trending-item
          v-for="market in marketTrendingSelected"
          :key="market.id"
          :market="market"
          :is-grid="isGrid"
          :is-list="isList"
        ></market-trending-item>
      </transition-group>
    </template>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import MarketTrendingItem from '@/components/pages/home/market-trending/market-item'
import ItemLoader from '@/components/pages/home/market-trending/item-loader'

const START_MARKET_SELECTED = 0
const MAX_LENGTH_MARKET_SELECTED = 6

export default {
  name: 'MarketTrending',
  components: { ItemLoader, MarketTrendingItem },
  async fetch() {
    this.marketTrendingList = await this.getListingLatest()
  },
  data() {
    return {
      type: 'grid',
      marketTrendingList: [],
    }
  },
  computed: {
    marketTrendingSelected() {
      return this.marketTrendingList.slice(
        START_MARKET_SELECTED,
        MAX_LENGTH_MARKET_SELECTED
      )
    },
    isGrid() {
      return this.type === 'grid'
    },
    isList() {
      return this.type === 'list'
    },
    isPending() {
      return this.$fetchState.pending
    },
  },
  methods: {
    ...mapActions({
      getListingLatest: 'market/getListingLatest',
    }),
  },
}
</script>

<style lang="scss">
.market-trending {
  .grid-container {
    display: grid;
    grid-template-columns: 20px 2fr 1fr;
    grid-template-rows: 20px 30px 1fr;
    grid-template-areas:
      'image coin coin time'
      'price price change change'
      'trending trending trending trending';
  }

  .list-container {
    display: grid;
    grid-template-columns: 50px repeat(6, 1fr);
    grid-template-rows: 1fr;
    grid-template-areas: 'image coin price change marketCap trending trending';
  }

  .image {
    grid-area: image;
  }

  .coin {
    grid-area: coin;
  }

  .price {
    grid-area: price;
  }

  .time {
    grid-area: time;
  }

  .change {
    grid-area: change;
  }

  .marketCap {
    grid-area: marketCap;
  }

  .trending {
    grid-area: trending;
  }

  .grid-container .trending {
    @apply mt-6;
  }
  .grid-container .change,
  .grid-container .time {
    @apply text-right;
  }
  .grid-container .coin {
    @apply ml-1;
  }

  .list-container > div {
    height: 50px;
    line-height: 50px;
  }
  .list-container .image {
    padding: 10px 0;
  }

  .transform-type-move {
    transition: transform 0.4s;
  }
}
</style>
