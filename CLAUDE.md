# Wireframe Design System

Jim's base design system. Brands inherit from it (for example `design-system/` in jglo22/wellnessApp). If the design-system-workflow skill is available, load it.

- This repo is the master. The Wireframe Design System artifact (https://claude.ai/artifact/3pq3o9ZGqHgq7XfWeZiydu) is a read-only view: rebuild it from `tokens.json` and `README.md` on main after any change, by copying those files; never edit the artifact by hand or rebuild it from an unmerged branch.
- Commit straight to `main`, not a side branch: Jim asking for a change is the approval, and main is what releases. Only a major version (renames or removals) goes through a pull request for Jim's OK.
- To release: bump `version` in package.json (minor for additions, major for renames or removals) and add a CHANGELOG entry. When it reaches main, `.github/workflows/release.yml` creates the tag and release. Don't ask Jim to make releases.
- Everything after the `shared-rules` marker in README.md is copied into every brand's generated README; keep it brand-neutral.
- The `prefix` in tokens.json (`jg-`) is for Figma only: see "Prefix in Figma only" in README.md. Never add it to token names or CSS.
- Use a token wherever one exists. Dark mode is out of scope until Jim says otherwise. Use colour roles (text-, surface-, stroke-) rather than greys.
