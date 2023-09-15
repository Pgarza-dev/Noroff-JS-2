const components = import.meta.glob("../../components/post/**/*.js");

for (const path in components) {
  components[path]();
}
