# Frosted glass for DSH Desktop

A one-file presentation tweak: the Desktop window already has a native macOS material, this plugin lets it show.

## What changes

- The main panes become translucent glass over the window material (blur is macOS', not CSS').
- Conversation, schedules and plugin pages share one tint layer, so they no longer differ in depth.
- Page-style surfaces lose the sticky header strip that used to be darker than the body.

## Configuration

Two alphas in the stylesheet inside `lib/client.js`:

```css
--dsh-frosted-glass-pane: color-mix(in srgb, #fdfdff 56%, transparent);  /* light */
--dsh-frosted-glass-pane: color-mix(in srgb, #151517 44%, transparent);  /* dark  */
```

The sidebar fill (`--dsw-specific-sidebar-fill`) is separate because macOS already mixes the sidebar
with 50% transparency.

## Compatibility

- macOS Desktop, `dsh >= 0.2.0-rc.1`.
- Falls back to solid surfaces under **Reduce transparency** and in full screen.
- No effect in a browser tab or on Windows.
