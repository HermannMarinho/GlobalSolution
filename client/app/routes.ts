import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("abrigos", "routes/abrigos.tsx"),
  route("abrigos/novo", "routes/abrigos.novo.tsx"),
  route("abrigos/:id", "routes/abrigos.$id.tsx"),
  route("pessoas/novo", "routes/pessoas.novo.tsx"),
] satisfies RouteConfig;
