<script setup lang="ts">
import { LinkButton } from '@youcan/celeste';
</script>

<template>
  <div class="col-span-8">
    <div class="p-4 border border-stroke-soft-200 rounded-12px bg-bg-white-0 shadow-regular-xs space-y-2">
      <h2 class="label-sm">
        Multiple pages
      </h2>

      <p class="text-text-sub-600">
        You can create multiple pages in the <code>app/pages</code> directory and navigate between them using Qantra.
      </p>
    </div>
  </div>

  <div class="col-span-4">
    <div class="p-4 border border-stroke-soft-200 rounded-12px bg-bg-white-0 shadow-regular-xs space-y-2">
      <h2 class="label-sm">
        Navigation
      </h2>

      <ul class="text-text-strong-950 list-disc list-inside">
        <li>
          <LinkButton
            as-child
            intent="black"
            underline
            to="/"
          >
            <NuxtLink>
              Home page
            </NuxtLink>
          </LinkButton>
        </li>
      </ul>
    </div>
  </div>
</template>
