<script setup lang="ts" name="LAuth">
import dayjs from 'dayjs'
import AliveRouterView from '../aliveRouterView/index.vue'
import { getEnv } from '@/utils/env'

const { VITE_APP_TITLE: systemTitle } = getEnv()
const currentYear = dayjs().format('YYYY')
</script>

<template>
  <div class="mcontainer auth-layout">
    <div class="main-content">
      <div class="welcome-box">
        <img class="logo" src="/src/assets/images/layout/logo.png" alt="logo">
        <div class="welcome-words">
          Welcome to
        </div>
        <h1 class="system-title">
          {{ systemTitle }}
        </h1>
      </div>
      <div class="login-box">
        <div class="header-area">
          <img class="logo" src="/src/assets/images/layout/logo.png" alt="logo">
          <h1 class="system-title">
            {{ systemTitle }}
          </h1>
        </div>
        <AliveRouterView />
      </div>
    </div>
    <div class="footer">
      Copyright © {{ currentYear }} xxx公司
    </div>
  </div>
</template>

<style lang="less" scoped>
.auth-layout {
  display: flex;
  flex-direction: column;
  background-color: #aaa;
  background-image: url('/src/assets/images/layout/auth-bg.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  .main-content {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 0;
    padding: 0 18%;

    .welcome-box {
      height: 377px;

      .logo {
        width: 40px;
        margin-bottom: 10px;
      }

      .welcome-words,
      .system-title {
        font-size: 30px;
        font-weight: bold;
        color: #fff;
      }
    }

    .login-box {
      width: 410px;
      padding: 30px 40px;
      background-color: rgb(255 255 255 / 10%);
      border-radius: 10px;
      box-shadow: 0 6px 12px 0 rgb(7 17 27 / 6%);

      .header-area {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin-bottom: 20px;

        .logo {
          width: 40px;
          margin-right: 10px;
        }

        .system-title {
          font-size: 26px;
          font-weight: 600;
          color: #fff;
        }
      }
    }
  }

  .footer {
    display: flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80px;
    color: #fff;
  }
}
</style>
