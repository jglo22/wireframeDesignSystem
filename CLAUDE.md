# Wireframe Design System

Jim's base design system. Brands inherit from it (for example `design-system/` in jglo22/wellnessApp). If the design-system-workflow skill is available, load it.

- This repo is the master. The Wireframe Design System artifact (https://claude.ai/artifact/3pq3o9ZGqHgq7XfWeZiydu) is a read-only view: rebuild it from `tokens.json` and `README.md` after any change, never edit it as the source.
- To release: bump `version` in package.json (minor for additions, major for renames or removals) and add a CHANGELOG entry. When it reaches main, `.github/workflows/release.yml` creates the tag and release. Don't ask Jim to make releases.
- Everything after the `shared-rules` marker in README.md is copied into every brand's generated README; keep it brand-neutral.
- Use a token wherever one exists. Dark mode and a semantic colour layer are out of scope until Jim says otherwise.
