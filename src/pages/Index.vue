<script setup>
import AppHero from '@/components/AppHero.vue'
import AppLog from '@/components/AppLog.vue';
import AppProfile from '@/components/AppProfile.vue'
import AppProject from '@/components/AppProject.vue';
import AppSkillset from '@/components/AppSkillset.vue';
import AppContact from '@/components/AppContact.vue';
import AppFooter from '@/components/AppFooter.vue';
import Default from '@/layouts/Default.vue'
</script>

<template>
  <Default>
    <AppHero />
    <AppProfile />
    <AppSkillset/>
    <AppProject/>
    <AppLog/>
    <AppContact/>
    <AppFooter/>
  </Default>
</template>
