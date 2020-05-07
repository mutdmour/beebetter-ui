<template>
  <b-row>
    <b-form-group>
      <b-col>
        <label>{{ label }}</label>
      </b-col>
      <b-col>
        <label>{{ formattedTime }}</label>
      </b-col>
      <b-col>
        <b-button-group>
          <b-button v-if="canReset" variant="outline-primary" @click="onReset">
            Reset
          </b-button>
          <b-button
            v-else-if="isPaused"
            variant="outline-success"
            @click="onStarted"
          >
            Start Again
          </b-button>
          <b-button v-else-if="canStart" variant="success" @click="onStarted">
            Start
          </b-button>
          <b-button-group v-else>
            <b-button variant="outline-danger" @click="onStopped">
              Stop
            </b-button>

            <b-dropdown right variant="outline-danger">
              <b-dropdown-item @click="onPaused">Pause</b-dropdown-item>
              <b-dropdown-item variant="danger" @click="onCancelled">
                Cancel
              </b-dropdown-item>
            </b-dropdown>
          </b-button-group>
        </b-button-group>
      </b-col>
    </b-form-group>
  </b-row>
</template>

<script lang="ts" src="./Timer.ts"></script>
