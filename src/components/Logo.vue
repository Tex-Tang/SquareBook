<template>
  <svg :style="{ width: width }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.333 27.135">
    <g transform="translate(-89.24 -36.177)">
      <path d="M87.74,60.278v-25.6h25.833" 
        transform="translate(3 3)" 
        fill="none" 
        :stroke="color" 
        stroke-width="3"/>
      <path 
        d="M1535.118,41.567h16.815V58.039h-16.569Z" 
        transform="translate(-1437 3.773)" 
        fill="none" 
        :stroke="color" 
        stroke-width="3"/>
      <line y2="3" 
        transform="translate(106.5 52.5)" 
        fill="none" 
        :stroke="color" 
        stroke-width="3"/>
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "#cbaf87"
    },
    width: {
      type: String,
      default: "30px"
    }
  }
}
</script>