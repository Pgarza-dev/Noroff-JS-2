const components = import.meta.glob("../../components/**/*.js");

for (const path in components) {
  components[path]();
}
