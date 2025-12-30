<script setup lang="ts">
import { FancyButton, LinkButton, ScrollArea } from '@youcan/celeste';

const { data: product, pending, execute: generateProduct } = useApi('/api/products/generate', { immediate: false, method: 'POST' });
const { data: store } = useApi('/api/store');
</script>

<template>
  <div class="col-span-8 space-y-4">
    <div class="p-4 border border-stroke-soft-200 rounded-12px bg-bg-white-0 shadow-regular-xs space-y-2 space-y-2">
      <h2 class="label-sm">
        Welcome to the YouCan app Nuxt template 🐱
      </h2>
      <p class="text-text-sub-600">
        This is an embedded app that uses
        <LinkButton
          href="https://github.com/youcan-shop/qantra"
          target="_blank"
          underline
          intent="gray"
        >
          YouCan Qantra
        </LinkButton>
        with the YouCan REST API to provide a reasonable primer for app development.
      </p>

      <p class="text-text-sub-600">
        If you have questions or need assistance, do not hesitate to reach out at
        <LinkButton
          href="mailto:partners@youcan.shop"
          target="_blank"
          underline
          intent="gray"
        >
          <span>partners@youcan.shop</span>
        </LinkButton>.
      </p>
    </div>

    <div class="p-4 border border-stroke-soft-200 rounded-12px bg-bg-white-0 shadow-regular-xs space-y-2">
      <h2 class="label-sm">
        Generate a product
      </h2>

      <p class="text-text-sub-600">
        Generate a product using the YouCan REST API and get the JSON response. Learn more about product creation in our
        <LinkButton
          href="https://developer.youcan.shop/store-admin/introduction/getting-started"
          target="_blank"
          underline
          intent="gray"
        >
          API Reference
        </LinkButton>.
      </p>

      <FancyButton
        class="mt-2 relative"
        size="xs"
        intent="neutral"
        @click="generateProduct"
      >
        <span :class="{ 'opacity-0': pending }" class="pointer-events-none">
          Generate a product
        </span>

        <template v-if="pending">
          <div class="flex items-center inset-0 justify-center absolute">
            <i class="i-celeste-loader-4-line animate-spin" />
          </div>
        </template>
      </FancyButton>

      <ScrollArea v-if="product" class="mt-4 border border-stroke-soft-200 rounded-10px bg-bg-weak-50 h-400px">
        <pre class="text-sm text-text-strong-950 font-mono p-4 whitespace-pre-wrap break-words">{{ JSON.stringify(product, null, 4) }}</pre>
      </ScrollArea>
    </div>
  </div>

  <aside class="col-span-4 space-y-4">
    <div class="p-4 border border-stroke-soft-200 rounded-12px bg-bg-white-0 shadow-regular-xs">
      <h2 class="label-sm">
        Store Info
      </h2>
      <ul v-if="store" class="text-text-sub-600 mt-2 space-y-2">
        <li>
          <span>Name: </span>
          <span class="text-text-strong-950">{{ store.name }}</span>
        </li>
        <li>
          <span>Slug: </span>
          <span class="text-text-strong-950">{{ store.slug }}</span>
        </li>
        <li>
          <span>Domain: </span>
          <LinkButton
            :href="`https://${store.domain}`"
            intent="black"
            target="_blank"
            underline
          >
            {{ store.domain }}
          </LinkButton>
        </li>
        <li>
          <span>Currency: </span>
          <span class="text-text-strong-950">{{ store.currency.code }}</span>
        </li>
      </ul>
    </div>

    <div class="p-4 border border-stroke-soft-200 rounded-12px bg-bg-white-0 shadow-regular-xs">
      <h2 class="label-sm">
        App template stack
      </h2>
      <ul class="text-text-sub-600 mt-2 space-y-2">
        <li>
          <span>Framework: </span>
          <LinkButton
            href="https://nuxt.com"
            intent="black"
            target="_blank"
            underline
          >
            Nuxt 4
          </LinkButton>
        </li>
        <li>
          <span>Interface: </span>
          <LinkButton
            href="https://github.com/youcan-shop/celeste"
            intent="black"
            target="_blank"
            underline
          >
            Celeste
          </LinkButton>
        </li>
        <li>
          <span>API: </span>
          <LinkButton
            href="https://developer.youcan.shop/store-admin/introduction/getting-started"
            intent="black"
            target="_blank"
            underline
          >
            YouCan API
          </LinkButton>
        </li>

        <li>
          <span>Database: </span>
          <LinkButton
            href="https://prisma.io"
            intent="black"
            target="_blank"
            underline
          >
            Prisma
          </LinkButton>
        </li>
      </ul>
    </div>

    <div class="p-4 border border-stroke-soft-200 rounded-12px bg-bg-white-0 shadow-regular-xs space-y-2">
      <h2 class="label-sm">
        Navigation
      </h2>

      <ul class="text-text-strong-950 list-disc list-inside">
        <li>
          <LinkButton
            as-child
            intent="black"
            to="/additional"
            underline
          >
            <NuxtLink>
              Additional page
            </NuxtLink>
          </LinkButton>
        </li>
      </ul>
    </div>
  </aside>
</template>
