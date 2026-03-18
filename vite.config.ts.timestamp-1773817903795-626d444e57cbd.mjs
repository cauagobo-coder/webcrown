// vite.config.ts
import { defineConfig } from "file:///C:/Users/cauag/Documents/Developer/Sites/WebCrown/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/cauag/Documents/Developer/Sites/WebCrown/node_modules/@vitejs/plugin-react/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [react()],
  build: {
    // Split heavy vendor libs into separate chunks for better caching
    // and to avoid downloading unused code (e.g. three.js on mobile)
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-motion": ["framer-motion"],
          "vendor-gsap": ["gsap"],
          "vendor-three": ["three"]
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxjYXVhZ1xcXFxEb2N1bWVudHNcXFxcRGV2ZWxvcGVyXFxcXFNpdGVzXFxcXFdlYkNyb3duXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxjYXVhZ1xcXFxEb2N1bWVudHNcXFxcRGV2ZWxvcGVyXFxcXFNpdGVzXFxcXFdlYkNyb3duXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9jYXVhZy9Eb2N1bWVudHMvRGV2ZWxvcGVyL1NpdGVzL1dlYkNyb3duL3ZpdGUuY29uZmlnLnRzXCI7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbi8vIEZvcmNlIFRhaWx3aW5kIGNvbmZpZyBjYWNoZSBpbnZhbGlkYXRpb25cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbcmVhY3QoKV0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIC8vIFNwbGl0IGhlYXZ5IHZlbmRvciBsaWJzIGludG8gc2VwYXJhdGUgY2h1bmtzIGZvciBiZXR0ZXIgY2FjaGluZ1xyXG4gICAgLy8gYW5kIHRvIGF2b2lkIGRvd25sb2FkaW5nIHVudXNlZCBjb2RlIChlLmcuIHRocmVlLmpzIG9uIG1vYmlsZSlcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XHJcbiAgICAgICAgICAndmVuZG9yLW1vdGlvbic6IFsnZnJhbWVyLW1vdGlvbiddLFxyXG4gICAgICAgICAgJ3ZlbmRvci1nc2FwJzogWydnc2FwJ10sXHJcbiAgICAgICAgICAndmVuZG9yLXRocmVlJzogWyd0aHJlZSddLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFJbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLE9BQU87QUFBQTtBQUFBO0FBQUEsSUFHTCxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixjQUFjO0FBQUEsVUFDWixpQkFBaUIsQ0FBQyxlQUFlO0FBQUEsVUFDakMsZUFBZSxDQUFDLE1BQU07QUFBQSxVQUN0QixnQkFBZ0IsQ0FBQyxPQUFPO0FBQUEsUUFDMUI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
